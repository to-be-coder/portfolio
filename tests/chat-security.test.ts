/// <reference types="bun" />
import assert from 'node:assert/strict'
import { mock } from 'bun:test'
import { execFile } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { promisify } from 'node:util'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Streamdown } from 'streamdown'
import { PORTFOLIO_PROCESS_PROMPT } from '../src/lib/chat'
import { ChatRequestError, MAX_CHAT_BODY_BYTES, parseChatMessages, readChatBody, validateChatHeaders } from '../src/lib/server/chat-request'
import { acquireChatPermit, CHAT_ADMISSION_SCRIPT, CHAT_PROTECTION_LIMITS, ChatProtectionError, createChatDeadline, getChatProtectionConfig, type ChatFetch } from '../src/lib/server/chat-protection'

// Direct route tests have no Next request scope. Capture the public lifecycle
// callback so each fixture controls when its response closes and waits for the
// retained work before restoring the network mock.
const afterCallbacks: Array<() => unknown> = []
mock.module('next/server', () => ({ after: (callback: () => unknown) => { afterCallbacks.push(callback) } }))
const { POST } = await import('../src/app/api/chat/route')
async function finishRequestLifecycle() {
  await Promise.all(afterCallbacks.splice(0).map((callback) => callback()))
}

const productionEnv: NodeJS.ProcessEnv = { NODE_ENV: 'production' }
const protectedEnv: NodeJS.ProcessEnv = {
  ...productionEnv, VERCEL: '1', UPSTASH_REDIS_REST_URL: 'https://security-fixture.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: 'fake-test-token', CHAT_RATE_LIMIT_SECRET: 'test-only-secret-with-at-least-32-characters',
}
const userMessage = (text = 'Hello', id = 'user-1') => ({ id, role: 'user', parts: [{ type: 'text', text }] })
const request = (body: unknown = { messages: [userMessage()] }, headers: Record<string, string> = {}) => new Request('https://jessicacheng.studio/api/chat', {
  method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://jessicacheng.studio', 'x-vercel-forwarded-for': '203.0.113.20', ...headers },
  body: JSON.stringify(body),
})
const hasStatus = (status: number) => (error: unknown) => error instanceof ChatRequestError && error.status === status
const hasProtectionStatus = (status: number) => (error: unknown) => error instanceof ChatProtectionError && error.status === status

test('requires JSON and the exact permitted browser origin', () => {
  assert.doesNotThrow(() => validateChatHeaders(request(), productionEnv))
  assert.throws(() => validateChatHeaders(request({}, { 'content-type': 'text/plain' }), productionEnv), hasStatus(415))
  assert.throws(() => validateChatHeaders(request({}, { 'content-encoding': 'gzip' }), productionEnv), hasStatus(415))
  assert.throws(() => validateChatHeaders(request({}, { origin: 'https://attacker.example', 'x-forwarded-host': 'attacker.example' }), productionEnv), hasStatus(403))
  assert.throws(() => validateChatHeaders(request({}, { origin: 'null' }), productionEnv), hasStatus(403))
  assert.throws(() => validateChatHeaders(request({}, { 'sec-fetch-site': 'cross-site' }), productionEnv), hasStatus(403))
  const missing = request()
  missing.headers.delete('origin')
  assert.throws(() => validateChatHeaders(missing, productionEnv), hasStatus(403))
  const internalUrl = new Request('http://localhost:3100/api/chat', {
    method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://jessicacheng.studio', host: 'jessicacheng.studio' },
    body: '{}',
  })
  assert.doesNotThrow(() => validateChatHeaders(internalUrl, productionEnv))
  internalUrl.headers.set('host', 'attacker.example')
  internalUrl.headers.set('x-forwarded-host', 'jessicacheng.studio')
  assert.throws(() => validateChatHeaders(internalUrl, productionEnv), hasStatus(403))
  internalUrl.headers.set('host', 'attacker.example')
  internalUrl.headers.set('origin', 'https://attacker.example')
  assert.throws(() => validateChatHeaders(internalUrl, productionEnv), hasStatus(403))
})

