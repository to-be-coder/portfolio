import React from 'react'

interface HorizontalCardProps {
  title: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
  bgColor?: string
  className?: string
}

export function HorizontalCard({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]', bgColor = 'bg-gray-100', className = '' }: HorizontalCardProps) {
  return (
    <div className={`${borderColor} space-y-4 ${bgColor} p-4 rounded-xl ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h3 className={`text-lg ${titleColor}`}>{title}</h3>
        </div>
        <div className="md:col-span-2 space-y-2">{children}</div>
      </div>
    </div>
  )
}

interface VerticalCardProps {
  title?: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  contentColor?: string
  bgColor?: string
  className?: string
}

export function VerticalCard({ title = null, children, titleColor = 'text-black', contentColor = 'text-black', bgColor = 'bg-gray-100', className = '' }: VerticalCardProps) {
  return (
    <div className={`flex flex-col ${bgColor} p-4 rounded-xl ${className}`}>
      {title && <span className={`font-semibold mb-2 ${titleColor}`}>{title}</span>}
      <div className={contentColor}>{children}</div>
    </div>
  )
}
