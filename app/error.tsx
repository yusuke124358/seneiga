'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold text-slate-900">500</h1>
      <h2 className="mb-4 text-2xl font-semibold text-slate-700">
        エラーが発生しました
      </h2>
      <p className="mb-8 text-slate-600">
        申し訳ございません。問題が発生しました。
        <br />
        もう一度お試しください。
      </p>
      <Button size="lg" onClick={reset}>
        再試行
      </Button>
    </div>
  )
}

