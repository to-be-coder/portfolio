'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
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
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} disabled={status !== 'ready'} placeholder="Say something..." />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </div>
  )
}
