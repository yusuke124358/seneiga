import { TMDBMovie, TMDBGenre, TMDBConfiguration, TMDBResponse, DiagnosisMovie } from '../types/tmdb'

// TMDB API設定
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'your_api_key_here'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// API呼び出し用のヘルパー関数
async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=ja-JP`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      // タイムアウト設定
      signal: AbortSignal.timeout(10000), // 10秒
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('TMDB APIキーが無効です')
      } else if (response.status === 429) {
        throw new Error('TMDB APIのレート制限に達しました')
      } else if (response.status >= 500) {
        throw new Error('TMDBサーバーエラーが発生しました')
      } else {
        throw new Error(`TMDB API Error: ${response.status}`)
      }
    }
    
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('TMDB APIのタイムアウトが発生しました')
      }
      throw error
    }
    console.error('TMDB API fetch error:', error)
    throw new Error('TMDB APIへの接続に失敗しました')
  }
}

// 映画詳細情報を取得
export async function getMovieDetails(movieId: number): Promise<TMDBMovie> {
  return fetchTMDB<TMDBMovie>(`/movie/${movieId}`)
}

// 複数の映画詳細情報を取得
export async function getMultipleMovieDetails(movieIds: number[]): Promise<TMDBMovie[]> {
  const promises = movieIds.map(id => getMovieDetails(id))
  return Promise.all(promises)
}

// ジャンル一覧を取得
export async function getGenres(): Promise<TMDBGenre[]> {
  const response = await fetchTMDB<{ genres: TMDBGenre[] }>('/genre/movie/list')
  return response.genres
}

// 人気映画を検索
export async function getPopularMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchTMDB<TMDBResponse<TMDBMovie>>(`/movie/popular?page=${page}`)
}

// ジャンル別映画を検索
export async function getMoviesByGenre(
  genreId: number, 
  page: number = 1,
  year?: number
): Promise<TMDBResponse<TMDBMovie>> {
  const yearParam = year ? `&year=${year}` : ''
  return fetchTMDB<TMDBResponse<TMDBMovie>>(
    `/discover/movie?with_genres=${genreId}&page=${page}${yearParam}&sort_by=popularity.desc`
  )
}

// 映画を検索
export async function searchMovies(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
  const encodedQuery = encodeURIComponent(query)
  return fetchTMDB<TMDBResponse<TMDBMovie>>(`/search/movie?query=${encodedQuery}&page=${page}`)
}

// TMDB設定を取得（画像URL等）
export async function getConfiguration(): Promise<TMDBConfiguration> {
  return fetchTMDB<TMDBConfiguration>('/configuration')
}

// 画像URLを生成
export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/placeholder-movie.jpg'
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

// ポスター画像URLを生成
export function getPosterUrl(path: string | null, size: string = 'w500'): string {
  return getImageUrl(path, size)
}

// バックドロップ画像URLを生成
export function getBackdropUrl(path: string | null, size: string = 'w1280'): string {
  return getImageUrl(path, size)
}

// 診断用映画データをTMDBから取得して変換
export async function getDiagnosisMovies(tmdbIds: number[]): Promise<DiagnosisMovie[]> {
  try {
    const movies = await getMultipleMovieDetails(tmdbIds)
    const genres = await getGenres()
    
    // ジャンルIDを名前に変換するマップ
    const genreMap = new Map(genres.map(g => [g.id, g.name]))
    
    return movies.map(movie => ({
      id: movie.id,
      tmdb_id: movie.id,
      title_ja: movie.title,
      title_en: movie.original_title,
      year: new Date(movie.release_date).getFullYear(),
      genres: movie.genre_ids.map(id => genreMap.get(id) || 'Unknown'),
      tags: [], // カスタムタグは後で設定
      persona_vec: [], // カスタムベクトルは後で設定
      availability: [], // 配信情報は後で設定
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    }))
  } catch (error) {
    console.error('Error fetching diagnosis movies:', error)
    throw error
  }
}

// フォールバック用の映画データ
export function getFallbackMovies(): DiagnosisMovie[] {
  return [
    {
      id: 1001,
      tmdb_id: 1001,
      title_ja: '静かな作品A',
      title_en: 'Quiet Film A',
      year: 2020,
      genres: ['ドラマ', 'ファミリー'],
      tags: ['静謐', '余韻', '家族'],
      persona_vec: [0.3, 0.4, 0.8, 0.7, 0.5, 0.6, 0.5, 0.3],
      availability: ['netflix', 'prime_video'],
      poster_path: null,
      backdrop_path: null,
      overview: '静かに沁みる家族の物語',
      vote_average: 7.5,
      release_date: '2020-01-01',
    },
    // 他のフォールバック映画も同様に定義...
  ]
}
