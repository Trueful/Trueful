# Architecture

本ドキュメントは、Truefulが技術的にどのように機能し、内部の各コンポーネントがどのように連携するかを定義します。
個別のアーキテクチャの決定理由については `docs/adr/` ディレクトリを参照してください。

## Core Architecture

Truefulは以下の主要なプロセスとコンポーネントで構成されます。

* **Main Process (Node.js)**: Workspace管理、設定の解決、ローカルAI連携、履歴インデックス、およびバックグラウンドプロセスの統括を担います。
* **Renderer**: UIの描画と、Workspaceごとに完全に独立したBrowserViewをホストします。
* **Local DB**: SQLiteを利用し、履歴・インデックス・マニフェストを保存します。

## Workspace & Session Partition

タブではなく、Workspaceがアーキテクチャの起点です。
各Workspaceはマニフェスト（JSON）によって管理され、対応する `BrowserView` を持ちます。
`<webview>` タグを使用せず、ネイティブな `BrowserView` を用いることでセッションパーティションを分離し、Workspaceごとに独立したCookieやStorageを実現します。

### リソース管理
* フルアクティブなWorkspaceは最大5個、全体で保持するBrowserViewは最大30個に制限されます。
* 上限を超過したタブやWorkspaceは最も長く未フォーカスなものから休止状態（Dormant化）へ移行し、メモリを解放します。

## AI Broker & Inspector Agent

* **AI Broker**: ローカルAI（Ollama）およびクラウドAIを抽象化し、単一キューでリクエストを管理します。
* **Inspector Agent**: DOMやネットワークを解析し、テストマトリクスを生成・実行するローカルAI検査エージェントです。副作用の有無に応じてTier (A/B/C) を判定します。

## Plugin System

プラグインは、セキュリティモデルを維持するため、BrowserViewやiframeではなく **Node.js Worker Thread** 上で実行されます。これにより、プラグインからの直接的なネットワークアクセスやファイルシステムへの干渉を構造的に防ぎます。
