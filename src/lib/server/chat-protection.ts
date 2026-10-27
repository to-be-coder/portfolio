import { createHmac, randomUUID } from 'node:crypto'
import { isIP } from 'node:net'

export const CHAT_PROTECTION_LIMITS = {
  perMinute: 6,
  perDay: 30,
  globalPerDay: 100,
  concurrent: 4,
  generationTimeoutMs: 45000,
  leaseMs: 65000,
  redisTimeoutMs: 2000,
} as const

export class ChatProtectionError extends Error {
  constructor(public readonly status: 429 | 503, public readonly retryAfter = 60) {
    super(status === 429 ? 'Chat is busy. Please try again later.' : 'Live chat is unavailable. Try one of the suggested portfolio questions.')
  }
}

type ProtectionConfig = { url: string; token: string; clientKey: string }
export type ChatFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export function getChatProtectionConfig(request: Request, env: NodeJS.ProcessEnv = process.env): ProtectionConfig {
  const url = env.UPSTASH_REDIS_REST_URL
  const token = env.UPSTASH_REDIS_REST_TOKEN
  const secret = env.CHAT_RATE_LIMIT_SECRET
  // Only trust this header when the function actually runs on Vercel. Do not
  // copy this approach to a directly reachable server with client-set headers.
  const ip = env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.trim() : undefined
  if (!url || !token || !secret || secret.length < 32 || !ip || !isIP(ip)) throw new ChatProtectionError(503)
  let parsed: URL
  try { parsed = new URL(url) } catch { throw new ChatProtectionError(503) }
  if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.upstash.io') || parsed.username || parsed.password || parsed.port
    || parsed.search || parsed.hash || parsed.pathname !== '/') throw new ChatProtectionError(503)

  // Normalize IPv6 spelling and group its /64 so rotating privacy addresses
  // cannot trivially reset a visitor's quota. Never store raw IP addresses.
  let normalizedIp = ip
  if (isIP(ip) === 6) {
    try {
      const [head, tail] = new URL(`http://[${ip}]/`).hostname.slice(1, -1).split('::')
      const left = head ? head.split(':') : []
      const right = tail ? tail.split(':') : []
      const groups = [...left, ...Array<string>(8 - left.length - right.length).fill('0'), ...right].map((group) => parseInt(group, 16))
      normalizedIp = groups.slice(0, 5).every((group) => group === 0) && groups[5] === 65535
        ? `${groups[6] >> 8}.${groups[6] & 255}.${groups[7] >> 8}.${groups[7] & 255}`
        : `${groups.slice(0, 4).map((group) => group.toString(16)).join(':')}::/64`
    } catch { throw new ChatProtectionError(503) }
  }
  return { url: parsed.origin, token, clientKey: createHmac('sha256', secret).update(normalizedIp).digest('hex') }
}

// All keys share a Redis cluster slot. Admission, quotas and concurrency are one
// atomic transaction. Daily windows last 24 hours from the first accepted call.
export const CHAT_ADMISSION_SCRIPT = `
local clock = redis.call('TIME')
local now = tonumber(clock[1]) * 1000 + math.floor(tonumber(clock[2]) / 1000)
redis.call('ZREMRANGEBYSCORE', KEYS[4], '-inf', now)
for i = 1, 3 do
  if tonumber(redis.call('GET', KEYS[i]) or '0') >= tonumber(ARGV[i]) then
    return {0, math.max(redis.call('TTL', KEYS[i]), 1)}
  end
end
if redis.call('ZCARD', KEYS[4]) >= tonumber(ARGV[4]) then return {0, 5} end
for i = 1, 3 do
  local count = redis.call('INCR', KEYS[i])
  if count == 1 then redis.call('EXPIRE', KEYS[i], i == 1 and 60 or 86400) end
end
redis.call('ZADD', KEYS[4], now + tonumber(ARGV[5]), ARGV[6])
redis.call('PEXPIRE', KEYS[4], tonumber(ARGV[5]))
return {1, 0}
`

async function redisCommand(config: ProtectionConfig, command: (string | number)[], fetcher: ChatFetch): Promise<unknown> {
  try {
    const response = await fetcher(config.url, {
      method: 'POST',
      headers: { authorization: `Bearer ${config.token}`, 'content-type': 'application/json' },
      body: JSON.stringify(command),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(CHAT_PROTECTION_LIMITS.redisTimeoutMs),
    })
    if (!response.ok) throw new ChatProtectionError(503)
    const data: unknown = await response.json()
    if (typeof data !== 'object' || data === null || 'error' in data || !('result' in data)) throw new ChatProtectionError(503)
    return data.result
  } catch {
    // An unavailable limiter never opens access to a paid generation.
    throw new ChatProtectionError(503)
  }
}

export async function acquireChatPermit(request: Request, env: NodeJS.ProcessEnv = process.env, fetcher: ChatFetch = fetch) {
  const config = getChatProtectionConfig(request, env)
  const prefix = 'portfolio:{chat}'
  const leasesKey = `${prefix}:leases`
  const leaseId = randomUUID()
  const result = await redisCommand(config, ['EVAL', CHAT_ADMISSION_SCRIPT, 4,
    `${prefix}:minute:${config.clientKey}`, `${prefix}:day:${config.clientKey}`, `${prefix}:day:global`, leasesKey,
    CHAT_PROTECTION_LIMITS.perMinute, CHAT_PROTECTION_LIMITS.perDay, CHAT_PROTECTION_LIMITS.globalPerDay,
    CHAT_PROTECTION_LIMITS.concurrent, CHAT_PROTECTION_LIMITS.leaseMs, leaseId], fetcher)
  if (!Array.isArray(result) || result.length !== 2 || !Number.isInteger(result[0]) || !Number.isInteger(result[1])
    || (result[0] !== 0 && result[0] !== 1) || result[1] < 0) throw new ChatProtectionError(503)
  if (result[0] === 0) throw new ChatProtectionError(429, Math.min(Math.max(result[1], 1), 86400))

  let released = false
  return {
    async release() {
      if (released) return
      released = true
      try { await redisCommand(config, ['ZREM', leasesKey, leaseId], fetcher) } catch {
        // A failed release remains closed until the short lease expires. Quotas
        // are deliberately not refunded after attempted generations.
      }
    },
  }
}

export function createChatDeadline(requestSignal: AbortSignal, timeoutMs: number = CHAT_PROTECTION_LIMITS.generationTimeoutMs) {
  const controller = new AbortController()
  const onAbort = () => controller.abort(requestSignal.reason)
  if (requestSignal.aborted) onAbort()
  else requestSignal.addEventListener('abort', onAbort, { once: true })
  const timer = setTimeout(() => controller.abort(new DOMException('Chat timed out.', 'TimeoutError')), timeoutMs)
  return {
    signal: controller.signal,
    cancel: () => controller.abort(new DOMException('Chat cancelled.', 'AbortError')),
    dispose() { clearTimeout(timer); requestSignal.removeEventListener('abort', onAbort) },
  }
}
