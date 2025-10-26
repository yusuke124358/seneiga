'use client'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlatformButtons } from '@/components/PlatformButtons'
import { Badge } from '@/components/ui/badge'

interface RevealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: number
}

export function RevealDialog({
  open,
  onOpenChange,
  cardId,
}: RevealDialogProps) {
  const router = useRouter()

  // 実際のデータ取得はここで行う（現在はダミー）
  const movieData = {
    id: cardId,
    title: 'サンプル映画タイトル',
    director: '監督名',
    year: 2023,
    rating: 8.5,
    posterUrl: '/placeholder-poster.jpg', // 実際はTMDBから取得
    genres: ['ドラマ', '家族'],
  }

  const handleViewDetails = () => {
    onOpenChange(false)
    router.push(`/title/${cardId}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{movieData.title}</DialogTitle>
          <DialogDescription>
            {movieData.director} · {movieData.year}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* ポスター画像（プレースホルダー） */}
          <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-slate-200">
            <div className="flex h-full items-center justify-center text-slate-400">
              ポスター画像
            </div>
          </div>

          {/* ジャンルタグ */}
          <div className="flex flex-wrap gap-2">
            {movieData.genres.map((genre, index) => (
              <Badge key={index} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          {/* 評価 */}
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">
              {movieData.rating}
            </div>
            <div className="text-sm text-slate-600">評価スコア</div>
          </div>

          {/* 配信ボタン */}
          <PlatformButtons movieId={cardId} />

          {/* 詳細ページへ */}
          <Button
            onClick={handleViewDetails}
            variant="outline"
            className="w-full"
          >
            作品詳細を見る
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

