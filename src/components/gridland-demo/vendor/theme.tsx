// Vendored from @gridland/ui — packages/ui/lib/theme/*
'use client'

import { createContext, useContext, type ReactNode } from 'react'

// Vendored from @gridland/utils — packages/utils/src/focus-border.ts
// (Not in the published @gridland/utils@0.4.3 npm package yet.)
export interface FocusBorderColors {
  selected: string
  focused: string
  idle: string
}

export interface FocusBorderState {
  isFocused: boolean
  isSelected: boolean
  isAnySelected: boolean
}

export interface FocusBorderResult {
  borderColor: string
  borderStyle: 'rounded' | 'dashed'
}

function getFocusBorderStyle(state: FocusBorderState, colors: FocusBorderColors): FocusBorderResult {
  const borderColor = state.isSelected
    ? colors.selected
    : state.isAnySelected
      ? 'transparent'
      : state.isFocused
        ? colors.focused
        : colors.idle

  const borderStyle = state.isFocused && !state.isSelected ? ('dashed' as const) : ('rounded' as const)

  return { borderColor, borderStyle }
}

export interface Theme {
  primary: string
  accent: string
  secondary: string
  muted: string
  placeholder: string
  border: string
  borderMuted: string
  foreground: string
  background: string
  success: string
  error: string
  warning: string
  focusSelected: string
  focusFocused: string
  focusIdle: string
  messageAssistant: string
  messageUser: string
}

export const darkTheme: Theme = {
  primary: '#FF71CE',
  accent: '#01CDFE',
  secondary: '#B967FF',
  muted: '#A69CBD',
  placeholder: '#CEC7DE',
  border: '#B967FF',
  borderMuted: '#2A2A2A',
  foreground: '#F0E6FF',
  background: '#0D0B10',
  success: '#05FFA1',
  error: '#FF6B6B',
  warning: '#FFC164',
  focusSelected: '#FF71CE',
  focusFocused: '#e065b8',
  focusIdle: '#33192a',
  messageAssistant: '#2a2a4a',
  messageUser: '#2a3a3a',
}

const ThemeContext = createContext<Theme>(darkTheme)

export interface ThemeProviderProps {
  theme: Theme
  children: ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme(): Theme {
  return useContext(ThemeContext)
}

export function useFocusBorderStyle(state: FocusBorderState): FocusBorderResult {
  const theme = useTheme()
  return getFocusBorderStyle(state, {
    selected: theme.focusSelected,
    focused: theme.focusFocused,
    idle: theme.focusIdle,
  })
}
