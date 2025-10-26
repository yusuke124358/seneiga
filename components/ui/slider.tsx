'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value = 50,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const percentage = ((value - min) / (max - min)) * 100

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      onValueChange?.(newValue)
    }

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(to right, rgb(15 23 42) 0%, rgb(15 23 42) ${percentage}%, rgb(226 232 240) ${percentage}%, rgb(226 232 240) 100%)`,
          }}
        />
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }


