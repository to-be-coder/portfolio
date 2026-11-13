/// <reference types="bun" />
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { test } from 'bun:test'

const run = promisify(execFile)

// Exercise each consumer's installed parser. Node's external deadline and heap
// limit remain effective when a synchronous regex prevents in-process timers.
// Upstream fixes: node-semver 69b305d (7.8.6) and f4ed953 (6.3.2).
const regressionScript = String.raw`
  import assert from 'node:assert/strict'
  import { createRequire } from 'node:module'
  import { join } from 'node:path'

  const require = createRequire(join(process.cwd(), 'package.json'))
  const target = process.argv[1]
  const resolver = target === 'root' ? require : createRequire(require.resolve(target))
  const semver = resolver('semver')
  const major = resolver('semver/package.json').version.split('.')[0]
  assert.equal(major, target === 'root' ? '6' : '7', 'Preserve each consumer\'s supported major')

  assert.equal(semver.validRange('>= 1.2.3 < 2.0.0'), '>=1.2.3 <2.0.0')
  assert.equal(semver.satisfies('1.5.0', '^1.2.3'), true)
  assert.equal(semver.satisfies('2.0.0', '^1.2.3'), false)
  assert.equal(semver.satisfies('1.2.4-beta.1', '^1.2.3'), false)
  assert.equal(semver.satisfies('1.2.4-beta.1', '^1.2.3', { includePrerelease: true }), true)
  assert.equal(semver.validRange('>=\u00a01.2.3\u2028<2.0.0'), '>=1.2.3 <2.0.0')
  assert.equal(semver.validRange('> invalid'), null)

  // Upstream large-prefix case formerly rescanned overlapping prefixes and
  // stalled for minutes. Check both rejection and accepted legacy boundaries.
  const prefix = 'v'.repeat(500000)
  assert.equal(semver.validRange(prefix), null)
  assert.equal(semver.validRange('>= ' + prefix + '1'), '>=1.0.0')
  assert.equal(semver.satisfies('1.2.3', '>= ' + prefix + '1'), true)
  assert.equal(semver.validRange('0'.repeat(500000)), null)
  process.stdout.write('passed')
`

for (const target of ['root', '@typescript-eslint/typescript-estree', 'is-bun-module', 'sharp']) {
  test('installed ' + target + ' SemVer preserves ranges and bounds malformed prefixes', async () => {
    const { stdout } = await run('node', ['--max-old-space-size=128', '--input-type=module', '--eval', regressionScript, target], {
      encoding: 'utf8',
      timeout: 5000,
      killSignal: 'SIGKILL',
      maxBuffer: 64 * 1024,
    })
    assert.equal(stdout, 'passed')
  }, 10000)
}
