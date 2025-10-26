'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Shield } from 'lucide-react'
import { RevealDialog } from '@/components/RevealDialog'
import type { HiddenCard } from '@/lib/data/hiddenCards'

interface ResultCardHiddenProps {
  card: HiddenCard
}

export function ResultCardHidden({ card }: ResultCardHiddenProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Card className="flex flex-col">
        <CardContent className="flex-1 pt-6">
          {/* カテゴリーバッジ */}
          <Badge
            variant={card.category === 'recommend' ? 'default' : 'secondary'}
            className="mb-4"
          >
            {card.category === 'recommend' ? 'おすすめ' : 'チャレンジ'}
          </Badge>

          {/* 短いコピー（固有名詞なし） */}
          <p className="mb-4 text-lg font-medium text-slate-900">{card.copy}</p>

          {/* 語彙タグ × 5 */}
          <div className="mb-4 flex flex-wrap gap-2">
            {card.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 視聴時間 & 年齢レーティング */}
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{card.runtime}分</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>{card.rating}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex-1"
            aria-label="作品を公開する"
          >
            Reveal
          </Button>
          <Button variant="outline" className="flex-1" disabled>
            他をもう一度
          </Button>
        </CardFooter>
      </Card>

      <RevealDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        cardId={card.id}
      />
    </>
  )
}

