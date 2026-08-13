'use client'

import { CHAT_LIMITS, PORTFOLIO_PROCESS_PROMPT, type PortfolioChatMessage } from '@/lib/chat'
import { useChat } from '@ai-sdk/react'
import { code } from '@streamdown/code'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  LoaderCircle,
  MessageSquarePlus,
  RotateCcw,
  Sparkles,
  Square,
} from 'lucide-react'
import { DefaultChatTransport } from 'ai'
import { FormEvent, KeyboardEvent, type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Streamdown } from 'streamdown'

const CHAT_STORAGE_KEY = 'jessica-portfolio-chat-v2'
const chatTransport = new DefaultChatTransport({ api: '/api/chat' })
const streamdownPlugins = { code }

const starterPrompts = [
  {
    eyebrow: 'Process',
    prompt: PORTFOLIO_PROCESS_PROMPT,
  },
  {
    eyebrow: 'Featured work',
    prompt: 'What did Jessica contribute to Mozilla Thunderbolt?',
  },
  {
    eyebrow: 'Design + code',
    prompt: 'How does Jessica bridge product design and front-end engineering?',
  },
  {
    eyebrow: 'Quick intro',
    prompt: 'Give me a 30-second overview of Jessica and her strongest work.',
  },
]

function isStoredChat(value: unknown): value is PortfolioChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length <= CHAT_LIMITS.maxMessages &&
    value.every(
      (message) =>
        typeof message === 'object' &&
        message !== null &&
        'id' in message &&
        typeof message.id === 'string' &&
        'role' in message &&
        (message.role === 'user' || message.role === 'assistant') &&
        'parts' in message &&
        Array.isArray(message.parts)
    )
  )
}

function messageText(message: PortfolioChatMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
}

function sourceHostname(url: string) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.hostname : 'Source'
  } catch {
    return 'Source'
  }
}

const thinkingCubeCoordinates = [-1, 0, 1] as const
const thinkingCubeAxes = ['x', 'y', 'z'] as const
const thinkingCubieFaces = ['front', 'back', 'right', 'left', 'top', 'bottom'] as const
const thinkingCubeIdentity = [1, 0, 0, 0, 1, 0, 0, 0, 1] as const

type ThinkingCubeCoordinate = (typeof thinkingCubeCoordinates)[number]
type ThinkingCubeAxis = (typeof thinkingCubeAxes)[number]
type ThinkingCubeMatrix = [number, number, number, number, number, number, number, number, number]

type ThinkingCubeTurn = {
  axis: ThinkingCubeAxis
  direction: -1 | 1
  id: number
  layer: ThinkingCubeCoordinate
}

type ThinkingCubie = {
  id: string
  orientation: ThinkingCubeMatrix
  x: ThinkingCubeCoordinate
  y: ThinkingCubeCoordinate
  z: ThinkingCubeCoordinate
}

function createThinkingCubies() {
  const cubies: ThinkingCubie[] = []

  for (const x of thinkingCubeCoordinates) {
    for (const y of thinkingCubeCoordinates) {
      for (const z of thinkingCubeCoordinates) {
        cubies.push({
          id: `${x}-${y}-${z}`,
          orientation: [...thinkingCubeIdentity],
          x,
          y,
          z,
        })
      }
    }
  }

  return cubies
}

const initialThinkingCubies = createThinkingCubies()

function thinkingCubeRotation(axis: ThinkingCubeAxis, direction: -1 | 1): ThinkingCubeMatrix {
  if (axis === 'x') return [1, 0, 0, 0, 0, -direction, 0, direction, 0]
  if (axis === 'y') return [0, 0, direction, 0, 1, 0, -direction, 0, 0]
  return [0, -direction, 0, direction, 0, 0, 0, 0, 1]
}

function multiplyThinkingCubeMatrices(left: ThinkingCubeMatrix, right: ThinkingCubeMatrix): ThinkingCubeMatrix {
  const result = Array.from({ length: 9 }, () => 0) as ThinkingCubeMatrix

  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      result[row * 3 + column] =
        left[row * 3] * right[column] +
        left[row * 3 + 1] * right[column + 3] +
        left[row * 3 + 2] * right[column + 6]
    }
  }

  return result
}

function commitThinkingCubeTurn(cubies: ThinkingCubie[], turn: ThinkingCubeTurn) {
  const rotation = thinkingCubeRotation(turn.axis, turn.direction)

  return cubies.map((cubie) => {
    if (cubie[turn.axis] !== turn.layer) return cubie

    const x = rotation[0] * cubie.x + rotation[1] * cubie.y + rotation[2] * cubie.z
    const y = rotation[3] * cubie.x + rotation[4] * cubie.y + rotation[5] * cubie.z
    const z = rotation[6] * cubie.x + rotation[7] * cubie.y + rotation[8] * cubie.z

    return {
      ...cubie,
      orientation: multiplyThinkingCubeMatrices(rotation, cubie.orientation),
      x: x as ThinkingCubeCoordinate,
      y: y as ThinkingCubeCoordinate,
      z: z as ThinkingCubeCoordinate,
    }
  })
}

