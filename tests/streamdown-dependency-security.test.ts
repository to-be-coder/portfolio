/// <reference types="bun" />
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { test } from 'bun:test'

const run = promisify(execFile)

// Execute the installed packages in a separate Node process: a synchronous
// parser stall cannot be interrupted by a timer running in that same process.
async function verifyInstalledRenderer(script: string) {
  const { stdout } = await run('node', ['--max-old-space-size=256', '--input-type=module', '--eval', script], {
    encoding: 'utf8',
    timeout: 5000,
    killSignal: 'SIGKILL',
    maxBuffer: 64 * 1024,
  })
  assert.equal(stdout, 'passed')
}

const imports = String.raw`
  import assert from 'node:assert/strict'
  const load = async (name) => import(name)
`

// Streamdown 2.8.0 restores sanitizer ID prefixes without breaking fragments
// or doubling the prefixes already added by the Markdown footnote parser.
test('installed Streamdown prevents raw HTML ID clobbering and preserves links', async () => {
  await verifyInstalledRenderer(imports + String.raw`
    const React = (await load('react')).default
    const { renderToStaticMarkup } = await load('react-dom/server')
    const { Streamdown } = await load('streamdown')
    const markdown = [
      '<h1 id="portfolioClobberProbe">Details</h1>',
      '[Jump](#portfolioClobberProbe)',
      '[External](https://example.com/#portfolioClobberProbe)',
      'Note[^1].',
      '[^1]: Footnote.',
      '\`const value = 1\`',
      '**Bold**',
    ].join('\n\n')

    for (const mode of ['static', 'streaming']) {
      const html = renderToStaticMarkup(React.createElement(Streamdown, {
        mode,
        linkSafety: { enabled: false },
      }, markdown))
      const ids = new Set(Array.from(html.matchAll(/\bid="([^"]*)"/g), (match) => match[1]))
      const hrefs = Array.from(html.matchAll(/\bhref="([^"]*)"/g), (match) => match[1])
      assert.ok(ids.has('user-content-portfolioClobberProbe'), mode + ': raw HTML ID must be prefixed')
      assert.ok(!ids.has('portfolioClobberProbe'), mode + ': raw HTML must not create a named browser global')
      assert.ok(hrefs.includes('#user-content-portfolioClobberProbe'), mode + ': fragment must follow the sanitized target')
      assert.ok(hrefs.includes('https://example.com/#portfolioClobberProbe'), mode + ': external fragment must remain unchanged')
      const fragments = hrefs.filter((href) => href.startsWith('#'))
      assert.ok(fragments.length >= 3, mode + ': expected raw fragment and footnote reference/backreference')
      for (const fragment of fragments) {
        assert.ok(ids.has(fragment.slice(1)), mode + ': missing target for ' + fragment)
        assert.ok(!fragment.includes('user-content-user-content-'), mode + ': doubled footnote prefix')
      }
      assert.match(html, /data-streamdown="inline-code"[^>]*>const value = 1<\/code>/)
      assert.match(html, /data-streamdown="strong"[^>]*>Bold<\//)
    }

    const incomplete = renderToStaticMarkup(React.createElement(Streamdown, {
      mode: 'streaming',
    }, 'Hello **world'))
    assert.match(incomplete, /Hello .*data-streamdown="strong"[^>]*>world<\//)
    process.stdout.write('passed')
  `)
}, 10000)

// Maintainer fixes 04dd684/fdc4255/63bd417 bound repeated scans in link and
// emphasis repair. Preserve the literal input and idempotence while exercising
// those parser paths with inputs below the application's 128 KiB body limit.
test('installed Remend bounds bracket and delimiter repair while preserving Markdown', async () => {
  await verifyInstalledRenderer(imports + String.raw`
    const remend = (await load('remend')).default
    assert.equal(remend('Hello **world'), 'Hello **world**')

    const cases = [
      { input: '['.repeat(100000) + '[link](url)', options: { linkMode: 'protocol' } },
      { input: '['.repeat(100000) + '[link](url)', options: { linkMode: 'text-only' } },
      { input: '['.repeat(20000) + '[link](url)'.repeat(2000), options: {} },
      { input: '['.repeat(20000) + '[link](url)'.repeat(2000), options: { links: false, images: false } },
      { input: ('*'.repeat(17) + '~~~ ').repeat(4000) + 'x', options: {} },
      { input: '____~~~ '.repeat(10000) + 'x', options: {} },
      { input: '*~~~ '.repeat(16000) + 'x', options: { italic: false } },
    ]
    for (const { input, options } of cases) {
      assert.ok(Buffer.byteLength(input) < 128 * 1024)
      const output = remend(input, options)
      assert.ok(output === input, 'complete links and skipped delimiters must remain literal')
      assert.ok(remend(output, options) === output, 'repair must be idempotent')
    }
    for (const input of ['A [link](https://example.com)', '**Note:**This', '**Bold**', '[Profile](/about)']) {
      assert.equal(remend(input), input)
    }
    process.stdout.write('passed')
  `)
}, 10000)

