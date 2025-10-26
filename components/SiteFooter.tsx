import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              サービス
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/diagnose"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  診断を始める
                </Link>
              </li>
              <li>
                <Link
                  href="/lists"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  リスト
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  会員プラン
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              アカウント
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/account"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  ログイン / 登録
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              会社情報
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  サービス説明
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              クレジット
            </h3>
            <p className="text-xs text-slate-600">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-600 sm:flex-row">
          <p>© 2025 映画MBTI. All rights reserved.</p>
          <p className="text-xs">
            ※ MBTI®とは無関係のMBTI風（非公式）診断です
          </p>
        </div>
      </div>
    </footer>
  )
}

