import React from 'react'

interface ProjectPullQuoteProps {
  children: React.ReactNode
  className?: string
}

export default function ProjectPullQuote({ children, className = '' }: ProjectPullQuoteProps) {
  return <p className={`text-[24px] lg:text-[32px] font-medium text-center text-black ${className}`}>{children}</p>
}