// parse5 8.1.1 (9b57bf87) and hast-util-from-parse5 8.0.4 (68b7379)
// fix crashes on tiny Unicode/foreign-template inputs before sanitization.
test('installed Streamdown handles malformed Unicode and foreign templates safely', async () => {
  await verifyInstalledRenderer(imports + String.raw`
    const React = (await load('react')).default
    const { renderToStaticMarkup } = await load('react-dom/server')
    const { Streamdown } = await load('streamdown')
    const cases = [
      '<p>Before \udc00\udc00 after.</p>',
      '<svg><template>Ignored foreign content</template></svg>',
      '<math><template>Ignored foreign content</template></math>',
    ]

    for (const mode of ['static', 'streaming']) {
      const ordinary = [
        '<table>\n  <tbody><tr><td>A &amp; B &#169; &#x1F642;</td></tr></tbody>\n</table>',
        '| Name | Value |\n| --- | --- |\n| Named | &copy; |',
      ].join('\n\n')
      const normalHtml = renderToStaticMarkup(React.createElement(Streamdown, { mode }, ordinary))
      assert.ok(normalHtml.includes('A &amp; B © 🙂'), mode + ': HTML character references must retain their meaning')
      assert.equal(Array.from(normalHtml.matchAll(/<table\b/g)).length, 2, mode + ': raw and GFM tables must render')
      assert.ok(normalHtml.includes('Named') && normalHtml.includes('©'))

      for (const input of cases) {
        const markdown = input + '\n\n**Still readable** and \`safe code\`.'
        const html = renderToStaticMarkup(React.createElement(Streamdown, { mode }, markdown))
        assert.match(html, /data-streamdown="strong"[^>]*>Still readable<\//)
        assert.match(html, /data-streamdown="inline-code"[^>]*>safe code<\/code>/)
        assert.doesNotMatch(html, /<(?:svg|math|template)\b/i)
        if (input.startsWith('<p>')) {
          assert.ok(html.includes('Before ') && html.includes(' after.'), mode + ': surrounding text must survive')
        }
      }
    }
    process.stdout.write('passed')
  `)
}, 10000)

// Supported transitive patches bound position lookup, literal autolink scans,
// and repeated attention serialization. Exercise their public installed APIs.
test('installed Markdown utilities bound text processing and preserve ordinary output', async () => {
  await verifyInstalledRenderer(imports + String.raw`
    const { location } = await load('vfile-location')
    const place = location('x\n'.repeat(50000))
    for (let line = 50000; line >= 1; line--) {
      assert.deepEqual(place.toPoint((line - 1) * 2), {
        line, column: 1, offset: (line - 1) * 2,
      })
    }
    const mixed = location('a\r\nb\nc\rd')
    assert.deepEqual([8, 0, 3, 5].map((offset) => mixed.toPoint(offset).line), [4, 1, 2, 3])
    assert.deepEqual([4, 1, 3, 2].map((line) => mixed.toOffset({ line, column: 1 })), [7, 0, 5, 3])

    const { gfmAutolinkLiteralFromMarkdown } = await load('mdast-util-gfm-autolink-literal')
    const transform = gfmAutolinkLiteralFromMarkdown().transforms[0]
    const textTree = (value) => ({ type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', value }] }] })
    const email = '.'.repeat(60000) + '@'
    const emailTree = textTree(email)
    transform(emailTree)
    assert.deepEqual(emailTree, textTree(email))
    const url = 'https://example.com/' + '?'.repeat(60000) + 'x'
    const urlTree = textTree(url)
    transform(urlTree)
    assert.equal(urlTree.children[0].children[0].url, url)
    const normal = textTree('/person@example.com mailto:person@example.com')
    normal.children[0].children.push(
      { type: 'inlineCode', value: 'person@example.com' },
      { type: 'link', url: '/profile', children: [{ type: 'text', value: 'person@example.com' }] },
    )
    transform(normal)
    const nodes = normal.children[0].children
    assert.equal(nodes.filter((node) => node.type === 'link' && node.url === 'mailto:person@example.com').length, 2)
    assert.deepEqual(nodes.slice(-2), [
      { type: 'inlineCode', value: 'person@example.com' },
      { type: 'link', url: '/profile', children: [{ type: 'text', value: 'person@example.com' }] },
    ])

    const { toMarkdown } = await load('mdast-util-to-markdown')
    const { fromMarkdown } = await load('mdast-util-from-markdown')
    const runs = []
    for (let index = 0; index < 500; index++) {
      const a = index % 2 ? '.' : 'a'
      const b = index % 2 ? 'a' : '.'
      runs.push(
        { type: 'strong', children: [{ type: 'text', value: a }] },
        { type: 'emphasis', children: [{ type: 'text', value: b }, { type: 'strong', children: [{ type: 'text', value: a }] }] },
        { type: 'strong', children: [{ type: 'emphasis', children: [{ type: 'text', value: b }] }] },
      )
    }
    const tree = { type: 'root', children: [{ type: 'paragraph', children: runs }] }
    const stripPosition = (value) => {
      if (Array.isArray(value)) return value.map(stripPosition)
      if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'position').map(([key, item]) => [key, stripPosition(item)]))
      return value
    }
    assert.deepEqual(stripPosition(fromMarkdown(toMarkdown(tree))), tree)
    assert.equal(toMarkdown(textTree('Ordinary text.')), 'Ordinary text.\n')
    process.stdout.write('passed')
  `)
}, 10000)


