import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn, UserPlus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'アカウント',
  description: 'ログインまたは新規登録してください。',
}

export default function AccountPage() {
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-center text-4xl font-bold text-slate-900">
          アカウント
        </h1>
        <p className="mb-12 text-center text-slate-600">
          ログインまたは新規登録してください
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5" aria-hidden="true" />
                ログイン
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-600">
                既にアカウントをお持ちの方
              </p>
              <Button className="w-full" disabled>
                ログイン（準備中）
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" aria-hidden="true" />
                新規登録
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-600">
                初めての方はこちらから
              </p>
              <Button className="w-full" variant="secondary" disabled>
                新規登録（準備中）
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          登録することで、
          <a href="/terms" className="underline hover:text-slate-900">
            利用規約
          </a>
          と
          <a href="/privacy" className="underline hover:text-slate-900">
            プライバシーポリシー
          </a>
          に同意したものとみなされます。
        </p>
      </div>
    </div>
  )
}

