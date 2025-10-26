import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getTypeByCode } from '@/lib/data/sampleTypes'
import { Lock } from 'lucide-react'

interface TypePageProps {
  params: {
    code: string
  }
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const type = getTypeByCode(params.code)
  if (!type) {
    return { title: 'タイプが見つかりません' }
  }
  return {
    title: `${type.code} - ${type.name}`,
    description: type.oneLiner,
  }
}

export default function TypeDetailPage({ params }: TypePageProps) {
  const type = getTypeByCode(params.code)

  if (!type) {
    notFound()
  }

  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <Badge className="mb-4 px-4 py-1 text-lg">{type.code}</Badge>
          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            {type.name}
          </h1>
          <p className="text-xl text-slate-600">{type.oneLiner}</p>
        </div>

        <Separator className="mb-8" />

        {/* 冒頭3段落（公開） */}
        <article className="prose prose-slate max-w-none">
          <h2>あなたのタイプについて</h2>
          <p>{type.description}</p>

          <h3>得意な要素</h3>
          <p>
            あなたは以下のような要素に特に共感します：
            {type.strengths?.join('、')}。
            これらの要素が豊富に含まれる作品は、あなたの心に深く響くでしょう。
          </p>

          <h3>苦手な要素</h3>
          <p>
            一方で、以下のような要素はあなたにとって少し疲れるかもしれません：
            {type.challenges?.join('、')}。
            ただし、時にはこうした作品に挑戦することで、新しい発見があるかもしれません。
          </p>
        </article>

        {/* 会員ゲート */}
        <Card className="my-12 bg-slate-50">
          <CardContent className="relative pt-6">
            <div className="blur-sm">
              <h3 className="mb-4 text-xl font-semibold">
                おすすめの鑑賞スタイル
              </h3>
              <p className="mb-4">
                このタイプの方は、映画館よりも自宅でじっくり観る方が向いています。
                周囲の雑音を気にせず、自分のペースで物語に浸ることができるからです...
              </p>
              <h3 className="mb-4 text-xl font-semibold">他のタイプとの相性</h3>
              <p>
                ENJFタイプの友人と一緒に観ると、お互いに新しい視点を得られます...
              </p>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Lock
                className="mb-4 h-12 w-12 text-slate-600"
                aria-hidden="true"
              />
              <p className="mb-4 font-semibold text-slate-900">
                続きを読むには会員登録が必要です
              </p>
              <Link href="/membership">
                <Button>会員プランを見る</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 診断に戻る */}
        <div className="text-center">
          <Link href="/diagnose">
            <Button variant="outline">もう一度診断する</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