// The 1.5.1 bracket index bounds nested repairs independently of input size.
// Exercise both supported link modes and keep incomplete images repairable.
test('installed Remend bounds nested bracket repair and preserves bare URLs', async () => {
  await verifyInstalledRenderer(imports + String.raw`
    const remend = (await load('remend')).default
    const nested = '['.repeat(60000) + ']'.repeat(60000)
    for (const linkMode of ['protocol', 'text-only']) {
      const options = { linkMode }
      assert.equal(remend(nested, options), nested)
      const input = '![' + nested + '](x'
      const expected = '![' + nested + '](streamdown:incomplete-image)'
      assert.ok(Buffer.byteLength(input) < 128 * 1024)
      assert.equal(remend(input, options), expected)
      assert.equal(remend(expected, options), expected)
    }
    for (const input of [
      'Visit https://example.com/_next',
      'Visit www.example.com/docs/*/items',
      'See https://example.com/~~draft',
    ]) assert.equal(remend(input), input)
    assert.equal(remend('**see https://example.com/_next'), '**see https://example.com/_next**')
    for (const prefix of ['http://a_b.com/', 'https://a_b.com/', 'www.a_']) {
      const input = prefix.repeat(8000) + ' **open'
      assert.ok(Buffer.byteLength(input) < 128 * 1024)
      assert.equal(remend(input), input + '**')
    }
    process.stdout.write('passed')
  `)
}, 10000)

// Use the installed public export APIs, including the fail-fast resource
// contract. These limits apply to the dependency API, beyond saved-chat caps.
test('installed Streamdown table exports neutralize formulas and bound Markdown output', async () => {
  await verifyInstalledRenderer(imports + String.raw`
    const { tableDataToCSV, tableDataToTSV, tableDataToMarkdown } = await load('streamdown')
    for (const formula of ['=1+1', '+SUM(A1)', '-1+1', '@SUM(A1)', '  =1', '\u0000=1']) {
      const table = { headers: [formula], rows: [[formula]] }
      assert.equal(tableDataToCSV(table), "'" + formula + "\n'" + formula)
      assert.equal(tableDataToTSV(table), "'" + formula + "\n'" + formula)
    }
    const lineBreaks = { headers: ['Value'], rows: [['\r=1'], ['\n+2'], ['\t@3'], ['ordinary\r\ntext']] }
    assert.equal(tableDataToCSV(lineBreaks), 'Value\n"\'\r=1"\n"\'\n+2"\n\'\t@3\n"ordinary\r\ntext"')
    assert.equal(tableDataToTSV(lineBreaks), "Value\n'\\r=1\n'\\n+2\n'\\t@3\nordinary\\r\\ntext")
    const normal = { headers: ['Name', 'Value'], rows: [['Jess', 'a,"b"'], ['Cheng', '42']] }
    assert.equal(tableDataToCSV(normal), 'Name,Value\nJess,"a,""b"""\nCheng,42')
    assert.equal(tableDataToCSV(normal, ';'), 'Name;Value\nJess;"a,""b"""\nCheng;42')
    assert.equal(tableDataToTSV(normal), 'Name\tValue\nJess\ta,"b"\nCheng\t42')
    assert.equal(tableDataToMarkdown({ headers: ['Name', 'Value'], rows: [['Jess', 'A|B'], ['Cheng']] }),
      '| Name | Value |\n| --- | --- |\n| Jess | A\\|B |\n| Cheng |  |')
    assert.equal(tableDataToMarkdown({ headers: [], rows: [['Jess', '42']] }),
      '|  |  |\n| --- | --- |\n| Jess | 42 |')
    assert.equal(tableDataToMarkdown({ headers: [], rows: [] }), '')

    const oversized = [
      { headers: ['Value'], rows: Array.from({ length: 100001 }, () => []) },
      { headers: Array(100001).fill(''), rows: [] },
      { headers: ['Value'], rows: [['x'.repeat(1100000)]] },
      { headers: Array(1000).fill(''), rows: Array.from({ length: 101 }, () => []) },
    ]
    for (const table of oversized) {
      assert.throws(() => tableDataToMarkdown(table), {
        name: 'RangeError', message: 'Table is too large to export as Markdown',
      })
    }
    process.stdout.write('passed')
  `)
}, 10000)
