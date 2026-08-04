# Inspector Agent：Tier分類

ローカルAIが検査パターンを生成し、実行手順を提案し、検査ツールを設定し、実行する。「実行」を一枚岩として扱うと [解消された内部緊張: 緊張2](../philosophy/resolved-tensions.md) で定めた「案内は自由、実行は同意が必要」に単純に反する。解決策は、実行を副作用の有無で三段階に分割すること。

## Tier定義

| Tier | 内容 | 実行条件 |
|---|---|---|
| A: 生成・提案 | パターン作成、手順提案、設定下書き | 常に自動 |
| B: 読み取り専用検査 | リンク検査、ヘッダ確認、a11y監査 | Security Mode=Testing かつ 対象originがallowlist登録済み、かつ Pattern Trust LedgerでapprovedCount>=3, anomalyCount=0の場合のみ |
| C: 状態変更を伴う操作 | フォーム送信、ログイン、削除、決済 | モード問わず毎回明示同意が必須（恒久ルール、設定でオーバーライド不可） |

`sideEffectConfidence < 0.95` の場合、AIの判定に関わらず強制的にTier Cとする。

## Tier Cが常に人間の確認を要する理由

Testing modeであっても、対象が本番相当のバックエンド（決済APIなど）である可能性を排除できない。Layer 0（開発者自身とその下流システムの安全）がLayer 2の自由度に優先する。

## アーキテクチャ

- ローカルAI（Ollama）がDOM / Network tab / 取得可能な場合はOpenAPI仕様を解析し、テストマトリクスを生成
- テストマトリクス = JSON（Workspace manifestと同様、Git管理可能）
- 実行エンジン：Playwright、またはCDPを直接叩く自作runner（Node.js Main Processから呼び出し）
- allowlistはWorkspace設定内の `testTargets: string[]`（origin単位で管理）
- 実行ログ・生成物はすべてInspector Barからワンクリックで参照可能（Transparency #9の延長）

## UI

「検査タブ」パネル：生成されたテストマトリクスをチェックリスト表示

- Tier A：自動生成済み（グレー表示）
- Tier B：「自動実行中」バッジ
- Tier C：「確認待ち」バッジ、クリックで実行前の差分プレビュー（可能な場合）を表示

## MVPへの位置付け

Phase 1で外した「Suggested NextのAI連携」と役割が近いが別機能（受動的な次ページ提案 vs 能動的な検査実行）。Tier分類のセキュリティ判定ロジックはInspector Bar / Workspace基盤が固まってから乗せる方が安全なため、Phase 2として位置付ける。

関連: [Consent Fatigue対策](./consent-fatigue.md) / [MVPスコープ](../roadmap/mvp-scope.md)
