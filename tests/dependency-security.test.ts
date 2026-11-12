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


// These cases exercise the complete installed parser, including the parser
// embedded inside Gridland. Only its self-contained Marked module is evaluated;
// the surrounding React/rendering bundle and its imports are never executed.
const parserRegressionScript = String.raw`
  import assert from 'node:assert/strict'
  import { readFileSync } from 'node:fs'
  import { createRequire } from 'node:module'
  import { dirname, join } from 'node:path'
  import { pathToFileURL } from 'node:url'
  import { runInNewContext } from 'node:vm'

  const require = createRequire(join(process.cwd(), 'package.json'))
  const [target, fixture] = process.argv.slice(1)
  let api
  if (target.startsWith('gridland-')) {
    const directory = dirname(require.resolve('@gridland/web/package.json'))
    const filename = target === 'gridland-index' ? 'index.js' : 'next.js'
    const source = readFileSync(join(directory, 'dist', filename), 'utf8')
    const start = '// ../../node_modules/.bun/marked@15.0.12/node_modules/marked/lib/marked.esm.js\n'
    const end = '\n// ../core/src/renderables/markdown-parser.ts'
    assert.equal(source.split(start).length, 2, 'Expected one embedded Marked module')
    const module = source.split(start)[1].split(end)
    assert.equal(module.length, 2, 'Embedded Marked boundary changed')
    api = runInNewContext(module[0] + '\n;({marked, Marked, Lexer: _Lexer, Tokenizer: _Tokenizer, hints: portfolioMarkdownCloserHintStacks})',
      { console }, { timeout: 1000 })
  } else if (target === 'marked-17-umd') {
    const directory = dirname(require.resolve('marked/package.json'))
    const module = { exports: {} }
    runInNewContext(readFileSync(join(directory, 'lib', 'marked.umd.js'), 'utf8'),
      { module, exports: module.exports }, { timeout: 1000 })
    api = module.exports
  } else {
    const resolver = target === 'streamdown-marked' ? createRequire(import.meta.resolve('streamdown')) : require
    api = await import(pathToFileURL(resolver.resolve('marked')).href)
  }
  const { marked, Marked, Lexer, Tokenizer } = api

  if (fixture === 'unmatched-delimiters' || fixture === 'unmatched-strikethrough') {
    // Much larger than the upstream 2,000-repeat fixture so the old quadratic
    // parser also exceeds the deadline on fast machines. No relative timings.
    const count = 40000
    const cases = [
      ['- *', '<ul>\n<li>' + '*- '.repeat(count - 1) + '*</li>\n</ul>\n'],
      ['+ _', '<ul>\n<li>' + '_+ '.repeat(count - 1) + '_</li>\n</ul>\n'],
      ['*x *x ', '<p>' + '*x *x '.repeat(count) + '</p>\n'],
      ['~x ~x ', '<p>' + '~x ~x '.repeat(count) + '</p>\n'],
    ]
    const selected = fixture === 'unmatched-strikethrough' ? cases.slice(3) : cases.slice(0, 3)
    for (const [unit, expected] of selected) assert.equal(marked.parse(unit.repeat(count)), expected)
  } else if (fixture === 'pedantic-html') {
    const spaces = ' '.repeat(100000)
    for (const [prefix, expected] of [
      ['<test>a</test>', '<p><test>a</test> b</p>\n'],
      ['<!-->', '<!--> b\n'],
      ['<test/>', '<p><test/> b</p>\n'],
    ]) {
      const result = marked.parse(prefix + spaces + 'b', { pedantic: true, gfm: false })
      assert.equal(result.replace(/ +/g, ' ').trimEnd(), expected.trimEnd())
    }
    assert.equal(marked.parse('*ordinary*', { pedantic: true, gfm: false }), '<p><em>ordinary</em></p>\n')
  } else {
    assert.equal(fixture, 'extensions-and-nesting')
    for (const [input, expected] of [
      ['**a*b*c', target === 'streamdown-marked' ? '<p>**a<em>b</em>c</p>\n' : '<p>*<em>a</em>b*c</p>\n'],
      ['*foo**bar*', '<p><em>foo**bar</em></p>\n'],
      ['*foo *bar*', '<p>*foo <em>bar</em></p>\n'],
      ['~~around \x60code\x60~~', '<p><del>around <code>code</code></del></p>\n'],
      ['~~around [link](/about)~~', '<p><del>around <a href="/about">link</a></del></p>\n'],
    ]) assert.equal(marked.parse(input), expected)


    if (target.startsWith('gridland-')) {
      // Marked 15 deliberately permits escaped whitespace at the end of a
      // strikethrough body. Its raw-source guard must preserve that behavior.
      for (const [input, expected] of [
        ['~a\\ ~', '<p><del>a\\ </del></p>\n'],
        ['~~a\\ ~~', '<p><del>a\\ </del></p>\n'],
        ['~a\\~b~', '<p><del>a~b</del></p>\n'],
        ['~~[a~](u)~~', '<p><del><a href="u">a~</a></del></p>\n'],
        ['~~\x60a~\x60~~', '<p><del><code>a~</code></del></p>\n'],
      ]) assert.equal(marked.parse(input), expected)
    }

    for (const level of ['block', 'inline']) {
      for (const name of ['constructor', 'toString', '__proto__', 'custom']) {
        const seen = []
        const parser = new Marked({
          extensions: [{
            name, level,
            tokenizer(src) { return { type: name, raw: src, tokens: [{ type: 'text', raw: 'child', text: 'child' }] } },
            renderer(token) { return this.parser.parseInline(token.tokens) },
          }],
          walkTokens(token) { seen.push(token.type) },
        })
        assert.equal(level === 'block' ? parser.parse('example') : parser.parseInline('example'), 'child')
        assert.deepEqual(seen, [name, 'text'])
        if (name !== 'custom') {
          const fallback = new Marked({ extensions: [{
            name, level, tokenizer(src) { return { type: name, raw: src } }, renderer() { return false },
          }] })
          assert.equal(level === 'block' ? fallback.parse('example') : fallback.parseInline('example'), '')
        }
      }
    }
    const previous = new Marked({ extensions: [{
      name: '__proto__', level: 'block', tokenizer(src) { return { type: '__proto__', raw: src } }, renderer() { return 'previous' },
    }] })
    previous.use({ extensions: [{ name: '__proto__', renderer: () => false }] })
    assert.equal(previous.parse('example'), 'previous')

    const nested = new Marked({ extensions: [{
      name: 'nested', level: 'inline', start(src) { return src.indexOf('{{nest}}') },
      tokenizer(src) {
        if (src.startsWith('{{nest}}')) return { type: 'nested', raw: '{{nest}}', tokens: this.lexer.inlineTokens('**inside**') }
      },
      renderer(token) { return '<span>' + this.parser.parseInline(token.tokens) + '</span>' },
    }] })
    assert.equal(nested.parseInline('**before** {{nest}} _after_'), '<strong>before</strong> <span><strong>inside</strong></span> <em>after</em>')

    // Reuse the same tokenizer after an inline pass throws. Gridland exposes
    // the private hint map only inside this isolated test context so cleanup
    // can also be checked directly, without adding a production API.
    const tokenizer = new Tokenizer()
    const lexer = new Lexer({ gfm: true, tokenizer })
    const original = tokenizer.emStrong
    tokenizer.emStrong = () => { throw new Error('fixture exception') }
    assert.throws(() => lexer.inlineTokens('*bad*'), /fixture exception/)
    if (api.hints) assert.equal(api.hints.has(tokenizer), false)
    tokenizer.emStrong = original
    assert.equal(lexer.inlineTokens('**good**')[0].type, 'strong')
    if (api.hints) assert.equal(api.hints.has(tokenizer), false)
  }
  process.stdout.write('passed')
`

for (const target of ['marked-17-esm', 'marked-17-umd', 'streamdown-marked', 'gridland-index', 'gridland-next']) {
  for (const fixture of ['unmatched-delimiters', 'unmatched-strikethrough', 'pedantic-html', 'extensions-and-nesting']) {
    test('installed ' + target + ' handles ' + fixture, async () => {
      const { stdout } = await run('node', ['--input-type=module', '--eval', parserRegressionScript, target, fixture], {
        encoding: 'utf8',
        timeout: 5000,
        killSignal: 'SIGKILL',
        maxBuffer: 64 * 1024,
      })
      assert.equal(stdout, 'passed')
    }, 10000)
  }
}

