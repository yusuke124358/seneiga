import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, gender, ageRange } = body

    // バリデーション
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
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

    // user_demographicsに保存
    const { error } = await supabase.from('user_demographics').upsert({
      session_id: sessionId,
      gender,
      age_range: ageRange,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    */

    // 現在はダミーレスポンス
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in submit-demographics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


