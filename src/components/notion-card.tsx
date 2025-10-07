import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string
  category: string
  url: string
}

export default function NotionCard({ title, category, url }: Props) {
  return (
    <Link href={`/blog/${url}`} className="group flex flex-col transition-all duration-200 hover:scale-[1.02] cursor-pointer border border-gray-200 rounded-md p-4 justify-between">
      {/* Article title */}
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-1">
        {/* Category badge */}
        <div className="mb-1">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-md">{category}</span>
        </div>

        {/* Read more link */}
        <div className="inline-flex items-center text-secondary group-hover:text-secondary mt-auto">
          Read more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
