import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { copy } from '@/lib/copy'

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-32">
      <div className="container px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          {copy.hero.title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 sm:text-xl">
          {copy.hero.subtitle}
        </p>
        <Link href="/diagnose">
          <Button size="lg" className="h-12 px-8 text-base">
            {copy.hero.cta}
          </Button>
        </Link>
        <p className="mt-4 text-sm text-slate-500">
          2–3分で完了 · 登録不要 · 無料
        </p>
      </div>
    </section>
  )
}

