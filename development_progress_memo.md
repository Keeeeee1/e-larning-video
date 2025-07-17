# 開発進捗メモ - Video Learning Platform

## 2025年1月時点の作業内容

### プロジェクト概要
- Udemy風の動画学習プラットフォーム
- Next.js 14 + TypeScript + Tailwind CSS
- Firebase Authentication（条件付き初期化）
- YouTube動画統合

### 実施した主な変更

#### 1. YouTube動画統合
- Firebase/AWS S3での動画ストレージから、YouTube動画の埋め込みに変更
- `src/lib/youtube-videos.ts` を作成
  - YouTubeVideo インターフェース定義
  - モックデータ（プログラミング、AI、DevOps関連の8コース）
  - タグ、説明文、インストラクター情報を含む

#### 2. デザインの大幅な変更

##### 第1段階: 緑基調のUdemyライクなデザイン
- 全ページを緑色のアクセントカラーに統一
- videos、auth、dashboard ページを更新

##### 第2段階: B2B SaaSへのピボット
- ターゲットを工務店（建設業界）に変更
- プロダクト名を「BuildAI Pro」に変更
- カラースキームを slate/dark blue + teal アクセントに変更
- プロフェッショナルなB2B SaaSデザインに刷新

### 各ページの変更内容

#### トップページ (`/`)
- ヒーローセクション: slate グラデーション背景、幾何学的パターン
- 「全国の工務店様へ AIで業務を革新」というメッセージ
- 3つの主要ソリューション:
  - AI見積アシスタント
  - 顧客管理DX
  - 工程管理AI
- 信頼性を示すバッジ（導入実績500社以上など）

#### 動画一覧ページ (`/videos`)
- 「ソリューション一覧」として再構成
- ダークなヘッダー（slate-900）
- カード型のレイアウトで各ソリューションを表示
- ホバー効果とシャドウで洗練された印象

#### 動画詳細ページ (`/videos/[id]`)
- 2カラムレイアウト（メインコンテンツ + サイドバー）
- サイドバーにCTA、信頼バッジ、問い合わせ情報
- 「現場のプロが開発」「即時導入可能」などの特徴を強調

#### 認証ページ (`/auth`)
- スプリットスクリーンデザイン
- 左側: ログイン/登録フォーム
- 右側: 製品の価値提案（14日間無料トライアルなど）
- BuildingOfficeIcon を使用してB2B感を演出

#### ダッシュボード (`/dashboard`)
- まだ更新中（次の作業予定）

### 技術的な修正

#### 1. Firebase設定エラー
- `auth/invalid-api-key` エラーを条件付き初期化で対処
- FirebaseAuthContext.tsx で環境変数チェックを追加

#### 2. Next.js画像ドメイン設定
- `next.config.mjs` に YouTube サムネイル用ドメイン追加
```javascript
images: {
  domains: ['img.youtube.com'],
}
```

#### 3. SVGパターンのパースエラー
- データURL内の二重引用符をエスケープ（%22）に変換
- `bg-[url('data:image/svg+xml,...')]` の修正

#### 4. レイアウトの重複問題
- `src/app/dashboard/layout.tsx` を削除
- グローバルヘッダーをlayout.tsxから削除

### 使用している主な技術スタック
- Next.js 14.2.30 (App Router)
- TypeScript
- Tailwind CSS
- Firebase Authentication（オプション）
- Heroicons
- Google Fonts (Inter, Noto Sans JP)

### 現在の状態
- トップページ、動画一覧、動画詳細、認証ページがB2B SaaSデザインに更新済み
- ダッシュボードページの更新が残っている
- 開発サーバーは http://localhost:3003 で稼働中

### 今後の作業
1. ダッシュボードページのB2B SaaSデザイン適用
2. 共通コンポーネントの見直し
3. レスポンシブデザインの最適化
4. パフォーマンスの最適化