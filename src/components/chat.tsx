'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { Input } from './ui/input'

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })
  const [input, setInput] = useState('')

  return (
    <div className="flex w-full flex-col py-4 stretch bg-gray-50/60 px-4 rounded-lg border border-gray-200 justify-between h-full min-h-[70vh]">
      <div className="w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="relative w-full h-[60vh] mx-auto">
            {/* Background Video */}
            <video className="absolute top-8 left-1/2 -translate-x-1/2 w-auto h-full object-cover -z-10" src="/videos/background.mp4" autoPlay muted loop playsInline />

            {/* Optional Overlay */}
            {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" /> */}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-15">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-tight text-center text-black/70">
                Jessica Cheng
                <br />a <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-bold">product designer </span>
                who <span className="bg-gradient-to-r from-sky-400 to-blue-600  bg-clip-text text-transparent font-bold">codes</span>
              </h1>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4">
              {message.role === 'user' ? (
                <div className="flex justify-end w-full">
                  <div className="bg-gray-800 border border-gray-200 rounded-lg p-4 w-[50%]">
                    <div className="text-white">{message.parts.map((part, index) => (part.type === 'text' ? <span key={index}>{part.text}</span> : null))}</div>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <div className="">{message.parts.map((part, index) => (part.type === 'text' ? <span key={index}>{part.text}</span> : null))}</div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) {
            sendMessage({ text: input })
            setInput('')
          }
        }}
        className="flex items-center gap-2 mt-2 bg-white border border-gray-200 rounded-lg p-4 flex-col w-3xl mx-auto"
      >
        <Input variant="chat" value={input} onChange={(e) => setInput(e.target.value)} disabled={status !== 'ready'} placeholder="Ask me about Jessica..." className="flex-1 w-full text-gray-800" />
        <div className="flex justify-end gap-2 w-full">
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
