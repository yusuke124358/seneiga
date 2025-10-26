-- 映画MBTI 診断スキーマ
-- user_demographics, user_profiles, user_ratings, titles_sample

-- ===== 1. user_demographics (性別・年代) =====
CREATE TABLE IF NOT EXISTS user_demographics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- 匿名ユーザー用
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say', NULL)),
  age_range TEXT CHECK (age_range IN ('under_18', '18_24', '25_34', '35_44', '45_54', '55_64', '65_plus', NULL)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(session_id)
);

-- RLS有効化
ALTER TABLE user_demographics ENABLE ROW LEVEL SECURITY;

-- 自分のデータのみ閲覧・更新可能（匿名はsession_idで識別）
CREATE POLICY "Users can view own demographics"
  ON user_demographics FOR SELECT
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can insert own demographics"
  ON user_demographics FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can update own demographics"
  ON user_demographics FOR UPDATE
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

-- ===== 2. user_profiles (嗜好ベクトル・サブスク) =====
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- 匿名ユーザー用
  
  -- 嗜好ベクトル（8次元）
  persona_vec VECTOR(8), -- [pace, complexity, emotional_depth, realism, visual_priority, dialogue_priority, ending_preference, novelty]
  
  -- サブスクリプション（配信サービス）
  subscriptions TEXT[] DEFAULT '{}', -- ['netflix', 'prime_video', 'u_next', 'hulu', 'disney_plus', 'apple_tv']
  
  -- メタデータ
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id),
  UNIQUE(session_id)
);

-- RLS有効化
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profiles"
  ON user_profiles FOR SELECT
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can insert own profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can update own profiles"
  ON user_profiles FOR UPDATE
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

-- ===== 3. user_ratings (作品評価履歴) =====
CREATE TABLE IF NOT EXISTS user_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT, -- 匿名ユーザー用
  title_id INTEGER NOT NULL, -- 作品ID（TMDBまたは独自ID）
  rating SMALLINT CHECK (rating IN (-1, 0, 1)), -- -1: Dislike, 0: Neutral, 1: Like
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- ユーザーごと・作品ごとに1つの評価のみ
  UNIQUE(user_id, title_id),
  UNIQUE(session_id, title_id)
);

-- インデックス
CREATE INDEX idx_user_ratings_user_id ON user_ratings(user_id);
CREATE INDEX idx_user_ratings_session_id ON user_ratings(session_id);
CREATE INDEX idx_user_ratings_title_id ON user_ratings(title_id);

-- RLS有効化
ALTER TABLE user_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ratings"
  ON user_ratings FOR SELECT
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can insert own ratings"
  ON user_ratings FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can update own ratings"
  ON user_ratings FOR UPDATE
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

CREATE POLICY "Users can delete own ratings"
  ON user_ratings FOR DELETE
  USING (
    auth.uid() = user_id OR
    session_id = current_setting('app.session_id', TRUE)
  );

