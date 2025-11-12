import ProjectSectionTitle from './project-section-title'

interface Color {
  hex: string
  textClass?: string // e.g. 'text-white' or 'text-black'
  border?: boolean // for light backgrounds
}

interface ProjectColorsSectionProps {
  title?: string
  titleColor?: string
  dotColor?: string
  colors: Color[]
}

export default function ProjectColorsSection({ title, titleColor, dotColor, colors }: ProjectColorsSectionProps) {
  return (
    <div className="container mx-auto py-16 lg:py-32 max-w-6xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="mb-8">
          <ProjectSectionTitle color={titleColor} dotColor={dotColor}>
            {title}
          </ProjectSectionTitle>
        </div>
        {colors.map((color, i) => (
          <div className="flex flex-col" key={color.hex + i}>
            <div className={` rounded-xl flex items-end p-4 aspect-square ${color.border ? 'border border-gray-200' : ''}`} style={{ backgroundColor: color.hex }}>
              <span className={color.textClass || ''}>{color.hex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
