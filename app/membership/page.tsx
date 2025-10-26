import type { Metadata } from 'next'
import { PlanCard } from '@/components/PlanCard'

export const metadata: Metadata = {
  title: '会員プラン',
  description: 'あなたに合ったプランをお選びください。',
}

export default function MembershipPage() {
  const plans = [
    {
      name: 'フリー',
      price: '¥0',
      period: '月',
      features: [
        '基本診断（16タイプ）',
        'タイプ詳細の冒頭3段落閲覧',
        'おすすめ映画3作品表示',
        'チャレンジ映画1作品表示',
      ],
    },
    {
      name: 'スタンダード',
      price: '¥500',
      period: '月',
      recommended: true,
      features: [
        'フリープランの全機能',
        'タイプ詳細の全文閲覧',
        'おすすめ映画10作品表示',
        'チャレンジ映画5作品表示',
        'キュレーションリスト無制限',
        '配信サービス連携',
        '2人診断機能',
      ],
    },
    {
      name: 'プレミアム',
      price: '¥1,200',
      period: '月',
      features: [
        'スタンダードの全機能',
        'おすすめ映画無制限',
        'チャレンジ映画無制限',
        'カスタムリスト作成',
        '優先サポート',
        '新機能の先行体験',
      ],
    },
  ]

  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-slate-900">
          会員プラン
        </h1>
        <p className="mb-12 text-center text-lg text-slate-600">
          あなたに合ったプランをお選びください。いつでもプラン変更・解約が可能です。
        </p>

        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            よくある質問
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-slate-900">
                支払い方法は？
              </h3>
              <p className="text-slate-600">
                クレジットカード（Visa、Mastercard、JCB、American
                Express）に対応しています。
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-slate-900">
                途中でプラン変更できますか？
              </h3>
              <p className="text-slate-600">
                はい、いつでもプラン変更が可能です。アップグレードは即座に反映され、ダウングレードは次回更新日から適用されます。
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-slate-900">
                解約方法は？
              </h3>
              <p className="text-slate-600">
                アカウント設定からいつでも解約できます。解約後も、契約期間終了まではプランの機能をご利用いただけます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

