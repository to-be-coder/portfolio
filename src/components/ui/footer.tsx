import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from './button'

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
            <Link href="https://www.linkedin.com/in/jessica-cheng-design-engineer/" className="text-white hover:text-secondary" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-full aspect-square">
                <Linkedin className="w-5 h-5" />
              </Button>
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
