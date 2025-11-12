import ProjectContent from './project-content'
import ProjectSectionTitle from './project-section-title'
import { VerticalStack } from './project-stack'

interface Weight {
  name: string
  className?: string
}

interface ProjectTypographySectionProps {
  title?: string
  titleColor?: string
  dotColor?: string
  displayText?: string
  displayTextClassName?: string
  typeface: string
  typefaceClassName?: string
  weights: Weight[]
  typefaceTitleColor?: string
  weightsTitleColor?: string
  borderColor?: string
}

export default function ProjectTypographySection({
  title,
  titleColor,
  dotColor,
  displayText = 'Aa',
  displayTextClassName = 'text-[200px] font-regular',
  typeface,
  typefaceClassName = '',
  weights,
  typefaceTitleColor = 'text-gray-400',
  weightsTitleColor = 'text-gray-400',
  borderColor = 'border-[#C1C1C1]',
}: ProjectTypographySectionProps) {
  return (
    <>
      <ProjectSectionTitle color={titleColor} dotColor={dotColor}>
        {title}
      </ProjectSectionTitle>
      <ProjectContent>
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="flex items-center justify-center">
            <span className={displayTextClassName}>{displayText}</span>
          </div>
          <div className="flex flex-row md:flex-col items-start md:items-center justify-center md:justify-end gap-y-8 gap-x-8 w-full md:w-auto">
            <VerticalStack title="Typeface" titleColor={typefaceTitleColor} borderColor={borderColor}>
              <p className={typefaceClassName}>{typeface}</p>
            </VerticalStack>
            <VerticalStack title="Weights" titleColor={weightsTitleColor} borderColor={borderColor}>
              <div className="space-y-1 md:space-y-2">
                {weights.map((weight, i) => (
                  <p key={i} className={weight.className || ''}>
                    {weight.name}
                  </p>
                ))}
              </div>
            </VerticalStack>
          </div>
        </div>
      </ProjectContent>
    </>
  )
}
