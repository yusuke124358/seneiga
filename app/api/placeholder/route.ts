import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const width = parseInt(searchParams.get('w') || '500')
  const height = parseInt(searchParams.get('h') || '750')
  const text = searchParams.get('text') || '映画ポスター'

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#f1f5f9"/>
      <rect x="${width * 0.1}" y="${height * 0.067}" width="${width * 0.8}" height="${height * 0.867}" rx="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="${width / 2}" cy="${height * 0.4}" r="${Math.min(width, height) * 0.08}" fill="#94a3b8"/>
      <path d="M${width * 0.44} ${height * 0.373}L${width * 0.48} ${height * 0.4}L${width * 0.56} ${height * 0.347}" stroke="white" stroke-width="${Math.min(width, height) * 0.008}" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="${width / 2}" y="${height * 0.6}" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="${width * 0.048}" font-weight="bold">${text}</text>
      <text x="${width / 2}" y="${height * 0.64}" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="${width * 0.032}">画像を読み込み中...</text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
