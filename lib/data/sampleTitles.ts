// 診断Step5で使用するサンプル作品（固有名詞は非表示）
export interface SampleTitle {
  id: number
  copy: string // 短いコピー（固有名詞なし）
  tags: string[] // 語彙タグ
  year: number
  genres: string[]
  availability: string[] // 配信サービス ['netflix', 'prime_video', 'u_next', 'hulu', 'disney_plus', 'apple_tv']
  persona_vec: number[] // 8次元ベクトル [pace, complexity, emotional_depth, realism, visual_priority, dialogue_priority, ending_preference, novelty]
  // 実際のタイトルは内部でのみ使用（UIには表示しない）
  _internalTitle?: string
}

export const sampleTitles: SampleTitle[] = [
  // 静謐・余韻系
  {
    id: 1001,
    copy: '静かに沁みる、家族の物語',
    tags: ['静謐', '余韻', '家族'],
    year: 2020,
    genres: ['drama', 'family'],
    availability: ['netflix', 'prime_video'],
    persona_vec: [0.3, 0.4, 0.8, 0.7, 0.5, 0.6, 0.5, 0.3],
    _internalTitle: '静かな作品A',
  },
  {
    id: 1002,
    copy: '喪失と希望、語られない想い',
    tags: ['静謐', '内省', '喪失'],
    year: 2019,
    genres: ['drama'],
    availability: ['u_next', 'hulu'],
    persona_vec: [0.3, 0.5, 0.9, 0.8, 0.4, 0.7, 0.4, 0.2],
    _internalTitle: '沁みる作品B',
  },

  // 疾走感・胸熱系
  {
    id: 2001,
    copy: '友情と成長、熱量が止まらない',
    tags: ['疾走感', '友情', '成長'],
    year: 2021,
    genres: ['action', 'comedy'],
    availability: ['netflix', 'disney_plus'],
    persona_vec: [0.9, 0.6, 0.7, 0.6, 0.8, 0.5, 0.8, 0.6],
    _internalTitle: '熱い作品C',
  },
  {
    id: 2002,
    copy: 'チームで勝利を掴む、爽快な2時間',
    tags: ['胸熱', '勝利', 'チーム'],
    year: 2022,
    genres: ['sports', 'drama'],
    availability: ['prime_video', 'u_next'],
    persona_vec: [0.8, 0.5, 0.8, 0.7, 0.7, 0.5, 0.9, 0.5],
    _internalTitle: '爽快作品D',
  },

  // 会話劇・知的系
  {
    id: 3001,
    copy: '緊張感ある対話、知的な駆け引き',
    tags: ['会話劇', '緊張', '知的'],
    year: 2018,
    genres: ['drama', 'mystery'],
    availability: ['u_next', 'hulu'],
    persona_vec: [0.4, 0.8, 0.6, 0.7, 0.4, 0.9, 0.5, 0.4],
    _internalTitle: '対話作品E',
  },
  {
    id: 3002,
    copy: '言葉の間、心理戦の妙味',
    tags: ['会話劇', '間', '心理'],
    year: 2020,
    genres: ['thriller', 'drama'],
    availability: ['netflix', 'prime_video'],
    persona_vec: [0.5, 0.9, 0.7, 0.8, 0.3, 0.9, 0.4, 0.3],
    _internalTitle: '心理戦作品F',
  },

  // 映像美・スペクタクル系
  {
    id: 4001,
    copy: '壮大な世界、圧倒的映像体験',
    tags: ['映像美', 'スケール', '没入'],
    year: 2021,
    genres: ['adventure', 'fantasy'],
    availability: ['netflix', 'disney_plus'],
    persona_vec: [0.7, 0.7, 0.6, 0.5, 0.9, 0.4, 0.7, 0.7],
    _internalTitle: '壮大作品G',
  },
  {
    id: 4002,
    copy: 'アクションの嵐、迫力のスリル',
    tags: ['アクション', '迫力', 'スリル'],
    year: 2022,
    genres: ['action', 'sci-fi'],
    availability: ['prime_video', 'u_next'],
    persona_vec: [0.9, 0.6, 0.5, 0.5, 0.9, 0.3, 0.6, 0.8],
    _internalTitle: 'アクション作品H',
  },

  // 寓話・象徴系
  {
    id: 5001,
    copy: '象徴に満ちた寓話、哲学的な問い',
    tags: ['寓話', '象徴', '哲学'],
    year: 2019,
    genres: ['drama', 'fantasy'],
    availability: ['u_next', 'hulu'],
    persona_vec: [0.4, 0.9, 0.8, 0.6, 0.6, 0.7, 0.3, 0.8],
    _internalTitle: '寓話作品I',
  },
  {
    id: 5002,
    copy: '詩的な映像、内省の旅',
    tags: ['寓話', '詩的', '内省'],
    year: 2020,
    genres: ['drama', 'art'],
    availability: ['netflix', 'prime_video'],
    persona_vec: [0.3, 0.9, 0.9, 0.7, 0.7, 0.6, 0.4, 0.9],
    _internalTitle: '詩的作品J',
  },

  // 斬新・実験的系
  {
    id: 6001,
    copy: '斬新な世界観、驚きの連続',
    tags: ['斬新', '驚き', '創造'],
    year: 2021,
    genres: ['sci-fi', 'thriller'],
    availability: ['disney_plus', 'apple_tv'],
    persona_vec: [0.7, 0.8, 0.6, 0.5, 0.8, 0.5, 0.5, 0.9],
    _internalTitle: '実験作品K',
  },
  {
    id: 6002,
    copy: '自由な冒険、多様な発見',
    tags: ['多様', '自由', '発見'],
    year: 2022,
    genres: ['adventure', 'comedy'],
    availability: ['hulu', 'apple_tv'],
    persona_vec: [0.8, 0.7, 0.7, 0.6, 0.7, 0.6, 0.7, 0.9],
    _internalTitle: '冒険作品L',
  },
]


