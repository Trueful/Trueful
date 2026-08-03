# Roadmap & Strategy

## Phase 1 (MVP Scope)
ブラウザの基礎機能と安定性、そして信頼構築に直結する機能を実装します。

- [ ] Workspace管理の基本実装
- [ ] Electron + Chromium基盤の構築
- [ ] BrowserViewによるセッションパーティションの分離
- [ ] SQLiteによるローカルデータ管理
- [ ] Fuzzy Search搭載のCommand Palette
- [ ] i18n（日本語・英語対応）とオンボーディングUI
- [ ] ブックマークのインポート機能

## Phase 2
Inspector Agentによるテスト・自動化機能と、拡張性を実現します。

- [ ] Ollamaを統合したAI Brokerの実装
- [ ] Inspector Agent (Tier A/B/Cの判別エンジン) の実装
- [ ] Pattern Trust Ledgerによる実績ベースの信頼モデル
- [ ] バッチレビューUIの導入 (Consent Fatigue軽減)
- [ ] Node.js Worker Thread上のPlugin API実装
- [ ] 読み取り専用のWorkspace Git連携機能

## Phase 3 & Beyond
クラウド連携および複数AIプロバイダー対応を進めます。

- [ ] Workspace定義・設定のクラウド同期（オプトイン必須）
- [ ] OpenAI / Gemini 等クラウドAIプロバイダーの追加サポート
- [ ] マルチウィンドウ（Tear-off）対応
- [ ] ツリー型タブのサポート
