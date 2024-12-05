import { Github, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Jessica Cheng. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="https://instagram.com" target="_blank" className="text-gray-500 hover:text-gray-700">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-gray-500 hover:text-gray-700">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="https://github.com" target="_blank" className="text-gray-500 hover:text-gray-700">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
