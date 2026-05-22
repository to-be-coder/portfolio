import { CallToActionButton } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 max-w-7xl min-h-[70vh] flex flex-col items-center justify-center text-center">
      <p className="text-gray-600 text-lg mb-2">Page not found</p>
      <h1 className="text-7xl md:text-9xl font-bold text-black tracking-tight">404</h1>
      <p className="mt-6 max-w-md text-gray-600">
        The page you&apos;re looking for moved, was renamed, or never existed. Let&apos;s get you back on track.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <CallToActionButton asChild>
          <Link href="/">Back to home</Link>
        </CallToActionButton>
        <Link
          href="/#projects"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors"
        >
          See my work
        </Link>
      </div>
    </div>
  )
}
