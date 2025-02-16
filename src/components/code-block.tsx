import Prism from 'prismjs'
import 'prismjs/components/prism-typescript' // Add TypeScript support
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-tomorrow.css' // You can choose a different theme
import { FC, useEffect } from 'react'

interface CodeBlockProps {
  code: string
  maxHeight?: string | number
  language?: string
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, maxHeight = 'none', language = 'typescript' }) => {
  // Highlight the code when component mounts
  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <div className="code-block w-full">
      <pre
        className="line-numbers relative rounded-md p-4 m-0 overflow-auto"
        style={{
          maxHeight: maxHeight,
          overflow: 'auto',
          margin: 0,
        }}
      >
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  )
}
