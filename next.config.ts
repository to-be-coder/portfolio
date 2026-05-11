import path from 'node:path'
import type { NextConfig } from 'next'
import { withGridland } from '@gridland/web/next-plugin'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ['framer-motion'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default withGridland(nextConfig as Parameters<typeof withGridland>[0]) as NextConfig
