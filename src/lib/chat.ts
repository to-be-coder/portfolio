import type { UIMessage } from 'ai'

export type ChatMessageMetadata = {
  createdAt: number
  durationMs?: number
  finishReason?: string
  model?: string
  totalTokens?: number
}

export type PortfolioChatMessage = UIMessage<ChatMessageMetadata>

export const CHAT_LIMITS = {
  maxInputCharacters: 4000,
  maxMessages: 40,
  maxRequestCharacters: 50000,
} as const
