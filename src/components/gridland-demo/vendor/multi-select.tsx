// Vendored from @gridland/ui — packages/ui/components/multi-select/multi-select.tsx
import { useCallback, useEffect, useLayoutEffect, useReducer, useMemo, useRef } from 'react'
import { textStyle } from './text-style'
import { useTheme } from './theme'
import { useInteractive, type KeyEvent } from '@gridland/utils'
import { Box, Span, Text } from './primitives'

export type MultiSelectItem<V> = {
  key?: string
  label: string
  value: V
  group?: string
  disabled?: boolean
}

export interface MultiSelectProps<V> {
  items?: MultiSelectItem<V>[]
  defaultSelected?: V[]
  selected?: V[]
  onChange?: (values: V[]) => void
  disabled?: boolean
  invalid?: boolean
  errorMessage?: string
  required?: boolean
  placeholder?: string
  maxCount?: number
  title?: string
  submittedStatus?: string
  limit?: number
  enableSelectAll?: boolean
  enableClear?: boolean
  highlightColor?: string
  checkboxColor?: string
  allowEmpty?: boolean
  onSubmit?: (values: V[]) => void
  focusId?: string
  autoFocus?: boolean
}

type State<V> = { cursor: number; selected: Set<V>; submitted: boolean }
type Action<V> =
  | { type: 'SET_CURSOR'; cursor: number }
  | { type: 'SET_SELECTED'; values: V[] }
  | { type: 'SUBMIT' }

function reducer<V>(state: State<V>, action: Action<V>): State<V> {
  switch (action.type) {
    case 'SET_CURSOR':
      return { ...state, cursor: action.cursor }
    case 'SET_SELECTED':
      return { ...state, selected: new Set(action.values) }
    case 'SUBMIT':
      return { ...state, submitted: true }
    default:
      return state
  }
}

const VISIBLE = 12
const BAR = '│'
const CHECKED = '●'
const UNCHECKED = '○'
const CURSOR = '▸'
const SEPARATOR = '─'

type Row<V> =
  | { type: 'group'; label: string }
  | { type: 'separator' }
  | { type: 'item'; item: MultiSelectItem<V>; index: number }

