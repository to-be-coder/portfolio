'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BorderBeam } from '../magicui/border-beam'
import { Textarea } from '../ui/textarea'

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const handleInputFocus = () => {
    // Scroll the HomeHeroSection to y=0 when input is focused
    const homeHeroSection = document.querySelector('[data-home-hero-section]')
    if (homeHeroSection) {
      // Add some top spacing to avoid header overlap
      const headerHeight = 80 // Adjust this value based on your header height
      const elementTop = homeHeroSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementTop - headerHeight - 20 // 20px additional spacing

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && status === 'ready') {
      sendMessage({ text: input })
      setInput('')
    }
  }

  return (
    <div className="flex flex-col py-4 stretch bg-gray-50/60 px-4 rounded-3xl border border-gray-200 justify-between h-[70vh] w-full max-w-7xl mx-auto">
      {messages.length === 0 ? (
        <div className="w-full mx-auto">
          <div className="relative flex h-[50vh] mx-auto">
            {/* Background Video */}
            <video className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full object-cover -z-10 rounded-lg" src="/videos/background.mp4" autoPlay muted loop playsInline />

            {/* Optional Overlay */}
            {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" /> */}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-15 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-center text-black/70 px-2">
                Jessica Cheng
                <br />a <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-bold">product designer </span>
                who <span className="bg-gradient-to-r from-sky-400 to-blue-600  bg-clip-text text-transparent font-bold">codes</span>
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto overflow-y-auto flex-1 max-w-3xl" ref={messagesEndRef}>
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              {message.role === 'user' ? (
                <div className="flex justify-end w-full">
                  <div className="bg-gray-800 border border-gray-200 rounded-lg p-3 sm:p-4 w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%]">
                    <div className="text-white text-sm sm:text-base">{message.parts.map((part, index) => (part.type === 'text' ? <span key={index}>{part.text}</span> : null))}</div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <div className="text-sm sm:text-base">{message.parts.map((part, index) => (part.type === 'text' ? <span key={index}>{part.text}</span> : null))}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="relative flex items-center gap-2 mt-2 bg-white border border-gray-200 rounded-2xl p-3 flex-col w-full max-w-3xl mx-auto ">
        {messages.length === 0 && <BorderBeam duration={4} size={100} className="from-transparent via-secondary to-transparent" />}
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              formRef.current?.requestSubmit()
            }
          }}
          onFocus={handleInputFocus}
          disabled={status !== 'ready'}
          placeholder="Ask me about Jessica..."
          className="flex-1 w-full"
        />
        <div className="absolute right-2 bottom-2">
          <button
            type="submit"
            disabled={status !== 'ready'}
            className="h-8 w-8 rounded-full bg-primary p-2 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Send"
          >
            <ArrowUp />
          </button>
        </div>
      </form>
    </div>
  )
}
