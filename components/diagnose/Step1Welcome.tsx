'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Lock, Shield } from 'lucide-react'

interface Step1WelcomeProps {
  onNext: () => void
}

export function Step1Welcome({ onNext }: Step1WelcomeProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          物語気質診断
        </h1>
        <p className="text-lg text-slate-600">
          あなたの性格と物語の好みから、ぴったりの映画を見つけます
        </p>
      </div>

      {/* 診断の特徴 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Clock className="mb-3 h-8 w-8 text-slate-600" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-900">2–3分で完了</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Lock className="mb-3 h-8 w-8 text-slate-600" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-900">登録不要</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Shield className="mb-3 h-8 w-8 text-slate-600" aria-hidden="true" />
            <p className="text-sm font-medium text-slate-900">完全匿名</p>
          </CardContent>
        </Card>
      </div>

      {/* 診断内容 */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            診断の流れ
          </h2>
          <ol className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                1
              </span>
              <span>プロフィール（任意）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                2
              </span>
              <span>配信サービスの選択</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                3
              </span>
              <span>物語の好み（8問）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                4
              </span>
              <span>既知作品の評価（12作品）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                5
              </span>
              <span>今日の気分</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* プライバシー */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            プライバシーについて
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li>• すべて匿名で処理されます</li>
            <li>• 個人情報の登録は不要です</li>
            <li>• データは推奨精度向上のみに使用します</li>
          </ul>
        </CardContent>
      </Card>

      {/* 開始ボタン */}
      <div className="text-center">
        <Button size="lg" className="h-12 px-12" onClick={onNext}>
          診断を始める
        </Button>
        <p className="mt-4 text-sm text-slate-500">
          ※ MBTI®とは無関係のMBTI風（非公式）診断です
        </p>
      </div>
    </div>
  )
}


