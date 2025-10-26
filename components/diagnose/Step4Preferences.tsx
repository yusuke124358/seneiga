'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { diagQuestions, type DiagQuestion } from '@/lib/data/diagQuestions'

interface Step4PreferencesProps {
  preferences: Record<string, number>
  onPreferenceChange: (questionId: string, value: number) => void
  onNext: () => void
  onBack: () => void
}

export function Step4Preferences({
  preferences,
  onPreferenceChange,
  onNext,
  onBack,
}: Step4PreferencesProps) {
  const isComplete = diagQuestions.every((q) => preferences[q.id] !== undefined)

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          物語の好み
        </h2>
        <p className="text-slate-600">
          8つの質問に答えて、あなたの好みを教えてください
        </p>
      </div>

      <div className="space-y-6">
        {diagQuestions.map((question, index) => (
          <Card key={question.id}>
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {question.question}
                  </h3>
                </div>
                {question.description && (
                  <p className="ml-8 text-sm text-slate-600">
                    {question.description}
                  </p>
                )}
              </div>

              {question.type === 'slider' ? (
                <div className="space-y-4">
                  <Slider
                    value={preferences[question.id] ?? 50}
                    onValueChange={(value) =>
                      onPreferenceChange(question.id, value)
                    }
                    min={question.min}
                    max={question.max}
                    step={question.step}
                    aria-label={`${question.question}の設定`}
                    aria-valuetext={`${preferences[question.id] ?? 50}%`}
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{question.leftLabel}</span>
                    <span>{question.rightLabel}</span>
                  </div>
                </div>
              ) : (
                <RadioGroup
                  value={String(preferences[question.id] ?? '')}
                  onValueChange={(value) =>
                    onPreferenceChange(question.id, parseFloat(value))
                  }
                >
                  {question.options?.map((option) => (
                    <RadioGroupItem
                      key={option.value}
                      value={String(option.value)}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          次へ
        </Button>
      </div>
    </div>
  )
}


