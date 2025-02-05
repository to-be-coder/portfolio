import { Instagram, Linkedin, X } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C1C1C]">
      <div className="container max-w-7xl mx-auto px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 flex-1">
            <Link href="/#projects" className="text-white hover:text-[#ff9c6a]">
              Projects
            </Link>
            <Link href="/about" className="text-white hover:text-[#ff9c6a]">
              About
            </Link>
            <Link href="mailto:jessicacheng.code@gmail.com" className="text-white hover:text-[#ff9c6a]">
              Contact
            </Link>
          </div>
          <div className="flex gap-6 items-center flex-1 justify-center">
            <Link href="https://x.com/_re_ux" className="text-white hover:text-[#ff9c6a]" target="_blank" rel="noopener noreferrer">
              <X className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/mukajitu/" className="text-white hover:text-[#ff9c6a]" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/jessica-cheng-design-engineer/" className="text-white hover:text-[#ff9c6a]" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
            <p className="text-white">© 2025 Jessica Cheng</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
