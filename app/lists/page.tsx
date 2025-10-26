import type { Metadata } from 'next'
import { CurationCard } from '@/components/CurationCard'

export const metadata: Metadata = {
  title: 'キュレーションリスト',
  description: 'テーマ別の映画リストをご覧いただけます。',
}

export default function ListsPage() {
  // 実際はAPIから取得
  const curations = [
    {
      id: 'weekend-healing',
      title: '週末に観たい、心が落ち着く映画',
      description: '忙しい日々の後に、静かに心を整える90分',
      count: 12,
      tags: ['静謐', '癒し', '日常'],
    },
    {
      id: 'friends-drama',
      title: '友情に胸を打たれる、青春群像劇',
      description: '仲間と共に駆け抜ける、熱い物語',
      count: 18,
      tags: ['友情', '青春', '成長'],
    },
    {
      id: 'philosophical',
      title: '哲学的な問いを投げかける、思考の映画',
      description: '観終わった後、誰かと語りたくなる作品',
      count: 15,
      tags: ['哲学', '思考', '対話'],
    },
    {
      id: 'visual-feast',
      title: '映像美に酔いしれる、スペクタクル体験',
      description: '大画面で観るべき、圧倒的な映像作品',
      count: 20,
      tags: ['映像美', 'スケール', '没入'],
    },
  ]

  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          キュレーションリスト
        </h1>
        <p className="mb-12 text-lg text-slate-600">
          テーマ別に厳選した映画リストです。気分や目的に合わせてお選びください。
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curations.map((curation) => (
            <CurationCard key={curation.id} {...curation} />
          ))}
        </div>

        {/* 会員CTA */}
        <div className="mt-16 rounded-lg bg-slate-900 p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">
            会員になると、すべてのリストが見放題
          </h2>
          <p className="mb-6 text-slate-300">
            100以上のキュレーションリストから、あなたにぴったりの映画を見つけよう
          </p>
          <a
            href="/membership"
            className="inline-block rounded-md bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            会員プランを見る
          </a>
        </div>
      </div>
    </div>
  )
}