test('caps actual streamed bytes even when Content-Length is absent or false', async () => {
  await assert.rejects(readChatBody(request({}, { 'content-length': String(MAX_CHAT_BODY_BYTES + 1) })), hasStatus(413))
  for (const contentLength of [undefined, '2']) {
    const oversized = new Request('https://jessicacheng.studio/api/chat', {
      method: 'POST', headers: contentLength ? { 'content-length': contentLength } : {}, body: 'x'.repeat(MAX_CHAT_BODY_BYTES + 1),
    })
    await assert.rejects(readChatBody(oversized), hasStatus(413))
  }
  await assert.rejects(readChatBody(new Request('https://example.test', { method: 'POST', body: '{' })), hasStatus(400))
  assert.deepEqual(await readChatBody(request()), { messages: [userMessage()] })
})

test('a maximally fragmented request fits within a constrained Node heap', async () => {
  // Exercise the actual reader in a fresh process with a 64 MiB heap. The old
  // per-chunk arrays/deadline subscriptions retained ~86 MiB for this 128 KiB
  // body. A normal validity assertion alone would miss that resource bug.
  const script = `
    const MAX_CHAT_BODY_BYTES = ${MAX_CHAT_BODY_BYTES};
    const ChatRequestError = ${ChatRequestError.toString()};
    const readChatBody = ${readChatBody.toString()};
    const expected = 'a'.repeat(MAX_CHAT_BODY_BYTES - 2);
    const bytes = new TextEncoder().encode(JSON.stringify(expected));
    let offset = 0;
    const body = new ReadableStream({ pull(controller) {
      if (offset === bytes.length) { controller.close(); return; }
      controller.enqueue(bytes.subarray(offset, ++offset));
    }});
    const request = new Request('https://example.test', { method: 'POST', body, duplex: 'half' });
    if (await readChatBody(request) !== expected) throw new Error('Fragmented body changed');
    process.stdout.write('bounded');
  `
  const { stdout } = await promisify(execFile)('node', ['--max-old-space-size=64', '--input-type=module', '--eval', script], {
    encoding: 'utf8', timeout: 10000, maxBuffer: 64 * 1024,
  })
  assert.equal(stdout, 'bounded')
})

test('slow request bodies time out and their reader is cancelled', async () => {
  let cancelled = false
  const body = new ReadableStream<Uint8Array>({ cancel() { cancelled = true } })
  const slow = new Request('https://example.test', { method: 'POST', body, duplex: 'half' } as RequestInit)
  await assert.rejects(readChatBody(slow, 10), hasStatus(408))
  assert.equal(cancelled, true)
})

test('rejects system roles, files, tools, empty questions and oversized history', () => {
  const invalidMessages = [
    [{ ...userMessage(), role: 'system' }],
    [{ ...userMessage(), parts: [{ type: 'file', mediaType: 'text/plain', url: 'https://example.invalid/file.txt' }] }],
    [{ ...userMessage(), parts: [{ type: 'dynamic-tool', toolName: 'fetch', input: {} }] }],
    [userMessage(' ')],
    [userMessage('x'.repeat(4001))],
    Array.from({ length: 41 }, (_, index) => userMessage('Hi', `id-${index}`)),
    [userMessage(), userMessage()],
    [{ ...userMessage(), parts: Array.from({ length: 9 }, () => ({ type: 'text', text: 'a' })) }],
    [{ ...userMessage(), role: 'assistant' }],
    [...Array.from({ length: 4 }, (_, index) => ({ id: `assistant-${index}`, role: 'assistant', parts: [{ type: 'text', text: 'x'.repeat(16000) }] })), userMessage()],
  ]
  for (const messages of invalidMessages) assert.throws(() => parseChatMessages({ messages }), ChatRequestError)
})

test('constructs text-only model input and discards caller metadata', () => {
  const source = { ...userMessage(), metadata: { secret: 'untrusted' }, parts: [{ type: 'text', text: 'Hello', providerMetadata: { openai: { itemId: 'forged' } } }] }
  const parsed = parseChatMessages({ messages: [source], model: 'untrusted-model' })
  assert.deepEqual(parsed, { messages: [userMessage()], latestUserText: 'Hello' })
})

