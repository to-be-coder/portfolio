import React from 'react'

interface ProjectSectionTitleProps {
  children: React.ReactNode
  color?: string // Tailwind color class for main text
  dotColor?: string // Tailwind color class for dot
  textAlign?: string
}

export default function ProjectSectionTitle({ children, color = 'text-black', dotColor, textAlign }: ProjectSectionTitleProps) {
  return (
    <h2 className={`text-4xl font-normal mb-2 ${color} ${textAlign}`}>
      {children}
      <span className={`text-[64px] ${dotColor}`}>.</span>
    </h2>
  )
}
