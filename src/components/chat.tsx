'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          {message.role === 'user' ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="text-gray-700">{message.parts.map((part, index) => (part.type === 'text' ? <span key={index}>{part.text}</span> : null))}</div>
            </div>
          ) : (
            <div className="p-2">
              <div className="text-gray-700">{message.parts.map((part, index) => (part.type === 'text' ? <span key={index}>{part.text}</span> : null))}</div>
            </div>
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) {
            sendMessage({ text: input })
            setInput('')
          }
        }}
        className="flex items-center gap-2 mt-2 bg-white border border-gray-200 rounded-lg p-4 flex-col"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
          className="flex-1 w-full  px-4 py-2 text-gray-800 placeholder-gray-400  disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-end gap-2 w-full">
          <button
            type="submit"
            disabled={status !== 'ready'}
            className="ml-1 rounded-full bg-gray-800 p-2 text-white shadow-md hover:bg-gray-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-150"
            aria-label="Send"
          >
            <ArrowUp />
          </button>
        </div>
      </form>
    </div>
  )
}
