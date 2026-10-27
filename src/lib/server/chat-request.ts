import { CHAT_LIMITS, type PortfolioChatMessage } from '../chat'

export const MAX_CHAT_BODY_BYTES = 128 * 1024
const MAX_PARTS = 8
const MAX_ASSISTANT_CHARACTERS = 16000

export class ChatRequestError extends Error {
  constructor(message: string, public readonly status = 400) {
    super(message)
  }
}

export function validateChatHeaders(request: Request, env: NodeJS.ProcessEnv = process.env) {
  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    throw new ChatRequestError('Send a JSON request.', 415)
  }
  if (request.headers.has('content-encoding')) throw new ChatRequestError('Encoded requests are not supported.', 415)

  const origin = request.headers.get('origin')
  const allowedOrigins = env.CHAT_ALLOWED_ORIGINS?.split(',').map((value) => value.trim()).filter(Boolean)
    ?? ['https://jessicacheng.studio', 'https://www.jessicacheng.studio']
  if (env.NODE_ENV !== 'production') allowedOrigins.push(new URL(request.url).origin)

  // Next can reconstruct request.url using an internal listener hostname. The
  // HTTP Host represents the public destination; never trust forwarded-host.
  // The explicit origin allowlist remains mandatory even if Host is spoofed by
  // a non-browser caller. This is a browser control, not authentication.
  let originHost: string | undefined
  try { originHost = origin ? new URL(origin).host : undefined } catch { /* reject below */ }
  const destinationHost = request.headers.get('host') ?? new URL(request.url).host
  if (!origin || !allowedOrigins.includes(origin) || originHost !== destinationHost || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new ChatRequestError('This request must come from the portfolio.', 403)
  }
}

export async function readChatBody(request: Request, timeoutMs = 5000): Promise<unknown> {
  const contentLength = request.headers.get('content-length')
  if (contentLength !== null && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_CHAT_BODY_BYTES)) {
    throw new ChatRequestError('The conversation is too large.', 413)
  }
  if (!request.body) throw new ChatRequestError('A request body is required.')

  const reader = request.body.getReader()
  // Keep memory bounded even when the sender fragments the body into tiny
  // chunks. Retaining each chunk (or a deadline reaction per read) amplifies a
  // small request into many megabytes of live objects.
  const bytes = new Uint8Array(MAX_CHAT_BODY_BYTES)
  let timer: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new ChatRequestError('The request timed out.', 408)), timeoutMs)
  })
  const read = async () => {
    let size = 0
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      if (size + value.byteLength > MAX_CHAT_BODY_BYTES) throw new ChatRequestError('The conversation is too large.', 413)
      bytes.set(value, size)
      size += value.byteLength
    }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, size))) as unknown
  }
  try {
    return await Promise.race([read(), deadline])
  } catch (error) {
    void reader.cancel().catch(() => {})
    if (error instanceof ChatRequestError) throw error
    throw new ChatRequestError('Invalid request.')
  } finally {
    clearTimeout(timer)
    reader.releaseLock()
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function parseChatMessages(body: unknown): { messages: PortfolioChatMessage[]; latestUserText: string } {
  if (!isRecord(body) || !Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > CHAT_LIMITS.maxMessages) {
    throw new ChatRequestError('Conversation limit reached.')
  }

  let requestCharacters = 0
  const ids = new Set<string>()
  const messages = body.messages.map((message): PortfolioChatMessage => {
    if (!isRecord(message) || typeof message.id !== 'string' || !/^[A-Za-z0-9_-]{1,128}$/.test(message.id) || ids.has(message.id)
      || (message.role !== 'user' && message.role !== 'assistant') || !Array.isArray(message.parts)
      || message.parts.length === 0 || message.parts.length > MAX_PARTS) {
      throw new ChatRequestError('Invalid messages.')
    }
    ids.add(message.id)
    let messageCharacters = 0
    const parts = message.parts.map((part): { type: 'text'; text: string } => {
      if (!isRecord(part) || part.type !== 'text' || typeof part.text !== 'string') {
        throw new ChatRequestError('Only text messages are supported.')
      }
      messageCharacters += part.text.length
      // Construct new objects so provider metadata, custom roles, files, and tools
      // can never reach the model, even if callers add extra object properties.
      return { type: 'text', text: part.text }
    })
    requestCharacters += messageCharacters
    if (messageCharacters === 0 || messageCharacters > (message.role === 'user' ? CHAT_LIMITS.maxInputCharacters : MAX_ASSISTANT_CHARACTERS)
      || requestCharacters > CHAT_LIMITS.maxRequestCharacters) {
      throw new ChatRequestError('Conversation limit reached.')
    }
    return { id: message.id, role: message.role, parts }
  })
  const latestMessage = messages[messages.length - 1]
  const latestUserText = latestMessage.parts.map((part) => part.type === 'text' ? part.text : '').join('')
  if (latestMessage.role !== 'user' || !latestUserText.trim()) throw new ChatRequestError('A user question is required.')
  return { messages, latestUserText }
}
