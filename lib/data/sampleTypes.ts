export interface MovieType {
  code: string
  name: string
  oneLiner: string
  description?: string
  strengths?: string[]
  challenges?: string[]
}

export const sampleTypes: MovieType[] = [
  {
    code: 'INJF',
    name: '静謐の余韻派',
    oneLiner: '静かに沁みる物語で心を満たす',
    description:
      'あなたは、喧騒を離れた静かな映画空間に安らぎを見出します。登場人物の微細な感情の揺れ、言葉にならない想い、そして物語が終わった後も続く余韻を大切にします。',
    strengths: ['余韻', '静謐', '内省', '情緒'],
    challenges: ['高テンポ', '派手な演出', '複雑な群像劇'],
  },
  {
    code: 'ENJF',
    name: '胸熱ドライブ派',
    oneLiner: 'テンポの良い起伏でスカッと',
    description:
      'あなたは、エネルギッシュな展開と心が高揚する瞬間を求めます。友情、成長、勝利といったポジティブなテーマに共感し、映画の熱量を全身で受け止めます。',
    strengths: ['疾走感', '友情', '成長', 'ポジティブ'],
    challenges: ['静的展開', '暗いトーン', '救いのない結末'],
  },
  {
    code: 'ISTP',
    name: '会話劇フェチ',
    oneLiner: '言葉の間合いを味わう',
    description:
      'あなたは、洗練された会話劇に魅了されます。セリフの間、言葉の選び、緊張感のある対話シーン。映画館よりも自宅で、集中してじっくりと鑑賞するスタイルを好みます。',
    strengths: ['会話劇', '間', '緊張感', '知的'],
    challenges: ['視覚重視', 'CGアクション', '説明不足'],
  },
  {
    code: 'ESTP',
    name: '体感スペクタクル派',
    oneLiner: '圧倒的な映像体験を求める',
    description:
      'あなたは、映像と音響が織りなす圧倒的な体験を追求します。映画館の大スクリーンで、迫力あるアクションや美しい映像美を全身で浴びることに喜びを感じます。',
    strengths: ['映像美', 'アクション', 'スケール', '没入感'],
    challenges: ['低予算', '会話中心', '抽象的表現'],
  },
  {
    code: 'INFP',
    name: '寓話ポエトリー派',
    oneLiner: '隠喩と象徴を読み解く',
    description:
      'あなたは、映画の奥に潜む寓話性や象徴表現を読み解くことに喜びを感じます。何度も観返し、新たな解釈を発見する過程そのものが、あなたにとっての映画体験です。',
    strengths: ['寓話', '象徴', '多義性', '哲学'],
    challenges: ['単純明快', '説明過多', '娯楽重視'],
  },
  {
    code: 'ENFP',
    name: '可能性冒険派',
    oneLiner: '新しい世界に飛び込む',
    description:
      'あなたは、未知の世界や斬新なアイデアに満ちた作品に惹かれます。ジャンルの垣根を越え、次々と新しい映画体験を求める好奇心旺盛な探求者です。',
    strengths: ['斬新', '冒険', '創造性', '多様性'],
    challenges: ['定型', '予定調和', '保守的'],
  },
]

export function getTypeByCode(code: string): MovieType | undefined {
  return sampleTypes.find((type) => type.code === code)
}

