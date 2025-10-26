import { NextResponse } from 'next/server'
import { sampleTitles } from '@/lib/data/sampleTitles'

export async function GET() {
  try {
    /* TODO: Supabase接続時にコメント解除
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('titles_sample')
      .select('*')
      .eq('is_active', true)
      .order('popularity_score', { ascending: false })
      .limit(12)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ titles: data })
    */

    // 現在はダミーデータを返す
    return NextResponse.json({ titles: sampleTitles })
  } catch (error) {
    console.error('Error in /api/titles/samples:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


