import React from 'react'

interface SectionProps {
  title: React.ReactNode
  children: React.ReactNode
  titleColor?: string
}

export default function VerticalBlock({ title, children, titleColor = 'text-black' }: SectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex-1 border-t border-[#C1C1C1] pt-2">
        <h2 className={`text-2xl font-regular mb-2 md:mb-4 ${titleColor}`}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
