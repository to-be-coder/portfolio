'use client'

import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export interface ProjectMediaGalleryItem {
  id: string
  media: ReactNode
  title: string
  description?: string
}

interface ProjectMediaGalleryProps {
  ariaLabel: string
  heading: string
  items: ProjectMediaGalleryItem[]
  decoration?: ReactNode
  className?: string
}

export default function ProjectMediaGallery({ ariaLabel, heading, items, decoration, className }: ProjectMediaGalleryProps) {
  return (
    <section className={cn('relative isolate overflow-hidden rounded-2xl bg-zinc-950 text-white', className)} aria-label={ariaLabel}>
      {decoration}

      <div className="relative z-10 px-5 pb-4 pt-5 md:px-7 md:pt-6">
        <p className="font-semibold">{heading}</p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-x-5 gap-y-8 px-5 pb-6 md:px-7 md:pb-7">
        {items.map((item) => (
          <figure key={item.id} className="w-full max-w-[250px] sm:max-w-[240px] lg:max-w-[220px]">
            {item.media}
            <figcaption className="mt-4 space-y-1">
              <p className="font-semibold text-white">{item.title}</p>
              {item.description && <p className="text-sm leading-relaxed text-white/65">{item.description}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
