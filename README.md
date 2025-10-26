# 映画MBTI - Movie Personality & Story Taste Matcher

**MBTI®とは無関係のMBTI風（非公式）** 性格×物語嗜好の診断を通じて、あなたにぴったりの映画を提案するWebサービスです。

## ✨ 特徴

- 🎬 **物語気質診断**: 性格と物語嗜好を診断（2–3分で完了）
- 🎭 **16タイプ**: 静謐の余韻派、胸熱ドライブ派、会話劇フェチなど
- 🎯 **パーソナライズ**: サブスクリプション + Like/Dislike反映の推薦
- 📱 **スマホ優先**: レスポンシブデザイン、アクセシビリティ対応
- 🔒 **Reveal形式**: 固有名詞は最初非表示、クリックで表示

## 🚀 デプロイ済み

このアプリは現在デプロイ準備完了状態です。

### 技術スタック
- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui**
- **lucide-react** (アイコン)

## 📱 診断フロー

1. **プロフィール**: 性別・年代（任意）
2. **サブスク**: 利用中の配信サービス選択
3. **嗜好**: 8つの質問で物語の好みを診断
4. **作品評価**: 既知作品のLike/Dislike評価
5. **気分**: 今日の気分を選択
6. **結果**: タイプ判定 + パーソナライズ推薦

## 🎯 診断タイプ例

- **INJF**: 静謐の余韻派 - 静かに沁みる物語で心を満たす
- **ENJF**: 胸熱ドライブ派 - テンポの良い起伏でスカッと
- **ISTP**: 会話劇フェチ - 言葉の間合いを味わう
- **ESTP**: 体感スペクタクル派 - 圧倒的な映像体験を求める
- **INFP**: 寓話ポエトリー派 - 隠喩と象徴を読み解く
- **ENFP**: 可能性冒険派 - 新しい世界に飛び込む

## 🔧 開発環境セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd movie-mbti

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーが起動したら [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 📦 ビルド & デプロイ

```bash
# ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🛠️ スクリプト

| コマンド          | 説明                              |
| ----------------- | --------------------------------- |
| `npm run dev`     | 開発サーバー起動 (localhost:3000) |
| `npm run build`   | 本番ビルド (.next/ に出力)        |
| `npm run start`   | 本番サーバー起動                  |
| `npm run lint`    | ESLint実行                        |
| `npm run format`  | Prettier実行 (全ファイル整形)     |

## 📁 プロジェクト構成

```
movie-mbti/
├── app/                    # Next.js App Router
│   ├── diagnose/          # 診断ページ（7ステップ）
│   ├── result/            # 結果ページ（推薦ロジック）
│   ├── type/[code]/       # タイプ詳細
│   └── api/               # API ルート
├── components/            # 再利用コンポーネント
│   ├── diagnose/          # 診断ステップコンポーネント
│   └── ui/               # shadcn/ui互換コンポーネント
├── lib/                   # ユーティリティ・データ
│   └── data/             # 診断データ・サンプル作品
└── supabase/             # データベーススキーマ
```

## 🎨 デザイン原則

- **RSC原則**: Server Componentを基本とし、必要箇所のみ `"use client"`
- **a11y優先**: フォーカスリング、aria属性、キーボード操作対応
- **スマホファースト**: レスポンシブデザイン、タッチ操作考慮
- **見出し**: 31字以内を目安

## ⚠️ 重要な制約

- **結果カードでは固有名詞（タイトル/監督/評価点）を表示しない**（Reveal後のみ表示）
- 「MBTI®とは無関係のMBTI風（非公式）」表記を必ず含める
- 現在はlocalStorageベース、将来的にSupabase/pgvector接続予定

## 🔮 今後の予定

- [ ] Supabase接続（pgvector検索）
- [ ] OGP画像生成API
- [ ] 配信可用性API連携（JustWatch等）
- [ ] 会員認証機能
- [ ] 2人診断機能

## 📄 ライセンス

Copyright © 2025 映画MBTI. All rights reserved.

### クレジット

- アイコン: [Lucide](https://lucide.dev/)
- UI: [shadcn/ui](https://ui.shadcn.com/)