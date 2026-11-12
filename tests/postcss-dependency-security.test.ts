/// <reference types="bun" />
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'bun:test'

const require = createRequire(import.meta.url)
const nextRequire = createRequire(require.resolve('next/package.json'))

for (const [name, resolver] of [['root', require], ['Next.js', nextRequire]] as const) {
  test(name + ' PostCSS limits automatic source maps to the real CSS directory', () => {
    const fixture = mkdtempSync(join(tmpdir(), 'portfolio-postcss-map-'))
    try {
      const cssDirectory = join(fixture, 'css')
      const outsideDirectory = join(fixture, 'outside')
      mkdirSync(cssDirectory)
      mkdirSync(outsideDirectory)
      const map = JSON.stringify({
        version: 3,
        file: 'fixture.css',
        sources: ['source.css'],
        sourcesContent: ['/* harmless test fixture */'],
        names: [],
        mappings: '',
      })
      writeFileSync(join(cssDirectory, 'local.map'), map)
      writeFileSync(join(outsideDirectory, 'outside.map'), map)
      symlinkSync(join(outsideDirectory, 'outside.map'), join(cssDirectory, 'escape.map'))
      symlinkSync(join(cssDirectory, 'local.map'), join(cssDirectory, 'allowed.map'))

      // Resolve as the actual consumer does. Testing only the root package
      // would miss Next.js retaining a separate, older PostCSS dependency.
      const postcss = resolver('postcss') as typeof import('postcss')
      const parse = (filename: string) => postcss.parse(
        'a { color: red }\n/*# sourceMappingURL=' + filename + ' */',
        { from: join(cssDirectory, 'fixture.css') },
      )

      const normal = parse('local.map')
      assert.equal(normal.source?.input.map?.text, map)
      assert.equal(normal.first?.type, 'rule')
      assert.equal(parse('allowed.map').source?.input.map?.text, map)
      assert.equal(parse('escape.map').source?.input.map, undefined)
    } finally {
      rmSync(fixture, { recursive: true, force: true })
    }
  })
}
