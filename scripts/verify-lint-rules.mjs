import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
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

// ESLint's file traversal and config matching use the modern Minimatch API.
// Verify ordinary include/exclude behavior after the dependency update.
const fixture = mkdtempSync(join(tmpdir(), 'portfolio-lint-globs-'))
try {
  mkdirSync(join(fixture, 'src/nested'), { recursive: true })
  for (const file of ['src/included.js', 'src/nested/included.jsx', 'src/ignored-fixture.js', 'src/excluded.ts']) {
    writeFileSync(join(fixture, file), 'debugger;\n')
  }
  const globEslint = new ESLint({
    cwd: fixture,
    overrideConfigFile: true,
    overrideConfig: [
      { ignores: ['src/ignored-*.js'] },
      { files: ['src/**/*.{js,jsx}'], rules: { 'no-debugger': 'error' } },
    ],
  })
  const globResults = await globEslint.lintFiles(['src/**/*.{js,jsx}'])
  assert.deepEqual(
    globResults.map(result => relative(fixture, result.filePath).replaceAll('\\', '/')).sort(),
    ['src/included.js', 'src/nested/included.jsx'],
    'Lint traversal must include matching files and honor excluded files',
  )
  for (const result of globResults) {
    assert.deepEqual(result.messages.map(message => message.ruleId), ['no-debugger'])
  }
} finally {
  rmSync(fixture, { recursive: true, force: true })
}

// Exercise observable lint diagnostics across the plugin glob API migration.
const legacyEslint = new ESLint({
  overrideConfig: {
    rules: {
      'react/jsx-pascal-case': ['error', { ignore: ['LEGACY_*'] }],
      'jsx-a11y/label-has-associated-control': ['error', {
        labelComponents: ['FieldLabel'], controlComponents: ['Control*'], assert: 'nesting', depth: 3,
      }],
    },
  },
})
const legacyResults = await legacyEslint.lintText(
  `export default function CompatibilityFixture() {
  return <>
    <LEGACY_WIDGET /><BAD_WIDGET /><GoodWidget />
    <FieldLabel>Name <ControlInput /></FieldLabel>
    <FieldLabel>Email <span><ControlEmail /></span></FieldLabel>
    <label>City <input /></label>
    <FieldLabel>Summary <DisplayInput /></FieldLabel>
    <FieldLabel>Missing control</FieldLabel>
  </>
}`,
  { filePath: 'src/lint-legacy-glob-check.tsx' },
)
const legacyMessages = legacyResults.flatMap(result => result.messages)
assert.equal(legacyResults.some(result => result.fatalErrorCount > 0), false)
const reactMessages = legacyMessages.filter(message => message.ruleId === 'react/jsx-pascal-case')
assert.equal(reactMessages.length, 1, 'The ignored component glob must remain effective')
assert.match(reactMessages[0].message, /BAD_WIDGET/)
const labelMessages = legacyMessages.filter(message => message.ruleId === 'jsx-a11y/label-has-associated-control')
assert.deepEqual(labelMessages.map(message => message.line), [7, 8], 'Only labels without a matching nested control should be reported')

const importFixture = mkdtempSync(join(tmpdir(), 'portfolio-lint-imports-'))
try {
  const writeFixture = (file, text = 'export {};\n') => {
    const path = join(importFixture, file)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, text)
  }
  writeFixture('package.json', JSON.stringify({ name: 'portfolio-lint-fixture', version: '1.0.0', private: true }))
  mkdirSync(join(importFixture, 'pages'))
  for (const file of [
    'src/consumer.js', 'src/shared/allowed.js', 'src/shared/private.js',
    'src/feature/public/index.js', 'src/feature/private/index.js',
    'src/client/entry.js', 'src/outside/entry.js',
    'src/server/public/config.js', 'src/server/private/config.js',
  ]) writeFixture(file)
  for (const name of ['fixture-package', '@fixture/components']) {
    writeFixture(`node_modules/${name}/package.json`, JSON.stringify({ name, version: '1.0.0', main: 'index.js' }))
    for (const file of ['index.js', 'public/button.js', 'private/internal.js']) writeFixture(`node_modules/${name}/${file}`)
  }

  const fixturePath = importFixture.replaceAll('\\', '/')
  const importLinter = (rules) => new ESLint({
    cwd: importFixture,
    overrideConfigFile: fileURLToPath(new URL('../eslint.config.mjs', import.meta.url)),
    overrideConfig: {
      settings: { 'import/resolver': { node: { extensions: ['.js'] } } },
      rules: { 'import/no-unresolved': 'error', ...rules },
    },
  })
  const ruleMessages = async (linter, source, file, rule) => {
    const lintResults = await linter.lintText(source, { filePath: join(importFixture, file) })
    assert.equal(lintResults.length, 1)
    assert.equal(lintResults[0].fatalErrorCount, 0)
    const messages = lintResults[0].messages
    assert.deepEqual(messages.filter(message => message.ruleId === 'import/no-unresolved'), [], 'Fixture imports must resolve so allow checks cannot silently skip them')
    return messages.filter(message => message.ruleId === rule)
  }
  const imports = [
    'fixture-package', '@fixture/components',
    'fixture-package/public/button', 'fixture-package/private/internal',
    '@fixture/components/public/button', '@fixture/components/private/internal',
    './shared/allowed.js', './shared/private.js',
    './feature/public/index.js', './feature/private/index.js',
  ]
  const importSource = imports.map(name => `import '${name}'`).join('\n')
  const deniedImports = [imports[3], imports[5], imports[7], imports[9]]
  for (const options of [
    { allow: ['fixture-package/public/**', '@fixture/components/public/**', `${fixturePath}/src/shared/allowed.js`, 'feature/public/**'] },
    { forbid: ['fixture-package/private/**', '@fixture/components/private/**', `${fixturePath}/src/shared/private.js`, 'feature/private/**'] },
  ]) {
    const messages = await ruleMessages(
      importLinter({ 'import/no-internal-modules': ['error', options] }), importSource, 'src/consumer.js', 'import/no-internal-modules',
    )
    assert.deepEqual(messages.map(message => message.message), deniedImports.map(name => `Reaching to "${name}" is not allowed.`),
      'Import boundaries must preserve package roots, scoped packages, relative globs, and resolved absolute paths')
  }

  const restrictedLinter = importLinter({
    'import/no-restricted-paths': ['error', {
      basePath: importFixture,
      zones: [{ target: './src/client/**/*.js', from: './src/server/**/*.js', except: ['**/server/public/**/*.js'] }],
    }],
  })
  const restrictedSource = "import '../server/private/config.js'\nimport '../server/public/config.js'\nimport '../shared/allowed.js'\n"
  const restrictedMessages = await ruleMessages(restrictedLinter, restrictedSource, 'src/client/entry.js', 'import/no-restricted-paths')
  assert.equal(restrictedMessages.length, 1, 'A matching zone must reject private server imports while preserving its public exception')
  assert.match(restrictedMessages[0].message, /\.\.\/server\/private\/config\.js/)
  assert.deepEqual(await ruleMessages(restrictedLinter, restrictedSource, 'src/outside/entry.js', 'import/no-restricted-paths'), [],
    'The same imports outside the target glob must remain permitted')
} finally {
  rmSync(importFixture, { recursive: true, force: true })
}

console.log('Lint file globs, import boundaries, component ignores, and accessible label/control globs remain compatible.')
