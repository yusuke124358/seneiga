import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResultCardHidden } from '@/components/ResultCardHidden'
import { Separator } from '@/components/ui/separator'
import { getTypeByCode } from '@/lib/data/sampleTypes'
import { getCardsByType } from '@/lib/data/hiddenCards'
import { sampleTitles } from '@/lib/data/sampleTitles'
import { Share2, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: '診断結果',
  description: 'あなたのタイプとおすすめ映画をご紹介します。',
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: { session?: string }
}) {
  // 実際はURLパラメータまたはlocalStorageから診断データを取得
  const typeCode = 'INJF'
  const type = getTypeByCode(typeCode)
  let recommendCards = getCardsByType(typeCode, 'recommend')
  let challengeCards = getCardsByType(typeCode, 'challenge')

  // localStorageから診断データを取得
  let diagnoseData: {
    subscriptions?: string[]
    ratings?: Record<number, number>
    mood?: string
  } = {}

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('diagnose_data')
    if (stored) {
      diagnoseData = JSON.parse(stored)
    }
  }

  // サブスク優先ソート（availability_fit）+ Like/Dislike反映
  if (diagnoseData.subscriptions || (diagnoseData.ratings && Object.keys(diagnoseData.ratings).length > 0)) {
    recommendCards = [...recommendCards].map(card => {
      let score = 0
      
      // サブスク命中スコア（1命中 = +0.1）
      if (diagnoseData.subscriptions && diagnoseData.subscriptions.length > 0) {
        const availableCount = card.availability.filter(s => 
          diagnoseData.subscriptions!.includes(s)
        ).length
        score += availableCount * 0.1
      }
      
      // Like/Dislike反映（タグベース）
      if (diagnoseData.ratings && Object.keys(diagnoseData.ratings).length > 0) {
        const likeTitles = Object.entries(diagnoseData.ratings)
          .filter(([_, rating]) => rating === 1)
          .map(([titleId, _]) => parseInt(titleId))
        
        const dislikeTitles = Object.entries(diagnoseData.ratings)
          .filter(([_, rating]) => rating === -1)
          .map(([titleId, _]) => parseInt(titleId))
        
        // Like評価した作品のタグと類似度を計算
        likeTitles.forEach(titleId => {
          const likedTitle = sampleTitles.find(t => t.id === titleId)
          if (likedTitle) {
            const tagMatch = card.tags.filter(tag => likedTitle.tags.includes(tag)).length
            score += tagMatch * 0.05 // タグ1つ一致で+0.05
          }
        })
        
        // Dislike評価した作品と類似するカードはスコア減算
        dislikeTitles.forEach(titleId => {
          const dislikedTitle = sampleTitles.find(t => t.id === titleId)
          if (dislikedTitle) {
            const tagMatch = card.tags.filter(tag => dislikedTitle.tags.includes(tag)).length
            score -= tagMatch * 0.03 // タグ1つ一致で-0.03
          }
        })
      }
      
      return { ...card, score }
    }).sort((a, b) => b.score - a.score)
  }

  if (!type) {
    return (
      <div className="container px-4 py-16 text-center">
        <p>タイプが見つかりませんでした。</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* 診断データ表示（デバッグ用・削除予定） */}
        {searchParams.session && diagnoseData.subscriptions && (
          <Card className="mb-8 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="mb-2 text-sm font-semibold text-blue-900">
                診断データ取得成功 ✓
              </h3>
              <div className="space-y-1 text-xs text-blue-700">
                <p>
                  • サブスク: {diagnoseData.subscriptions.length}件
                  {diagnoseData.subscriptions.length > 0 &&
                    ` (${diagnoseData.subscriptions.join(', ')})`}
                </p>
                <p>
                  • 評価済み作品:{' '}
                  {Object.keys(diagnoseData.ratings || {}).length}件
                </p>
                <p>• 気分: {diagnoseData.mood || '未設定'}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* タイプ表示 */}
        <Card className="mb-12 bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Badge className="px-4 py-1 text-lg">{type.code}</Badge>
            </div>
            <CardTitle className="text-3xl sm:text-4xl">{type.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-center text-lg text-slate-700">
              {type.oneLiner}
            </p>
            <p className="mb-6 text-center text-slate-600">
              {type.description}
            </p>

            {/* タグクラウド */}
            {type.strengths && (
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {type.strengths.map((strength, index) => (
                  <Badge key={index} variant="secondary">
                    {strength}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                共有
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" aria-hidden="true" />
                保存
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* タイプ詳細へのリンク */}
        <div className="mb-12 text-center">
          <Link href={`/type/${typeCode}`}>
            <Button variant="link">タイプの詳細を読む →</Button>
          </Link>
        </div>

        <Separator className="mb-12" />

        {/* おすすめ映画 */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              あなたへのおすすめ
            </h2>
            <p className="text-slate-600">
              あなたのタイプにぴったりの映画です。
              <strong className="text-slate-900">
                Revealボタンを押すと、タイトルと配信先が表示されます。
              </strong>
            </p>
            {diagnoseData.subscriptions &&
              diagnoseData.subscriptions.length > 0 && (
                <p className="mt-2 text-sm text-blue-700">
                  ✓ 視聴可能な作品を優先表示しています
                </p>
              )}
            {diagnoseData.ratings &&
              Object.keys(diagnoseData.ratings).length > 0 && (
                <p className="mt-1 text-sm text-green-700">
                  ✓ あなたの評価を反映した推薦です
                </p>
              )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {recommendCards.map((card) => (
              <ResultCardHidden key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* チャレンジ映画 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            チャレンジ映画
          </h2>
          <p className="mb-8 text-slate-600">
            少し冒険してみたい時に。新しい発見があるかもしれません。
          </p>
          <div className="grid gap-6">
            {challengeCards.map((card) => (
              <ResultCardHidden key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* 会員CTA */}
        <Card className="bg-slate-900 text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="mb-4 text-xl font-bold">
              会員になると、さらに便利に
            </h3>
            <ul className="mb-6 space-y-2 text-sm text-slate-300">
              <li>• タイプ詳細の全文が読める</li>
              <li>• 2人診断機能</li>
              <li>• キュレーションリスト無制限</li>
            </ul>
            <Link href="/membership">
              <Button variant="secondary" size="lg">
                プランを見る
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
