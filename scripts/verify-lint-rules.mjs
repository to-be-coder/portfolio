import assert from 'node:assert/strict'
import { ESLint } from 'eslint'

// Exercise the three legacy plugin families through the compatibility layer.
// This guards against a clean lint run caused by silently losing their rules.
const eslint = new ESLint()
const results = await eslint.lintText(
  `export default () => (
    <main>
      <img src="/portrait.png" />
      {[1, 2].map(value => <span>{value}</span>)}
    </main>
  )`,
  { filePath: 'src/lint-compatibility-check.tsx' },
)
const reportedRules = new Set(results.flatMap(result => result.messages.map(message => message.ruleId)))

for (const rule of [
  'react/jsx-key',
  'import/no-anonymous-default-export',
  'jsx-a11y/alt-text',
  '@next/next/no-img-element',
]) {
  assert.ok(reportedRules.has(rule), `Expected ${rule} to remain active`)
}

console.log('React, import, accessibility, and Next.js lint rules remain active.')
