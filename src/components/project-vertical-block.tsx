import React from 'react'

interface SectionProps {
  title: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
}

export default function VerticalBlock({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]' }: SectionProps) {
  return (
    <div className={`border-t ${borderColor} pt-2 flex flex-col mb-8 md:mb-12`}>
      <h2 className={`text-2xl font-regular mb-2 md:mb-4 ${titleColor}`}>{title}</h2>
      {children}
    </div>
  )
}
