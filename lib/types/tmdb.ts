// TMDB API用のTypeScript型定義
export interface TMDBMovie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  popularity: number
  video: boolean
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBConfiguration {
  images: {
    base_url: string
    secure_base_url: string
    backdrop_sizes: string[]
    logo_sizes: string[]
    poster_sizes: string[]
    profile_sizes: string[]
    still_sizes: string[]
  }
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// 診断用映画データ（TMDB ID + カスタム情報）
export interface DiagnosisMovie {
  id: number
  tmdb_id: number
  title_ja: string
  title_en: string
  year: number
  genres: string[]
  tags: string[]
  persona_vec: number[]
  availability: string[]
  // TMDBから取得する情報
  poster_path?: string | null
  backdrop_path?: string | null
  overview?: string
  vote_average?: number
  release_date?: string
}

// 診断用映画の選択基準
export interface MovieSelectionCriteria {
  genre_ids: number[]
  year_range: [number, number]
  vote_average_min: number
  popularity_min: number
  language: string
}
