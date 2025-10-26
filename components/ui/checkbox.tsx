'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2 border-slate-300 bg-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-slate-950 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
            checked && 'border-slate-900 bg-slate-900',
            className
          )}
        >
          {checked && <Check className="h-3 w-3 text-white" aria-hidden="true" />}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }


