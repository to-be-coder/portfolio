import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 text-base file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input rounded-md border bg-transparent transition-[color,box-shadow] outline-none',
        chat: 'focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent text-base',
      },
      size: {
        default: 'h-9 px-3 py-1 text-base',
        sm: 'h-8 px-2 text-base',
        lg: 'h-10 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, size, ...props }, ref) => {
  return <input type={type} data-slot="input" className={cn(inputVariants({ variant, size, className }))} ref={ref} {...props} />
})
Input.displayName = 'Input'

export { Input, inputVariants }