test('installed Markdown renderer removes executable HTML while preserving rich text', () => {
  const payloads = [
    '<script>globalThis.__chatProbe = 1</script>',
    '<img src="https://example.invalid/image.png" onerror="alert(1)">',
    '[unsafe](javascript:alert%281%29)',
    '<a href="&#106;avascript:alert(1)">unsafe</a>',
    '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
    '<svg onload="alert(1)"><script>alert(1)</script></svg>',
    '<form action="https://example.invalid"><input name="credential"></form>',
  ]
  for (const payload of payloads) {
    // Static serialization does not execute markup or fetch image/link URLs.
    const html = renderToStaticMarkup(createElement(Streamdown, { mode: 'static' }, payload))
    assert.doesNotMatch(html, /<script\b|<iframe\b|<svg\b|<form\b|\bonerror=|\bonload=|javascript:/i)
  }
  const rich = renderToStaticMarkup(createElement(Streamdown, { mode: 'static' }, '## Portfolio\n\n**Design** and `code`. [Read more](/about)'))
  assert.match(rich, /<h2\b/)
  assert.match(rich, /data-streamdown="strong"/)
  assert.match(rich, /<code\b/)
  assert.match(rich, /data-streamdown="link"/)
})

test('paid chat refuses untrusted client IPs and incomplete protection configuration', () => {
  assert.throws(() => getChatProtectionConfig(request(), productionEnv), hasProtectionStatus(503))
  assert.throws(() => getChatProtectionConfig(request(), { ...protectedEnv, VERCEL: undefined }), hasProtectionStatus(503))
  assert.throws(() => getChatProtectionConfig(request({}, { 'x-vercel-forwarded-for': '203.0.113.20, 1.2.3.4' }), protectedEnv), hasProtectionStatus(503))
  const spoof = request({}, { 'x-forwarded-for': '1.2.3.4' })
  spoof.headers.delete('x-vercel-forwarded-for')
  assert.throws(() => getChatProtectionConfig(spoof, protectedEnv), hasProtectionStatus(503))
  assert.throws(() => getChatProtectionConfig(request(), { ...protectedEnv, CHAT_RATE_LIMIT_SECRET: 'short' }), hasProtectionStatus(503))
  for (const url of ['http://security-fixture.upstash.io', 'https://attacker.example', 'https://security-fixture.upstash.io/path']) {
    assert.throws(() => getChatProtectionConfig(request(), { ...protectedEnv, UPSTASH_REDIS_REST_URL: url }), hasProtectionStatus(503))
  }
})

test('hashes normalized IPs and groups IPv6 privacy addresses into one quota', () => {
  const keyFor = (ip: string) => getChatProtectionConfig(request({}, { 'x-vercel-forwarded-for': ip }), protectedEnv).clientKey
  assert.equal(keyFor('203.0.113.20'), keyFor('::ffff:203.0.113.20'))
  assert.equal(keyFor('2001:db8:1234:5678::1'), keyFor('2001:0db8:1234:5678:abcd:ef01:2345:6789'))
  assert.notEqual(keyFor('2001:db8:1234:5678::1'), keyFor('2001:db8:1234:5679::1'))
  assert.match(keyFor('203.0.113.20'), /^[a-f0-9]{64}$/)
})

test('atomically requests all quotas and a lease, then releases only its own lease once', async () => {
  const commands: unknown[][] = []
  const fetcher: ChatFetch = async (_url, options) => {
    assert.equal(options?.redirect, 'error')
    assert.ok(options?.signal)
    const command = JSON.parse(String(options?.body)) as unknown[]
    commands.push(command)
    return Response.json({ result: command[0] === 'EVAL' ? [1, 0] : 1 })
  }
  const permit = await acquireChatPermit(request(), protectedEnv, fetcher)
  assert.equal(commands[0][0], 'EVAL')
  assert.equal(commands[0][1], CHAT_ADMISSION_SCRIPT)
  assert.deepEqual(commands[0].slice(7, 12), [6, 30, 100, 4, 65000])
  assert.ok(!JSON.stringify(commands).includes('203.0.113.20'))
  await Promise.all([permit.release(), permit.release()])
  assert.deepEqual(commands[1], ['ZREM', 'portfolio:{chat}:leases', commands[0][12]])
  assert.equal(commands.length, 2)
})

