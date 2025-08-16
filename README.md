# 🎯 dearKIKU

家族向けの知育ゲームアプリケーション - Next.js、TypeScript、Tailwind CSSで構築

## 📝 プロジェクト概要

dearKIKUは家族で楽しめる知育ゲームプラットフォームです。論理思考力やパターン認識能力を育成する様々なゲームを提供し、家族の絆を深めながら学習をサポートします。

## ✨ 主な機能

- 🎮 **多様なゲーム**
  - 論理ゲーム：論理思考力を鍛える
  - パターンゲーム：パターン認識能力を向上
  
- 👨‍👩‍👧‍👦 **家族管理**
  - 家族メンバーの登録・管理
  - 個別の進捗追跡
  
- 📊 **ダッシュボード**
  - ゲーム実績の可視化
  - 進捗状況の確認
  
- 🌙 **ダークモード対応**
  - 目に優しいダークテーマ
  - ライト/ダークモードの切り替え

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **状態管理**: React hooks
- **アイコン**: Lucide React

## 📁 プロジェクト構造

```
tiku/
├── app/                    # Next.js App Router
│   ├── dashboard/         # ダッシュボードページ
│   ├── family/           # 家族管理ページ
│   ├── games/            # ゲーム関連ページ
│   │   ├── logic/        # 論理ゲーム
│   │   └── pattern/      # パターンゲーム
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # ホームページ
├── components/           # Reactコンポーネント
│   ├── dashboard/        # ダッシュボード関連
│   ├── family/           # 家族管理関連
│   ├── games/            # ゲーム関連
│   ├── home/             # ホームページ関連
│   ├── layout/           # レイアウト関連
│   └── ui/               # 再利用可能なUIコンポーネント
├── hooks/                # カスタムフック
├── lib/                  # ユーティリティ関数・型定義
└── public/               # 静的ファイル
```

## 🚀 セットアップ & 実行

### 前提条件

- Node.js 18.0.0 以上
- npm、yarn、pnpm、または bun

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/taisei173263/dearKIKU.git
cd dearKIKU

# 依存関係をインストール
npm install
# または
yarn install
# または
pnpm install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

### ビルド

```bash
npm run build
# または
yarn build
# または
pnpm build
```

## 🎯 ゲーム機能

### 論理ゲーム
- 論理的思考力を鍛えるパズルゲーム
- 段階的な難易度設定
- ヒント機能付き

### パターンゲーム
- パターン認識能力を向上させるゲーム
- 色や形の組み合わせ
- 視覚的な学習サポート

## 👨‍👩‍👧‍👦 家族機能

- 複数の家族メンバーアカウント
- 個別の進捗管理
- 年齢に応じたゲーム推奨

## 📱 レスポンシブデザイン

- デスクトップ、タブレット、スマートフォンに対応
- モバイルファーストアプローチ
- タッチ操作最適化

## 🌙 テーマ機能

- ライトモード/ダークモード切り替え
- システム設定に応じた自動切り替え
- 個人設定の保存

## 📚 使用ライブラリ

- `@radix-ui/react-*`: アクセシブルなUIプリミティブ
- `lucide-react`: モダンなアイコンセット
- `clsx`: 条件付きクラス名
- `tailwind-merge`: Tailwindクラスのマージ

## 🚀 デプロイ

### Vercel (推奨)

Vercelプラットフォームを使用した簡単デプロイ：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

### その他のプラットフォーム

- Netlify
- AWS Amplify
- Firebase Hosting

詳細は [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## 📝 開発ガイドライン

- TypeScriptの型安全性を活用
- コンポーネントの再利用性を重視
- アクセシビリティを考慮した実装
- モバイルファーストな設計

## 🔧 カスタマイズ

### テーマ設定
`tailwind.config.ts`でカラーパレットやスペーシングをカスタマイズできます。

### コンポーネント追加
`components/ui/`に新しいUIコンポーネントを追加し、shadcn/uiパターンに従って実装してください。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

質問や問題がある場合は、[Issues](https://github.com/taisei173263/dearKIKU/issues)で報告してください。

---

Made with ❤️ for families who love learning together