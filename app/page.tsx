import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Steps } from '@/components/Steps'
import { FAQ } from '@/components/FAQ'
import { TypeCard } from '@/components/TypeCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { sampleTypes } from '@/lib/data/sampleTypes'
import { copy } from '@/lib/copy'
import { AlertCircle, Users, Crown, Film } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Hero />

      {/* 問題提起 */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {copy.problem.title}
          </h2>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {copy.problem.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center pt-6 text-center">
                  <AlertCircle
                    className="mb-4 h-10 w-10 text-slate-400"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-slate-700">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Steps />

      {/* MBTI風4軸の説明 */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {copy.mbtiExplainer.title}
          </h2>
          <p className="mb-12 text-center text-sm text-slate-600">
            {copy.mbtiExplainer.description}
          </p>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {copy.mbtiExplainer.axes.map((axis, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold text-slate-900">
                    {axis.name}
                  </h3>
                  <p className="text-sm text-slate-600">{axis.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 2人診断の紹介 */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <Card className="mx-auto max-w-3xl bg-gradient-to-br from-slate-50 to-slate-100">
            <CardContent className="flex flex-col items-center pt-8 text-center">
              <Users
                className="mb-4 h-12 w-12 text-slate-700"
                aria-hidden="true"
              />
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                {copy.twoPeopleDiagnosis.title}
              </h2>
              <p className="mb-6 text-slate-600">
                {copy.twoPeopleDiagnosis.description}
              </p>
              <Button variant="secondary" disabled>
                近日公開
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* サンプルタイプ */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {copy.sampleTypes.title}
          </h2>
          <p className="mb-12 text-center text-slate-600">
            {copy.sampleTypes.description}
          </p>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleTypes.map((type) => (
              <TypeCard key={type.code} type={type} />
            ))}
          </div>
        </div>
      </section>

      {/* 会員特典 */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Crown
              className="mx-auto mb-4 h-12 w-12 text-slate-700"
              aria-hidden="true"
            />
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              {copy.membership.title}
            </h2>
            <ul className="mb-8 space-y-3 text-left">
              {copy.membership.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <Film className="h-5 w-5 text-slate-400" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/membership">
              <Button size="lg">プランを見る</Button>
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

      {/* 最終CTA */}
      <section className="bg-slate-900 py-16 text-white md:py-24">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            あなたの映画体験を、もっと豊かに
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            2–3分の診断で、新しい映画との出会いが待っています
          </p>
          <Link href="/diagnose">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              無料で診断を始める
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

