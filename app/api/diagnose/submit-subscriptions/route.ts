import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, subscriptions } = body

    // バリデーション
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    if (!Array.isArray(subscriptions)) {
      return NextResponse.json(
        { error: 'subscriptions must be an array' },
        { status: 400 }
      )
    }

    // 有効なサブスクリプションサービスかチェック
    const validServices = ['netflix', 'prime_video', 'u_next', 'hulu', 'disney_plus', 'apple_tv']
    const invalidServices = subscriptions.filter(s => !validServices.includes(s))
    if (invalidServices.length > 0) {
      return NextResponse.json(
        { error: `Invalid services: ${invalidServices.join(', ')}` },
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

    // user_profilesに保存（subscriptionsフィールドを更新）
    const { error } = await supabase.from('user_profiles').upsert({
      session_id: sessionId,
      subscriptions,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    */

    // 現在はダミーレスポンス
    console.log('Subscriptions saved:', { sessionId, subscriptions })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in submit-subscriptions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}