import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, ratings } = body

    // バリデーション
    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      )
    }

    if (!ratings || typeof ratings !== 'object') {
      return NextResponse.json(
        { error: 'ratings must be an object' },
        { status: 400 }
      )
    }

    // 評価値のバリデーション（-1, 0, 1のみ）
    const ratingValues = Object.values(ratings)
    const invalidRatings = ratingValues.filter(rating => 
      typeof rating !== 'number' || ![0, 1, -1].includes(rating)
    )
    if (invalidRatings.length > 0) {
      return NextResponse.json(
        { error: 'Ratings must be 0 (neutral), 1 (like), or -1 (dislike)' },
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

    // user_ratingsに保存
    const ratingEntries = Object.entries(ratings).map(([titleId, rating]) => ({
      session_id: sessionId,
      title_id: parseInt(titleId),
      rating: rating as number,
    }))

    const { error: ratingsError } = await supabase
      .from('user_ratings')
      .upsert(ratingEntries)

    if (ratingsError) {
      console.error('Supabase ratings error:', ratingsError)
      return NextResponse.json({ error: ratingsError.message }, { status: 500 })
    }

    // persona_vecを評価履歴から更新
    const { error: vectorError } = await supabase.rpc('update_user_vector_from_ratings', {
      p_session_id: sessionId,
    })

    if (vectorError) {
      console.error('Supabase vector update error:', vectorError)
      return NextResponse.json({ error: vectorError.message }, { status: 500 })
    }
    */

    // 現在はダミーレスポンス
    console.log('Ratings saved:', { sessionId, ratings })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in submit-ratings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}