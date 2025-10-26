'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Loader2 } from 'lucide-react'

interface Step7CompleteProps {
  isSubmitting: boolean
  onViewResults: () => void
}

export function Step7Complete({
  isSubmitting,
  onViewResults,
}: Step7CompleteProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          {isSubmitting ? (
            <Loader2 className="h-16 w-16 animate-spin text-slate-600" />
          ) : (
            <CheckCircle className="h-16 w-16 text-green-600" />
          )}
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          {isSubmitting ? '分析中...' : '診断完了！'}
        </h2>
        <p className="text-slate-600">
          {isSubmitting
            ? 'あなたにぴったりの映画を探しています'
            : 'あなたの物語気質を分析しました'}
        </p>
      </div>

      {!isSubmitting && (
        <>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                診断結果には以下が含まれます
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>あなたの物語気質タイプ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>おすすめ映画（あなたにぴったり）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>チャレンジ映画（新しい発見）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>配信サービス対応状況</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" className="h-12 px-12" onClick={onViewResults}>
              結果を見る
            </Button>
          </div>
        </>
      )}
    </div>
  )
}


