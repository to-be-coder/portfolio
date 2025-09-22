import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  image?: string
  category: string
  url: string
}

export default function NotionCard({ title, image, category, url }: Props) {
  return (
    <Link href={`/blog/${url}`} className="group flex flex-col transition-all duration-200 hover:scale-[1.02] cursor-pointer">
      {/* Article image */}
      <div className="relative aspect-video bg-gray-200 mb-4 rounded-lg overflow-hidden">{image && <Image src={image} alt={title} fill className="object-cover" />}</div>

      {/* Category badge */}
      <div className="mb-2">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-md">{category}</span>
      </div>

      {/* Article title */}
      <h2 className="text-xl font-bold">{title}</h2>

      {/* Read more link */}
      <div className="inline-flex items-center text-secondary group-hover:text-secondary mt-auto">
        Read more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
