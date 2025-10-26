'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn('space-y-2', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  label: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, label, ...props }, ref) => {
    const { value: selectedValue, onValueChange } =
      React.useContext(RadioGroupContext)
    const isSelected = selectedValue === value

    return (
      <label
        className={cn(
          'flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50',
          isSelected && 'border-slate-900 bg-slate-50',
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          value={value}
          checked={isSelected}
          onChange={() => onValueChange?.(value)}
          className="h-4 w-4 cursor-pointer text-slate-900 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
          {...props}
        />
        <span className="text-sm font-medium text-slate-900">{label}</span>
      </label>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }


