# 開発者向けブラウザ ドキュメント

「開発者の時間を奪わない。」

このリポジトリは、開発者向けブラウザプロジェクトの思想・設計・実装方針をまとめたドキュメント群です。単一の統合仕様書から、読みやすさのために目的別ファイルへ分割しています。

## 読む順序（おすすめ）

初めて読む人は上から順に読むと、思想 → 設計 → 実装 → 運用の流れで理解できます。

1. **思想を知りたい人** → [`philosophy/`](./philosophy/)
   - [Mission / Vision](./philosophy/mission-vision.md)
   - [Priority Layers（優先順位レイヤー）](./philosophy/priority-layers.md)
   - [解消された内部緊張（設計パターン集）](./philosophy/resolved-tensions.md)

2. **設計・アーキテクチャを知りたい人** → [`architecture/`](./architecture/)
   - [アーキテクチャ概要 / Layer→機能マッピング](./architecture/overview.md)
   - [ADR（アーキテクチャ決定記録）一覧](./architecture/adr/)
   - [データスキーマ](./architecture/data-schema.md)
   - [IPC仕様](./architecture/ipc-spec.md)
   - [Event Bus](./architecture/event-bus.md)

3. **セキュリティ・脅威モデルを知りたい人** → [`security/`](./security/)
   - [Threat Model](./security/threat-model.md)
   - [Inspector Agent Tier分類](./security/inspector-agent-tiers.md)
   - [Consent Fatigue対策](./security/consent-fatigue.md)

4. **UIデザインを知りたい人** → [`design-system/`](./design-system/ui-design-system-v1.1.md)

5. **便利ツール集を知りたい人** → [`tools/command-palette-tools.md`](./tools/command-palette-tools.md)

6. **運用・リリースを知りたい人** → [`operations/`](./operations/)
   - [更新戦略](./operations/update-strategy.md)
   - [ログ仕様](./operations/logging.md)
   - [クラッシュレポート方針](./operations/crash-reporting.md)
   - [コードサイニング方針](./operations/code-signing.md)

7. **ロードマップ・普及戦略を知りたい人** → [`roadmap/`](./roadmap/)
   - [MVPスコープ（Phase 1/2/3）](./roadmap/mvp-scope.md)
   - [普及戦略](./roadmap/go-to-market.md)

8. **なぜその結論に至ったかを知りたい人** → [`decision-log/convergence-log.md`](./decision-log/convergence-log.md)

## 一文で表すなら

> 開発者が欲しい情報へ、最短距離で、安全に、迷わず到達できる、仕事のためのブラウザ。矛盾する要求は、レイヤーの優先順位によって裁定される。

## Design Motto

**Fast to Work. Easy to Reason. Hard to Misuse.**

| モットー | 対応レイヤー |
|---|---|
| Fast to Work | Layer 0（Time First / Purpose First） |
| Easy to Reason | Layer 1（Transparency / Predictable） |
| Hard to Misuse | Layer 1 × Layer 2 の交差点（No Confusion + Failure Friendly） |
