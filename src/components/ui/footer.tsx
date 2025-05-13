import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1C1C1C]">
      <div className="container max-w-7xl mx-auto px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 flex-1 items-center">
            <Link href="/#projects" className="text-white hover:text-secondary">
              Projects
            </Link>
            <Link href="/about" className="text-white hover:text-secondary">
              About
            </Link>
            <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_URL}`} className="text-white hover:text-secondary">
              Contact
            </Link>
            <Link href="https://www.linkedin.com/in/jessica-cheng-design-engineer/" className="text-white hover:text-secondary flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              LinkedIn
              <ArrowUpRight className="w-4 h-4 hover:text-secondary" />
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