-- ===== 4. titles_sample (診断用サンプル作品) =====
-- 診断Step5で使用する代表的な作品
CREATE TABLE IF NOT EXISTS titles_sample (
  id SERIAL PRIMARY KEY,
  title_id INTEGER UNIQUE NOT NULL, -- TMDBまたは独自ID
  title_ja TEXT NOT NULL, -- 日本語タイトル
  title_en TEXT, -- 英語タイトル
  year INTEGER,
  genres TEXT[], -- ['drama', 'comedy', 'action', etc.]
  tags TEXT[], -- 語彙タグ（['静謐', '余韻', '家族']など）
  persona_vec VECTOR(8), -- 作品の嗜好ベクトル
  popularity_score FLOAT DEFAULT 0, -- 人気度
  is_active BOOLEAN DEFAULT TRUE, -- 診断に使用するか
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_titles_sample_is_active ON titles_sample(is_active);
CREATE INDEX idx_titles_sample_popularity ON titles_sample(popularity_score DESC);

-- ===== 5. update_user_vector_from_ratings() 関数 =====
-- ユーザーの評価履歴から persona_vec を更新
CREATE OR REPLACE FUNCTION update_user_vector_from_ratings(
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_aggregated_vec VECTOR(8);
BEGIN
  -- Like評価（rating = 1）の作品ベクトルを集計
  -- Dislike評価（rating = -1）の作品ベクトルを減算
  SELECT 
    ARRAY_AGG(
      CASE 
        WHEN ur.rating = 1 THEN ts.persona_vec
        WHEN ur.rating = -1 THEN -ts.persona_vec
        ELSE NULL
      END
    )::VECTOR(8)
  INTO v_aggregated_vec
  FROM user_ratings ur
  JOIN titles_sample ts ON ur.title_id = ts.title_id
  WHERE (
    (p_user_id IS NOT NULL AND ur.user_id = p_user_id) OR
    (p_session_id IS NOT NULL AND ur.session_id = p_session_id)
  )
  AND ur.rating IN (-1, 1);

  -- user_profiles の persona_vec を更新
  UPDATE user_profiles
  SET 
    persona_vec = v_aggregated_vec,
    updated_at = NOW()
  WHERE (
    (p_user_id IS NOT NULL AND user_id = p_user_id) OR
    (p_session_id IS NOT NULL AND session_id = p_session_id)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===== 6. サンプルデータ挿入 (titles_sample) =====
-- 診断用の代表的な12作品を挿入
INSERT INTO titles_sample (title_id, title_ja, title_en, year, genres, tags, persona_vec, popularity_score, is_active) VALUES
  -- 静謐・余韻系
  (1001, '静かな作品A', 'Quiet Film A', 2020, ARRAY['drama', 'family'], ARRAY['静謐', '余韻', '家族'], '[0.3, 0.4, 0.8, 0.7, 0.5, 0.6, 0.5, 0.3]'::VECTOR(8), 85, TRUE),
  (1002, '沁みる作品B', 'Touching Film B', 2019, ARRAY['drama'], ARRAY['静謐', '内省', '喪失'], '[0.3, 0.5, 0.9, 0.8, 0.4, 0.7, 0.4, 0.2]'::VECTOR(8), 78, TRUE),
  
  -- 疾走感・胸熱系
  (2001, '熱い作品C', 'Energetic Film C', 2021, ARRAY['action', 'comedy'], ARRAY['疾走感', '友情', '成長'], '[0.9, 0.6, 0.7, 0.6, 0.8, 0.5, 0.8, 0.6]'::VECTOR(8), 92, TRUE),
  (2002, '爽快作品D', 'Uplifting Film D', 2022, ARRAY['sports', 'drama'], ARRAY['胸熱', '勝利', 'チーム'], '[0.8, 0.5, 0.8, 0.7, 0.7, 0.5, 0.9, 0.5]'::VECTOR(8), 88, TRUE),
  
  -- 会話劇・知的系
  (3001, '対話作品E', 'Dialogue Film E', 2018, ARRAY['drama', 'mystery'], ARRAY['会話劇', '緊張', '知的'], '[0.4, 0.8, 0.6, 0.7, 0.4, 0.9, 0.5, 0.4]'::VECTOR(8), 81, TRUE),
  (3002, '心理戦作品F', 'Psychological Film F', 2020, ARRAY['thriller', 'drama'], ARRAY['会話劇', '間', '心理'], '[0.5, 0.9, 0.7, 0.8, 0.3, 0.9, 0.4, 0.3]'::VECTOR(8), 83, TRUE),
  
  -- 映像美・スペクタクル系
  (4001, '壮大作品G', 'Epic Film G', 2021, ARRAY['adventure', 'fantasy'], ARRAY['映像美', 'スケール', '没入'], '[0.7, 0.7, 0.6, 0.5, 0.9, 0.4, 0.7, 0.7]'::VECTOR(8), 95, TRUE),
  (4002, 'アクション作品H', 'Action Film H', 2022, ARRAY['action', 'sci-fi'], ARRAY['アクション', '迫力', 'スリル'], '[0.9, 0.6, 0.5, 0.5, 0.9, 0.3, 0.6, 0.8]'::VECTOR(8), 91, TRUE),
  
  -- 寓話・象徴系
  (5001, '寓話作品I', 'Allegorical Film I', 2019, ARRAY['drama', 'fantasy'], ARRAY['寓話', '象徴', '哲学'], '[0.4, 0.9, 0.8, 0.6, 0.6, 0.7, 0.3, 0.8]'::VECTOR(8), 76, TRUE),
  (5002, '詩的作品J', 'Poetic Film J', 2020, ARRAY['drama', 'art'], ARRAY['寓話', '詩的', '内省'], '[0.3, 0.9, 0.9, 0.7, 0.7, 0.6, 0.4, 0.9]'::VECTOR(8), 72, TRUE),
  
  -- 斬新・実験的系
  (6001, '実験作品K', 'Experimental Film K', 2021, ARRAY['sci-fi', 'thriller'], ARRAY['斬新', '驚き', '創造'], '[0.7, 0.8, 0.6, 0.5, 0.8, 0.5, 0.5, 0.9]'::VECTOR(8), 84, TRUE),
  (6002, '冒険作品L', 'Adventurous Film L', 2022, ARRAY['adventure', 'comedy'], ARRAY['多様', '自由', '発見'], '[0.8, 0.7, 0.7, 0.6, 0.7, 0.6, 0.7, 0.9]'::VECTOR(8), 87, TRUE)
ON CONFLICT (title_id) DO NOTHING;

-- ===== コメント =====
COMMENT ON TABLE user_demographics IS 'ユーザーの性別・年代情報（任意）';
COMMENT ON TABLE user_profiles IS 'ユーザーの嗜好ベクトルとサブスクリプション情報';
COMMENT ON TABLE user_ratings IS 'ユーザーの作品評価履歴（Like/Neutral/Dislike）';
COMMENT ON TABLE titles_sample IS '診断用のサンプル作品（代表的な12作品）';
COMMENT ON FUNCTION update_user_vector_from_ratings IS 'ユーザーの評価履歴からpersona_vecを更新';


