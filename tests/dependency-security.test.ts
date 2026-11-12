/// <reference types="bun" />
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { test } from 'bun:test'

const run = promisify(execFile)

// Run the installed parsers in Node, with an external deadline: a synchronous
// RegExp stall cannot be interrupted by a timer in the parser's own process.
// The upstream regression is fixed in Marked 18.1.0 (commit 0d20220); the older
// Marked and bundled Gridland copies receive the same two-whitespace-gap fix.
const regressionScript = String.raw`
  import assert from 'node:assert/strict'
  import { readFileSync } from 'node:fs'
  import { createRequire } from 'node:module'
  import { dirname, join } from 'node:path'
  import { pathToFileURL } from 'node:url'
  import { runInNewContext } from 'node:vm'

  const require = createRequire(join(process.cwd(), 'package.json'))
  const target = process.argv[1]
  const adversarial = '[](' + '\u00a0'.repeat(50000)

  function regexLiteral(text) {
    assert.ok(text.startsWith('/') && text.endsWith('/'), 'Expected an unflagged RegExp literal')
    return new RegExp(text.slice(1, -1)).source
  }

  function bundledLinkRule(source) {
    // Extract only the two declarations that construct the actual bundled
    // rule. Parse their RegExp literals as data; never evaluate the UI bundle
    // or execute JavaScript taken from these declarations.
    const lines = source.split('\n')
    const labels = lines.filter((line) => line.startsWith('var _inlineLabel = '))
    const links = lines.filter((line) => line.startsWith('var link = edit('))
    assert.equal(labels.length, 1, 'Expected one bundled inline label rule')
    assert.equal(links.length, 1, 'Expected one bundled inline link rule')
    assert.ok(labels[0].endsWith(';'))
    assert.ok(links[0].endsWith(').getRegex();'))
    const label = regexLiteral(labels[0].slice('var _inlineLabel = '.length, -1))
    const expression = links[0].slice('var link = edit('.length, -').getRegex();'.length)
    const components = expression.split(').replace("label", _inlineLabel).replace("href", ')
    assert.equal(components.length, 2, 'Bundled link construction changed')
    const replacements = components[1].split(').replace("title", ')
    assert.equal(replacements.length, 2, 'Bundled link replacement order changed')
    return new RegExp(regexLiteral(components[0])
      .replace('label', label)
      .replace('href', regexLiteral(replacements[0]))
      .replace('title', regexLiteral(replacements[1])))
  }

  if (target.startsWith('gridland-')) {
    const packageDirectory = dirname(require.resolve('@gridland/web/package.json'))
    const filename = target === 'gridland-index' ? 'index.js' : 'next.js'
    const link = bundledLinkRule(readFileSync(join(packageDirectory, 'dist', filename), 'utf8'))
    const ordinary = '[Read more](/about "About")'
    const match = link.exec(ordinary)
    assert.ok(match)
    assert.deepEqual(Array.from(match).slice(0, 4), [ordinary, 'Read more', '/about', '"About"'])
    assert.equal(link.exec('[read](a\u00a0b)')?.[2], 'a\u00a0b')
    assert.equal(link.exec(adversarial), null)
  } else {
    let marked
    if (target === 'marked-17-umd') {
      const packageDirectory = dirname(require.resolve('marked/package.json'))
      const module = { exports: {} }
      runInNewContext(readFileSync(join(packageDirectory, 'lib', 'marked.umd.js'), 'utf8'),
        { module, exports: module.exports }, { timeout: 1000 })
      marked = module.exports.marked
    } else {
      // Resolve from Streamdown's installed entry to exercise its own Marked
      // dependency, rather than accidentally testing the root 17.x copy twice.
      const resolver = target === 'streamdown-marked'
        ? createRequire(import.meta.resolve('streamdown'))
        : require
      marked = (await import(pathToFileURL(resolver.resolve('marked')).href)).marked
    }
    assert.equal(typeof marked?.parse, 'function')
    const ordinary = '# Portfolio\n\n**Design** and \x60code\x60. [Read more](/about "About")\n'
    assert.equal(marked.parse(ordinary),
      '<h1>Portfolio</h1>\n<p><strong>Design</strong> and <code>code</code>. <a href="/about" title="About">Read more</a></p>\n')
    assert.equal(marked.parse('[read](a\u00a0b)'), '<p><a href="a%C2%A0b">read</a></p>\n')
    assert.equal(marked.parse(adversarial), '<p>' + adversarial + '</p>\n')
  }
  process.stdout.write('passed')
`

for (const target of ['marked-17-esm', 'marked-17-umd', 'streamdown-marked', 'gridland-index', 'gridland-next']) {
  test('installed ' + target + ' preserves Markdown and bounds Unicode-whitespace parsing', async () => {
    const { stdout } = await run('node', ['--input-type=module', '--eval', regressionScript, target], {
      encoding: 'utf8',
      timeout: 5000,
      killSignal: 'SIGKILL',
      maxBuffer: 64 * 1024,
    })
    assert.equal(stdout, 'passed')
  }, 10000)
}

