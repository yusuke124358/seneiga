'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

interface Step3SubscriptionsProps {
  subscriptions: string[]
  onSubscriptionsChange: (subscriptions: string[]) => void
  onNext: () => void
  onSkip: () => void
}

const subscriptionOptions = [
  { id: 'netflix', label: 'Netflix', color: 'bg-red-600 text-white' },
  { id: 'prime_video', label: 'Prime Video', color: 'bg-blue-600 text-white' },
  { id: 'u_next', label: 'U-NEXT', color: 'bg-purple-600 text-white' },
  { id: 'hulu', label: 'Hulu', color: 'bg-green-600 text-white' },
  { id: 'disney_plus', label: 'Disney+', color: 'bg-indigo-600 text-white' },
  { id: 'apple_tv', label: 'Apple TV+', color: 'bg-slate-900 text-white' },
]

export function Step3Subscriptions({
  subscriptions,
  onSubscriptionsChange,
  onNext,
  onSkip,
}: Step3SubscriptionsProps) {
  const toggleSubscription = (id: string) => {
    if (subscriptions.includes(id)) {
      onSubscriptionsChange(subscriptions.filter((s) => s !== id))
    } else {
      onSubscriptionsChange([...subscriptions, id])
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          配信サービス
        </h2>
        <p className="text-slate-600">
          利用中のサービスを選択すると、視聴可能な作品を優先します
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-700">
              選択中: {subscriptions.length}件
            </h3>
            {subscriptions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {subscriptions.map((sub) => {
                  const option = subscriptionOptions.find((o) => o.id === sub)
                  return (
                    <Badge key={sub} className={option?.color}>
                      {option?.label}
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-3">
            {subscriptionOptions.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <Checkbox
                  checked={subscriptions.includes(option.id)}
                  onCheckedChange={() => toggleSubscription(option.id)}
                />
                <span className="flex-1 font-medium text-slate-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onSkip}>
          スキップ
        </Button>
        <Button onClick={onNext}>次へ</Button>
      </div>
    </div>
  )
}


