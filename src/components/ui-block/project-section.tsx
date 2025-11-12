import React from 'react'

interface ProjectSectionProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  dotColor?: string
  titleColor?: string
  className?: string // for custom container classes
  bgClassName?: string // for background color
  textClassName?: string // for text color
  children: React.ReactNode
  containerClassName?: string // for inner container
  spacingClassName?: string // for section spacing
}

export default function ProjectSection({
  className = '',
  bgClassName = '',
  textClassName = '',
  children,
  containerClassName = 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  spacingClassName = 'py-16 lg:py-32',
}: ProjectSectionProps) {
  return (
    <section className={`relative ${bgClassName} ${textClassName} ${className}`}>
      <div className={`${containerClassName} ${spacingClassName}`}>{children}</div>
    </section>
  )
}
