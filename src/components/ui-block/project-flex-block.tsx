import { cn } from '@/lib/utils'
import React from 'react'

interface ProjectFlexBlockProps {
  left?: React.ReactNode
  right?: React.ReactNode
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  reverseOnDesktop?: boolean
  leftClassName?: string
  rightClassName?: string
  containerClassName?: string
  gapClassName?: string
  // Card variant props
  variant?: 'default' | 'card'
  badge?: string
  badgeColor?: string
  border?: boolean
  borderColor?: string
  bgColor?: string
}

export default function ProjectFlexBlock({
  left,
  right,
  leftContent,
  rightContent,
  reverseOnDesktop = false,
  leftClassName = '',
  rightClassName = '',
  containerClassName = '',
  gapClassName,
  variant = 'default',
  badge,
  badgeColor = 'bg-[#9333EA]',
  border = false,
  borderColor = 'border-[#9333EA]',
  bgColor = 'bg-gray-100',
}: ProjectFlexBlockProps) {
  // Support both prop names for backward compatibility
  const leftContent_ = left || leftContent
  const rightContent_ = right || rightContent

  // If using card variant with leftContent/rightContent, auto-set variant to card
  const finalVariant = variant === 'default' && (leftContent || rightContent) ? 'card' : variant
  const isCard = finalVariant === 'card'

  const defaultGapClassName = 'flex gap-x-8 flex-col md:flex-row gap-y-8 lg:gap-y-0'
  const cardGapClassName = 'flex gap-4'

  const containerClasses = isCard
    ? cn('rounded-xl p-6 relative', cardGapClassName, bgColor, border && `border-2 ${borderColor}`, containerClassName)
    : cn(gapClassName || defaultGapClassName, containerClassName)

  const leftClasses = isCard ? 'flex flex-col flex-1 justify-between' : cn('flex-1', leftClassName, reverseOnDesktop ? 'order-last md:order-first' : 'order-first')

  const rightClasses = isCard ? 'flex-1' : cn('flex-1', rightClassName, reverseOnDesktop ? 'order-first md:order-last' : 'order-last')

  return (
    <div className={containerClasses}>
      {badge && isCard && <div className={cn('absolute -top-3 left-4 text-white px-3 py-1 text-sm font-semibold rounded-xl', badgeColor)}>{badge}</div>}
      <div className={leftClasses}>{leftContent_}</div>
      <div className={rightClasses}>{rightContent_}</div>
    </div>
  )
}
