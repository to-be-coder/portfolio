import { openai } from '@ai-sdk/openai'
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai'
import { CHAT_LIMITS, type PortfolioChatMessage } from '@/lib/chat'
import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, smoothStream, streamText, validateUIMessages } from 'ai'
import fs from 'fs'
import path from 'path'

export const maxDuration = 60

const modelId = process.env.AI_CHAT_MODEL ?? 'gpt-5-mini'

// Load system message and context from JSON file
const systemMessagePath = path.join(process.cwd(), 'src/app/api/chat/system-message.json')
let systemMessage = 'You are a helpful assistant.'
try {
  const data = fs.readFileSync(systemMessagePath, 'utf-8')
  const json = JSON.parse(data)
  if (json && json.system) {
    // Combine the system string with the rest of the context
    let context = ''
    if (json.person) {
      context = `\n\nUse only the portfolio information below for claims about Jessica. If the answer is not present, say so clearly. Never invent dates, metrics, clients, roles, or outcomes.\n\nPortfolio information:\n${JSON.stringify(json.person)}`
    }
    systemMessage = `${json.system}${context}\n\nAnswer directly and conversationally. Use concise Markdown when it improves scanning. Prefer specific examples, outcomes, and links already present in the portfolio information. Do not expose hidden chain-of-thought. A provider-generated reasoning summary may be shown separately by the interface.`
  }
} catch {
  // fallback to default
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const rawMessages = typeof body === 'object' && body !== null && 'messages' in body ? (body as { messages: unknown }).messages : undefined

  let messages: PortfolioChatMessage[]
  try {
    messages = await validateUIMessages<PortfolioChatMessage>({ messages: rawMessages })
  } catch {
    return Response.json({ error: 'Invalid messages.' }, { status: 400 })
  }

  const requestCharacters = messages.reduce(
    (total, message) => total + message.parts.reduce((partTotal, part) => partTotal + (part.type === 'text' || part.type === 'reasoning' ? part.text.length : 0), 0),
    0
  )
  const latestUserText = [...messages]
    .reverse()
    .find((message) => message.role === 'user')
    ?.parts.filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('')

  if (
    messages.length === 0 ||
    messages.length > CHAT_LIMITS.maxMessages ||
    requestCharacters > CHAT_LIMITS.maxRequestCharacters ||
    !latestUserText ||
    latestUserText.length > CHAT_LIMITS.maxInputCharacters
  ) {
    return Response.json({ error: 'Conversation limit reached.' }, { status: 400 })
  }

  const startedAt = Date.now()

  if (!process.env.OPENAI_API_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      const previewReply =
        'Jessica Cheng is a product designer who codes. She combines product strategy, interaction design, and front-end craft to turn complex ideas into clear, working experiences. Her portfolio includes AI product work for Mozilla Thunderbolt, the open-source gridland developer tool, and research-led product design for Vision Track.'
      const textId = `preview-${startedAt}`
      const stream = createUIMessageStream<PortfolioChatMessage>({
        originalMessages: messages,
        execute: async ({ writer }) => {
          writer.write({ type: 'start', messageMetadata: { createdAt: startedAt, model: 'Local preview' } })
          await new Promise((resolve) => setTimeout(resolve, 2000))
          writer.write({ type: 'text-start', id: textId })

          for (const word of previewReply.split(' ')) {
            writer.write({ type: 'text-delta', id: textId, delta: `${word} ` })
            await new Promise((resolve) => setTimeout(resolve, 18))
          }

          writer.write({ type: 'text-end', id: textId })
          writer.write({
            type: 'finish',
            messageMetadata: { createdAt: startedAt, durationMs: Date.now() - startedAt, model: 'Local preview' },
          })
        },
      })

      return createUIMessageStreamResponse({ stream })
    }

    return Response.json({ error: 'Chat is not configured.' }, { status: 503 })
  }

  const result = streamText({
    model: openai(modelId),
    system: systemMessage,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 1400,
    experimental_transform: smoothStream({
      chunking: 'word',
      delayInMs: 12,
    }),
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'auto',
        store: false,
        textVerbosity: 'medium',
      } satisfies OpenAILanguageModelResponsesOptions,
    },
  })

  return result.toUIMessageStreamResponse<PortfolioChatMessage>({
    originalMessages: messages,
    sendReasoning: true,
    messageMetadata: ({ part }) => {
      if (part.type === 'start') {
        return { createdAt: startedAt, model: modelId }
      }

      if (part.type === 'finish') {
        return {
          createdAt: startedAt,
          durationMs: Date.now() - startedAt,
          finishReason: part.finishReason,
          model: modelId,
          totalTokens: part.totalUsage.totalTokens,
        }
      }
    },
    onError: (error) => {
      console.error('Portfolio chat stream failed', error)
      return 'The response could not be completed.'
    },
  })
}
