import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 mx-16  border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-8">
          <Link href="/projects" className="text-gray-600">
            Projects
          </Link>
          <Link href="/about" className="text-gray-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-600">
            Contact
          </Link>
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-gray-600">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-gray-600">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-gray-600">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-gray-600">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-gray-600">© 2023 Jessica Cheng</p>
      </div>
    </footer>
  )
}
