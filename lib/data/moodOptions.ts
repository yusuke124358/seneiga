// 診断Step6の気分選択肢
export interface MoodOption {
  id: string
  label: string
  description?: string
  emoji?: string
}

export const moodOptions: MoodOption[] = [
  {
    id: 'relax',
    label: 'リラックス',
    description: 'ゆったりとした時間を過ごしたい',
    emoji: '😌',
  },
  {
    id: 'focus',
    label: '集中',
    description: 'じっくりと作品に没入したい',
    emoji: '🎯',
  },
  {
    id: 'excited',
    label: '高揚',
    description: '心が躍るような体験を求めている',
    emoji: '🚀',
  },
  {
    id: 'healing',
    label: '癒し',
    description: '心を温めてくれる作品を探している',
    emoji: '💚',
  },
  {
    id: 'stimulation',
    label: '刺激',
    description: '新しい発見や驚きを求めている',
    emoji: '⚡',
  },
  {
    id: 'surprise',
    label: '驚き',
    description: '予想外の展開に期待している',
    emoji: '😲',
  },
  {
    id: 'nostalgia',
    label: '懐かしさ',
    description: '昔の気持ちを思い出したい',
    emoji: '🌙',
  },
  {
    id: 'adventure',
    label: '冒険',
    description: '未知の世界に飛び込みたい',
    emoji: '🗺️',
  },
]

export function getMoodById(id: string): MoodOption | undefined {
  return moodOptions.find((mood) => mood.id === id)
}