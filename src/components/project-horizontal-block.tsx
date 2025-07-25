import React from 'react'

interface HorizontalBlockProps {
  title: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
}

export default function ProjectHorizontalBlock({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]' }: HorizontalBlockProps) {
  return (
    <div className={`${borderColor} space-y-4 mb-8 md:mb-12 border-t pt-2`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className={`text-2xl ${titleColor}`}>{title}</h2>
        </div>
        <div className="md:col-span-2 space-y-2">{children}</div>
      </div>
    </div>
  )
}
