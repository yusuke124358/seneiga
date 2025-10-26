import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '映画MBTI - 性格×物語嗜好で映画に出会う',
    template: '%s | 映画MBTI',
  },
  description:
    'MBTI®とは無関係のMBTI風（非公式）診断で、あなたの性格と物語の好みを分析。ぴったりの映画と、少し冒険したい映画を提案します。',
  keywords: ['映画', '診断', 'MBTI', 'おすすめ', '性格診断', '映画レコメンド'],
  authors: [{ name: '映画MBTI' }],
  creator: '映画MBTI',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: '映画MBTI - 性格×物語嗜好で映画に出会う',
    description:
      'MBTI風（非公式）診断で、あなたにぴったりの映画と、少し冒険したい映画を提案。',
    siteName: '映画MBTI',
  },
  twitter: {
    card: 'summary_large_image',
    title: '映画MBTI - 性格×物語嗜好で映画に出会う',
    description:
      'MBTI風（非公式）診断で、あなたにぴったりの映画と、少し冒険したい映画を提案。',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

