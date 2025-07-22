import React from 'react'

interface ProjectSectionTitleProps {
  children: React.ReactNode
  color?: string // Tailwind color class for main text
  dotColor?: string // Tailwind color class for dot
  textAlign?: string
  showBorder?: boolean // Whether to show the border under the title
  borderColor?: string
}

export default function ProjectSectionTitle({ children, color = 'text-black', dotColor, textAlign, showBorder = false, borderColor = 'border-[#C1C1C1]' }: ProjectSectionTitleProps) {
  return (
    <div className="flex flex-col mb-8 md:mb-12">
      <h2 className={`text-4xl font-normal mb-2 ${color} ${textAlign}`}>
        {children}
        <span className={`text-[64px] ${dotColor}`}>.</span>
      </h2>
      {showBorder && <div className={`border-t ${borderColor}`}></div>}
    </div>
  )
}
