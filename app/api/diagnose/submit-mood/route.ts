import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, mood } = body

    // バリデーション
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    if (!mood || typeof mood !== 'string') {
      return NextResponse.json(
        { error: 'mood must be a string' },
        { status: 400 }
      )
    }

    // 有効な気分IDかチェック
    const validMoods = ['relax', 'focus', 'excited', 'healing', 'stimulation', 'surprise', 'nostalgia', 'adventure']
    if (!validMoods.includes(mood)) {
      return NextResponse.json(
        { error: `Invalid mood: ${mood}` },
        { status: 400 }
      )
    }

    /* TODO: Supabase接続時にコメント解除
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // RLS用のsession_idを設定
    await supabase.rpc('set_config', {
      name: 'app.session_id',
      value: sessionId,
    })

    // user_profilesに保存（moodフィールドを更新）
    const { error } = await supabase.from('user_profiles').upsert({
      session_id: sessionId,
      mood,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    */

    // 現在はダミーレスポンス
    console.log('Mood saved:', { sessionId, mood })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in submit-mood:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}