# ADR-008：BrowserView採用

**ステータス**：決定済み

## 決定

タブ表示に BrowserView を採用し、`<webview>` タグは使わない。

## 理由

`<webview>` はElectron公式に非推奨方向でパフォーマンス/セキュリティ上の既知の課題が多い。BrowserViewはネイティブなプロセス分離を提供し、Workspaceごとのsession partition管理と自然に統合できる。
