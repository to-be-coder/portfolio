import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const mode = process.argv[2]
if (!['install', 'build'].includes(mode)) throw new Error('Expected install or build')
const version = readFileSync(new URL('../.bun-version', import.meta.url), 'utf8').trim()
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Bun must have an exact release pin')
const npmVersion = execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim()
if (!/^\d+\.\d+\.\d+$/.test(npmVersion)) throw new Error('Could not determine npm version')
console.log(`Build toolchain: Node ${process.version}, npm ${npmVersion}, Bun ${version}`)

// A failed bootstrap can leave a cached placeholder instead of the Bun binary.
// Keep this tool-only cache fresh and separate from application dependencies.
const cache = mkdtempSync(join(tmpdir(), 'portfolio-bun-bootstrap-'))
try {
  const args = ['exec', '--yes', `--cache=${cache}`, `--package=bun@${version}`, '--ignore-scripts=false']
  // npm 12 blocks install scripts by default and supports a package allowlist.
  if (Number(npmVersion.split('.')[0]) >= 12) args.push('--allow-scripts=bun')
  args.push('--', 'bun', ...(mode === 'install'
    ? ['install', '--frozen-lockfile', '--ignore-scripts']
    : ['run', 'build']))
  const result = spawnSync('npm', args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Only the exact Bun tool package needs its reviewed binary setup script.
      // The child install explicitly blocks ALL application lifecycle scripts.
      NPM_CONFIG_IGNORE_SCRIPTS: 'false',
      npm_config_ignore_scripts: 'false',
    },
  })
  if (result.error) throw result.error
  process.exitCode = result.status ?? 1
} finally {
  rmSync(cache, { recursive: true, force: true })
}
