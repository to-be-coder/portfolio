import { CHAT_LIMITS, type PortfolioChatMessage } from './chat'

export const CHAT_STORAGE_KEY = 'jessica-portfolio-chat-v2'
export const CHAT_STORAGE_LIMITS = {
  maxSerializedCharacters: 384 * 1024,
  maxAssistantCharacters: 16000,
  maxParts: 8,
} as const

type ChatStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
type GetChatStorage = () => ChatStorage
const browserStorage: GetChatStorage = () => window.localStorage

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeStoredChat(value: unknown): PortfolioChatMessage[] | null {
  if (!Array.isArray(value) || value.length > CHAT_LIMITS.maxMessages) return null

  const messages: PortfolioChatMessage[] = []
  const ids = new Set<string>()
  let totalCharacters = 0
  for (const message of value) {
    if (!isRecord(message) || typeof message.id !== 'string' || !/^[A-Za-z0-9_-]{1,128}$/.test(message.id)
      || ids.has(message.id) || (message.role !== 'user' && message.role !== 'assistant')
      || !Array.isArray(message.parts) || message.parts.length > CHAT_STORAGE_LIMITS.maxParts) return null
    ids.add(message.id)
    if (isRecord(message.metadata) && message.metadata.model === 'Local preview') return null

    const textParts: string[] = []
    for (const part of message.parts) {
      if (!isRecord(part) || typeof part.type !== 'string') return null
      // Saved history needs only text. Never restore sources, tools, files,
      // provider metadata, or reasoning into the renderer or next request.
      if (part.type !== 'text') continue
      if (typeof part.text !== 'string') return null
      textParts.push(part.text)
    }
    const text = textParts.join('\n')
    const messageLimit = message.role === 'user' ? CHAT_LIMITS.maxInputCharacters : CHAT_STORAGE_LIMITS.maxAssistantCharacters
    if (text.length > messageLimit) return null
    // The SDK can temporarily emit an empty assistant while a reply starts.
    if (text.length === 0) {
      if (message.role === 'assistant') continue
      return null
    }
    totalCharacters += text.length
    if (totalCharacters > CHAT_LIMITS.maxRequestCharacters) return null
    messages.push({ id: message.id, role: message.role, parts: [{ type: 'text', text }] })
  }
  return messages
}

export function parseStoredChat(stored: string): PortfolioChatMessage[] | null {
  // Check before parsing; localStorage is untrusted persisted input. This cap
  // leaves room for JSON escaping of the bounded text and message envelopes.
  if (stored.length > CHAT_STORAGE_LIMITS.maxSerializedCharacters) return null
  try {
    return normalizeStoredChat(JSON.parse(stored) as unknown)
  } catch {
    return null
  }
}

export function readStoredChat(getStorage: GetChatStorage = browserStorage): PortfolioChatMessage[] {
  try {
    const storage = getStorage()
    const stored = storage.getItem(CHAT_STORAGE_KEY)
    if (stored === null) return []
    const messages = parseStoredChat(stored)
    if (messages === null) storage.removeItem(CHAT_STORAGE_KEY)
    return messages ?? []
  } catch {
    // Browsers may deny the localStorage property itself, reads, or removal.
    return []
  }
}

export function writeStoredChat(messages: readonly PortfolioChatMessage[], getStorage: GetChatStorage = browserStorage): void {
  try {
    const storage = getStorage()
    const normalized = normalizeStoredChat(messages.slice(-CHAT_LIMITS.maxMessages))
    if (!normalized?.length) {
      storage.removeItem(CHAT_STORAGE_KEY)
      return
    }
    const stored = JSON.stringify(normalized)
    if (stored.length > CHAT_STORAGE_LIMITS.maxSerializedCharacters) storage.removeItem(CHAT_STORAGE_KEY)
    else storage.setItem(CHAT_STORAGE_KEY, stored)
  } catch {
    // Storage denial or a full quota must not interrupt the visible chat.
  }
}

export function clearStoredChat(getStorage: GetChatStorage = browserStorage): void {
  try {
    getStorage().removeItem(CHAT_STORAGE_KEY)
  } catch {
    // Clearing the visible chat still works when storage is unavailable.
  }
}
