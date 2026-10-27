// Vendored from @gridland/ui — packages/ui/components/status-bar/status-bar.tsx
import type { ReactNode } from 'react'
import { textStyle } from './text-style'
import { useTheme } from './theme'
import { Span, Text } from './primitives'

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
  const parts: ReactNode[] = []

  if (extra != null) {
    parts.push(<Span key="extra">{extra}</Span>)
    if (items.length > 0) {
      parts.push(
        <Span key="pipe" style={textStyle({ dim: true, fg: theme.placeholder })}>
          {'  │  '}
        </Span>,
      )
    }
  }

  items.forEach((item, i) => {
    if (i > 0) {
      parts.push(<Span key={'gap-' + i}>{' '}</Span>)
    }
    parts.push(
      <Span key={'key-' + i} style={textStyle({ bold: true, fg: theme.background, bg: theme.muted })}>
        {' ' + item.key + ' '}
      </Span>,
    )
    parts.push(
      <Span key={'label-' + i} style={textStyle({ dim: true, fg: theme.placeholder })}>
        {' ' + item.label}
      </Span>,
    )
  })

  if (parts.length === 0) return null

  return <Text>{parts}</Text>
}