function thinkingCubeMatrixCss(matrix: ThinkingCubeMatrix) {
  return `matrix3d(${matrix[0]}, ${matrix[3]}, ${matrix[6]}, 0, ${matrix[1]}, ${matrix[4]}, ${matrix[7]}, 0, ${matrix[2]}, ${matrix[5]}, ${matrix[8]}, 0, 0, 0, 0, 1)`
}

function ThinkingIndicator({ label = 'Thinking' }: { label?: string }) {
  const reduceMotion = useReducedMotion()
  const [cubies, setCubies] = useState<ThinkingCubie[]>(initialThinkingCubies)
  const [turn, setTurn] = useState<ThinkingCubeTurn | null>(null)
  const committedTurnRef = useRef(0)
  const previousTurnRef = useRef<ThinkingCubeTurn | null>(null)
  const turnIdRef = useRef(0)

  const chooseTurn = useCallback(() => {
    let nextTurn: ThinkingCubeTurn
    let attempts = 0

    do {
      nextTurn = {
        axis: thinkingCubeAxes[Math.floor(Math.random() * thinkingCubeAxes.length)],
        direction: Math.random() > 0.5 ? 1 : -1,
        id: ++turnIdRef.current,
        layer: thinkingCubeCoordinates[Math.floor(Math.random() * thinkingCubeCoordinates.length)],
      }
      attempts += 1
    } while (
      attempts < 6 &&
      previousTurnRef.current?.axis === nextTurn.axis &&
      previousTurnRef.current.layer === nextTurn.layer &&
      previousTurnRef.current.direction === -nextTurn.direction
    )

    setTurn(nextTurn)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      const resetTimer = window.setTimeout(() => {
        setTurn(null)
        setCubies(initialThinkingCubies)
      }, 0)
      return () => window.clearTimeout(resetTimer)
    }
    if (turn) return

    const nextTurnTimer = window.setTimeout(chooseTurn, 140)
    return () => window.clearTimeout(nextTurnTimer)
  }, [chooseTurn, reduceMotion, turn])

  const finishTurn = useCallback((completedTurn: ThinkingCubeTurn) => {
    if (committedTurnRef.current >= completedTurn.id) return

    committedTurnRef.current = completedTurn.id
    previousTurnRef.current = completedTurn
    setCubies((currentCubies) => commitThinkingCubeTurn(currentCubies, completedTurn))
    setTurn((currentTurn) => (currentTurn?.id === completedTurn.id ? null : currentTurn))
  }, [])

  const activeAxis = turn?.axis ?? 'y'

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500" role="status">
      <span className="chat-thinking-cube-scene shrink-0" aria-hidden="true">
        <span className="chat-thinking-cube">
          {thinkingCubeCoordinates.map((layer) => {
            const isTurning = turn?.layer === layer
            const sliceCubies = cubies.filter((cubie) => cubie[activeAxis] === layer)
            const sliceStyle = isTurning
              ? ({ '--chat-cube-turn': `${turn.direction * 90}deg` } as CSSProperties)
              : undefined

            return (
              <span
                key={`${activeAxis}-${layer}-${isTurning ? turn?.id : 'idle'}`}
                className={`chat-thinking-cube-slice ${isTurning ? `chat-thinking-cube-slice--turn-${activeAxis}` : ''}`}
                onAnimationEnd={isTurning && turn ? () => finishTurn(turn) : undefined}
                style={sliceStyle}
              >
                {sliceCubies.map(({ id, orientation, x, y, z }) => (
                  <span
                    key={id}
                    className="chat-thinking-cubie"
                    style={{ transform: `translate3d(${x * 5.6}px, ${y * 5.6}px, ${z * 5.6}px) ${thinkingCubeMatrixCss(orientation)}` }}
                  >
                    {thinkingCubieFaces.map((face) => (
                      <span key={face} className={`chat-thinking-cubie-face chat-thinking-cubie-face--${face}`} />
                    ))}
                  </span>
                ))}
              </span>
            )
          })}
        </span>
      </span>
      <span className="chat-thinking-label">{label}</span>
    </div>
  )
}

