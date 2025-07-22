import React from 'react'

interface ProjectSectionTitleProps {
  children: React.ReactNode
  color?: string // Tailwind color class
}

export default function ProjectSectionTitle({ children, color = 'text-green-500' }: ProjectSectionTitleProps) {
  return (
    <h2 className="text-4xl font-normal mb-2">
      {children}
      <span className={`${color} text-[64px]`}>.</span>
    </h2>
  )
}
