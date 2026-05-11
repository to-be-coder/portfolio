// @ts-nocheck
// Vendored from @gridland/ui — packages/ui/components/status-bar/status-bar.tsx
import type { ReactNode } from 'react'
import { textStyle } from './text-style'
import { useTheme } from './theme'

export interface StatusBarItem {
  key: string
  label: string
}

export interface StatusBarProps {
  items: StatusBarItem[]
  extra?: ReactNode
}

export function StatusBar({ items, extra }: StatusBarProps) {
  const theme = useTheme()
  const parts: any[] = []

  if (extra != null) {
    parts.push(<span key="extra">{extra}</span>)
    if (items.length > 0) {
      parts.push(
        <span key="pipe" style={textStyle({ dim: true, fg: theme.placeholder })}>
          {'  │  '}
        </span>,
      )
    }
  }

  items.forEach((item, i) => {
    if (i > 0) {
      parts.push(<span key={'gap-' + i}>{' '}</span>)
    }
    parts.push(
      <span key={'key-' + i} style={textStyle({ bold: true, fg: theme.background, bg: theme.muted })}>
        {' ' + item.key + ' '}
      </span>,
    )
    parts.push(
      <span key={'label-' + i} style={textStyle({ dim: true, fg: theme.placeholder })}>
        {' ' + item.label}
      </span>,
    )
  })

  if (parts.length === 0) return null

  return <text>{parts}</text>
}
