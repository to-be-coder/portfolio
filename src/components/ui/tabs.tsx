'use client'

import { cn } from '@/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { createContext, useContext, useState } from 'react'

const TabsContext = createContext<{ value?: string; onValueChange?: (value: string) => void; pillBgColor?: string }>({})

function Tabs({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  pillBgColor = 'bg-black dark:bg-input/30',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { pillBgColor?: string }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '')
  const value = controlledValue ?? uncontrolledValue

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setUncontrolledValue(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange, pillBgColor }}>
      <TabsPrimitive.Root data-slot="tabs" value={value} onValueChange={handleValueChange} className={cn('flex flex-col gap-2', className)} {...props} />
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn('bg-gray-100 text-black inline-flex h-9 w-fit items-center justify-center rounded-full p-[3px]', className)} {...props} />
}

function TabsTrigger({ className, children, value, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { value: selectedValue, pillBgColor } = useContext(TabsContext)
  const isActive = selectedValue === value

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "data-[state=active]:text-white dark:data-[state=active]:text-[#FAFAFA] focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer relative rounded-full transition-colors",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.span layoutId="pill-tab" transition={{ type: 'spring', duration: 0.5 }} className={cn('absolute inset-0 z-0 rounded-full', pillBgColor)} style={{ pointerEvents: 'none' }} />
      )}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />
}

type ChipProps = {
  text: string
  selected: boolean
  setSelected: (text: string) => void
}

const Chip = ({ text, selected, setSelected }: ChipProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? 'text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      } text-sm transition-colors px-4 py-2 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: 'spring', duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        />
      )}
    </button>
  )
}

type ChipTabsProps = {
  tabs: string[]
  selected?: string
  onSelectionChange?: (tab: string) => void
  className?: string
}

export const ChipTabs = ({ tabs, selected: controlledSelected, onSelectionChange, className }: ChipTabsProps) => {
  const [uncontrolledSelected, setUncontrolledSelected] = useState(tabs[0])
  const selected = controlledSelected ?? uncontrolledSelected

  const handleSelection = (tab: string) => {
    if (onSelectionChange) {
      onSelectionChange(tab)
    } else {
      setUncontrolledSelected(tab)
    }
  }

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className || ''}`}>
      {tabs.map((tab) => (
        <Chip text={tab} selected={selected === tab} setSelected={handleSelection} key={tab} />
      ))}
    </div>
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
