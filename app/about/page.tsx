import type { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Film, Users, Sparkles, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'サービス説明',
  description: '映画MBTIについてご紹介します。',
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          映画MBTIについて
        </h1>
        <p className="mb-12 text-lg text-slate-600">
          性格×物語嗜好で、あなたにぴったりの映画を見つけるサービスです
        </p>

        {/* サービス概要 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            映画MBTIとは
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>
              映画MBTIは、MBTI®とは無関係のMBTI風（非公式）診断を用いて、あなたの性格と物語の好みを分析し、ぴったりの映画を提案するサービスです。
            </p>
            <p>
              従来の映画レコメンドサービスは、ジャンルや評価を基にした提案が主流でした。しかし、「評判の映画を観たのにピンと来なかった」という経験は、誰にでもあるはずです。
            </p>
            <p>
              映画MBTIでは、性格診断と物語嗜好の両面から分析することで、「あなたに合う映画」をより精度高く提案します。さらに、「少し冒険したい時の映画」も提案することで、新しい映画体験への扉を開きます。
            </p>
          </div>
        </section>

        {/* 特徴 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">3つの特徴</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Film
                  className="mb-4 h-8 w-8 text-slate-600"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  Reveal形式
                </h3>
                <p className="text-sm text-slate-600">
                  固有名詞を隠した状態で提案。先入観なく、本当に合う映画に出会えます。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Sparkles
                  className="mb-4 h-8 w-8 text-slate-600"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  2種類の提案
                </h3>
                <p className="text-sm text-slate-600">
                  おすすめ映画（安心）とチャレンジ映画（冒険）の両方を提案します。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users
                  className="mb-4 h-8 w-8 text-slate-600"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  2人診断
                </h3>
                <p className="text-sm text-slate-600">
                  カップルや友達と一緒に診断すれば、2人が楽しめる映画を提案（会員限定）。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* MBTI風について */}
        <section className="mb-16">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Shield
                  className="mt-1 h-6 w-6 flex-shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    MBTI®との関係について
                  </h3>
                  <p className="text-sm text-slate-700">
                    当サービスは<strong>MBTI®とは無関係の非公式診断</strong>
                    です。MBTI®は Myers-Briggs Type
                    Indicator®の登録商標であり、当サービスとは一切関係がありません。
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    当サービスでは、MBTI風の4軸（E/I、N/S、T/F、J/P）を参考にした独自の診断を行い、映画の好みを分析しています。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 今後の展開 */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">今後の展開</h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
              <span>配信サービス連携（Netflix、Prime Video、U-NEXTなど）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
              <span>AIによる詳細な物語嗜好分析</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
              <span>コミュニティ機能（レビュー、リスト共有）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
              <span>海外作品のデータベース拡充</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

