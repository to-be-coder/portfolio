'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string
  category: string
  url: string
  subtitle?: string
  index: number
}

export default function NotionCard({ title, category, url, subtitle, index }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
      <Link href={`/blog/${url}`} className="group block h-full">
        <motion.div
          className="relative h-full flex flex-col p-6 bg-white border border-gray-200 rounded-xl cursor-pointer overflow-hidden"
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Hover shadow effect */}
          <motion.div className="absolute inset-0 rounded-xlopacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Category badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{category}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-black transition-colors">{title}</h2>

            {/* Subtitle */}
            {subtitle && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subtitle}</p>}

            {/* Read more link */}
            <div className="mt-auto pt-4 inline-flex items-center text-gray-600 group-hover:text-gray-900 transition-colors">
              <span className="text-sm font-medium">Read more</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
