/// <reference types="bun" />
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { test } from 'bun:test'

const run = promisify(execFile)

const sdkMockPrelude = String.raw`
  import assert from 'node:assert/strict'
  import { generateText, streamText, tool } from 'ai'
  import { MockLanguageModelV4, simulateReadableStream } from 'ai/test'
  import { z } from 'zod'

  globalThis.fetch = () => { throw new Error('Network is forbidden in this fixture') }
  const usage = {
    inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
    outputTokens: { total: 1, text: 1, reasoning: 0 },
  }
  const finishReason = { unified: 'tool-calls', raw: 'tool_calls' }
  const call = {
    type: 'tool-call', toolCallId: 'lookup-1', toolName: 'lookup',
    input: JSON.stringify({ topic: 'portfolio' }),
  }

  function model() {
    return new MockLanguageModelV4({
      doGenerate: { content: [call], finishReason, usage, warnings: [] },
      doStream: () => Promise.resolve({
        stream: simulateReadableStream({
          chunks: [
            { type: 'stream-start', warnings: [] },
            call,
            { type: 'finish', finishReason, usage },
          ],
          initialDelayInMs: null,
          chunkDelayInMs: null,
        }),
      }),
    })
  }

  async function complete(mode, options) {
    const result = mode === 'generate'
      ? await generateText(options)
      : streamText(options)
    if (mode === 'stream') await result.consumeStream()
    return await result.steps
  }
`

async function runBoundedScript(script: string) {
  const { stdout } = await run('node', ['--max-old-space-size=128', '--input-type=module', '--eval', script], {
    encoding: 'utf8',
    timeout: 5000,
    killSignal: 'SIGKILL',
    maxBuffer: 64 * 1024,
  })
  assert.equal(stdout, 'passed')
}

// Provider-utils 5.0.82 honors a Standard Schema failure even if the validator
// also returns a value. Exercise the public APIs with small ordinary values;
// no model, tool, network, or resource-exhaustion fixture is involved.
test('installed SDK preserves Standard Schema failure and success results', async () => {
  const script = String.raw`
    import assert from 'node:assert/strict'
    import { asSchema, safeParseJSON } from '@ai-sdk/provider-utils'
    import { TypeValidationError } from '@ai-sdk/provider'

    function standardSchema(validate) {
      return {
        '~standard': {
          version: 1,
          vendor: 'portfolio-regression',
          validate,
          jsonSchema: {
            input: () => ({ type: 'object' }),
            output: () => ({ type: 'object' }),
          },
        },
      }
    }

    let cases = 0
    for (const asynchronous of [false, true]) {
      for (const issues of [[{ message: 'Expected text' }], []]) {
        for (const includeValue of [false, true]) {
          const input = { text: 123 }
          const failure = { issues, ...(includeValue ? { value: input } : {}) }
          const schema = standardSchema(() => asynchronous ? Promise.resolve(failure) : failure)
          const result = await asSchema(schema).validate(input)
          assert.equal(result.success, false, 'issues must prevent success even when a value is present')
          assert.ok(TypeValidationError.isInstance(result.error))
          const parsed = await safeParseJSON({ text: JSON.stringify(input), schema })
          assert.equal(parsed.success, false, 'JSON parsing must preserve the schema failure')
          cases++
        }
      }

      const input = { text: 'Portfolio question.' }
      const success = { value: input, issues: undefined }
      const schema = standardSchema(() => asynchronous ? Promise.resolve(success) : success)
      assert.deepEqual(await asSchema(schema).validate(input), { success: true, value: input })
      const parsed = await safeParseJSON({ text: JSON.stringify(input), schema })
      assert.equal(parsed.success, true)
      assert.deepEqual(parsed.value, input)
      cases++

      const undefinedSuccess = { value: undefined, issues: undefined }
      const optionalSchema = standardSchema(() =>
        asynchronous ? Promise.resolve(undefinedSuccess) : undefinedSuccess)
      assert.deepEqual(await asSchema(optionalSchema).validate(undefined), {
        success: true,
        value: undefined,
      })
      cases++
    }
    assert.equal(cases, 12)
    process.stdout.write('passed')
  `
  const { stdout } = await run('node', ['--max-old-space-size=128', '--input-type=module', '--eval', script], {
    encoding: 'utf8',
    timeout: 5000,
    killSignal: 'SIGKILL',
    maxBuffer: 64 * 1024,
  })
  assert.equal(stdout, 'passed')
}, 10000)

