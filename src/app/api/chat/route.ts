import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import fs from 'fs'
import path from 'path'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

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
      context = `\n\nDon't hallucinate. Here is some information about Jessica Cheng and her work: ${JSON.stringify(json.person)}`
    }
    systemMessage = json.system + context
  }
} catch {
  // fallback to default
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: openai('gpt-4o'),
    system: systemMessage,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
