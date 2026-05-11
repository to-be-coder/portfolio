// @ts-nocheck
'use client'

import { TUI } from '@gridland/web'
import { FocusApp } from './gridland-tui-multiselect'
import { ThemeProvider, darkTheme } from './vendor/theme'

export default function GridlandMultiSelectApp() {
  return (
    <TUI style={{ width: '100%', height: '100%' }} backgroundColor={darkTheme.background}>
      <ThemeProvider theme={darkTheme}>
        <FocusApp />
      </ThemeProvider>
    </TUI>
  )
}
