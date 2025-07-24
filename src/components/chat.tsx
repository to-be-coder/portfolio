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
    <div className="flex flex-col w-full max-w-md py-4 mx-auto stretch bg-gray-50/60 px-4 rounded-lg border border-gray-200 justify-between h-full">
      <div>
        {messages.map((message) => (
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
        ))}
      </div>
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
