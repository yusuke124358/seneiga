'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, Minus, Loader2 } from 'lucide-react'
import { DiagnosisMovie } from '@/lib/types/tmdb'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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
  const [movies, setMovies] = useState<DiagnosisMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/titles/samples')
      const data = await response.json()
      
      if (data.titles) {
        setMovies(data.titles)
      } else {
        throw new Error(data.error || 'Failed to fetch movies')
      }
    } catch (err) {
      console.error('Error fetching movies:', err)
      setError('映画データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const ratedCount = Object.keys(ratings).length

  const getRatingButton = (movie: DiagnosisMovie, ratingValue: number) => {
    const currentRating = ratings[movie.id]
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
        onClick={() => onRatingChange(movie.id, ratingValue)}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border-2 transition-colors',
          colors[String(ratingValue) as '1' | '0' | '-1']
        )}
        aria-label={`${movie.title_ja}を${
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

  const getPosterUrl = (posterPath: string | null | undefined) => {
    if (!posterPath) return '/api/placeholder/500/750'
    return `https://image.tmdb.org/t/p/w500${posterPath}`
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            既知作品の評価
          </h2>
          <p className="text-slate-600">映画データを読み込み中...</p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            既知作品の評価
          </h2>
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchMovies} className="mt-4">
            再試行
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          既知作品の評価
        </h2>
        <p className="text-slate-600">
          観たことがある作品を評価してください（{ratedCount}/{movies.length}）
        </p>
        <p className="mt-2 text-sm text-slate-500">
          ※ タイトルと画像で判断してください
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

      {/* 映画グリッド */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            className={cn(
              'transition-all hover:shadow-lg',
              ratings[movie.id] !== undefined && 'ring-2 ring-slate-900'
            )}
          >
            <CardContent className="p-0">
              {/* ポスター画像 */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={getPosterUrl(movie.poster_path)}
                  alt={`${movie.title_ja}のポスター`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-movie.jpg'
                  }}
                />
                {ratings[movie.id] !== undefined && (
                  <div className="absolute right-2 top-2">
                    <Badge 
                      variant={ratings[movie.id] === 1 ? 'default' : ratings[movie.id] === -1 ? 'destructive' : 'secondary'}
                      className="bg-white/90 text-slate-900"
                    >
                      {ratings[movie.id] === 1 ? '✓' : ratings[movie.id] === -1 ? '✗' : '○'}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4">
                {/* タイトル */}
                <h3 className="mb-2 font-semibold text-slate-900 line-clamp-2">
                  {movie.title_ja}
                </h3>
                {movie.title_en !== movie.title_ja && (
                  <p className="mb-2 text-sm text-slate-600 line-clamp-1">
                    {movie.title_en}
                  </p>
                )}

                {/* メタ情報 */}
                <div className="mb-3 text-xs text-slate-500">
                  {movie.year} · {movie.genres.slice(0, 2).join(', ')}
                  {movie.vote_average && (
                    <span className="ml-2">⭐ {movie.vote_average.toFixed(1)}</span>
                  )}
                </div>

                {/* タグ */}
                {movie.tags && movie.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {movie.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* 評価ボタン */}
                <div className="flex justify-center gap-2">
                  {getRatingButton(movie, 1)}
                  {getRatingButton(movie, 0)}
                  {getRatingButton(movie, -1)}
                </div>
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


