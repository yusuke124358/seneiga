import { NextResponse } from 'next/server'
import { generateDiagnosisMovies } from '@/lib/data/diagnosisMovies'

export async function GET() {
  try {
    // TMDBから診断用映画データを取得
    const movies = await generateDiagnosisMovies()
    
    return NextResponse.json({ 
      titles: movies,
      source: 'tmdb',
      count: movies.length 
    })
  } catch (error) {
    console.error('Error in /api/titles/samples:', error)
    
    // フォールバック: 既存のサンプルデータを使用
    try {
      const { sampleTitles } = await import('@/lib/data/sampleTitles')
      return NextResponse.json({ 
        titles: sampleTitles,
        source: 'fallback',
        count: sampleTitles.length,
        error: 'TMDB API unavailable, using fallback data'
      })
    } catch (fallbackError) {
      console.error('Fallback data also failed:', fallbackError)
      return NextResponse.json(
        { error: 'Unable to fetch movie data' },
        { status: 500 }
      )
    }
  }
}


