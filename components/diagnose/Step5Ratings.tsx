'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { sampleTitles, type SampleTitle } from '@/lib/data/sampleTitles'
import { cn } from '@/lib/utils'

interface Step5RatingsProps {
  ratings: Record<number, number> // {titleId: rating}
  onRatingChange: (titleId: number, rating: number) => void
  onNext: () => void
  onBack: () => void
}

export function Step5Ratings({
  ratings,
  onRatingChange,
  onNext,
  onBack,
}: Step5RatingsProps) {
  const ratedCount = Object.keys(ratings).length

  const getRatingButton = (title: SampleTitle, ratingValue: number) => {
    const currentRating = ratings[title.id]
    const isActive = currentRating === ratingValue

    const icons = {
      1: ThumbsUp,
      0: Minus,
      '-1': ThumbsDown,
    }
    const Icon = icons[String(ratingValue) as '1' | '0' | '-1']

    const colors = {
      1: isActive
        ? 'bg-green-600 text-white border-green-600'
        : 'border-slate-200 text-slate-600 hover:border-green-600 hover:bg-green-50',
      0: isActive
        ? 'bg-slate-600 text-white border-slate-600'
        : 'border-slate-200 text-slate-600 hover:border-slate-600 hover:bg-slate-50',
      '-1': isActive
        ? 'bg-red-600 text-white border-red-600'
        : 'border-slate-200 text-slate-600 hover:border-red-600 hover:bg-red-50',
    }

    return (
      <button
        onClick={() => onRatingChange(title.id, ratingValue)}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border-2 transition-colors',
          colors[String(ratingValue) as '1' | '0' | '-1']
        )}
        aria-label={`${title.copy}を${
          ratingValue === 1
            ? 'いいね'
            : ratingValue === 0
              ? '中立'
              : 'よくない'
        }と評価`}
        aria-pressed={isActive}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          既知作品の評価
        </h2>
        <p className="text-slate-600">
          観たことがある作品を評価してください（{ratedCount}/
          {sampleTitles.length}）
        </p>
        <p className="mt-2 text-sm text-slate-500">
          ※ タイトルは非表示です。雰囲気で判断してください
        </p>
      </div>

      {/* 凡例 */}
      <Card className="bg-slate-50">
        <CardContent className="flex items-center justify-center gap-6 pt-6">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-green-600" aria-hidden="true" />
            <span className="text-sm text-slate-700">好き</span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-slate-600" aria-hidden="true" />
            <span className="text-sm text-slate-700">中立</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown className="h-5 w-5 text-red-600" aria-hidden="true" />
            <span className="text-sm text-slate-700">苦手</span>
          </div>
        </CardContent>
      </Card>

      {/* 作品グリッド */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sampleTitles.map((title) => (
          <Card
            key={title.id}
            className={cn(
              'transition-shadow',
              ratings[title.id] !== undefined && 'ring-2 ring-slate-900'
            )}
          >
            <CardContent className="pt-6">
              {/* コピー（固有名詞なし） */}
              <p className="mb-3 font-medium text-slate-900">{title.copy}</p>

              {/* タグ */}
              <div className="mb-4 flex flex-wrap gap-2">
                {title.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* メタ情報 */}
              <div className="mb-4 text-xs text-slate-500">
                {title.year} · {title.genres.join(', ')}
              </div>

              {/* 評価ボタン */}
              <div className="flex justify-center gap-2">
                {getRatingButton(title, 1)}
                {getRatingButton(title, 0)}
                {getRatingButton(title, -1)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button onClick={onNext}>
          次へ（{ratedCount > 0 ? '評価済み' : 'スキップ可能'}）
        </Button>
      </div>
    </div>
  )
}


