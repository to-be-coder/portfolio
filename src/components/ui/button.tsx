'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
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
  const [isHovered, setIsHovered] = React.useState(false)

  const iconElement = (
    <span className={cn('flex items-center justify-center rounded-full transition-all duration-300 shrink-0 overflow-visible', isHovered ? 'w-6 h-6 bg-white' : 'w-2 h-2 bg-white')}>
      <span
        className={cn('text-black [&_svg]:w-3 [&_svg]:h-3 ease-out', isHovered ? 'translate-x-0 opacity-100 transition-all duration-500' : '-translate-x-[200%] opacity-0 transition-all duration-200')}
      >
        <ArrowRight strokeWidth={2.5} className={arrowColor} />
      </span>
    </span>
  )

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { className?: string }>
    return (
      <Button
        ref={ref}
        size={size}
        className={cn('hover:pl-2 group relative rounded-full bg-black text-white transition-all duration-300 hover:bg-black hover:text-white', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        asChild={asChild}
        {...props}
      >
        {React.cloneElement(child, {
          className: cn('inline-flex items-center gap-2', child.props.className),
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            setIsHovered(true)
            child.props.onMouseEnter?.(e)
          },
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            setIsHovered(false)
            child.props.onMouseLeave?.(e)
          },
          children: (
            <>
              {iconElement}
              {child.props.children}
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
      className={cn('group relative rounded-full bg-gray-200 text-black transition-all duration-300 hover:bg-black hover:text-white', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {iconElement}
      {children}
    </Button>
  )
})
CallToActionButton.displayName = 'CallToActionButton'

export { Button, buttonVariants, CallToActionButton }