test('quota denial, Redis errors, malformed responses and timeouts all fail closed', async () => {
  await assert.rejects(acquireChatPermit(request(), protectedEnv, async () => Response.json({ result: [0, 37] })), (error: unknown) => {
    assert.ok(error instanceof ChatProtectionError)
    assert.equal(error.status, 429)
    assert.equal(error.retryAfter, 37)
    return true
  })
  const failures: ChatFetch[] = [
    async () => Response.json({ error: 'backend unavailable' }),
    async () => new Response(null, { status: 503 }),
    async () => Response.json({ result: [2, 0] }),
    async () => Response.json({ result: null }),
    async () => { throw new DOMException('Timed out', 'TimeoutError') },
  ]
  for (const fetcher of failures) await assert.rejects(acquireChatPermit(request(), protectedEnv, fetcher), hasProtectionStatus(503))
})

test('provider deadline and client cancellation abort work and clean up timers', async () => {
  const client = new AbortController()
  const cancelled = createChatDeadline(client.signal, 1000)
  client.abort()
  assert.equal(cancelled.signal.aborted, true)
  cancelled.dispose()
  const timed = createChatDeadline(new AbortController().signal, 10)
  await new Promise((resolve) => setTimeout(resolve, 20))
  assert.equal(timed.signal.aborted, true)
  assert.equal(timed.signal.reason.name, 'TimeoutError')
  timed.dispose()
  assert.ok(CHAT_PROTECTION_LIMITS.leaseMs > CHAT_PROTECTION_LIMITS.generationTimeoutMs)
})

test('Vercel opts the actual chat source route into client cancellation', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')) as {
    functions?: Record<string, { supportsCancellation?: boolean }>
  }
  assert.equal(config.functions?.['src/app/api/chat/route.ts']?.supportsCancellation, true)
})

test('the route serves all starter prompts without network calls and defaults to an honest curated guide', async () => {
  const originalEnv = process.env
  const originalFetch = globalThis.fetch
  process.env = { ...process.env, NODE_ENV: 'production', AI_CHAT_ENABLED: 'false', OPENAI_API_KEY: 'test-key-that-must-not-be-used' }
  globalThis.fetch = Object.assign(async () => { throw new Error('Unexpected network call from curated mode') }, originalFetch)
  try {
    for (const prompt of [PORTFOLIO_PROCESS_PROMPT, 'What did Jessica contribute to Mozilla Thunderbolt?',
      'How does Jessica bridge product design and front-end engineering?', 'Give me a 30-second overview of Jessica and her strongest work.']) {
      const response = await POST(request({ messages: [userMessage(prompt)] }))
      assert.equal(response.status, 200)
      assert.equal(response.headers.get('cache-control'), 'no-store')
      const text = await response.text()
      assert.match(text, /Curated portfolio guide/)
      assert.match(text, /text-delta/)
    }
    const response = await POST(request({ messages: [userMessage('Please answer an unrelated question.')] }))
    assert.match(await response.text(), /currently a curated portfolio guide/)
    process.env = { ...process.env, AI_CHAT_ENABLED: 'true', UPSTASH_REDIS_REST_URL: undefined, UPSTASH_REDIS_REST_TOKEN: undefined }
    const closed = await POST(request())
    assert.equal(closed.status, 503)
    assert.match(await closed.text(), /suggested portfolio questions/)
    const invalid = await POST(request({ messages: [{ ...userMessage(), role: 'system' }] }))
    assert.equal(invalid.status, 400)
  } finally {
    process.env = originalEnv
    globalThis.fetch = originalFetch
  }
})

