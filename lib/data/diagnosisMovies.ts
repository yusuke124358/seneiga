// 診断用映画12作品のTMDB IDとカスタム情報
import { DiagnosisMovie } from '../types/tmdb'

// 各タイプに適した有名映画のTMDB ID
export const DIAGNOSIS_MOVIE_IDS = [
  // 静謐・余韻系 (INJF向け)
  550, // Fight Club (静謐な内省)
  13,  // Forrest Gump (余韻のある物語)
  
  // 疾走感・胸熱系 (ENJF向け)
  155, // The Dark Knight (疾走感)
  680, // Pulp Fiction (胸熱)
  
  // 会話劇・知的系 (ISTP向け)
  278, // The Shawshank Redemption (会話劇)
  238, // The Godfather (知的駆け引き)
  
  // 映像美・スペクタクル系 (ESTP向け)
  424, // Schindler's List (映像美)
  389, // 12 Angry Men (スペクタクル)
  
  // 寓話・象徴系 (INFP向け)
  19404, // Dilwale Dulhania Le Jayenge (寓話)
  324857, // Spider-Man: Into the Spider-Verse (象徴)
  
  // 斬新・実験的系 (ENFP向け)
  496243, // Parasite (斬新)
  299536, // Avengers: Infinity War (実験的)
]

// カスタム情報（TMDBから取得できない部分）
export const DIAGNOSIS_MOVIE_CUSTOM_DATA: Partial<DiagnosisMovie>[] = [
  // Fight Club
  {
    tags: ['静謐', '内省', '哲学'],
    persona_vec: [0.3, 0.8, 0.9, 0.7, 0.4, 0.7, 0.3, 0.8],
    availability: ['netflix', 'prime_video'],
  },
  // Forrest Gump
  {
    tags: ['余韻', '家族', '希望'],
    persona_vec: [0.4, 0.5, 0.8, 0.8, 0.6, 0.6, 0.7, 0.3],
    availability: ['netflix', 'hulu'],
  },
  // The Dark Knight
  {
    tags: ['疾走感', '緊張', 'アクション'],
    persona_vec: [0.9, 0.7, 0.6, 0.6, 0.8, 0.5, 0.6, 0.7],
    availability: ['hbo_max', 'prime_video'],
  },
  // Pulp Fiction
  {
    tags: ['胸熱', '非線形', 'クール'],
    persona_vec: [0.8, 0.9, 0.7, 0.5, 0.7, 0.6, 0.5, 0.9],
    availability: ['netflix', 'hulu'],
  },
  // The Shawshank Redemption
  {
    tags: ['会話劇', '希望', '友情'],
    persona_vec: [0.4, 0.6, 0.9, 0.8, 0.5, 0.8, 0.8, 0.4],
    availability: ['netflix', 'prime_video'],
  },
  // The Godfather
  {
    tags: ['会話劇', '家族', '権力'],
    persona_vec: [0.5, 0.8, 0.8, 0.8, 0.6, 0.9, 0.6, 0.3],
    availability: ['paramount_plus', 'prime_video'],
  },
  // Schindler's List
  {
    tags: ['映像美', '歴史', '感動'],
    persona_vec: [0.4, 0.7, 0.9, 0.9, 0.8, 0.6, 0.4, 0.2],
    availability: ['netflix', 'hulu'],
  },
  // 12 Angry Men
  {
    tags: ['会話劇', '正義', '心理'],
    persona_vec: [0.3, 0.9, 0.8, 0.8, 0.3, 0.9, 0.7, 0.2],
    availability: ['criterion', 'prime_video'],
  },
  // Dilwale Dulhania Le Jayenge
  {
    tags: ['寓話', '恋愛', '家族'],
    persona_vec: [0.6, 0.5, 0.8, 0.6, 0.7, 0.6, 0.8, 0.4],
    availability: ['netflix', 'prime_video'],
  },
  // Spider-Man: Into the Spider-Verse
  {
    tags: ['象徴', '成長', '多様性'],
    persona_vec: [0.7, 0.6, 0.7, 0.4, 0.8, 0.5, 0.8, 0.9],
    availability: ['netflix', 'disney_plus'],
  },
  // Parasite
  {
    tags: ['斬新', '社会', 'サスペンス'],
    persona_vec: [0.6, 0.8, 0.8, 0.7, 0.7, 0.6, 0.4, 0.9],
    availability: ['hulu', 'prime_video'],
  },
  // Avengers: Infinity War
  {
    tags: ['実験的', 'スケール', 'アクション'],
    persona_vec: [0.9, 0.7, 0.6, 0.4, 0.9, 0.4, 0.5, 0.8],
    availability: ['disney_plus', 'prime_video'],
  },
]

// 診断用映画データを生成する関数
export async function generateDiagnosisMovies(): Promise<DiagnosisMovie[]> {
  try {
    // TMDBから映画データを取得
    const { getMultipleMovieDetails, getGenres } = await import('../services/tmdb')
    const movies = await getMultipleMovieDetails(DIAGNOSIS_MOVIE_IDS)
    const genres = await getGenres()
    
    // ジャンルIDを名前に変換
    const genreMap = new Map(genres.map(g => [g.id, g.name]))
    
    return movies.map((movie, index) => ({
      id: movie.id,
      tmdb_id: movie.id,
      title_ja: movie.title,
      title_en: movie.original_title,
      year: new Date(movie.release_date).getFullYear(),
      genres: movie.genre_ids.map((id: number) => genreMap.get(id) || 'Unknown'),
      tags: DIAGNOSIS_MOVIE_CUSTOM_DATA[index]?.tags || [],
      persona_vec: DIAGNOSIS_MOVIE_CUSTOM_DATA[index]?.persona_vec || [],
      availability: DIAGNOSIS_MOVIE_CUSTOM_DATA[index]?.availability || [],
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    }))
  } catch (error) {
    console.error('Error generating diagnosis movies:', error)
    // フォールバックデータを返す
    return getFallbackDiagnosisMovies()
  }
}

// フォールバック用の診断映画データ
function getFallbackDiagnosisMovies(): DiagnosisMovie[] {
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
    {
      id: 1002,
      tmdb_id: 1002,
      title_ja: '疾走感作品B',
      title_en: 'Energetic Film B',
      year: 2021,
      genres: ['アクション', 'コメディ'],
      tags: ['疾走感', '友情', '成長'],
      persona_vec: [0.9, 0.6, 0.7, 0.6, 0.8, 0.5, 0.8, 0.6],
      availability: ['netflix', 'disney_plus'],
      poster_path: null,
      backdrop_path: null,
      overview: '友情と成長の熱い物語',
      vote_average: 8.2,
      release_date: '2021-03-15',
    },
    // 他のフォールバック映画も同様に定義...
  ]
}
