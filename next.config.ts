import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: (process.env.NEXT_PUBLIC_IMAGE_PROTOCOL as 'https' | 'http') || 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || '',
        pathname: process.env.NEXT_PUBLIC_IMAGE_PATHNAME || '/**',
      },
    ],
  },
}

export default nextConfig
