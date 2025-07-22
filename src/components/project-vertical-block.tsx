import React from 'react'

interface SectionProps {
  title: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
}

export default function VerticalBlock({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]' }: SectionProps) {
  return (
    <div className="flex flex-col">
      <div className={`flex-1 border-t ${borderColor} pt-2`}>
        <h2 className={`text-2xl font-regular mb-2 md:mb-4 ${titleColor}`}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
