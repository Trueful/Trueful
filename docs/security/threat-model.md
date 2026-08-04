# Threat Model

## 脅威と主な対策

| 脅威 | 主な対策 |
|---|---|
| 悪意あるWebサイト | Security Profile（Production=strict）、Session Partition分離、Tier B/Cゲート、CSPパーサーでの可視化 |
| 悪意あるPlugin | Worker Thread実行（ネットワーク/ファイルシステム/IPC直接アクセスなし）、Main ProcessによるTier独立再計算、スキーマ不一致の戻り値は拒否 |
| Prompt Injection（悪意あるDOMコンテンツによるAI操作） | AIが生成したtier/sideEffectConfidenceは常にMain Processが独立に再検証する既存の不変条件がそのまま対策になる。AIの出力を信頼しない設計が、Plugin対策とPrompt Injection対策を兼ねる |
| Workspaceファイル改ざん | インポートしたWorkspace manifestはデフォルトで最も制限的なSecurityProfile（development）に強制し、`securityProfile`/`testTargets`の申告内容をそのまま信用しない。Pattern Trust Ledgerはそもそも同梱されない |
| ローカル情報漏洩 | クレデンシャルはOS keychain委譲（自前平文保存なし）、reasonLogはWorkspace間で件数・カテゴリのみ開示、ログにCookie値・パスワードを記録しない |

## Assets

| Asset | 説明 |
|---|---|
| Password / Credential | safeStorage経由でOS keychainに保存 |
| Session Cookie | Workspace単位のsession partitionに分離 |
| Workspace Manifest | プロジェクト定義そのもの |
| Pattern Trust Ledger | 検査実行の信頼履歴 |

これらAssetsと上記Attackersを掛け合わせたものが脅威モデルの全体像。

## 認証・パスワードストレージ

自前の暗号化実装は作らず、ElectronのsafeStorage API経由でOS標準の資格情報ストア（Windows Credential Manager / macOS Keychain / libsecret）へ委譲する。Local First（#11）の直接適用：自作暗号よりOS実装の方が攻撃面が小さい。

## SQLite暗号化について（不採用・理由）

history/manifest全体をsqlcipher等で暗号化することは行わない。credentialは既にsafeStorage（OS keychain）で保護済み。history/manifestはOSのディスク暗号化（BitLocker/FileVault等）に委任し、自作の暗号層は追加しない——自作暗号よりOS実装を優先する既存パターン（認証情報ストレージの決定と同型）。マルウェアによる同一ユーザー権限での読み取りは、OSレベルの保護が主たる防衛線であるという前提を明示的に受け入れる。

## file:// プロトコルの扱い

ローカルHTMLファイルは信頼された領域ではなく、インポートされたWorkspace同様「未知のorigin」として扱う。AIアクセス等の権限をfile://だからといって昇格させない。

## クリップボード権限

Webページ側のJSによるクリップボード読み書きは、Production/DevelopmentでデフォルトBlock。Testing/Customでのみ緩和可能（開発者ツールとしてはStrictを既定とする）。

## localhostの扱い

localhost/127.0.0.1は既存のDevelopmentプロファイル「自己署名証明書許可」の対象に含める。ただしTier B/Cのゲート判定自体は一切バイパスしない——証明書/CORS的な緩和とTier判定は別軸である。

関連: [Inspector Agent Tier分類](./inspector-agent-tiers.md) / [Consent Fatigue対策](./consent-fatigue.md)
