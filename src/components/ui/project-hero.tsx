import { MoveDown } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle: string
  tags: string[]
  ctaText?: string
}

export function ProjectHero({ title, subtitle, tags, ctaText = 'Check Out the Project' }: HeroProps) {
  return (
    <div className="container mx-auto px-8 h-[90vh] flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-center">{title}</h1>
        <p className="text-[32px] mt-4 text-center">&ldquo;{subtitle}&rdquo;</p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="rounded-full border border-[#C1C1C1] px-4 py-1 text-sm text-black">
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
          <div className="flex items-center text-base text-gray-900 hover:text-gray-700">
            {ctaText} <MoveDown className="text-[#ff9c6a] w-6 h-4 stroke-[3]" />
          </div>
        </div>
      </div>
    </div>
  )
}
