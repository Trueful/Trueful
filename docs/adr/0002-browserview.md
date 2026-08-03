# ADR 0002: <webview>タグを廃止し、BrowserViewを採用する

## Status
Accepted

## Context
WorkspaceごとにCookieやLocalStorageを完全に分離する必要がある。<webview>タグは実装が容易だが、Electronコミュニティでのサポートが非推奨に向かっており、バグも多い。

## Decision
UIレンダラーとは独立したプロセス空間を持つ `BrowserView` を用いて、各WorkspaceのWebコンテンツをホストする。

## Consequences
* **Pros**: ネイティブレベルでのセッション分離（Partition）が容易かつ確実になる。パフォーマンスが向上する。
* **Cons**: ウィンドウのリサイズ時やUIのオーバーレイ時に、RendererプロセスからBrowserViewの座標計算を手動で行う必要がある。
