import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { test } from 'node:test'
import { promisify } from 'node:util'
import { acquireChatPermit, CHAT_PROTECTION_LIMITS, ChatProtectionError, getChatProtectionConfig, type ChatFetch } from '../src/lib/server/chat-protection'

// Explicit opt-in: use only a fresh disposable Redis instance on loopback.
// Example: REDIS_TEST_CLI=/tmp/redis/src/redis-cli REDIS_TEST_PORT=16379 bun test tests/chat-redis-integration.test.ts
const cli = process.env.REDIS_TEST_CLI
const port = process.env.REDIS_TEST_PORT
const run = promisify(execFile)
const prefix = 'portfolio:{chat}'
const globalKey = `${prefix}:day:global`
const leasesKey = `${prefix}:leases`

test('real Redis chat admission integration', { skip: !cli || !port ? 'Set REDIS_TEST_CLI and REDIS_TEST_PORT for disposable loopback Redis.' : false }, async (t) => {
  assert.ok(cli?.startsWith('/'), 'REDIS_TEST_CLI must be an absolute local binary path')
  assert.ok(port && /^\d+$/.test(port) && Number(port) >= 1024 && Number(port) <= 65535, 'REDIS_TEST_PORT must be an unprivileged local port')
  const redis = async (command: (string | number)[]): Promise<unknown> => {
    const { stdout } = await run(cli!, ['-h', '127.0.0.1', '-p', port!, '-n', '15', '--json', ...command.map(String)], {
      encoding: 'utf8', timeout: 5000, maxBuffer: 256 * 1024,
    })
    return JSON.parse(stdout.trim()) as unknown
  }
  assert.equal(await redis(['PING']), 'PONG')
  // Refuse to touch existing limiter state. All cleanup below deletes only the
  // exact keys created by this test in Redis database 15; never FLUSHDB.
  assert.equal(await redis(['EXISTS', globalKey, leasesKey]), 0, 'Use a fresh disposable test database; existing limiter state was found.')

  const fixture = () => {
    const env: NodeJS.ProcessEnv = {
      NODE_ENV: 'production', VERCEL: '1', UPSTASH_REDIS_REST_URL: 'https://local-fixture.upstash.io',
      UPSTASH_REDIS_REST_TOKEN: 'never-sent-to-network', CHAT_RATE_LIMIT_SECRET: `integration-fixture-${randomUUID()}`,
    }
    const ownedKeys = new Set<string>()
    const request = (ip = '203.0.113.1') => new Request('https://jessicacheng.studio/api/chat', { headers: { 'x-vercel-forwarded-for': ip } })
    const keysFor = (ip?: string) => {
      const clientKey = getChatProtectionConfig(request(ip), env).clientKey
      return { minute: `${prefix}:minute:${clientKey}`, day: `${prefix}:day:${clientKey}` }
    }
    const fetcher: ChatFetch = async (url, options) => {
      assert.equal(String(url), env.UPSTASH_REDIS_REST_URL)
      const command = JSON.parse(String(options?.body)) as (string | number)[]
      if (command[0] === 'EVAL') for (const key of command.slice(3, 7)) ownedKeys.add(String(key))
      return Response.json({ result: await redis(command) })
    }
    return {
      request, env, keysFor,
      acquire: (ip?: string) => acquireChatPermit(request(ip), env, fetcher),
      async seed(key: string, value: number, seconds = 3600) {
        ownedKeys.add(key)
        await redis(['SET', key, value, 'EX', seconds])
      },
      async cleanup() { if (ownedKeys.size) await redis(['DEL', ...ownedKeys]) },
    }
  }

  await t.test('simultaneous requests reserve at most four leases and denied calls consume no quota', async () => {
    const f = fixture()
    try {
      const results = await Promise.allSettled(Array.from({ length: 12 }, () => f.acquire()))
      const admitted = results.filter((result) => result.status === 'fulfilled')
      const denied = results.filter((result) => result.status === 'rejected')
      assert.equal(admitted.length, CHAT_PROTECTION_LIMITS.concurrent)
      assert.equal(denied.length, 8)
      for (const result of denied) assert.ok(result.reason instanceof ChatProtectionError && result.reason.status === 429)
      assert.equal(await redis(['ZCARD', leasesKey]), 4)
      assert.equal(Number(await redis(['GET', globalKey])), 4)
      assert.equal(Number(await redis(['GET', f.keysFor().minute])), 4)
      await Promise.all(admitted.map((result) => result.value.release()))
      assert.equal(await redis(['ZCARD', leasesKey]), 0)
      assert.equal(Number(await redis(['GET', globalKey])), 4, 'release must never refund attempted paid requests')
    } finally { await f.cleanup() }
  })

  await t.test('per-IP minute limits survive release and have a bounded TTL', async () => {
    const f = fixture()
    try {
      for (let index = 0; index < CHAT_PROTECTION_LIMITS.perMinute; index++) await (await f.acquire()).release()
      await assert.rejects(f.acquire(), (error: unknown) => error instanceof ChatProtectionError && error.status === 429 && error.retryAfter <= 60)
      assert.equal(Number(await redis(['GET', f.keysFor().minute])), 6)
      const ttl = Number(await redis(['TTL', f.keysFor().minute]))
      assert.ok(ttl > 0 && ttl <= 60)
      await (await f.acquire('203.0.113.2')).release()
      assert.equal(Number(await redis(['GET', globalKey])), 7, 'a different IP has an independent minute quota')
    } finally { await f.cleanup() }
  })

  await t.test('daily visitor quota denies further calls even after the minute window resets', async () => {
    const f = fixture()
    try {
      await f.seed(f.keysFor().day, CHAT_PROTECTION_LIMITS.perDay - 1)
      await (await f.acquire()).release()
      await redis(['DEL', f.keysFor().minute])
      await assert.rejects(f.acquire(), (error: unknown) => error instanceof ChatProtectionError && error.status === 429)
      assert.equal(Number(await redis(['GET', f.keysFor().day])), 30)
      assert.equal(Number(await redis(['GET', globalKey])), 1)
    } finally { await f.cleanup() }
  })

  await t.test('global daily quota stops a new client and does not refund a released lease', async () => {
    const f = fixture()
    try {
      await f.seed(globalKey, CHAT_PROTECTION_LIMITS.globalPerDay - 1)
      await (await f.acquire()).release()
      await assert.rejects(f.acquire('203.0.113.2'), (error: unknown) => error instanceof ChatProtectionError && error.status === 429)
      assert.equal(Number(await redis(['GET', globalKey])), 100)
      assert.equal(await redis(['EXISTS', f.keysFor('203.0.113.2').minute]), 0, 'denied admission must not increment other counters')
    } finally { await f.cleanup() }
  })

  await t.test('expired leases are pruned while an active lease remains protected', async () => {
    const f = fixture()
    try {
      const active = await f.acquire()
      await redis(['ZADD', leasesKey, 1, 'expired-a', 1, 'expired-b', 1, 'expired-c', 1, 'expired-d'])
      const next = await f.acquire('203.0.113.2')
      assert.equal(await redis(['ZCARD', leasesKey]), 2)
      assert.equal(await redis(['ZSCORE', leasesKey, 'expired-a']), null)
      const leaseTtl = Number(await redis(['PTTL', leasesKey]))
      assert.ok(leaseTtl > CHAT_PROTECTION_LIMITS.generationTimeoutMs && leaseTtl <= CHAT_PROTECTION_LIMITS.leaseMs)
      await next.release()
      assert.equal(await redis(['ZCARD', leasesKey]), 1, 'releasing one request cannot delete another request’s lease')
      await active.release()
    } finally { await f.cleanup() }
  })

  await t.test('counter expiration permits recovery without resetting the daily budget', async () => {
    const f = fixture()
    try {
      await f.seed(f.keysFor().minute, CHAT_PROTECTION_LIMITS.perMinute)
      await assert.rejects(f.acquire(), (error: unknown) => error instanceof ChatProtectionError && error.status === 429)
      await redis(['PEXPIRE', f.keysFor().minute, 10])
      await new Promise((resolve) => setTimeout(resolve, 25))
      await (await f.acquire()).release()
      assert.equal(Number(await redis(['GET', f.keysFor().minute])), 1)
      for (const key of [f.keysFor().day, globalKey]) {
        assert.equal(Number(await redis(['GET', key])), 1)
        const ttl = Number(await redis(['TTL', key]))
        assert.ok(ttl > 86390 && ttl <= 86400)
      }
    } finally { await f.cleanup() }
  })

  assert.equal(await redis(['EXISTS', globalKey, leasesKey]), 0, 'integration fixture state must be removed')
})
