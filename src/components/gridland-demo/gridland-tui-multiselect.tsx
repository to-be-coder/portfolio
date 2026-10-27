// Mirrors gridland/packages/demo/demos/focus.tsx (the demo on
// https://gridland.io/docs/interaction/focus). Components are vendored from
// @gridland/ui (which is private — never published to npm).
'use client'

import { FocusProvider, useFocusedShortcuts, useInteractive } from '@gridland/utils'
import { MultiSelect } from './vendor/multi-select'
import { StatusBar } from './vendor/status-bar'
import { useFocusBorderStyle } from './vendor/theme'
import { Box } from './vendor/primitives'

const focusMultiSelects = [
  {
    id: 'language',
    title: 'Language',
    items: [
      { label: 'TypeScript', value: 'ts' },
      { label: 'JavaScript', value: 'js' },
      { label: 'Python', value: 'py' },
      { label: 'Rust', value: 'rs' },
    ],
  },
  {
    id: 'framework',
    title: 'Framework',
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
    ],
  },
  {
    id: 'runtime',
    title: 'Runtime',
    items: [
      { label: 'Bun', value: 'bun' },
      { label: 'Node', value: 'node' },
      { label: 'Deno', value: 'deno' },
    ],
  },
]

function FocusMultiSelectPanel({
  id,
  title,
  items,
  autoFocus,
}: {
  id: string
  title: string
  items: { label: string; value: string }[]
  autoFocus?: boolean
}) {
  const { isFocused, isSelected, isAnySelected, focusRef } = useInteractive({ id })
  const { borderColor, borderStyle } = useFocusBorderStyle({ isFocused, isSelected, isAnySelected })

  return (
    <Box ref={focusRef} border borderStyle={borderStyle} borderColor={borderColor} flexGrow={1}>
      <Box flexDirection="column" paddingX={1} flexGrow={1}>
        <MultiSelect
          focusId={id}
          autoFocus={autoFocus}
          items={items}
          title={title}
          allowEmpty
          enableSelectAll={false}
          enableClear={false}
        />
      </Box>
    </Box>
  )
}

function FocusNavStatusBar() {
  const shortcuts = useFocusedShortcuts()
  return (
    <Box paddingX={1} paddingBottom={1}>
      <StatusBar items={shortcuts} />
    </Box>
  )
}

export function FocusApp() {
  return (
    <FocusProvider selectable>
      <Box flexDirection="column" flexGrow={1}>
        <Box flexDirection="row" gap={1} padding={1} flexGrow={1}>
          {focusMultiSelects.map((panel, i) => (
            <FocusMultiSelectPanel
              key={panel.id}
              id={panel.id}
              title={panel.title}
              items={panel.items}
              autoFocus={i === 0}
            />
          ))}
        </Box>
        <FocusNavStatusBar />
      </Box>
    </FocusProvider>
  )
}
