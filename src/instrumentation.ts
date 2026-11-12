export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.VERCEL === '1') {
    // Build-machine versions do not establish the managed function runtime.
    // Keep this evidence in private server logs, without request or secret data.
    console.info('portfolio-runtime', {
      node: process.version,
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown',
    })
  }
}