export function MultiSelect<V>({
  items = [],
  defaultSelected = [],
  selected: controlledSelected,
  onChange,
  disabled = false,
  invalid = false,
  errorMessage = 'Please select at least one option',
  required = false,
  placeholder,
  maxCount,
  title = 'Select',
  submittedStatus = 'submitted',
  limit,
  enableSelectAll = true,
  enableClear = true,
  highlightColor,
  checkboxColor,
  allowEmpty = false,
  onSubmit,
  focusId,
  autoFocus,
}: MultiSelectProps<V>) {
  const theme = useTheme()
  const { onKey, focusRef } = useInteractive({
    id: focusId,
    autoFocus,
    disabled,
    shortcuts: ({ isSelected }) =>
      isSelected
        ? [
            { key: '↑↓', label: 'move' },
            { key: 'space', label: 'toggle' },
            { key: 'a', label: 'all' },
            { key: 'x', label: 'clear' },
            { key: 'enter', label: 'submit' },
            { key: 'esc', label: 'back' },
          ]
        : [
            { key: '←→', label: 'navigate' },
            { key: 'enter', label: 'select' },
          ],
  })
  const resolvedHighlight = highlightColor ?? theme.primary
  const resolvedCheckbox = checkboxColor ?? theme.accent

  const isControlled = controlledSelected !== undefined
  const controlledRef = useRef(isControlled)
  useEffect(() => {
    if (controlledRef.current !== isControlled) {
      console.warn('MultiSelect: switching between controlled and uncontrolled is not supported.')
    }
  }, [isControlled])

  const [state, dispatch] = useReducer(reducer<V>, {
    cursor: 0,
    selected: new Set(isControlled ? controlledSelected : defaultSelected),
    submitted: false,
  })

  const currentSelected = useMemo(
    () => (isControlled ? new Set(controlledSelected) : state.selected),
    [isControlled, controlledSelected, state.selected],
  )

  const { flatRows, selectableItems } = useMemo(() => {
    const rows: Row<V>[] = []
    const selectable: Array<{ item: MultiSelectItem<V>; index: number }> = []
    let index = 0
    const grouped = new Map<string, MultiSelectItem<V>[]>()
    for (const item of items) {
      const group = item.group ?? ''
      const list = grouped.get(group) ?? []
      list.push(item)
      grouped.set(group, list)
    }
    let first = true
    for (const [group, groupItems] of grouped) {
      if (!first) rows.push({ type: 'separator' })
      first = false
      if (group) rows.push({ type: 'group', label: group })
      for (const item of groupItems) {
        rows.push({ type: 'item', item, index })
        selectable.push({ item, index })
        index++
      }
    }
    return { flatRows: rows, selectableItems: selectable }
  }, [items])

  const hasSubmitRow = allowEmpty || currentSelected.size > 0
  const totalPositions = selectableItems.length + (hasSubmitRow ? 1 : 0)
  const cursor = totalPositions > 0 ? Math.min(state.cursor, totalPositions - 1) : 0

  const cursorRef = useRef(cursor)
  const currentSelectedRef = useRef(currentSelected)
  const selectableItemsRef = useRef(selectableItems)
  const submittedRef = useRef(state.submitted)
  useLayoutEffect(() => {
    cursorRef.current = cursor
    currentSelectedRef.current = currentSelected
    selectableItemsRef.current = selectableItems
    submittedRef.current = state.submitted
  }, [cursor, currentSelected, selectableItems, state.submitted])

  const isOnSubmit = hasSubmitRow && cursor === selectableItems.length
  const visibleCount = limit ?? VISIBLE
  const cursorRowIndex = flatRows.findIndex((r) => r.type === 'item' && r.index === cursor)
  const scrollOffset = Math.max(0, Math.min(cursorRowIndex - Math.floor(visibleCount / 2), flatRows.length - visibleCount))
  const visibleRows = flatRows.slice(scrollOffset, scrollOffset + visibleCount)

  const setSelected = useCallback((values: V[]) => {
    if (!isControlled) dispatch({ type: 'SET_SELECTED', values })
    onChange?.(values)
  }, [isControlled, onChange])

  const diamondColor = invalid ? theme.error : disabled ? theme.muted : theme.accent

  useLayoutEffect(() => {
    onKey((event: KeyEvent) => {
      if (submittedRef.current || disabled) return
      const sel = currentSelectedRef.current
      const selItems = selectableItemsRef.current
      const hasSubmit = allowEmpty || sel.size > 0
      const total = selItems.length + (hasSubmit ? 1 : 0)

      const move = (direction: 1 | -1) => {
        let next = cursorRef.current
        for (let i = 0; i < total; i++) {
          next += direction
          if (next < 0) next = total - 1
          if (next >= total) next = 0
          if (next >= selItems.length || !selItems[next]?.item.disabled) break
        }
        cursorRef.current = next
        dispatch({ type: 'SET_CURSOR', cursor: next })
      }

      if (event.name === 'up' || event.name === 'k') {
        move(-1)
        event.preventDefault?.()
      } else if (event.name === 'down' || event.name === 'j') {
        move(1)
        event.preventDefault?.()
      } else if (event.name === 'return' || event.name === 'space') {
        const onSubmitRow = hasSubmit && cursorRef.current === selItems.length
        if (onSubmitRow) {
          submittedRef.current = true
          dispatch({ type: 'SUBMIT' })
          onSubmit?.(Array.from(sel))
        } else {
          const current = selItems[cursorRef.current]
          if (current && !current.item.disabled) {
            const isDeselecting = sel.has(current.item.value)
            if (!isDeselecting && maxCount !== undefined && sel.size >= maxCount) return
            const next = new Set(sel)
            if (isDeselecting) next.delete(current.item.value)
            else next.add(current.item.value)
            setSelected(Array.from(next))
          }
        }
        event.preventDefault?.()
      } else if (event.name === 'a' && enableSelectAll) {
        const enabledValues = items.filter((i) => !i.disabled).map((i) => i.value)
        setSelected(maxCount !== undefined ? enabledValues.slice(0, maxCount) : enabledValues)
        event.preventDefault?.()
      } else if (event.name === 'x' && enableClear) {
        setSelected([])
        event.preventDefault?.()
      }
    })
    return () => onKey(() => {})
  }, [onKey, disabled, allowEmpty, onSubmit, maxCount, setSelected, enableSelectAll, enableClear, items])

  if (state.submitted) {
    const selectedItems = items.filter((i) => currentSelected.has(i.value))
    return (
      <Box ref={focusRef} flexDirection="column">
        <Text>
          <Span style={textStyle({ fg: theme.success })}>{'◆ '}</Span>
          <Span style={textStyle({ bold: true, fg: theme.foreground })}>{title}</Span>
        </Text>
        {selectedItems.map((item) => (
          <Text key={item.key ?? String(item.value)}>
            <Span style={textStyle({ fg: theme.success })}>{BAR + ' '}</Span>
            <Span>{'  '}</Span>
            <Span style={textStyle({ fg: theme.success })}>{CHECKED + ' '}</Span>
            <Span style={textStyle({ fg: theme.foreground })}>{item.label}</Span>
          </Text>
        ))}
        <Text> </Text>
        <Text>
          <Span style={textStyle({ dim: true, fg: theme.muted })}>
            {selectedItems.length + ' selected — ' + submittedStatus}
          </Span>
        </Text>
      </Box>
    )
  }

  const hasItems = selectableItems.length > 0

  return (
    <Box ref={focusRef} flexDirection="column">
      <Text>
        <Span style={textStyle({ fg: diamondColor, dim: disabled })}>{'◆ '}</Span>
        <Span style={textStyle({ bold: true, dim: disabled, fg: theme.foreground })}>{title}</Span>
        {required && <Span style={textStyle({ fg: theme.error })}>{' *'}</Span>}
        {maxCount !== undefined && (
          <Span style={textStyle({ dim: true, fg: theme.muted })}>{` (${currentSelected.size}/${maxCount})`}</Span>
        )}
      </Text>
      {invalid && (
        <Text>
          <Span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</Span>
          <Span style={textStyle({ fg: theme.error })}>{'  ' + errorMessage}</Span>
        </Text>
      )}
      {!hasItems && placeholder && (
        <Text>
          <Span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</Span>
          <Span style={textStyle({ dim: true, fg: theme.muted })}>{'  ' + placeholder}</Span>
        </Text>
      )}
      {visibleRows.map((row, i) => {
        if (row.type === 'separator') {
          const flatIndex = scrollOffset + i
          return (
            <Text key={'sep-' + flatIndex}>
              <Span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</Span>
              <Span style={textStyle({ fg: theme.muted })}>{'  ' + SEPARATOR.repeat(20)}</Span>
            </Text>
          )
        }
        if (row.type === 'group') {
          return (
            <Text key={'group-' + row.label}>
              <Span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</Span>
              <Span style={textStyle({ bold: true, fg: theme.muted })}>{' ' + row.label}</Span>
            </Text>
          )
        }
        const { item, index: itemIndex } = row
        const isHighlighted = !disabled && itemIndex === cursor
        const isSelected = currentSelected.has(item.value)
        const isItemDisabled = disabled || !!item.disabled
        const itemColor = isItemDisabled
          ? theme.muted
          : isHighlighted
            ? resolvedHighlight
            : isSelected
              ? resolvedCheckbox
              : theme.foreground

        return (
          <Text key={item.key ?? String(item.value)}>
            <Span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</Span>
            <Span style={textStyle({ fg: isHighlighted ? resolvedHighlight : undefined })}>
              {(isHighlighted ? CURSOR : ' ') + ' '}
            </Span>
            <Span style={textStyle({ fg: isSelected && !isItemDisabled ? resolvedCheckbox : theme.muted, dim: isItemDisabled })}>
              {(isSelected ? CHECKED : UNCHECKED) + ' '}
            </Span>
            <Span style={textStyle({ fg: itemColor, dim: isItemDisabled })}>{item.label}</Span>
          </Text>
        )
      })}
      {hasSubmitRow && (
        <Text>
          <Span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</Span>
          <Span style={textStyle({ fg: isOnSubmit ? resolvedHighlight : undefined })}>
            {(isOnSubmit ? CURSOR : ' ') + ' '}
          </Span>
          <Span style={textStyle({ fg: isOnSubmit ? resolvedHighlight : theme.muted })}>{'↳ '}</Span>
          <Span style={textStyle({ fg: isOnSubmit ? resolvedHighlight : theme.foreground })}>{'Submit'}</Span>
        </Text>
      )}
    </Box>
  )
}
