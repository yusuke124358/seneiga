import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Film } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-slate-900"
        >
          <Film className="h-6 w-6" aria-hidden="true" />
          <span>映画MBTI</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-block"
          >
            サービス説明
          </Link>
          <Link
            href="/lists"
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-block"
          >
            リスト
          </Link>
          <Link href="/diagnose">
            <Button size="sm">診断を始める</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

