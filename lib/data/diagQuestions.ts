// 診断Step4の嗜好質問（8〜10問）
export interface DiagQuestion {
  id: string
  question: string
  description?: string
  type: 'slider' | 'radio'
  options?: { value: number; label: string }[]
  min?: number
  max?: number
  step?: number
  leftLabel?: string
  rightLabel?: string
}

export const diagQuestions: DiagQuestion[] = [
  {
    id: 'pace',
    question: '物語のテンポはどちらが好き？',
    description: '映画全体のリズム感について',
    type: 'radio',
    options: [
      { value: 0, label: 'ゆっくり静か' },
      { value: 25, label: 'ややゆっくり' },
      { value: 50, label: 'どちらでも' },
      { value: 75, label: 'やや速い' },
      { value: 100, label: '速く疾走感' },
    ],
  },
  {
    id: 'complexity',
    question: '物語の複雑さはどちらが好き？',
    description: '筋の入り組み具合について',
    type: 'radio',
    options: [
      { value: 0, label: 'シンプル' },
      { value: 25, label: 'ややシンプル' },
      { value: 50, label: 'どちらでも' },
      { value: 75, label: 'やや複雑' },
      { value: 100, label: '複雑・多層' },
    ],
  },
  {
    id: 'emotional_depth',
    question: '感情の描き方はどちらが好き？',
    description: '感情表現の深さについて',
    type: 'radio',
    options: [
      { value: 0, label: '軽やか' },
      { value: 25, label: 'やや軽やか' },
      { value: 50, label: 'どちらでも' },
      { value: 75, label: 'やや重厚' },
      { value: 100, label: '深く重厚' },
    ],
  },
  {
    id: 'realism',
    question: 'リアリティはどちらが好き？',
    description: '現実感の程度について',
    type: 'radio',
    options: [
      { value: 0, label: 'ファンタジー' },
      { value: 25, label: 'ややファンタジー' },
      { value: 50, label: 'どちらでも' },
      { value: 75, label: 'やや現実的' },
      { value: 100, label: '現実的' },
    ],
  },
  {
    id: 'visual_priority',
    question: '映像と物語、どちらを重視？',
    description: '視覚と内容のバランス',
    type: 'radio',
    options: [
      { value: 0, label: '物語重視' },
      { value: 25, label: 'やや物語重視' },
      { value: 50, label: 'どちらでも' },
      { value: 75, label: 'やや映像重視' },
      { value: 100, label: '映像重視' },
    ],
  },
  {
    id: 'dialogue_priority',
    question: '会話と映像、どちらを重視？',
    description: 'セリフと画面のバランス',
    type: 'radio',
    options: [
      { value: 0, label: '映像中心' },
      { value: 25, label: 'やや映像中心' },
      { value: 50, label: 'どちらでも' },
      { value: 75, label: 'やや会話中心' },
      { value: 100, label: '会話中心' },
    ],
  },
  {
    id: 'ending_preference',
    question: '結末の好みは？',
    type: 'radio',
    options: [
      { value: 0, label: '余韻を残す開かれた終わり' },
      { value: 50, label: 'どちらでも楽しめる' },
      { value: 100, label: 'スッキリ解決する終わり' },
    ],
  },
  {
    id: 'novelty',
    question: '作品の新しさ、どちらが好き？',
    type: 'radio',
    options: [
      { value: 0, label: '定番の安心感' },
      { value: 50, label: '程よい新鮮さ' },
      { value: 100, label: '斬新で実験的' },
    ],
  },
]


