'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { moodOptions, type MoodOption } from '@/lib/data/moodOptions'
import { cn } from '@/lib/utils'

interface Step6MoodProps {
  mood: string
  onMoodChange: (moodId: string) => void
  onNext: () => void
  onBack: () => void
}

export function Step6Mood({ mood, onMoodChange, onNext, onBack }: Step6MoodProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          今日の気分
        </h2>
        <p className="text-slate-600">
          今のあなたの気分に近いものを選んでください
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {moodOptions.map((option) => (
          <Card
            key={option.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-md',
              mood === option.id && 'ring-2 ring-slate-900'
            )}
            onClick={() => onMoodChange(option.id)}
            role="button"
            tabIndex={0}
            aria-label={`${option.label}を選択`}
            aria-pressed={mood === option.id}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onMoodChange(option.id)
              }
            }}
          >
            <CardContent className="pt-6 text-center">
              <div className="mb-3 text-4xl" aria-hidden="true">
                {option.emoji}
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                {option.label}
              </h3>
              <p className="text-sm text-slate-600">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={onNext} disabled={!mood}>
          次へ
        </Button>
      </div>
    </div>
  )
}


