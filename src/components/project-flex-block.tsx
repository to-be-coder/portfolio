import React from 'react'

interface ProjectFlexBlockProps {
  left: React.ReactNode
  right: React.ReactNode
  /**
   * If true, swaps the order of left/right on desktop (lg+)
   * Useful for alternating layouts.
   */
  reverseOnDesktop?: boolean
  /**
   * Optional border and color classes for the left and right blocks
   */
  leftClassName?: string
  rightClassName?: string
  /**
   * Optional class for the flex container
   */
  containerClassName?: string
  /**
   * Optional gap classes (default: gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0)
   */
  gapClassName?: string
}

export default function ProjectFlexBlock({
  left,
  right,
  reverseOnDesktop = false,
  leftClassName = '',
  rightClassName = '',
  containerClassName = '',
  gapClassName = 'flex gap-x-8 flex-col lg:flex-row gap-y-8 lg:gap-y-0',
}: ProjectFlexBlockProps) {
  return (
    <div className={`${gapClassName} ${containerClassName}`}>
      <div className={`flex-1 ${leftClassName} ${reverseOnDesktop ? 'order-last lg:order-first' : 'order-first'}`}>{left}</div>
      <div className={`flex-1 ${rightClassName} ${reverseOnDesktop ? 'order-first lg:order-last' : 'order-last'}`}>{right}</div>
    </div>
  )
}
