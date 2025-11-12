import React from 'react'

interface VerticalStackProps {
  title?: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
  className?: string
}

export default function VerticalStack({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]', className = '' }: VerticalStackProps) {
  return (
    <div className={`${borderColor} flex flex-col ${className}`}>
      <h2 className={`text-2xl mb-2 md:mb-4 ${titleColor}`}>{title}</h2>
      <div className="flex flex-col gap-y-2">{children}</div>
    </div>
  )
}
