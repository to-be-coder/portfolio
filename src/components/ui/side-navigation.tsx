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
  }, [pathname])

  return (
    <nav>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.title}>
            <Link href={item.url} className={`block py-2 px-3 rounded-lg ${currentPage === item.id ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              <span className="flex items-center">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
