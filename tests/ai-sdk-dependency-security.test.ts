/// <reference types="bun" />
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { test } from 'bun:test'

const run = promisify(execFile)

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
