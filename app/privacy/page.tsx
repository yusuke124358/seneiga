import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '映画MBTIのプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          プライバシーポリシー
        </h1>
        <p className="mb-12 text-sm text-slate-600">最終更新日：2025年1月1日</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2>1. 個人情報の収集</h2>
            <p>当サービスでは、以下の情報を収集する場合があります：</p>
            <ul>
              <li>診断結果（匿名）</li>
              <li>メールアドレス（会員登録時）</li>
              <li>利用履歴・閲覧履歴</li>
              <li>Cookie情報</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. 個人情報の利用目的</h2>
            <p>収集した個人情報は、以下の目的で利用します：</p>
            <ul>
              <li>サービスの提供・運営</li>
              <li>映画レコメンドの精度向上</li>
              <li>サービス改善のための統計分析</li>
              <li>カスタマーサポート</li>
              <li>重要なお知らせの配信</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. 個人情報の第三者提供</h2>
            <p>
              当サービスは、以下の場合を除き、個人情報を第三者に提供しません：
            </p>
            <ul>
              <li>本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Cookie・アクセス解析</h2>
            <p>
              当サービスでは、サービス向上のためにCookieやアクセス解析ツールを使用しています。これらは個人を特定する情報を含みません。
            </p>
          </section>

          <section className="mb-8">
            <h2>5. 個人情報の開示・訂正・削除</h2>
            <p>
              ご自身の個人情報の開示・訂正・削除を希望される場合は、アカウント設定ページまたはお問い合わせフォームからご連絡ください。
            </p>
          </section>

          <section className="mb-8">
            <h2>6. セキュリティ</h2>
            <p>
              当サービスは、個人情報の漏洩・紛失・改ざんを防ぐため、適切な安全管理措置を講じています。
            </p>
          </section>

          <section className="mb-8">
            <h2>7. プライバシーポリシーの変更</h2>
            <p>
              当サービスは、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <section className="mb-8">
            <h2>8. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するお問い合わせは、以下までご連絡ください：
            </p>
            <p>メール：privacy@movie-mbti.example.com（ダミー）</p>
          </section>
        </div>
      </div>
    </div>
  )
}

