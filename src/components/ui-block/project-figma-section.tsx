import ProjectContent from './project-content'
import ProjectSectionTitle from './project-section-title'
import { HorizontalStack } from './project-stack'
import { ScrollSpySection } from '@/components/ui/scroll-spy'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectFigmaSectionProps {
  title?: string
  description?: string
  descriptionClassName?: string
  figmaUrl: string
  imageSrc: string
  imageAlt: string
  sectionClassName?: string
  titleColor?: string
  dotColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonHoverColor?: string
  imageWidth?: number
  imageHeight?: number
  imageClassName?: string
}

export default function ProjectFigmaSection({
  title = 'ExploreFigma File',
  description = 'Design speaks louder than words. Check out the full Figma file to see the process, decisions, and iterations behind this project.',
  descriptionClassName = 'mb-12',
  figmaUrl,
  imageSrc,
  imageAlt,
  sectionClassName = '',
  titleColor,
  dotColor,
  buttonBgColor = 'bg-[#9333EA]',
  buttonTextColor = 'text-white',
  buttonHoverColor = 'hover:bg-opacity-90',
  imageWidth = 800,
  imageHeight = 800,
  imageClassName = 'h-auto max-w-full',
}: ProjectFigmaSectionProps) {
  return (
    <ScrollSpySection value="figma" className={`flex flex-col ${sectionClassName}`}>
      <ProjectContent>
        <HorizontalStack mobileCols={1} desktopCols={2}>
          {/* Left Column - Text Content */}
          <div>
            <ProjectSectionTitle color={titleColor} dotColor={dotColor}>
              {title}
            </ProjectSectionTitle>
            <p className={descriptionClassName}>{description}</p>
            <Link
              href={figmaUrl}
              className={`inline-flex items-center ${buttonBgColor} ${buttonTextColor} px-6 py-3 rounded-lg ${buttonHoverColor} transition-all`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Out Figma
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} className={imageClassName} priority />
          </div>
        </HorizontalStack>
      </ProjectContent>
    </ScrollSpySection>
  )
}

