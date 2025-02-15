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
  imageSize?: {
    width: number
    height: number
  }
}

export const portfolioItems: PortfolioItemType[] = [
  // { id: 1, name: 'Mozilla', bgColor: '#00FF85', image: '/mozilla.svg', tags: ['AI', 'Project Leader'] },
  {
    id: 1,
    name: 'Thoughtful',
    href: '/ui-templates/projects-page',
    bgColor: '#FF66D4',
    image: '/demo-logo-thoughtful.svg',
    tags: ['Co-Founder'],
  },
  {
    id: 2,
    name: 'Fractional',
    href: '/ui-templates/projects-page',
    bgColor: '#FFAD56',
    image: '/demo-logo-fractional.svg',
    tags: ['Founder'],
  },

  {
    id: 3,
    name: 'Spiritune',
    href: '/ui-templates/projects-page',
    bgColor: '#36CDFF',
    image: '/demo-logo-spiritune.svg',
    tags: ['Frontend Engineer'],
  },

  {
    id: 4,
    name: 'Company',
    href: '/ui-templates/projects-page',
    bgColor: '#3E98FE',
    image: '/demo-logo-3.svg',
    tags: ['AI'],
  },
  {
    id: 5,
    name: 'Company',
    href: '/ui-templates/projects-page',
    bgColor: '#FFFC3B',
    image: '/demo-logo-2.svg',
    tags: ['Project Leader'],
  },

  {
    id: 6,
    name: 'Company',
    href: '/ui-templates/projects-page',
    bgColor: '#C44FFF',
    image: '/demo-logo-1.svg',
    tags: ['Design'],
  },
]

interface ProjectCardProps {
  item: PortfolioItemType
  showDetails?: boolean
}

const ProjectCard = ({ item, showDetails = false }: ProjectCardProps) => {
  const { id, name, bgColor, image, tags, href } = item

  if (showDetails) {
    return (
      <Link href={href} className="block">
        <div className="p-4 relative aspect-square group" style={{ backgroundColor: bgColor }}>
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <Image src={image} alt={name} width={120} height={120} className="object-contain transition-transform duration-300 group-hover:scale-120" />
            </div>
            <div className="flex justify-end items-center">
              <div className="flex gap-1">
                {tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-white/70 text-black border border-gray-500 rounded-full px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
                <ArrowRight className="w-6 h-6 text-gray-500 transition-all duration-300 group-hover:text-gray-500 group-hover:translate-x-2" />
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

export const ProjectGrid = () => {
  const sortedItems = portfolioItems.sort((a, b) => a.id - b.id)

  return (
    <div className="col-span-4 md:col-span-2 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Mobile view */}
        <div className="sm:hidden">
          {sortedItems.map((item) => (
            <React.Fragment key={item.id}>
              <ProjectCard item={item} />
              <ProjectCard item={item} showDetails />
            </React.Fragment>
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block">
          {sortedItems
            .filter((_, index) => index % 2 === 0)
            .map((item) => (
              <React.Fragment key={item.id}>
                <ProjectCard item={item} />
                <ProjectCard item={item} showDetails />
              </React.Fragment>
            ))}
        </div>
        <div className="hidden sm:block">
          <div className="p-6 relative aspect-square" aria-hidden="true" /> {/* Empty first cell */}
          {sortedItems
            .filter((_, index) => index % 2 === 1)
            .map((item) => (
              <React.Fragment key={item.id}>
                <ProjectCard item={item} />
                <ProjectCard item={item} showDetails />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}
