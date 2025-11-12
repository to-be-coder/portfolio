import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ProjectHorizontalCardProps {
  leftContent: ReactNode
  rightContent: ReactNode
  badge?: string
  badgeColor?: string
  border?: boolean
  borderColor?: string
  bgColor?: string
  className?: string
}

export default function ProjectHorizontalCard({
  leftContent,
  rightContent,
  badge,
  badgeColor = 'bg-[#9333EA]',
  border = false,
  borderColor = 'border-[#9333EA]',
  bgColor = 'bg-gray-100',
  className,
}: ProjectHorizontalCardProps) {
  return (
    <div className={cn('rounded-xl p-6 relative flex gap-4', bgColor, border && `border-2 ${borderColor}`, className)}>
      {badge && <div className={cn('absolute -top-3 left-4 text-white px-3 py-1 text-sm font-semibold rounded-xl', badgeColor)}>{badge}</div>}
      <div className="flex flex-col flex-1 justify-between">{leftContent}</div>
      <div className="flex-1">{rightContent}</div>
    </div>
  )
}