test('live streaming fixtures release leases and abort open providers on errors or disconnects', async () => {
  const originalEnv = process.env
  const originalFetch = globalThis.fetch
  process.env = { ...originalEnv, ...protectedEnv, AI_CHAT_ENABLED: 'true', OPENAI_API_KEY: 'fake-provider-key' }
  const encodeEvent = (event: object) => new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)
  const created = { type: 'response.created', response: { id: 'response-fixture', created_at: 0, model: 'gpt-4.1-mini' } }
  try {
    for (const scenario of ['success', 'error-open', 'disconnect'] as const) {
      let upstreamSignal: AbortSignal | null | undefined
      let providerCalls = 0
      let releases = 0
      const client = new AbortController()
      globalThis.fetch = Object.assign(async (input: RequestInfo | URL, options?: RequestInit) => {
        const url = String(input)
        if (url === protectedEnv.UPSTASH_REDIS_REST_URL) {
          const command = JSON.parse(String(options?.body)) as unknown[]
          if (command[0] === 'ZREM') {
            releases += 1
            if (scenario !== 'success') assert.equal(upstreamSignal?.aborted, true, 'abort provider before releasing concurrency')
            return Response.json({ result: 1 })
          }
          return Response.json({ result: [1, 0] })
        }
        assert.equal(url, 'https://api.openai.com/v1/responses', 'unexpected outbound URL')
        providerCalls += 1
        upstreamSignal = options?.signal
        const sent = JSON.parse(String(options?.body)) as { store: boolean; max_output_tokens: number }
        assert.equal(sent.store, false)
        assert.equal(sent.max_output_tokens, 1400)
        return new Response(new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encodeEvent(created))
            if (scenario === 'success') {
              controller.enqueue(encodeEvent({ type: 'response.output_item.added', output_index: 0, item: { type: 'message', id: 'message-fixture' } }))
              controller.enqueue(encodeEvent({ type: 'response.output_text.delta', item_id: 'message-fixture', output_index: 0, delta: 'Fixture answer.' }))
              controller.enqueue(encodeEvent({ type: 'response.output_item.done', output_index: 0, item: { type: 'message', id: 'message-fixture' } }))
              controller.enqueue(encodeEvent({ type: 'response.completed', response: { usage: { input_tokens: 10, output_tokens: 3 } } }))
              controller.close()
            } else {
              upstreamSignal?.addEventListener('abort', () => controller.error(new DOMException('Aborted fixture', 'AbortError')), { once: true })
              if (scenario === 'error-open') controller.enqueue(encodeEvent({ type: 'error', sequence_number: 1, code: 'fixture_error', message: 'private provider failure detail', param: null }))
              else {
                controller.enqueue(encodeEvent({ type: 'response.output_item.added', output_index: 0, item: { type: 'message', id: 'message-fixture' } }))
                controller.enqueue(encodeEvent({ type: 'response.output_text.delta', item_id: 'message-fixture', output_index: 0, delta: 'Partial ' }))
              }
            }
          },
        }), { headers: { 'content-type': 'text/event-stream' } })
      }, originalFetch)
      try {
        const response = await POST(new Request(request(), { signal: client.signal }))
        assert.equal(response.status, 200)
        if (scenario === 'disconnect') {
          const reader = response.body!.getReader()
          let receivedText = false
          while (!receivedText) {
            const { done, value } = await reader.read()
            assert.equal(done, false)
            receivedText = new TextDecoder().decode(value).includes('text-delta')
          }
          await reader.cancel()
        } else {
          const text = await response.text()
          if (scenario === 'success') {
            const deltas = text.split('\n').filter((line) => line.startsWith('data: {')).map((line) => JSON.parse(line.slice(6)) as { type: string; delta?: string })
            assert.equal(deltas.filter((part) => part.type === 'text-delta').map((part) => part.delta).join(''), 'Fixture answer.')
          }
          else assert.ok(!text.includes('private provider failure detail'))
        }
        assert.equal(providerCalls, 1)
        assert.equal(releases, 1)
        if (scenario !== 'success') assert.equal(upstreamSignal?.aborted, true)
      } finally {
        client.abort()
        await finishRequestLifecycle()
      }
    }
  } finally {
    process.env = originalEnv
    globalThis.fetch = originalFetch
  }
})

