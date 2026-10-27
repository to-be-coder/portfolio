import path from 'node:path'
import type { NextConfig } from 'next'
import { withGridland } from '@gridland/web/next-plugin'

const isDevelopment = process.env.NODE_ENV === 'development'
// Static Next.js pages require inline hydration scripts. Restrict their origins,
// disable inline event handlers, and keep eval restricted to the dev server.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Gridland's bundled Yoga WASM is read from a data URL, never a remote host.
  `connect-src 'self' data:${isDevelopment ? ' ws://localhost:* ws://127.0.0.1:*' : ''}`,
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join('; ')

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  transpilePackages: ['framer-motion'],
  images: {
    // The portfolio now uses only reviewed, local image assets.
    remotePatterns: [],
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    maximumRedirects: 0,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: contentSecurityPolicy },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
      ],
    }]
  },
}

export default withGridland(nextConfig as Parameters<typeof withGridland>[0]) as NextConfig
