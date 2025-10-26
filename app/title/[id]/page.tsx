import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PlatformButtons } from '@/components/PlatformButtons'
import { Clock, Calendar, Star } from 'lucide-react'

interface TitlePageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: '作品詳細',
  description: '映画の詳細情報をご覧いただけます。',
}

export default function TitleDetailPage({ params }: TitlePageProps) {
  // 実際はAPIから取得
  const movie = {
    id: params.id,
    title: 'サンプル映画タイトル',
    originalTitle: 'Sample Movie Title',
    director: '監督名',
    year: 2023,
    runtime: 94,
    rating: 8.5,
    genres: ['ドラマ', '家族'],
    synopsis:
      'これは200–300字程度のあらすじです。物語の概要を説明し、鑑賞者に興味を持ってもらうための文章です。ネタバレを避けつつ、映画の雰囲気や主要なテーマを伝えます。主人公の状況、物語の舞台、そして映画が描く核心的な問いや葛藤について触れます。この映画は、観る者の心に深く響く作品として多くの支持を得ています。',
    keywords: ['静謐', '余韻', '家族', '小さな奇跡', '日常'],
    similarWords: ['喪失と再生', '言葉にならない想い', '小さな勇気'],
  }

  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ポスター */}
          <div className="lg:col-span-1">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-slate-200 shadow-lg">
              <div className="flex h-full items-center justify-center text-slate-400">
                ポスター画像
              </div>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {movie.title}
            </h1>
            <p className="mb-4 text-lg text-slate-600">{movie.originalTitle}</p>

            {/* メタ情報 */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{movie.runtime}分</span>
              </div>
              <div className="flex items-center gap-1">
                <Star
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
                <span className="font-semibold">{movie.rating}</span>
              </div>
            </div>

            {/* ジャンル */}
            <div className="mb-6 flex flex-wrap gap-2">
              {movie.genres.map((genre, index) => (
                <Badge key={index} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* 監督 */}
            <p className="mb-6 text-slate-700">
              <span className="font-medium">監督：</span>
              {movie.director}
            </p>

            {/* 配信ボタン */}
            <div className="mb-8">
              <PlatformButtons movieId={parseInt(params.id)} />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* あらすじ */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">あらすじ</h2>
          <p className="leading-relaxed text-slate-700">{movie.synopsis}</p>
        </section>

        {/* 言葉タグ */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            この映画のキーワード
          </h2>
          <div className="flex flex-wrap gap-2">
            {movie.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </section>

        {/* 似ているワード */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            似ているテーマ
          </h2>
          <div className="flex flex-wrap gap-2">
            {movie.similarWords.map((word, index) => (
              <Badge key={index}>{word}</Badge>
            ))}
          </div>
        </section>

        {/* 関連タイプ */}
        <Card className="bg-slate-50">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              この映画が好きな方は、こちらのタイプかも
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/type/INJF">
                <Badge className="cursor-pointer">INJF - 静謐の余韻派</Badge>
              </Link>
              <Link href="/type/INFP">
                <Badge className="cursor-pointer">
                  INFP - 寓話ポエトリー派
                </Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