test('retained platform cleanup aborts generation and awaits an already-running lease release', async () => {
  const originalEnv = process.env
  const originalFetch = globalThis.fetch
  process.env = { ...originalEnv, ...protectedEnv, AI_CHAT_ENABLED: 'true', OPENAI_API_KEY: 'fake-provider-key' }
  const encodeEvent = (event: object) => new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)
  try {
    for (const releaseAlreadyStarted of [false, true]) {
      assert.equal(afterCallbacks.length, 0)
      const client = new AbortController()
      let upstreamSignal: AbortSignal | null | undefined
      let releases = 0
      let unblockRelease!: () => void
      let markReleaseStarted!: () => void
      const releaseGate = new Promise<void>((resolve) => { unblockRelease = resolve })
      const releaseStarted = new Promise<void>((resolve) => { markReleaseStarted = resolve })
      globalThis.fetch = Object.assign(async (input: RequestInfo | URL, options?: RequestInit) => {
        if (String(input) === protectedEnv.UPSTASH_REDIS_REST_URL) {
          const command = JSON.parse(String(options?.body)) as unknown[]
          if (command[0] !== 'ZREM') return Response.json({ result: [1, 0] })
          assert.equal(upstreamSignal?.aborted, true, 'stop provider before releasing its concurrency slot')
          releases += 1
          markReleaseStarted()
          await releaseGate
          return Response.json({ result: 1 })
        }
        assert.equal(String(input), 'https://api.openai.com/v1/responses')
        upstreamSignal = options?.signal
        return new Response(new ReadableStream<Uint8Array>({
          start(controller) {
            upstreamSignal?.addEventListener('abort', () => controller.error(new DOMException('Aborted fixture', 'AbortError')), { once: true })
            controller.enqueue(encodeEvent({ type: 'response.created', response: { id: 'retained-fixture', created_at: 0, model: 'gpt-4.1-mini' } }))
            controller.enqueue(encodeEvent({ type: 'response.output_item.added', output_index: 0, item: { type: 'message', id: 'retained-message' } }))
            controller.enqueue(encodeEvent({ type: 'response.output_text.delta', item_id: 'retained-message', output_index: 0, delta: 'Partial ' }))
          },
        }), { headers: { 'content-type': 'text/event-stream' } })
      }, originalFetch)
      let reader: ReadableStreamDefaultReader<Uint8Array> | undefined
      let cancellation: Promise<void> | undefined
      let retainedCleanup: Promise<unknown> | undefined
      try {
        const response = await POST(new Request(request(), { signal: client.signal }))
        assert.equal(response.status, 200)
        assert.equal(afterCallbacks.length, 1, 'register retained cleanup before returning the response')
        reader = response.body!.getReader()
        while (true) {
          const chunk: { done: boolean; value?: Uint8Array } = await reader.read()
          assert.equal(chunk.done, false)
          if (new TextDecoder().decode(chunk.value).includes('text-delta')) break
        }
        if (releaseAlreadyStarted) {
          cancellation = reader.cancel()
          await releaseStarted
        }
        let retainedFinished = false
        retainedCleanup = finishRequestLifecycle().then(() => { retainedFinished = true })
        await releaseStarted
        assert.equal(client.signal.aborted, false, 'platform closure must also work before request.signal fires')
        assert.equal(upstreamSignal?.aborted, true)
        await new Promise<void>((resolve) => setImmediate(resolve))
        assert.equal(retainedFinished, false, 'retained callback must wait for an in-flight Redis release')
        assert.equal(releases, 1)
        unblockRelease()
        await retainedCleanup
        await cancellation
        assert.equal(retainedFinished, true)
        assert.equal(releases, 1)
      } finally {
        unblockRelease()
        client.abort()
        await retainedCleanup
        await cancellation
        await reader?.cancel()
        await finishRequestLifecycle()
      }
    }
  } finally {
    process.env = originalEnv
    globalThis.fetch = originalFetch
  }
})
