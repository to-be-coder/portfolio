// @ts-nocheck
// Vendored from @gridland/ui — packages/ui/components/multi-select/multi-select.tsx
import { useReducer, useMemo, useRef } from 'react'
import { textStyle } from './text-style'
import { useTheme } from './theme'
import { useInteractive } from '@gridland/utils'

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
  const interactive = useInteractive({
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
  if (controlledRef.current !== isControlled) {
    console.warn('MultiSelect: switching between controlled and uncontrolled is not supported.')
  }

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
  cursorRef.current = cursor
  const currentSelectedRef = useRef(currentSelected)
  currentSelectedRef.current = currentSelected
  const selectableItemsRef = useRef(selectableItems)
  selectableItemsRef.current = selectableItems
  const submittedRef = useRef(state.submitted)
  submittedRef.current = state.submitted

  const isOnSubmit = hasSubmitRow && cursor === selectableItems.length
  const visibleCount = limit ?? VISIBLE
  const cursorRowIndex = flatRows.findIndex((r) => r.type === 'item' && r.index === cursor)
  const scrollOffset = Math.max(0, Math.min(cursorRowIndex - Math.floor(visibleCount / 2), flatRows.length - visibleCount))
  const visibleRows = flatRows.slice(scrollOffset, scrollOffset + visibleCount)

  const setSelected = (values: V[]) => {
    if (!isControlled) dispatch({ type: 'SET_SELECTED', values })
    onChange?.(values)
  }

  const diamondColor = invalid ? theme.error : disabled ? theme.muted : theme.accent

  interactive.onKey((event: any) => {
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

  if (state.submitted) {
    const selectedItems = items.filter((i) => currentSelected.has(i.value))
    return (
      <box ref={interactive.focusRef} flexDirection="column">
        <text>
          <span style={textStyle({ fg: theme.success })}>{'◆ '}</span>
          <span style={textStyle({ bold: true, fg: theme.foreground })}>{title}</span>
        </text>
        {selectedItems.map((item) => (
          <text key={item.key ?? String(item.value)}>
            <span style={textStyle({ fg: theme.success })}>{BAR + ' '}</span>
            <span>{'  '}</span>
            <span style={textStyle({ fg: theme.success })}>{CHECKED + ' '}</span>
            <span style={textStyle({ fg: theme.foreground })}>{item.label}</span>
          </text>
        ))}
        <text> </text>
        <text>
          <span style={textStyle({ dim: true, fg: theme.muted })}>
            {selectedItems.length + ' selected — ' + submittedStatus}
          </span>
        </text>
      </box>
    )
  }

  const hasItems = selectableItems.length > 0

  return (
    <box ref={interactive.focusRef} flexDirection="column">
      <text>
        <span style={textStyle({ fg: diamondColor, dim: disabled })}>{'◆ '}</span>
        <span style={textStyle({ bold: true, dim: disabled, fg: theme.foreground })}>{title}</span>
        {required && <span style={textStyle({ fg: theme.error })}>{' *'}</span>}
        {maxCount !== undefined && (
          <span style={textStyle({ dim: true, fg: theme.muted })}>{` (${currentSelected.size}/${maxCount})`}</span>
        )}
      </text>
      {invalid && (
        <text>
          <span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</span>
          <span style={textStyle({ fg: theme.error })}>{'  ' + errorMessage}</span>
        </text>
      )}
      {!hasItems && placeholder && (
        <text>
          <span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</span>
          <span style={textStyle({ dim: true, fg: theme.muted })}>{'  ' + placeholder}</span>
        </text>
      )}
      {visibleRows.map((row, i) => {
        if (row.type === 'separator') {
          const flatIndex = scrollOffset + i
          return (
            <text key={'sep-' + flatIndex}>
              <span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</span>
              <span style={textStyle({ fg: theme.muted })}>{'  ' + SEPARATOR.repeat(20)}</span>
            </text>
          )
        }
        if (row.type === 'group') {
          return (
            <text key={'group-' + row.label}>
              <span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</span>
              <span style={textStyle({ bold: true, fg: theme.muted })}>{' ' + row.label}</span>
            </text>
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
          <text key={item.key ?? String(item.value)}>
            <span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</span>
            <span style={textStyle({ fg: isHighlighted ? resolvedHighlight : undefined })}>
              {(isHighlighted ? CURSOR : ' ') + ' '}
            </span>
            <span style={textStyle({ fg: isSelected && !isItemDisabled ? resolvedCheckbox : theme.muted, dim: isItemDisabled })}>
              {(isSelected ? CHECKED : UNCHECKED) + ' '}
            </span>
            <span style={textStyle({ fg: itemColor, dim: isItemDisabled })}>{item.label}</span>
          </text>
        )
      })}
      {hasSubmitRow && (
        <text>
          <span style={textStyle({ fg: theme.muted })}>{BAR + ' '}</span>
          <span style={textStyle({ fg: isOnSubmit ? resolvedHighlight : undefined })}>
            {(isOnSubmit ? CURSOR : ' ') + ' '}
          </span>
          <span style={textStyle({ fg: isOnSubmit ? resolvedHighlight : theme.muted })}>{'↳ '}</span>
          <span style={textStyle({ fg: isOnSubmit ? resolvedHighlight : theme.foreground })}>{'Submit'}</span>
        </text>
      )}
    </box>
  )
}
