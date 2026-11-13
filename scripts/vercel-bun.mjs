import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const mode = process.argv[2]
if (!['install', 'build'].includes(mode)) throw new Error('Expected install or build')
// Install in the caller's project, just as npm and Bun do. Reject an invalid
// working directory before removing any generated dependencies.
if (mode === 'install') {
  for (const filename of ['package.json', 'bun.lock']) {
    if (!statSync(join(process.cwd(), filename), { throwIfNoEntry: false })?.isFile()) {
      throw new Error(`Install requires ${filename} in the working directory`)
    }
  }
}
const bunVersion = readFileSync(new URL('../.bun-version', import.meta.url), 'utf8').trim()
const npmVersion = readFileSync(new URL('../.npm-version', import.meta.url), 'utf8').trim()
if (!/^\d+\.\d+\.\d+$/.test(bunVersion)) throw new Error('Bun must have an exact release pin')
if (!/^\d+\.\d+\.\d+$/.test(npmVersion)) throw new Error('npm must have an exact release pin')
const bootstrapNpmVersion = execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim()
if (!/^\d+\.\d+\.\d+$/.test(bootstrapNpmVersion)) throw new Error('Could not determine bootstrap npm version')

// The host npm only acquires the pinned npm tool with scripts disabled.
// Separate cold caches keep tool bootstrap state out of application installs.
const npmCache = mkdtempSync(join(tmpdir(), 'portfolio-npm-bootstrap-'))
let bunCache
try {
  const npmArgs = [
    'exec', '--yes', `--cache=${npmCache}`, `--package=npm@${npmVersion}`,
    '--ignore-scripts=true', '--', 'npm',
  ]
  const selectedNpmVersion = execFileSync('npm', [...npmArgs, '--version'], { encoding: 'utf8' }).trim()
  if (selectedNpmVersion !== npmVersion) {
    throw new Error(`Expected npm ${npmVersion}, received ${selectedNpmVersion}`)
  }
  console.log(`Build toolchain: Node ${process.version}, npm ${selectedNpmVersion}, Bun ${bunVersion} (bootstrap npm ${bootstrapNpmVersion})`)

  if (mode === 'install') {
    // Restored Vercel caches can retain nested packages removed from the lock.
    // Recreate only this install directory; rmSync unlinks directory symlinks.
    rmSync(join(process.cwd(), 'node_modules'), { recursive: true, force: true })
  }
  bunCache = mkdtempSync(join(tmpdir(), 'portfolio-bun-bootstrap-'))
  const bunArgs = ['exec', '--yes', `--cache=${bunCache}`, `--package=bun@${bunVersion}`, '--ignore-scripts=false']
  // npm 12 blocks install scripts by default and supports a package allowlist.
  if (Number(npmVersion.split('.')[0]) >= 12) bunArgs.push('--allow-scripts=bun')
  bunArgs.push('--', 'bun', ...(mode === 'install'
    ? ['install', '--frozen-lockfile', '--ignore-scripts']
    : ['run', 'build']))
  const result = spawnSync('npm', [...npmArgs, ...bunArgs], {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Only exact Bun needs its setup script. Outer npm acquisition explicitly
      // disables scripts; the child install blocks ALL application scripts.
      NPM_CONFIG_IGNORE_SCRIPTS: 'false',
      npm_config_ignore_scripts: 'false',
    },
  })
  if (result.error) throw result.error
  process.exitCode = result.status ?? 1
} finally {
  if (bunCache) rmSync(bunCache, { recursive: true, force: true })
  rmSync(npmCache, { recursive: true, force: true })
}
