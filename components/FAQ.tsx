'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { copy } from '@/lib/copy'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          {copy.faq.title}
        </h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {copy.faq.items.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-slate-900">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-slate-500 transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-slate-200 p-6 pt-4">
                  <p className="text-slate-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

