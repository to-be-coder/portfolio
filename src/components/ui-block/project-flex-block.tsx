import React from 'react'

interface ProjectFlexBlockProps {
  left: React.ReactNode
  right: React.ReactNode
  reverseOnDesktop?: boolean
  leftClassName?: string
  rightClassName?: string
  containerClassName?: string
  gapClassName?: string
}

export default function ProjectFlexBlock({
  left,
  right,
  reverseOnDesktop = false,
  leftClassName = '',
  rightClassName = '',
  containerClassName = '',
  gapClassName = 'flex gap-x-8 flex-col md:flex-row gap-y-8 lg:gap-y-0',
}: ProjectFlexBlockProps) {
  return (
    <div className={`${gapClassName} ${containerClassName}`}>
      <div className={`flex-1 ${leftClassName} ${reverseOnDesktop ? 'order-last md:order-first' : 'order-first'}`}>{left}</div>
      <div className={`flex-1 ${rightClassName} ${reverseOnDesktop ? 'order-first md:order-last' : 'order-last'}`}>{right}</div>
    </div>
  )
}