// Exercise the public generation APIs with inert, local mock tools. A denied
// request must not carry a reusable signature; legitimate approval requests
// still need signatures and an approved tool must retain its ordinary result.
test('installed SDK signs pending and approved tools but not automatic denials', async () => {
  await runBoundedScript(sdkMockPrelude + String.raw`
    for (const mode of ['generate', 'stream']) {
      for (const decision of ['denied', 'user-approval', 'approved']) {
        let executions = 0
        const mock = model()
        const steps = await complete(mode, {
          model: mock,
          prompt: 'Look up the portfolio topic.',
          tools: {
            lookup: tool({
              inputSchema: z.object({ topic: z.string() }),
              execute: ({ topic }) => { executions++; return topic },
            }),
          },
          toolApproval: { lookup: decision },
          experimental_toolApprovalSecret: 'local-fixture-approval-key-only',
          maxRetries: 0,
          abortSignal: AbortSignal.timeout(1000),
        })
        assert.equal(steps.length, 1)
        const requests = steps[0].content.filter(part => part.type === 'tool-approval-request')
        assert.equal(requests.length, 1)
        const request = requests[0]
        assert.equal(request.toolCall.toolName, 'lookup')
        assert.deepEqual(request.toolCall.input, { topic: 'portfolio' })
        if (decision === 'denied') {
          assert.equal(request.signature, undefined, mode + ': automatic denial must be unsigned')
          assert.equal(request.isAutomatic, true)
        } else {
          assert.equal(typeof request.signature, 'string')
          assert.ok(request.signature.length > 0)
        }
        assert.equal(executions, decision === 'approved' ? 1 : 0)
        if (decision === 'approved') {
          const output = steps[0].content.find(part => part.type === 'tool-result')
          assert.equal(output.output, 'portfolio')
        }
        assert.equal(mock.doGenerateCalls.length + mock.doStreamCalls.length, 1)
      }
    }
    process.stdout.write('passed')
  `)
}, 10000)

test('installed SDK keeps approval message snapshots independent of a reused caller array', async () => {
  await runBoundedScript(sdkMockPrelude + String.raw`
    for (const mode of ['generate', 'stream']) {
      const shared = [{ role: 'user', content: 'Original portfolio question.' }]
      const seen = []
      for (let attempt = 0; attempt < 2; attempt++) {
        await complete(mode, {
          model: model(),
          messages: shared,
          prepareStep: () => ({ messages: shared }),
          tools: { lookup: tool({ inputSchema: z.object({ topic: z.string() }) }) },
          toolApproval: ({ messages }) => { seen.push(messages); return 'denied' },
          maxRetries: 0,
          abortSignal: AbortSignal.timeout(1000),
        })
      }
      assert.equal(seen.length, 2)
      assert.deepEqual(shared, [{ role: 'user', content: 'Original portfolio question.' }])
      // Reusing the caller array for a later question must not retrospectively
      // change the request context retained by either approval callback.
      shared.push({ role: 'user', content: 'A later portfolio question.' })
      for (const messages of seen) {
        assert.deepEqual(messages, [{ role: 'user', content: 'Original portfolio question.' }], mode)
      }
    }
    process.stdout.write('passed')
  `)
}, 10000)

// A tiny diagnostic-count assertion catches the quadratic duplicate reporting
// regression without a large input, timing threshold, or stress workload.
test('installed Babel parser reports each duplicate label once in recovery mode', async () => {
  await runBoundedScript(String.raw`
    import assert from 'node:assert/strict'
    import { parse } from '@babel/parser'

    for (const count of [2, 3, 4]) {
      const result = parse('label: '.repeat(count) + ';', { errorRecovery: true })
      assert.equal(result.errors.length, count - 1)
      assert.ok(result.errors.every(error => error.reasonCode === 'LabelRedeclaration'))
      assert.equal(new Set(result.errors.map(error => error.pos)).size, count - 1)
    }
    assert.deepEqual(parse('outer: { inner: ; }', { errorRecovery: true }).errors, [])
    assert.throws(() => parse('label: label: ;'), error => error.reasonCode === 'LabelRedeclaration')
    process.stdout.write('passed')
  `)
}, 10000)
