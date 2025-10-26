import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, preferences } = body

    // バリデーション
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { error: 'preferences must be an object' },
        { status: 400 }
      )
    }

    // 嗜好ベクトルの初期化（8次元）
    // preferencesからpersona_vecを生成
    const personaVec = [
      preferences.pace || 50,           // テンポ
      preferences.complexity || 50,     // 複雑さ
      preferences.emotional_depth || 50, // 感情の深さ
      preferences.realism || 50,         // リアリティ
      preferences.visual_priority || 50, // 映像重視度
      preferences.dialogue_priority || 50, // 会話重視度
      preferences.ending_preference || 50, // 結末の好み
      preferences.novelty || 50,         // 新しさ
    ]

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

    // user_profilesに保存（persona_vec初期化）
    const { error } = await supabase.from('user_profiles').upsert({
      session_id: sessionId,
      persona_vec: personaVec,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    */

    // 現在はダミーレスポンス
    console.log('Preferences saved:', { sessionId, preferences, personaVec })
    return NextResponse.json({ success: true, personaVec })
  } catch (error) {
    console.error('Error in submit-preferences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}