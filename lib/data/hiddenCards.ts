export interface HiddenCard {
  id: number
  copy: string
  tags: string[]
  runtime: number // 分
  rating: string // G, PG, PG12, R15+, R18+
  category: 'recommend' | 'challenge'
  typeCode: string
  availability: string[] // 配信サービス ['netflix', 'prime_video', 'u_next', 'hulu', 'disney_plus', 'apple_tv']
}

export const hiddenCards: HiddenCard[] = [
  // INJF - 静謐の余韻派
  {
    id: 101,
    copy: '静かに沁みる、90分。余韻を持ち帰る夜に。',
    tags: ['静謐', '余韻', '家族', '小さな奇跡', '80–100分'],
    runtime: 94,
    rating: 'G',
    category: 'recommend',
    typeCode: 'INJF',
    availability: ['netflix', 'prime_video'],
  },
  {
    id: 102,
    copy: '語られない想いが、画面に満ちる。',
    tags: ['静謐', '喪失', '希望', '日常', '100–120分'],
    runtime: 108,
    rating: 'PG',
    category: 'recommend',
    typeCode: 'INJF',
    availability: ['u_next', 'hulu'],
  },
  {
    id: 103,
    copy: '挑戦：あえて騒々しい世界へ。新たな発見があるかも。',
    tags: ['疾走感', '群像劇', '音楽', '青春', '100–120分'],
    runtime: 116,
    rating: 'PG12',
    category: 'challenge',
    typeCode: 'INJF',
    availability: ['disney_plus', 'apple_tv'],
  },

  // ENJF - 胸熱ドライブ派
  {
    id: 201,
    copy: '疾走感で胸を打つ。週末のご褒美に。',
    tags: ['疾走感', '友情', '成長', '映像美', '100–120分'],
    runtime: 108,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'ENJF',
    availability: ['netflix', 'disney_plus'],
  },
  {
    id: 202,
    copy: '熱量が止まらない。心が踊る2時間。',
    tags: ['胸熱', '勝利', 'チーム', '感動', '120–140分'],
    runtime: 132,
    rating: 'PG',
    category: 'recommend',
    typeCode: 'ENJF',
    availability: ['prime_video', 'u_next'],
  },
  {
    id: 203,
    copy: '挑戦：静かな物語。あなたの新しい一面が目覚めるかも。',
    tags: ['静謐', '余韻', '内省', '人間ドラマ', '80–100分'],
    runtime: 89,
    rating: 'PG',
    category: 'challenge',
    typeCode: 'ENJF',
    availability: ['hulu', 'apple_tv'],
  },

  // ISTP - 会話劇フェチ
  {
    id: 301,
    copy: '研ぎ澄まされた会話。緊張感に身を委ねる。',
    tags: ['会話劇', '緊張', '知的', '心理戦', '100–120分'],
    runtime: 112,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'ISTP',
    availability: ['u_next', 'hulu'],
  },
  {
    id: 302,
    copy: '言葉の間が、すべてを物語る。',
    tags: ['会話劇', '間', '静謐', '対話', '80–100分'],
    runtime: 96,
    rating: 'PG',
    category: 'recommend',
    typeCode: 'ISTP',
    availability: ['netflix', 'prime_video'],
  },
  {
    id: 303,
    copy: '挑戦：視覚優先の世界。言葉を超えた体験を。',
    tags: ['映像美', 'アクション', 'スペクタクル', '120–140分'],
    runtime: 128,
    rating: 'PG12',
    category: 'challenge',
    typeCode: 'ISTP',
    availability: ['disney_plus', 'apple_tv'],
  },

  // ESTP - 体感スペクタクル派
  {
    id: 401,
    copy: '圧倒的映像美。大画面で浴びるべき一作。',
    tags: ['映像美', 'スペクタクル', '没入', '壮大', '120–140分'],
    runtime: 135,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'ESTP',
    availability: ['netflix', 'disney_plus'],
  },
  {
    id: 402,
    copy: 'アクションの嵐。全身で受け止める2時間半。',
    tags: ['アクション', '迫力', 'スリル', '爽快', '140分以上'],
    runtime: 148,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'ESTP',
    availability: ['prime_video', 'u_next'],
  },
  {
    id: 403,
    copy: '挑戦：静かな会話劇。新たな映画体験を。',
    tags: ['会話劇', '知的', '静謐', '心理', '80–100分'],
    runtime: 91,
    rating: 'PG',
    category: 'challenge',
    typeCode: 'ESTP',
    availability: ['hulu', 'apple_tv'],
  },

  // INFP - 寓話ポエトリー派
  {
    id: 501,
    copy: '象徴に満ちた世界。何度でも観返したくなる。',
    tags: ['寓話', '象徴', '哲学', '多義性', '100–120分'],
    runtime: 115,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'INFP',
    availability: ['u_next', 'hulu'],
  },
  {
    id: 502,
    copy: '読み解く喜び。あなただけの解釈を見つけて。',
    tags: ['寓話', '詩的', '内省', '芸術', '80–100分'],
    runtime: 98,
    rating: 'PG',
    category: 'recommend',
    typeCode: 'INFP',
    availability: ['netflix', 'prime_video'],
  },
  {
    id: 503,
    copy: '挑戦：娯楽エンタメ。頭を空っぽにする体験も悪くない。',
    tags: ['娯楽', '爽快', 'シンプル', 'アクション', '100–120分'],
    runtime: 104,
    rating: 'PG12',
    category: 'challenge',
    typeCode: 'INFP',
    availability: ['disney_plus', 'apple_tv'],
  },

  // ENFP - 可能性冒険派
  {
    id: 601,
    copy: '斬新な世界観。未知への扉を開く。',
    tags: ['斬新', '冒険', '創造', '驚き', '100–120分'],
    runtime: 118,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'ENFP',
    availability: ['netflix', 'disney_plus'],
  },
  {
    id: 602,
    copy: 'ジャンルを超える。新しい映画体験がここに。',
    tags: ['多様', '実験', '自由', '発見', '120–140分'],
    runtime: 126,
    rating: 'PG12',
    category: 'recommend',
    typeCode: 'ENFP',
    availability: ['prime_video', 'u_next'],
  },
  {
    id: 603,
    copy: '挑戦：定型の王道。たまには安心感も必要かも。',
    tags: ['王道', '定番', '安心', 'ハッピーエンド', '100–120分'],
    runtime: 110,
    rating: 'PG',
    category: 'challenge',
    typeCode: 'ENFP',
    availability: ['hulu', 'apple_tv'],
  },
]

export function getCardsByType(
  typeCode: string,
  category?: 'recommend' | 'challenge'
): HiddenCard[] {
  return hiddenCards.filter(
    (card) =>
      card.typeCode === typeCode &&
      (category === undefined || card.category === category)
  )
}

