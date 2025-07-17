# Video Learning Platform

Udemyのような動画学習プラットフォームです。Next.js、Firebase、AWS S3、Stripeを使用して構築されています。

## 主な機能

- **動画視聴**: 高品質な動画コンテンツの視聴
- **購入システム**: Stripe決済による動画の個別購入
- **認証システム**: Firebase Authenticationによるユーザー認証
- **動画管理**: AWS S3とCloudFrontによる動画配信
- **管理者機能**: 動画のアップロードと管理
- **レスポンシブデザイン**: モバイルフレンドリーなUI

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), React, TypeScript
- **スタイリング**: Tailwind CSS
- **認証**: Firebase Authentication
- **データベース**: Firestore
- **決済**: Stripe
- **動画ストレージ**: AWS S3
- **CDN**: AWS CloudFront
- **ホスティング**: Vercel（推奨）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`を`.env.local`にコピーし、必要な値を設定してください：

```bash
cp .env.local.example .env.local
```

#### Firebase設定
1. [Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成
2. Authentication、Firestoreを有効化
3. 設定 > プロジェクトの設定 > マイアプリから設定値を取得

#### AWS S3設定
1. AWS S3でバケットを作成
2. IAMユーザーを作成し、S3へのアクセス権限を付与
3. CloudFrontディストリビューションを作成（オプション）

#### Stripe設定
1. [Stripe Dashboard](https://dashboard.stripe.com/)でアカウントを作成
2. APIキーを取得
3. Webhookエンドポイントを設定

### 3. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

## デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. デプロイを実行

### 本番環境設定

- Firebase: 本番環境のプロジェクトを作成
- AWS: 本番用のS3バケットとCloudFrontを設定
- Stripe: 本番モードに切り替え

## 使用方法

### 管理者
1. `/upload` - 動画のアップロード
2. `/dashboard` - 管理者ダッシュボード

### 利用者
1. `/` - トップページ
2. `/videos` - 動画一覧
3. `/videos/[id]` - 動画詳細・視聴
4. `/checkout/[videoId]` - 購入ページ
5. `/auth` - ログイン・新規登録

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
