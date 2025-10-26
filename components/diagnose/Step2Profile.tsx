'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Step2ProfileProps {
  gender: string
  ageRange: string
  onGenderChange: (value: string) => void
  onAgeRangeChange: (value: string) => void
  onNext: () => void
  onSkip: () => void
}

export function Step2Profile({
  gender,
  ageRange,
  onGenderChange,
  onAgeRangeChange,
  onNext,
  onSkip,
}: Step2ProfileProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          プロフィール（任意）
        </h2>
        <p className="text-slate-600">
          より精度の高い推奨のために、任意でご入力ください
        </p>
      </div>

      {/* 性別 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">性別</h3>
          <RadioGroup value={gender} onValueChange={onGenderChange}>
            <RadioGroupItem value="male" label="男性" />
            <RadioGroupItem value="female" label="女性" />
            <RadioGroupItem value="other" label="その他" />
            <RadioGroupItem value="prefer_not_to_say" label="回答しない" />
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 年代 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">年代</h3>
          <RadioGroup value={ageRange} onValueChange={onAgeRangeChange}>
            <RadioGroupItem value="under_18" label="18歳未満" />
            <RadioGroupItem value="18_24" label="18〜24歳" />
            <RadioGroupItem value="25_34" label="25〜34歳" />
            <RadioGroupItem value="35_44" label="35〜44歳" />
            <RadioGroupItem value="45_54" label="45〜54歳" />
            <RadioGroupItem value="55_64" label="55〜64歳" />
            <RadioGroupItem value="65_plus" label="65歳以上" />
          </RadioGroup>
        </CardContent>
      </Card>

      {/* ボタン */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onSkip}>
          スキップ
        </Button>
        <Button onClick={onNext}>次へ</Button>
      </div>
    </div>
  )
}


