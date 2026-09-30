'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { MotionConfig, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary font-medium border-none hover:bg-secondary font-semibold text-white disabled:bg-transparent disabled:text-transparent',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-secondary',
        secondary: 'bg-secondary font-medium border-none hover:bg-secondary-hover font-semibold text-secondary-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        contact: 'bg-white font-medium hover:text-secondary/10 text-6xl',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export interface CallToActionButtonProps extends Omit<ButtonProps, 'children' | 'variant'> {
  children: React.ReactNode
  arrowColor?: string
}

const CallToActionButton = React.forwardRef<HTMLButtonElement, CallToActionButtonProps>(({ className, size, children, arrowColor = 'text-black', asChild, ...props }, ref) => {
  const iconElement = (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="flex h-2 w-2 items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300 group-hover:h-6 group-hover:w-6">
        <span className="-translate-x-full text-black opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-500 [&_svg]:h-3 [&_svg]:w-3">
          <ArrowRight strokeWidth={2.5} className={arrowColor} />
        </span>
      </span>
    </span>
  )

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { className?: string }>
    return (
      <Button
        ref={ref}
        size={size}
        className={cn('group relative rounded-full bg-black pl-2 text-white transition-colors duration-300 hover:bg-black hover:text-white', className)}
        asChild={asChild}
        {...props}
      >
        {React.cloneElement(child, {
          className: cn('inline-flex items-center gap-2 leading-none', child.props.className),
          children: (
            <>
              {iconElement}
              <span className="inline-block translate-y-[0.7px]">{child.props.children}</span>
            </>
          ),
        })}
      </Button>
    )
  }

  return (
    <Button
      ref={ref}
      size={size}
      className={cn('group relative rounded-full bg-gray-200 text-black transition-all duration-300 hover:bg-black hover:text-white leading-none', className)}
      {...props}
    >
      {iconElement}
      <span className="inline-block -translate-y-[1px]">{children}</span>
    </Button>
  )
})
CallToActionButton.displayName = 'CallToActionButton'

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: '50%',
    },
  },
}

export interface HamburgerButtonProps {
  active?: boolean
  onToggle?: (active: boolean) => void
  className?: string
  'aria-label'?: string
  'aria-expanded'?: boolean
}

const HamburgerButton = React.forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  ({ active: controlledActive, onToggle, className, 'aria-label': ariaLabel, 'aria-expanded': ariaExpanded, ...props }, ref) => {
    const [internalActive, setInternalActive] = React.useState(false)
    const active = controlledActive ?? internalActive

    const handleClick = () => {
      const newActive = !active
      if (controlledActive === undefined) {
        setInternalActive(newActive)
      }
      onToggle?.(newActive)
    }

    return (
      <MotionConfig
        transition={{
          duration: 0.25,
          ease: 'easeInOut',
        }}
      >
        <motion.button
          ref={ref}
          initial={false}
          animate={active ? 'open' : 'closed'}
          onClick={handleClick}
          className={cn('relative h-9 w-9 rounded-full bg-white/0 transition-colors hover:bg-white/20 shrink-0 overflow-hidden', className)}
          aria-label={ariaLabel ?? 'Toggle menu'}
          aria-expanded={ariaExpanded ?? active}
          {...props}
        >
          <motion.span variants={HAMBURGER_VARIANTS.top} className="absolute h-0.5 w-6 rounded-full bg-white" style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }} />
          <motion.span variants={HAMBURGER_VARIANTS.middle} className="absolute h-0.5 w-6 rounded-full bg-white" style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }} />
          <motion.span
            variants={HAMBURGER_VARIANTS.bottom}
            className="absolute h-0.5 w-6 rounded-full bg-white"
            style={{
              x: '-50%',
              y: '50%',
              bottom: '35%',
              left: '50%',
            }}
          />
        </motion.button>
      </MotionConfig>
    )
  }
)
HamburgerButton.displayName = 'HamburgerButton'

export { Button, CallToActionButton, HamburgerButton, buttonVariants }
