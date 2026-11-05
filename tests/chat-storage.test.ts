import assert from 'node:assert/strict'
import { test } from 'node:test'
import { CHAT_LIMITS, PORTFOLIO_PROCESS_RESPONSE, type PortfolioChatMessage } from '../src/lib/chat'
import { CHAT_STORAGE_KEY, CHAT_STORAGE_LIMITS, clearStoredChat, parseStoredChat, readStoredChat, writeStoredChat } from '../src/lib/chat-storage'

function message(text = 'Hello', id = 'user-1', role: 'user' | 'assistant' = 'user'): PortfolioChatMessage {
  return { id, role, parts: [{ type: 'text', text }] }
}

function memoryStorage(initial?: string) {
  const values = new Map<string, string>(initial === undefined ? [] : [[CHAT_STORAGE_KEY, initial]])
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
    removeItem: (key: string) => { values.delete(key) },
  }
}

test('round-trips ordinary text and the full curated process response', () => {
  const conversation = [message(), message(PORTFOLIO_PROCESS_RESPONSE, 'answer-1', 'assistant')]
  const storage = memoryStorage()
  writeStoredChat(conversation, () => storage)
  assert.deepEqual(readStoredChat(() => storage), conversation)
  assert.deepEqual(parseStoredChat(JSON.stringify(conversation)), conversation)
  clearStoredChat(() => storage)
  assert.equal(storage.getItem(CHAT_STORAGE_KEY), null)
})

test('restores fresh text objects without unsupported parts or metadata', () => {
  const stored = [{
    ...message('Read the portfolio', 'assistant-1', 'assistant'),
    metadata: { createdAt: {}, model: ['unexpected'], custom: 'discarded' },
    parts: [
      { type: 'step-start' },
      { type: 'text', text: 'Read the portfolio', providerMetadata: { custom: 'discarded' } },
      { type: 'source-url', sourceId: 'source-1', url: '/about', title: 'About' },
      { type: 'reasoning', text: 'Not part of saved public text' },
    ],
  }]
  assert.deepEqual(parseStoredChat(JSON.stringify(stored)), [message('Read the portfolio', 'assistant-1', 'assistant')])
})

test('rejects malformed JSON, null parts, non-text text values, invalid IDs and roles', () => {
  const invalid = [
    '{', 'null', '{}',
    JSON.stringify([null]),
    JSON.stringify([{ ...message(), parts: null }]),
    JSON.stringify([{ ...message(), parts: [null] }]),
    JSON.stringify([{ ...message(), parts: [{ type: 'text', text: {} }] }]),
    JSON.stringify([{ ...message(), parts: [{}] }]),
    JSON.stringify([{ ...message(), id: '' }]),
    JSON.stringify([{ ...message(), id: 'with spaces' }]),
    JSON.stringify([{ ...message(), id: 'a'.repeat(129) }]),
    JSON.stringify([{ ...message(), role: 'system' }]),
    JSON.stringify([message(), message()]),
    JSON.stringify([message('')]),
  ]
  for (const stored of invalid) {
    assert.equal(parseStoredChat(stored), null)
    const storage = memoryStorage(stored)
    assert.deepEqual(readStoredChat(() => storage), [])
    assert.equal(storage.getItem(CHAT_STORAGE_KEY), null)
  }
})

test('bounds serialized input before parsing and accepts the exact limit', () => {
  const stored = JSON.stringify([message()])
  const atLimit = stored.padEnd(CHAT_STORAGE_LIMITS.maxSerializedCharacters, ' ')
  assert.deepEqual(parseStoredChat(atLimit), [message()])
  assert.equal(parseStoredChat(`${atLimit} `), null)
})

test('enforces exact per-message, message-count, part-count, and total text limits', () => {
  const parse = (value: unknown) => parseStoredChat(JSON.stringify(value))
  for (const [role, limit] of [['user', CHAT_LIMITS.maxInputCharacters], ['assistant', CHAT_STORAGE_LIMITS.maxAssistantCharacters]] as const) {
    assert.notEqual(parse([message('a'.repeat(limit), role, role)]), null)
    assert.equal(parse([message('a'.repeat(limit + 1), role, role)]), null)
  }
  const fullCount = Array.from({ length: CHAT_LIMITS.maxMessages }, (_, index) => message('Hello', `user-${index}`))
  assert.notEqual(parse(fullCount), null)
  assert.equal(parse([...fullCount, message('Hello', 'extra')]), null)
  const parts = Array.from({ length: CHAT_STORAGE_LIMITS.maxParts }, () => ({ type: 'text', text: 'a' }))
  assert.deepEqual(parse([{ ...message(), parts }]), [message(parts.map((part) => part.text).join('\n'))])
  assert.equal(parse([{ ...message(), parts: [...parts, parts[0]] }]), null)
  const assistantHistory = Array.from({ length: 3 }, (_, index) => message('a'.repeat(16000), `assistant-${index}`, 'assistant'))
  assert.notEqual(parse([...assistantHistory, message('a'.repeat(2000))]), null)
  assert.equal(parse([...assistantHistory, message('a'.repeat(2001))]), null)
})

test('drops empty partial assistant replies and retains completed text', () => {
  const storage = memoryStorage()
  writeStoredChat([message(), { id: 'pending', role: 'assistant', parts: [] }], () => storage)
  assert.deepEqual(readStoredChat(() => storage), [message()])
  writeStoredChat([message(), message('', 'pending', 'assistant')], () => storage)
  assert.deepEqual(readStoredChat(() => storage), [message()])
})

test('writes only the most recent bounded history and clears legacy previews', () => {
  const storage = memoryStorage()
  const conversation = Array.from({ length: CHAT_LIMITS.maxMessages + 1 }, (_, index) => message('Hello', `user-${index}`))
  writeStoredChat(conversation, () => storage)
  assert.deepEqual(readStoredChat(() => storage), conversation.slice(1))
  const preview = [{ ...message(), metadata: { createdAt: 0, model: 'Local preview' } }]
  assert.equal(parseStoredChat(JSON.stringify(preview)), null)
  writeStoredChat([], () => storage)
  assert.equal(storage.getItem(CHAT_STORAGE_KEY), null)
})

test('storage property, get, remove, and write failures never escape', () => {
  const denied = () => { throw new Error('Storage unavailable') }
  assert.deepEqual(readStoredChat(denied), [])
  assert.doesNotThrow(() => writeStoredChat([message()], denied))
  assert.doesNotThrow(() => clearStoredChat(denied))

  const unavailable = { getItem: denied, setItem: denied, removeItem: denied }
  assert.deepEqual(readStoredChat(() => unavailable), [])
  assert.doesNotThrow(() => writeStoredChat([message()], () => unavailable))
  assert.doesNotThrow(() => writeStoredChat([], () => unavailable))
  assert.doesNotThrow(() => clearStoredChat(() => unavailable))

  const corruptAndUnremovable = { ...unavailable, getItem: () => '{' }
  assert.deepEqual(readStoredChat(() => corruptAndUnremovable), [])
})
