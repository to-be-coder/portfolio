import React from 'react'

interface VerticalStackProps {
  title?: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
  className?: string
}

export function VerticalStack({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]', className = '' }: VerticalStackProps) {
  return (
    <div className={`${borderColor} flex flex-col ${className}`}>
      {title && <h2 className={`text-2xl mb-2 md:mb-4 ${titleColor}`}>{title}</h2>}
      <div className="flex flex-col gap-y-4">{children}</div>
    </div>
  )
}

interface HorizontalStackProps {
  title?: React.ReactNode
  children: React.ReactNode
  titleColor?: string
  borderColor?: string
  className?: string
  mobileCols?: number
  desktopCols?: number
  gapClassName?: string
}

export function HorizontalStack({ title, children, titleColor = 'text-black', borderColor = 'border-[#000000]', className = '', mobileCols = 1, desktopCols = 3, gapClassName }: HorizontalStackProps) {
  const gridColsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }

  const mobileColClass = gridColsMap[mobileCols] || 'grid-cols-1'
  const desktopColClass = `md:${gridColsMap[desktopCols] || 'grid-cols-3'}`
  const gapClass = gapClassName || 'gap-4'

  return (
    <div className={`${borderColor} flex flex-col ${className}`}>
      {title && <h2 className={`text-2xl mb-2 md:mb-4 ${titleColor}`}>{title}</h2>}
      <div className={`grid ${mobileColClass} ${desktopColClass} ${gapClass}`}>{children}</div>
    </div>
  )
}
