import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold text-slate-900">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-slate-700">
        ページが見つかりません
      </h2>
      <p className="mb-8 text-slate-600">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Link href="/">
        <Button size="lg">ホームに戻る</Button>
      </Link>
    </div>
  )
}

