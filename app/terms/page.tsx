import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '利用規約',
  description: '映画MBTIの利用規約です。',
}

export default function TermsPage() {
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">利用規約</h1>
        <p className="mb-12 text-sm text-slate-600">最終更新日：2025年1月1日</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2>第1条（適用）</h2>
            <p>
              本規約は、映画MBTI（以下「当サービス」）の利用に関する条件を定めるものです。利用者は、本規約に同意の上、当サービスを利用するものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2>第2条（定義）</h2>
            <ul>
              <li>
                <strong>「利用者」</strong>：当サービスを利用するすべての方
              </li>
              <li>
                <strong>「会員」</strong>：当サービスに登録した利用者
              </li>
              <li>
                <strong>「コンテンツ」</strong>
                ：当サービスが提供する診断結果、映画情報、記事など
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>第3条（アカウント登録）</h2>
            <p>
              会員登録を希望する方は、本規約に同意の上、当サービス所定の方法で登録を行うものとします。
            </p>
            <p>
              登録情報に虚偽がある場合、当サービスは登録を拒否、またはアカウントを削除することがあります。
            </p>
          </section>

          <section className="mb-8">
            <h2>第4条（禁止事項）</h2>
            <p>利用者は、以下の行為を行ってはなりません：</p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>当サービスの運営を妨害する行為</li>
              <li>他の利用者に迷惑をかける行為</li>
              <li>虚偽の情報を登録する行為</li>
              <li>不正アクセス、または不正な手段でサービスを利用する行為</li>
              <li>当サービスのコンテンツを無断で複製・転載・配布する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>第5条（料金・支払い）</h2>
            <p>
              有料プランの料金は、プラン選択画面に記載されたとおりとします。
            </p>
            <p>支払い方法は、当サービスが指定する方法に限ります。</p>
            <p>一度支払われた料金は、原則として返金されません。</p>
          </section>

          <section className="mb-8">
            <h2>第6条（知的財産権）</h2>
            <p>
              当サービスのコンテンツに関する知的財産権は、当サービスまたは正当な権利者に帰属します。
            </p>
            <p>
              利用者は、当サービスのコンテンツを個人的な利用の範囲内でのみ使用できます。
            </p>
          </section>

          <section className="mb-8">
            <h2>第7条（免責事項）</h2>
            <p>
              当サービスは、診断結果やレコメンドの精度について保証しません。
            </p>
            <p>
              当サービスの利用により生じた損害について、当サービスは責任を負いません。
            </p>
            <p>
              当サービスは、予告なくサービスの内容を変更、または中断・終了することがあります。
            </p>
          </section>

          <section className="mb-8">
            <h2>第8条（利用規約の変更）</h2>
            <p>
              当サービスは、必要に応じて本規約を変更することがあります。変更後の規約は、本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <section className="mb-8">
            <h2>第9条（準拠法・管轄裁判所）</h2>
            <p>本規約の準拠法は日本法とします。</p>
            <p>
              本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section className="mb-8">
            <h2>第10条（お問い合わせ）</h2>
            <p>利用規約に関するお問い合わせは、以下までご連絡ください：</p>
            <p>メール：support@movie-mbti.example.com（ダミー）</p>
          </section>
        </div>
      </div>
    </div>
  )
}

