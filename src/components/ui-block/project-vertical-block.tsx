import React from 'react'

interface SectionProps {
  title?: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
  className?: string
}

export default function VerticalBlock({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]', className = '' }: SectionProps) {
  return (
    <div className={`${borderColor} flex flex-col ${className}`}>
      <h2 className={`text-2xl mb-2 md:mb-4 ${titleColor}`}>{title}</h2>
      <div className="flex flex-col gap-y-2">{children}</div>
    </div>
  )
}
