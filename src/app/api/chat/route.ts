import { openai } from '@ai-sdk/openai'
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai'
import { PORTFOLIO_PROCESS_PROMPT, PORTFOLIO_PROCESS_RESPONSE, type PortfolioChatMessage } from '@/lib/chat'
import { ChatRequestError, parseChatMessages, readChatBody, validateChatHeaders } from '@/lib/server/chat-request'
import { acquireChatPermit, ChatProtectionError, createChatDeadline } from '@/lib/server/chat-protection'
import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, smoothStream, streamText } from 'ai'
import { after } from 'next/server'
import portfolioContext from './system-message.json'

export const maxDuration = 60
export const runtime = 'nodejs'

const modelId = process.env.AI_CHAT_MODEL ?? 'gpt-4.1-mini'
const systemMessage = `${portfolioContext.system}\n\nUse only the portfolio information below for claims about Jessica. If the answer is not present, say so clearly. Never invent dates, metrics, clients, roles, or outcomes.\n\nPortfolio information:\n${JSON.stringify(portfolioContext.person)}\n\nAnswer directly and conversationally. Use concise Markdown and links already present in the portfolio information. Do not expose hidden chain-of-thought.`
const responseHeaders = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }

function curatedAnswer(question: string): string | undefined {
  switch (question.trim()) {
    case PORTFOLIO_PROCESS_PROMPT:
      return PORTFOLIO_PROCESS_RESPONSE
    case 'What did Jessica contribute to Mozilla Thunderbolt?': {
      const skills = portfolioContext.person.projects.find((project) => project.url === '/thunderbolt')
      const exploration = portfolioContext.person.projects.find((project) => project.url === '/mozilla')
      return [skills?.summary, '[Read the Thunderbolt Skills case study](/thunderbolt).', exploration?.summary,
        '[Read the earlier Mozilla exploration](/mozilla).'].filter(Boolean).join('\n\n')
    }
    case 'How does Jessica bridge product design and front-end engineering?':
      return `${portfolioContext.person.frequent_questions.design_and_code}\n\n${portfolioContext.person.about.technical_practice}\n\n[Explore gridland](/gridland) or [learn more about Jessica](/about).`
    case 'Give me a 30-second overview of Jessica and her strongest work.':
      return `${portfolioContext.person.positioning.short}\n\nExplore [Thunderbolt Skills](/thunderbolt), [gridland](/gridland), and [Vision Track](/vision-track) for examples of her product design, developer tools, and research work.`
  }
}

function createStaticChatResponse(messages: PortfolioChatMessage[], reply: string, startedAt: number) {
  const model = 'Curated portfolio guide'
  const textId = `static-${startedAt}`
  const stream = createUIMessageStream<PortfolioChatMessage>({
    originalMessages: messages,
    execute: ({ writer }) => {
      writer.write({ type: 'start', messageMetadata: { createdAt: startedAt, model } })
      writer.write({ type: 'text-start', id: textId })
      // Curated answers have no paid call or artificial server delay. The UI
      // retains its rich text rendering without keeping a function open.
      writer.write({ type: 'text-delta', id: textId, delta: reply })
      writer.write({ type: 'text-end', id: textId })
      writer.write({ type: 'finish', messageMetadata: { createdAt: startedAt, durationMs: Date.now() - startedAt, model } })
    },
  })
  return createUIMessageStreamResponse({ stream, headers: responseHeaders })
}

export async function POST(req: Request) {
  let parsed: ReturnType<typeof parseChatMessages>
  try {
    validateChatHeaders(req)
    parsed = parseChatMessages(await readChatBody(req))
  } catch (error) {
    const status = error instanceof ChatRequestError ? error.status : 400
    return Response.json({ error: error instanceof ChatRequestError ? error.message : 'Invalid request.' }, { status, headers: responseHeaders })
  }

  const { messages, latestUserText } = parsed
  const startedAt = Date.now()
  const curated = curatedAnswer(latestUserText)
  if (curated) return createStaticChatResponse(messages, curated, startedAt)

  // Live generation is an explicit opt-in. A deployed API key alone never turns
  // on billable public access. All suggested prompts work without a provider.
  if (process.env.AI_CHAT_ENABLED !== 'true') {
    return createStaticChatResponse(messages,
      'I’m currently a curated portfolio guide, so I can help with the suggested questions about Jessica’s process, featured work, design and code, or a quick introduction.\n\nYou can also explore [Thunderbolt Skills](/thunderbolt), [gridland](/gridland), [Vision Track](/vision-track), or [contact Jessica](/contact).', startedAt)
  }

  let permit: Awaited<ReturnType<typeof acquireChatPermit>>
  try {
    if (!process.env.OPENAI_API_KEY || req.signal.aborted) throw new ChatProtectionError(503)
    permit = await acquireChatPermit(req)
  } catch (error) {
    const failure = error instanceof ChatProtectionError ? error : new ChatProtectionError(503)
    return Response.json({ error: failure.message }, {
      status: failure.status,
      headers: { ...responseHeaders, 'Retry-After': String(failure.retryAfter) },
    })
  }

  const deadline = createChatDeadline(req.signal)
  let cleanupPromise: Promise<void> | undefined
  const cleanup = () => {
    deadline.dispose()
    return cleanupPromise ??= permit.release()
  }
  try {
    // Vercel may reclaim a disconnected request immediately. Register retained
    // cleanup while its request context is active, and await the same release
    // even when an SDK callback has already started it.
    after(async () => { deadline.cancel(); await cleanup() })
    const result = streamText({
      model: openai(modelId),
      system: systemMessage,
      messages: await convertToModelMessages(messages),
      allowSystemInMessages: false,
      maxOutputTokens: 1400,
      maxRetries: 0,
      abortSignal: deadline.signal,
      // Defense in depth: this text-only endpoint must never fetch attachments.
      experimental_download: async (downloads) => {
        if (downloads.length > 0) throw new Error('Attachments are not supported.')
        return []
      },
      experimental_transform: smoothStream({ chunking: 'word', delayInMs: 12 }),
      providerOptions: { openai: { store: false } satisfies OpenAILanguageModelResponsesOptions },
      onEnd: cleanup,
      onAbort: cleanup,
      onError: async () => { deadline.cancel(); await cleanup() },
    })

    const response = result.toUIMessageStreamResponse<PortfolioChatMessage>({
      originalMessages: messages,
      headers: responseHeaders,
      sendReasoning: false,
      messageMetadata: ({ part }) => {
        if (part.type === 'start') return { createdAt: startedAt, model: modelId }
        if (part.type === 'finish') return {
          createdAt: startedAt, durationMs: Date.now() - startedAt, finishReason: part.finishReason,
          model: modelId, totalTokens: part.totalUsage.totalTokens,
        }
      },
      onError: () => 'The response could not be completed. Please try a suggested portfolio question.',
    })
    const reader = response.body!.getReader()
    return new Response(new ReadableStream<Uint8Array>({
      async pull(controller) {
        try {
          const { done, value } = await reader.read()
          if (done) { await cleanup(); controller.close() }
          else controller.enqueue(value)
        } catch {
          deadline.cancel()
          await cleanup()
          controller.error(new Error('The response could not be completed.'))
        }
      },
      async cancel(reason) {
        deadline.cancel()
        try { await reader.cancel(reason) } finally { await cleanup() }
      },
    }), { status: response.status, headers: response.headers })
  } catch {
    deadline.cancel()
    await cleanup()
    return Response.json({ error: 'Live chat is unavailable. Please try a suggested portfolio question.' }, { status: 503, headers: responseHeaders })
  }
}
