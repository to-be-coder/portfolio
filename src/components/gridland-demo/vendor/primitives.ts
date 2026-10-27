import type { ComponentType, ReactNode, Ref } from 'react'

type HostProps = {
  children?: ReactNode
}

type BoxProps = HostProps & {
  ref?: Ref<unknown>
  flexDirection?: 'row' | 'column'
  flexGrow?: number
  padding?: number
  paddingX?: number
  paddingBottom?: number
  gap?: number
  border?: boolean
  borderStyle?: 'rounded' | 'dashed'
  borderColor?: string
}

type SpanProps = HostProps & {
  style?: { fg?: string; bg?: string; attributes?: number }
}

// These strings are host elements in Gridland's custom reconciler, not DOM nodes.
// Keep their types local rather than widening React's HTML/SVG attributes globally.
export const Box = 'box' as unknown as ComponentType<BoxProps>
export const Text = 'text' as unknown as ComponentType<HostProps>
export const Span = 'span' as unknown as ComponentType<SpanProps>