function ReasoningSummary({ text, streaming }: { text: string; streaming: boolean }) {
  const [userOpen, setUserOpen] = useState(false)
  const open = streaming || userOpen

  return (
    <div className="mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80">
      <button
        type="button"
        onClick={() => setUserOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {streaming ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" /> : <Sparkles className="h-4 w-4" />}
          {streaming ? 'Thinking' : 'Reasoning summary'}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="chat-reasoning border-t border-gray-200 px-4 py-3 text-sm leading-6 text-gray-600">
            <Streamdown animated isAnimating={streaming} mode={streaming ? 'streaming' : 'static'} plugins={streamdownPlugins}>
              {text}
            </Streamdown>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatMessage({
  message,
  isLatest,
  status,
}: {
  message: PortfolioChatMessage
  isLatest: boolean
  status: 'submitted' | 'streaming' | 'ready' | 'error'
}) {
  const reduceMotion = useReducedMotion()
  const isUser = message.role === 'user'
  const isStreaming = isLatest && status === 'streaming'
  const text = messageText(message)
  const reasoning = message.parts
    .filter((part) => part.type === 'reasoning')
    .map((part) => part.text)
    .join('\n')
  const sources = message.parts.filter((part) => part.type === 'source-url' || part.type === 'source-document')

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
      className={`group flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={isUser ? 'max-w-[88%] sm:max-w-[76%]' : 'min-w-0 flex-1'}>
        {isUser ? (
          <div className="rounded-3xl rounded-br-lg bg-gray-900 px-4 py-3 text-[15px] leading-6 text-white shadow-sm">
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        ) : (
          <div>
            {reasoning && <ReasoningSummary text={reasoning} streaming={isStreaming} />}
            {text && (
              <div className="chat-response text-[15px] leading-7 text-gray-800">
                <Streamdown
                  animated={!reduceMotion}
                  isAnimating={isStreaming}
                  mode={isStreaming ? 'streaming' : 'static'}
                  plugins={streamdownPlugins}
                  lineNumbers={false}
                >
                  {text}
                </Streamdown>
              </div>
            )}
            {sources.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Sources">
                {sources.map((source, index) =>
                  source.type === 'source-url' ? (
                    <a
                      key={`${source.sourceId}-${index}`}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
                    >
                      {source.title ?? sourceHostname(source.url)}
                    </a>
                  ) : (
                    <span key={`${source.sourceId}-${index}`} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
                      {source.title ?? 'Portfolio source'}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </motion.article>
  )
}

export default function Chat() {
  const reduceMotion = useReducedMotion()
  const { messages, sendMessage, setMessages, status, error, stop, regenerate, clearError } = useChat<PortfolioChatMessage>({
    transport: chatTransport,
    throttle: 30,
  })
  const [input, setInput] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const busy = status === 'submitted' || status === 'streaming'
  const remainingCharacters = CHAT_LIMITS.maxInputCharacters - input.length

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CHAT_STORAGE_KEY)
      if (stored) {
        const parsed: unknown = JSON.parse(stored)
        if (isStoredChat(parsed)) {
          const isPreviewConversation = parsed.some((message) => message.metadata?.model === 'Local preview')
          if (isPreviewConversation) window.localStorage.removeItem(CHAT_STORAGE_KEY)
          else setMessages(parsed)
        }
      }
    } catch {
      window.localStorage.removeItem(CHAT_STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [setMessages])

  useEffect(() => {
    if (!hydrated) return
    try {
      if (messages.length === 0) window.localStorage.removeItem(CHAT_STORAGE_KEY)
      else window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-CHAT_LIMITS.maxMessages)))
    } catch {
      // Chat remains usable when storage is unavailable.
    }
  }, [hydrated, messages])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }, [input])

  const updateScrollState = useCallback(() => {
    const viewport = scrollRef.current
    if (!viewport) return
    const distance = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
    setShowScrollButton(distance > 24)
  }, [])

  const scrollToBottom = useCallback(() => {
    const viewport = scrollRef.current
    if (!viewport) return
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
    setShowScrollButton(false)
  }, [reduceMotion])

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateScrollState)
    return () => window.cancelAnimationFrame(frame)
  }, [messages, status, updateScrollState])

  useEffect(() => {
    const content = scrollContentRef.current
    if (!content) return

    const observer = new ResizeObserver(updateScrollState)
    observer.observe(content)
    return () => observer.disconnect()
  }, [messages.length, updateScrollState])

  const submitText = useCallback(
    async (text: string) => {
      const cleaned = text.trim()
      if (!cleaned || busy || cleaned.length > CHAT_LIMITS.maxInputCharacters) return
      clearError()
      setInput('')
      await sendMessage({
        text: cleaned,
        metadata: { createdAt: Date.now() },
      })
    },
    [busy, clearError, sendMessage]
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submitText(input)
  }

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape' && busy) {
      event.preventDefault()
      stop()
      return
    }
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void submitText(input)
    }
  }

  const startNewChat = useCallback(() => {
    if (busy) stop()
    clearError()
    setMessages([])
    setInput('')
    setShowScrollButton(false)
    try {
      window.localStorage.removeItem(CHAT_STORAGE_KEY)
    } catch {
      // Clearing the visible chat still works when storage is unavailable.
    }
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    window.requestAnimationFrame(() => textareaRef.current?.focus())
  }, [busy, clearError, setMessages, stop])

  return (
    <section
      data-home-hero-section
      className="relative flex h-[calc(100svh-6rem)] min-h-[600px] max-h-[900px] w-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)]"
      aria-label="Chat with Jessica's portfolio assistant"
    >
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-end bg-gradient-to-b from-white via-white/90 to-transparent p-3 pb-8 sm:p-4 sm:pb-10"
          >
            <button
              type="button"
              onClick={startNewChat}
              className="pointer-events-auto inline-flex h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              aria-label="Start a new chat and clear this conversation"
              title="Start a new chat"
            >
              <MessageSquarePlus className="h-4 w-4" />
              New chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="chat-scrollbar relative flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none]"
      >
        {messages.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-4 py-8 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative aspect-video w-full max-w-3xl overflow-hidden bg-white">
                <video
                  className="absolute -inset-1 block h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] max-w-none border-0 bg-white object-cover outline-none"
                  src="/videos/background.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            </div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="relative z-10 flex w-full flex-col items-center justify-center px-2"
            >
              <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-black/70 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Jessica Cheng
                <br />a{' '}
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text font-bold text-transparent">product designer </span>
                who <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text font-bold text-transparent">codes</span>
              </h1>
            </motion.div>
          </div>
        ) : (
          <div ref={scrollContentRef} className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pb-6 pt-20 sm:gap-6 sm:px-6 sm:pb-8 sm:pt-24">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                  status={status}
                />
              ))}
            </AnimatePresence>
            {status === 'submitted' && (
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <ThinkingIndicator />
              </motion.div>
            )}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                <p className="font-medium">Jessica’s AI guide hit a snag.</p>
                <p className="mt-1 text-red-700">Your conversation is still here. Try the response again.</p>
                <button
                  type="button"
                  onClick={() => void regenerate()}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 font-medium shadow-sm ring-1 ring-red-200 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            )}
            <div className="h-2" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="relative z-10 shrink-0 bg-white/95 px-3 pb-3 pt-3 backdrop-blur-xl sm:px-5 sm:pb-4">
        <AnimatePresence>
          {showScrollButton && messages.length > 0 && (
            <motion.button
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              type="button"
              onClick={scrollToBottom}
              className="absolute -top-12 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Scroll to latest message"
              title="Jump to latest message"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <div
          className="mx-auto mb-2 flex w-full max-w-3xl gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Suggested questions"
        >
          {starterPrompts.map((item) => (
            <button
              key={item.prompt}
              type="button"
              onClick={() => void submitText(item.prompt)}
              disabled={busy}
              title={item.prompt}
              aria-label={item.prompt}
              className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-gray-200 bg-white px-3.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-950 hover:bg-gray-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-600"
            >
              {item.eyebrow}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-gray-200 bg-white p-2 shadow-[0_10px_35px_-15px_rgba(15,23,42,0.3)] transition-shadow focus-within:border-gray-300 focus-within:shadow-[0_12px_40px_-15px_rgba(14,165,233,0.28)]">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              placeholder="Ask about Jessica’s work..."
              rows={1}
              maxLength={CHAT_LIMITS.maxInputCharacters}
              aria-label="Message Jessica's portfolio assistant"
              className="max-h-40 min-h-11 w-full resize-none bg-transparent px-3 py-2.5 text-[15px] leading-6 text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={busy}
            />
            <div className="flex items-center justify-between gap-3 px-1 pb-1">
              <div className="flex min-w-0 items-center gap-2 pl-1 text-xs text-gray-400">
                {remainingCharacters <= 400 && <span className={remainingCharacters < 100 ? 'text-red-500' : ''}>{remainingCharacters}</span>}
              </div>
              {busy ? (
                <button
                  type="button"
                  onClick={stop}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 motion-reduce:hover:scale-100"
                  aria-label="Stop generating"
                  title="Stop (Esc)"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() || input.length > CHAT_LIMITS.maxInputCharacters}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:scale-100 motion-reduce:hover:scale-100"
                  aria-label="Send message"
                  title="Send (Enter)"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] leading-4 text-gray-400">AI can make mistakes. Check project pages for the source of truth.</p>
        </form>
      </div>
    </section>
  )
}
