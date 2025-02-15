import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface PortfolioItemType {
  id: number
  name: string
  href: string
  bgColor: string
  image: string
  tags: string[]
}

export const portfolioItems: PortfolioItemType[] = [
  // { id: 1, name: 'Mozilla', bgColor: '#00FF85', image: '/mozilla.svg', tags: ['AI', 'Project Leader'] },
  { id: 1, name: 'Meta', href: '/works/meta', bgColor: '#FF66D4', image: '/demo-logo-thoughtful.svg', tags: ['AI', 'Project Leader'] },
  { id: 2, name: 'Teachable', href: '/works/teachable', bgColor: '#FFAD56', image: '/demo-logo-2.svg', tags: ['AI', 'Project Leader'] },
  { id: 3, name: 'Compost Now', href: '/works/compostnow', bgColor: '#3E98FE', image: '/demo-logo-compostnow.png', tags: ['AI', 'Project Leader'] },
  { id: 4, name: 'Spiritune', href: '/works/spiritune', bgColor: '#36CDFF', image: '/demo-logo-spiritune.svg', tags: ['AI', 'Project Leader'] },
  { id: 5, name: 'Fractional', href: '/works/fractional', bgColor: '#FFFC3B', image: '/demo-logo-fractional.svg', tags: ['AI', 'Project Leader'] },
  { id: 6, name: 'Cyrus', href: '/works/cyrus', bgColor: '#C44FFF', image: '/demo-logo-1.svg', tags: ['AI', 'Project Leader'] },
]

interface PortfolioItemProps {
  item: PortfolioItemType
  showDetails?: boolean
}

const PortfolioItem = ({ item, showDetails = false }: PortfolioItemProps) => {
  const { id, name, bgColor, image, tags, href } = item

  if (showDetails) {
    return (
      <Link href={href} className="block">
        <div className="p-4 relative aspect-square group" style={{ backgroundColor: bgColor }}>
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <Image src={image} alt={name} width={128} height={128} className="object-contain w-32 h-32 md:w-28 md:h-28 lg:w-26 lg:h-26 transition-transform duration-300 group-hover:scale-150" />
            </div>
            <div className="flex justify-end items-center">
              <div className="flex gap-1">
                {tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-white/70 text-black border border-gray-500 rounded-full px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
                <ArrowRight className="w-6 h-6 text-gray-500 transition-all duration-300 group-hover:text-black group-hover:translate-x-2" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="block">
      <div className="p-2 relative  aspect-none sm:aspect-square">
        <div className="flex justify-between items-end h-full">
          <h3 className="text-2xl font-medium">{name}</h3>
          <span className="text-3xl md:text-4xl font-medium">{String(id).padStart(2, '0')}</span>
        </div>
      </div>
    </Link>
  )
}

export const PortfolioGrid = () => {
  // Sort items by ID to ensure correct order
  const sortedItems = [...portfolioItems].sort((a, b) => a.id - b.id)

  return (
    <div className="col-span-4 md:col-span-2 w-full mt-0 ">
      {/* Single column on mobile, two columns on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Mobile: Single column with all items */}
        <div className="sm:hidden">
          {sortedItems.map((item) => (
            <React.Fragment key={item.id}>
              <PortfolioItem item={item} />
              <PortfolioItem item={item} showDetails />
            </React.Fragment>
          ))}
        </div>

        {/* Desktop: Two column layout (hidden on mobile) */}
        <div className="hidden sm:block">
          {sortedItems
            .filter((_, index) => index % 2 === 0)
            .map((item) => (
              <React.Fragment key={item.id}>
                <PortfolioItem item={item} />
                <PortfolioItem item={item} showDetails />
              </React.Fragment>
            ))}
        </div>
        <div className="hidden sm:block">
          <div className="p-6 relative aspect-square" /> {/* Empty first cell */}
          {sortedItems
            .filter((_, index) => index % 2 === 1)
            .map((item) => (
              <React.Fragment key={item.id}>
                <PortfolioItem item={item} />
                <PortfolioItem item={item} showDetails />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}
