import assert from 'node:assert/strict'
import { execFileSync, execSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Verify the repository default, without passing --ignore-scripts. Both
// fixtures are local and only attempt to write an inert marker in this temp dir.
const fixture = mkdtempSync(join(tmpdir(), 'portfolio-install-policy-'))
try {
  const dependency = join(fixture, 'dependency')
  mkdirSync(dependency)
  copyFileSync(new URL('../bunfig.toml', import.meta.url), join(fixture, 'bunfig.toml'))
  const scripts = { postinstall: 'node postinstall.cjs' }
  writeFileSync(join(fixture, 'package.json'), JSON.stringify({
    name: 'portfolio-install-policy-fixture', version: '1.0.0', private: true, scripts,
    dependencies: { 'portfolio-policy-dependency': 'file:./dependency' },
    trustedDependencies: ['portfolio-policy-dependency'],
  }))
  writeFileSync(join(dependency, 'package.json'), JSON.stringify({ name: 'portfolio-policy-dependency', version: '1.0.0', scripts }))
  writeFileSync(join(fixture, 'postinstall.cjs'), `require('node:fs').writeFileSync(${JSON.stringify(join(fixture, 'project-script-ran'))}, 'unexpected')`)
  writeFileSync(join(dependency, 'postinstall.cjs'), `require('node:fs').writeFileSync(${JSON.stringify(join(fixture, 'dependency-script-ran'))}, 'unexpected')`)
  const env = { ...process.env }
  // Environment flags must not accidentally make the configuration test pass.
  delete env.NPM_CONFIG_IGNORE_SCRIPTS
  delete env.npm_config_ignore_scripts
  execFileSync('bun', ['install'], { cwd: fixture, env, timeout: 15000, stdio: 'pipe' })
  assert.ok(existsSync(join(fixture, 'node_modules/portfolio-policy-dependency/package.json')), 'The fixture dependency must actually be installed')
  assert.equal(existsSync(join(fixture, 'project-script-ran')), false, 'Project install script ran despite repository policy')
  assert.equal(existsSync(join(fixture, 'dependency-script-ran')), false, 'Trusted dependency install script ran despite repository policy')
  console.log('Repository policy blocks project and trusted-dependency lifecycle scripts.')

  // Exercise the real deployment bootstrap from a cold npm cache. Its narrow
  // exception permits Bun's own setup, while Bun must still block app scripts.
  // Remove bunfig so it cannot mask a missing --ignore-scripts in the command.
  rmSync(join(fixture, 'node_modules'), { recursive: true, force: true })
  rmSync(join(fixture, 'bunfig.toml'))
  mkdirSync(join(fixture, 'scripts'))
  copyFileSync(new URL('./vercel-bun.mjs', import.meta.url), join(fixture, 'scripts/vercel-bun.mjs'))
  copyFileSync(new URL('../.bun-version', import.meta.url), join(fixture, '.bun-version'))
  writeFileSync(join(fixture, '.npmrc'), 'ignore-scripts=true\n')
  const { installCommand } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  execSync(installCommand, {
    cwd: fixture,
    env: {
      ...env,
      NPM_CONFIG_IGNORE_SCRIPTS: 'true',
      npm_config_ignore_scripts: 'true',
    },
    timeout: 90000,
    stdio: 'pipe',
  })
  assert.ok(existsSync(join(fixture, 'node_modules/portfolio-policy-dependency/package.json')), 'Deployment command must install the fixture dependency')
  assert.equal(existsSync(join(fixture, 'project-script-ran')), false, 'Deployment command ran the project install script')
  assert.equal(existsSync(join(fixture, 'dependency-script-ran')), false, 'Deployment command ran the trusted dependency install script')
  console.log('Vercel command bootstraps Bun while blocking project and trusted-dependency lifecycle scripts.')
} finally {
  rmSync(fixture, { recursive: true, force: true })
}
