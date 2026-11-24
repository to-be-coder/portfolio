/// <reference types="bun" />
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { test } from 'bun:test'

const run = promisify(execFile)

// The old validator expanded every schema alternative for every malformed
// part. Bound the real installed SDK with an external deadline and heap cap,
// and retain a valid-message compatibility control. No network calls occur.
test('installed AI SDK bounds malformed UI-message validation', async () => {
  const script = String.raw`
    import assert from 'node:assert/strict'
    import { safeValidateUIMessages } from 'ai'
    const valid = [{ id: 'valid', role: 'user', parts: [{ type: 'text', text: 'Portfolio question.' }] }]
    assert.equal((await safeValidateUIMessages({ messages: valid })).success, true)
    const messages = [{ id: 'invalid', role: 'user', parts: Array.from({ length: 4000 }, () => ({ type: 'invalid' })) }]
    assert.ok(JSON.stringify(messages).length < 128 * 1024)
    assert.equal((await safeValidateUIMessages({ messages })).success, false)
    process.stdout.write('passed')
  `
  const { stdout } = await run('node', ['--max-old-space-size=128', '--input-type=module', '--eval', script], {
    encoding: 'utf8',
    timeout: 5000,
    killSignal: 'SIGKILL',
    maxBuffer: 64 * 1024,
  })
  assert.equal(stdout, 'passed')
}, 10000)

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
    api = runInNewContext(module[0] + '\n;({marked, Marked, Lexer: _Lexer, Tokenizer: _Tokenizer, Parser: _Parser, hints: portfolioMarkdownCloserHintStacks})',
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
  const { marked, Marked, Lexer, Tokenizer, Parser } = api

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
  } else if (fixture === 'closerless-runs') {
    // A closer cache alone still leaves the outer lexer consuming one
    // character per greedy opener scan. Exercise whole runs and runs after
    // ordinary text; Marked 15 already batches tildes in inlineText.
    for (const delimiter of ['*', '_', '~']) {
      const input = delimiter.repeat(60000) + 'x'
      assert.equal(marked.parseInline(input), input)
      assert.equal(marked.parseInline('a' + input), 'a' + input)
      assert.equal(marked.parseInline('a ' + input), 'a ' + input)
      assert.equal(marked.parseInline('<code>' + input + '</code>'), '<code>' + input + '</code>')
    }
    assert.equal(marked.parseInline('**normal** _emphasis_ ~~deleted~~'),
      '<strong>normal</strong> <em>emphasis</em> <del>deleted</del>')
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
  } else if (fixture === 'email-scan') {
    // Released c6b22e8 consumes the simple local-part prefix in one pass.
    const input = 'a'.repeat(100000) + '@'
    assert.equal(marked.parse(input), '<p>' + input + '</p>\n')
    for (const source of ['person@example.com', 'first.last+tag@example.com']) {
      assert.equal(marked.parseInline(source), '<a href="mailto:' + source + '">' + source + '</a>')
    }
    assert.equal(marked.parseInline('plain@'), 'plain@')
    assert.equal(marked.parseInline('**bold** plain@ _emphasis_'),
      '<strong>bold</strong> plain@ <em>emphasis</em>')
  } else if (fixture === 'adjacent-links') {
    // The public grammar must stop at the first link. Older rules consume the
    // whole suffix before the tokenizer trims it, causing repeated rescans.
    // Keep this semantic control alongside the bounded full-parser workload.
    assert.equal(Lexer.rules.inline.gfm.link.exec('[a](b)[next](c)')?.[0], '[a](b)')
    const count = 40000
    assert.equal(marked.parse('[a](b)'.repeat(count)),
      '<p>' + '<a href="b">a</a>'.repeat(count) + '</p>\n')
    for (const [input, expected] of [
      ['[read](/about "Details")', '<a href="/about" title="Details">read</a>'],
      ['[empty]()', '<a href="">empty</a>'],
      ['[empty](<> "Title")', '<a href="" title="Title">empty</a>'],
      ['[space](<a b>)', '<a href="a%20b">space</a>'],
      ['[nested](a(b(c(d))))', '<a href="a(b(c(d)))">nested</a>'],
      ['[escaped](a\\(b\\))', '<a href="a(b)">escaped</a>'],
      ['[read](a\u00a0b)', '<a href="a%C2%A0b">read</a>'],
    ]) assert.equal(marked.parseInline(input), expected)
    const custom = new Marked({ tokenizer: {
      link(src) {
        if (src.startsWith('[custom](x)')) return { type: 'text', raw: '[custom](x)', text: 'custom' }
        return false
      },
    } })
    assert.equal(custom.parseInline('[custom](x)[read](b)'), 'custom<a href="b">read</a>')
  } else if (fixture === 'renderer-inheritance') {
    // Direct parser options can bypass the null-prototype registration path.
    // Only explicitly owned renderer entries may run in either public API.
    for (const method of ['parse', 'parseInline']) {
      for (const [name, renderers] of [
        ['toString', {}],
        ['inherited', Object.create({ inherited: () => 'inherited renderer ran' })],
      ]) {
        const parser = new Parser({ extensions: { renderers } })
        assert.throws(() => parser[method]([{ type: name, raw: '' }]),
          new RegExp('Token with "' + name + '" type was not found'))
      }
      const renderers = Object.create({ inherited: () => 'inherited renderer ran' })
      renderers.owned = () => 'owned renderer'
      const parser = new Parser({ extensions: { renderers } })
      assert.equal(parser[method]([{ type: 'owned', raw: '' }]), 'owned renderer')
    }
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

    if (target !== 'streamdown-marked') {
      // Raw HTML text must keep its escaped flag when delimiter text merges
      // with following inlineText; otherwise '&' becomes '&amp;'.
      for (const tag of ['code', 'pre', 'script', 'kbd']) {
        for (const delimiter of ['*', '_', '~']) {
          const input = '<' + tag + '>' + delimiter.repeat(3) + 'a & b</' + tag + '>'
          assert.equal(marked.parseInline(input), input)
          const tokens = new Lexer({ gfm: true }).inlineTokens(input)
          assert.equal(tokens.find(token => token.type === 'text')?.escaped, true)
        }
      }
      // Preserve old previous-character, backtick and email dispatch at the
      // end of the run; literal batching must not become a syntax change.
      for (const [input, expected] of [
        ['&_*[* ', '&amp;_<em>[</em> '],
        ['~\x60a\x60', '~\x60a\x60'],
        ['***\x60a\x60', '***<code>a</code>'],
        ['___\x60a\x60', '___<code>a</code>'],
        ['***a@example.com', '***<a href="mailto:a@example.com">a@example.com</a>'],
        ['___a@example.com', '<a href="mailto:___a@example.com">___a@example.com</a>'],
      ]) assert.equal(marked.parseInline(input), expected)
      if (target.startsWith('gridland-')) {
        // Original inlineText retains the earlier text token's escape flag.
        const input = '<code>~)\x60]\\*\x60_<*_[* ~< **~*]>(>])(</code>'
        assert.equal(marked.parseInline(input, { gfm: false }),
          '<code>~)<code>]\\*</code><em><*</em>[* ~&lt; **~*]&gt;(&gt;])(</code>')
      }

      // The older API permits custom tokenizers to consume otherwise-literal
      // runs. The local fast path must defer to every custom dispatch point.
      for (const [method, prefix] of [['emStrong', '***'], ['del', '~~~'], ['codespan', '***'], ['br', '***'], ['autolink', '***'], ['url', '***'], ['inlineText', '***']]) {
        const custom = new Marked({ tokenizer: {
          [method](src) {
            if (src.startsWith(prefix)) return { type: 'text', raw: prefix, text: 'custom' }
            return false
          },
        } })
        assert.equal(custom.parseInline(prefix + 'x'), 'customx')
      }
      const suffix = new Marked({ extensions: [{
        name: 'runSuffix', level: 'inline',
        start(src) { return src.indexOf('*x') },
        tokenizer(src) {
          if (src.startsWith('*x')) return { type: 'runSuffix', raw: '*x' }
        },
        renderer() { return '<span>suffix</span>' },
      }] })
      assert.equal(suffix.parseInline('***x'), '**<span>suffix</span>')
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
  for (const fixture of ['unmatched-delimiters', 'unmatched-strikethrough', 'closerless-runs', 'pedantic-html', 'extensions-and-nesting', 'email-scan', 'adjacent-links', 'renderer-inheritance']) {
    test('installed ' + target + ' handles ' + fixture, async () => {
      const { stdout } = await run('node', ['--max-old-space-size=256', '--input-type=module', '--eval', parserRegressionScript, target, fixture], {
        encoding: 'utf8',
        timeout: 5000,
        killSignal: 'SIGKILL',
        maxBuffer: 64 * 1024,
      })
      assert.equal(stdout, 'passed')
    }, 10000)
  }
}


// Empty global matches previously never advanced; Unicode-aware expressions
// must advance by a whole code point. Keep the fixture tiny and enforce the
// deadline from the parent process so a synchronous loop can be stopped.
test('installed Markdown find-and-replace terminates empty matches without splitting Unicode', async () => {
  const script = String.raw`
    import assert from 'node:assert/strict'
    import { findAndReplace } from 'mdast-util-find-and-replace'

    const tree = value => ({
      type: 'root',
      children: [{ type: 'paragraph', children: [{ type: 'text', value }] }],
    })
    const text = root => root.children[0].children.map(node => node.value).join('')

    const empty = tree('ab')
    findAndReplace(empty, [/(?:)/g, ''])
    assert.equal(text(empty), 'ab')

    for (const flags of ['gu', 'gv']) {
      for (const replacement of ['|', false]) {
        const root = tree('A😀B')
        const positions = []
        findAndReplace(root, [new RegExp('(?:)', flags), (match, info) => {
          assert.equal(match, '')
          positions.push(info.index)
          return replacement
        }])
        assert.deepEqual(positions, [0, 1, 3, 4])
        assert.equal(text(root), replacement === false ? 'A😀B' : '|A|😀|B|')
      }
    }

    const ordinary = tree('Read portfolio and portfolio.')
    findAndReplace(ordinary, [/portfolio/g, 'work'])
    assert.equal(text(ordinary), 'Read work and work.')

    const once = tree('ab')
    findAndReplace(once, [/(?:)/, '|'])
    assert.equal(text(once), '|ab')
    process.stdout.write('passed')
  `
  const { stdout } = await run('node', ['--max-old-space-size=128', '--input-type=module', '--eval', script], {
    encoding: 'utf8',
    timeout: 5000,
    killSignal: 'SIGKILL',
    maxBuffer: 64 * 1024,
  })
  assert.equal(stdout, 'passed')
}, 10000)

