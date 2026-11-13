import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { chmodSync, copyFileSync, cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const launcher = fileURLToPath(new URL('./vercel-bun.mjs', import.meta.url))
const pinnedNpmVersion = readFileSync(new URL('../.npm-version', import.meta.url), 'utf8').trim()
const pinnedBunVersion = readFileSync(new URL('../.bun-version', import.meta.url), 'utf8').trim()
// Local fixtures only attempt to write inert markers inside their temp dirs.
const fixture = mkdtempSync(join(tmpdir(), 'portfolio-install-policy-'))
const outside = mkdtempSync(join(tmpdir(), 'portfolio-install-policy-outside-'))
try {
  const dependency = join(fixture, 'dependency/package')
  const shared = join(fixture, 'shared/package')
  mkdirSync(dependency, { recursive: true })
  mkdirSync(shared, { recursive: true })
  copyFileSync(new URL('../bunfig.toml', import.meta.url), join(fixture, 'bunfig.toml'))
  const scripts = { postinstall: 'node postinstall.cjs' }
  writeFileSync(join(fixture, 'package.json'), JSON.stringify({
    name: 'portfolio-install-policy-fixture', version: '1.0.0', private: true,
    scripts: { ...scripts, build: 'node build.cjs' },
    dependencies: {
      'portfolio-policy-dependency': 'file:./dependency.tgz',
      'portfolio-policy-shared': 'file:./shared.tgz',
    },
    trustedDependencies: ['portfolio-policy-dependency'],
  }))
  writeFileSync(join(dependency, 'package.json'), JSON.stringify({
    name: 'portfolio-policy-dependency', version: '1.0.0', main: 'index.cjs', scripts,
  }))
  writeFileSync(join(dependency, 'index.cjs'), "module.exports = require('portfolio-policy-shared')")
  writeFileSync(join(shared, 'package.json'), JSON.stringify({
    name: 'portfolio-policy-shared', version: '2.0.0', main: 'index.cjs',
  }))
  writeFileSync(join(shared, 'index.cjs'), "module.exports = 'current'")
  writeFileSync(join(fixture, 'postinstall.cjs'), `require('node:fs').writeFileSync(${JSON.stringify(join(fixture, 'project-script-ran'))}, 'unexpected')`)
  writeFileSync(join(dependency, 'postinstall.cjs'), `require('node:fs').writeFileSync(${JSON.stringify(join(fixture, 'dependency-script-ran'))}, 'unexpected')`)
  writeFileSync(join(fixture, 'build.cjs'), `
    const assert = require('node:assert/strict')
    const fs = require('node:fs')
    assert.equal(fs.readFileSync('node_modules/build-sentinel', 'utf8'), 'keep')
    assert.equal(require('portfolio-policy-dependency'), 'current')
    fs.writeFileSync('build-ran', 'yes')
  `)
  writeFileSync(join(fixture, 'source-sentinel'), 'keep')
  writeFileSync(join(outside, 'outside-sentinel'), 'keep')
  // Packed local packages behave like cached registry dependencies; directory
  // file: dependencies are refreshed by Bun and would conceal the regression.
  for (const name of ['dependency', 'shared']) {
    execFileSync('tar', ['-czf', join(fixture, name + '.tgz'), '-C', join(fixture, name), 'package'])
  }
  const env = { ...process.env }
  // Environment flags must not accidentally make the configuration test pass.
  delete env.NPM_CONFIG_IGNORE_SCRIPTS
  delete env.npm_config_ignore_scripts
  execFileSync('bun', ['install'], { cwd: fixture, env, timeout: 15000, stdio: 'pipe' })
  const installedDependency = join(fixture, 'node_modules/portfolio-policy-dependency')
  assert.ok(existsSync(join(installedDependency, 'package.json')), 'The fixture dependency must actually be installed')
  const assertScriptsBlocked = () => {
    assert.equal(existsSync(join(fixture, 'project-script-ran')), false, 'Project lifecycle script ran')
    assert.equal(existsSync(join(fixture, 'dependency-script-ran')), false, 'Trusted dependency lifecycle script ran')
  }
  assertScriptsBlocked()
  console.log('Repository policy blocks project and trusted-dependency lifecycle scripts.')

  // Simulate a restored nested package removed from the new lock. Materialize
  // the consumer first so a package-manager symlink cannot modify package source.
  if (lstatSync(installedDependency).isSymbolicLink()) {
    rmSync(installedDependency, { recursive: true, force: true })
    cpSync(dependency, installedDependency, { recursive: true })
  }
  const stale = join(installedDependency, 'node_modules/portfolio-policy-shared')
  mkdirSync(stale, { recursive: true })
  writeFileSync(join(stale, 'package.json'), JSON.stringify({
    name: 'portfolio-policy-shared', version: '1.0.0', main: 'index.cjs',
  }))
  writeFileSync(join(stale, 'index.cjs'), "module.exports = 'stale'")
  const resolvedShared = () => execFileSync(process.execPath, [
    '-e', "process.stdout.write(require('portfolio-policy-dependency'))",
  ], { cwd: fixture, encoding: 'utf8', timeout: 5000 })
  assert.equal(resolvedShared(), 'stale', 'Fixture must actually shadow the pinned root dependency')
  const lock = readFileSync(join(fixture, 'bun.lock'))
  const manifest = readFileSync(join(fixture, 'package.json'))

  // A cold npm cache permits only Bun's own setup. Remove bunfig so it cannot
  // mask a missing --ignore-scripts flag in the deployment command.
  rmSync(join(fixture, 'bunfig.toml'))
  writeFileSync(join(fixture, '.npmrc'), 'ignore-scripts=true\n')
  const runLauncher = (mode, cwd = fixture) => execFileSync(process.execPath, [launcher, mode], {
    cwd,
    env: { ...env, NPM_CONFIG_IGNORE_SCRIPTS: 'true', npm_config_ignore_scripts: 'true' },
    timeout: 90000,
    stdio: 'pipe',
  })
  const installOutput = runLauncher('install').toString()
  assert.equal(resolvedShared(), 'current', 'Deployment install retained a stale nested dependency')
  assert.equal(existsSync(stale), false, 'Removed dependency must not survive the frozen install')
  assert.ok(installOutput.includes(`npm ${pinnedNpmVersion}, Bun ${pinnedBunVersion} (bootstrap npm `),
    'Deployment must verify and report the exact npm and Bun pins separately from host npm')
  assert.deepEqual(readFileSync(join(fixture, 'bun.lock')), lock, 'Frozen install changed the lock')
  assert.deepEqual(readFileSync(join(fixture, 'package.json')), manifest, 'Install changed the manifest')
  assert.equal(readFileSync(join(fixture, 'source-sentinel'), 'utf8'), 'keep')
  assertScriptsBlocked()
  console.log('Deployment bootstrap removes stale nested resolution without changing the lock or running lifecycle scripts.')

  // Build mode must use installed dependencies without clearing them.
  writeFileSync(join(fixture, 'node_modules/build-sentinel'), 'keep')
  runLauncher('build')
  assert.equal(readFileSync(join(fixture, 'build-ran'), 'utf8'), 'yes')
  assertScriptsBlocked()

  // A linked dependency directory must be unlinked, never traversed for removal.
  rmSync(join(fixture, 'node_modules'), { recursive: true, force: true })
  symlinkSync(outside, join(fixture, 'node_modules'), 'dir')
  runLauncher('install')
  assert.equal(lstatSync(join(fixture, 'node_modules')).isSymbolicLink(), false)
  assert.equal(readFileSync(join(outside, 'outside-sentinel'), 'utf8'), 'keep')
  assert.equal(resolvedShared(), 'current')
  assert.deepEqual(readFileSync(join(fixture, 'bun.lock')), lock)
  assertScriptsBlocked()

  // Wrong working directories must fail before any dependency cleanup.
  for (const missing of ['package.json', 'bun.lock']) {
    const invalid = join(fixture, 'missing-' + missing)
    mkdirSync(join(invalid, 'node_modules'), { recursive: true })
    writeFileSync(join(invalid, missing === 'package.json' ? 'bun.lock' : 'package.json'), '{}')
    writeFileSync(join(invalid, 'node_modules/keep'), 'keep')
    assert.throws(() => runLauncher('install', invalid), (error) =>
      String(error.stderr).includes('Install requires ' + missing + ' in the working directory'))
    assert.equal(readFileSync(join(invalid, 'node_modules/keep'), 'utf8'), 'keep')
  }
  // A mismatched tool selected through PATH must fail before cleanup. The fake
  // bootstrap also checks that acquiring pinned npm never enables its scripts.
  const wrongNpm = join(fixture, 'wrong-npm')
  const fakeBin = join(wrongNpm, 'bin')
  mkdirSync(fakeBin, { recursive: true })
  mkdirSync(join(wrongNpm, 'node_modules'))
  writeFileSync(join(wrongNpm, 'package.json'), manifest)
  writeFileSync(join(wrongNpm, 'bun.lock'), lock)
  writeFileSync(join(wrongNpm, 'node_modules/keep'), 'keep')
  const fakeNpm = join(fakeBin, 'npm')
  writeFileSync(fakeNpm, `#!/usr/bin/env node
    const assert = require('node:assert/strict')
    const args = process.argv.slice(2)
    if (!(args.length === 1 && args[0] === '--version')) {
      assert.ok(args.includes(${JSON.stringify('--package=npm@' + pinnedNpmVersion)}))
      assert.ok(args.includes('--ignore-scripts=true'))
    }
    console.log('0.0.0')
  `)
  chmodSync(fakeNpm, 0o755)
  assert.throws(() => execFileSync(process.execPath, [launcher, 'install'], {
    cwd: wrongNpm, env: { ...env, PATH: fakeBin + ':' + env.PATH },
    timeout: 10000, stdio: 'pipe',
  }), (error) => String(error.stderr).includes('Expected npm ' + pinnedNpmVersion + ', received 0.0.0'))
  assert.equal(readFileSync(join(wrongNpm, 'node_modules/keep'), 'utf8'), 'keep')
  console.log('Exact npm pin, build mode, source files, external symlink targets and invalid install directories are verified.')
} finally {
  rmSync(fixture, { recursive: true, force: true })
  rmSync(outside, { recursive: true, force: true })
}
