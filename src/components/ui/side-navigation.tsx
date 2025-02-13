'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type NavigationProps = {
  items: {
    title: string
    url: string
    id: string
  }[]
  defaultPage: string
}

export default function Navigation({ items, defaultPage }: NavigationProps) {
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    // Extract the last segment from the pathname
    const segment = pathname?.split('/').pop() || defaultPage
    setCurrentPage(segment)
  }, [pathname, defaultPage])

  return (
    <nav>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.url}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${currentPage === item.id ? 'bg-black text-white' : 'text-black hover:text-gray-900 hover:bg-gray-100'}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
