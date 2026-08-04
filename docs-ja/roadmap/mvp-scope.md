# MVPスコープ

19原則すべてを初期実装するのはLayer 0（Time First）に反する。優先順位をつけて段階的に実装する。

## Phase 1（真のMVP）

- Workspace管理・Command Palette（Fuzzy Search）・Inspector Bar最小表示
- Electron+Chromium基盤、SQLite、session partition、設定優先順位
- Threat Model基本形、性能予算（起動/切替/Palette）
- 自動更新、safeStorage認証
- Tier A便利ツール集
- i18n（ja/en）、オンボーディング
- ブックマークのみのインポート

**優先順位の理由**：

1. Workspace管理（Layer 3）— 最も差別化される機能
2. Inspector Bar（Layer 1: Transparency / Security）— 信頼構築の土台
3. Command Palette（Layer 0）— 開発者体験への即効性

**Phase 1で意図的に外すもの**：Plugin API、Chrome拡張互換、Suggested NextのAI連携（まずルールベースの候補提示から開始し、精度確認後にAI化）

## Phase 2

- Inspector Agent一式（Tier A/B/C、AI Broker、Pattern Trust Ledger、Ollama、Consent Fatigueバッチレビュー）
- Plugin API（Worker Thread、Versioning）
- Chrome拡張互換（Workspace単位のパーティション分離込み）
- 履歴/Cookie/パスワードを含む完全インポート
- Workspace Git連携
- マルチウィンドウ（Tear-off）、ツリー型タブ

## Phase 3以降

- クラウド同期
- OpenAI/Gemini等マルチAIプロバイダー対応

## リスク一覧（解決状況の追跡）

| リスク | 状況 |
|---|---|
| Electronのメモリ消費 | 解決済み。性能予算（Workspace1つ300MB/全体2GB上限）とBrowserView最大30個・LRU破棄で具体的な上限を規定 |
| Tier B/Cの境界判定の誤り | 解決済み。Pattern Trust Ledgerにより、新規パターンは常にTier Cから開始し実績を積んで初めて昇格する経験的信頼モデルへ切替済み（保守的フォールバックを内包） |
| Suggested Nextの確信度閾値 | 未解決。Inspector Agentとは別機能（受動的な次ページ提案）であり、閾値と表示条件はまだ明文化されていない。Phase 1後半で設計する |
| Chrome拡張互換をPhase 1で外す判断 | Phase 2へ確定済み。ADR-006でMV3の既知の制約も明記済み |

## 性能予算

| 項目 | 目標値 |
|---|---|
| 起動時間（コールドスタート、Developer Home表示まで） | 2秒以内 |
| Workspace切替時間 | 300ms以内 |
| Inspector Bar更新遅延 | 100ms以内（即時反映が原則） |
| AI応答待ちの上限（通知なしで待たせてよい時間） | 10秒（超過でキャンセル可能な通知） |
| メモリ上限（アクティブWorkspace1つあたり目安） | 300MB |
| メモリ上限（全Workspace合計、警告ライン） | 2GB |
| Command Palette応答 | 16ms以内（60fps相当のフレーム予算） |
| AI提案の初期表示（Suggested Next） | 500ms以内（本応答完了ではなく最初のヒント表示まで） |

いずれもデフォルト値でありsettings.jsonで調整可能（Everything Configurable #6）。

## Workspaceライフサイクルとリソース上限

```
作成 → 読み込み(アクティブ) → 非アクティブ化(dormant) → [再アクティブ化 | アーカイブ] → 削除
```

| 状態 | 保持するもの | 破棄するもの |
|---|---|---|
| アクティブ | BrowserView、セッションキャッシュ、Manifest、Ledger | — |
| Dormant | Manifest、Pattern Trust Ledger、ディスク上のセッションデータ | BrowserView実体（RAM解放） |
| アーカイブ | Manifestのみ | セッションキャッシュ |
| 削除 | なし（削除前に自動スナップショットを1回作成：Failure Friendly） | 全て |

- **常駐上限**：フルアクティブなWorkspaceは最大5個。超過分は最も長く非アクティブなものから自動的にDormant化する（破棄ではなく休止、いつでも復帰可能）。
- **キャッシュ破棄条件**：Dormant状態が7日間継続したセッションキャッシュは自動破棄（Manifest/Ledgerは保持）。手動の「キャッシュを消去」操作でも即時実行可能。
- **Dormant化時の状態保持**：BrowserView破棄前にスクロール位置のみ取得しWorkspace Manifestへ保存し、再アクティブ化時に復元する。フォーム入力途中の値は保存しない（サイト構造ごとの信頼性のばらつきと、未送信の機微情報をディスクに残すプライバシーリスクの両面から見送る）。

## BrowserView数の制限

「常駐Workspace5個」だけでは不十分（1 Workspace内の複数タブ＝複数BrowserViewがあり得るため）。

- 全Workspace合計でBrowserView実体は最大30個
- 超過時はLRU（最も長く未フォーカスのタブ）から破棄
- 破棄されたタブはURL/タイトルのみWorkspace Manifestに残り、再クリックで即座に再生成

**Workspace単位の常駐上限（5個）とタブ単位のBrowserView上限（30個）は独立した2つの制約であり、どちらか先に達した方が発動する**。例：アクティブWorkspaceが3個でもタブ合計が30を超えていればタブ単位LRUが先に効く。逆にタブ数が少なくてもWorkspaceが6個目に達すればWorkspace単位のDormant化が先に効く。

## テスト戦略

| 種別 | 対象 | ツール |
|---|---|---|
| Unit | Workspace管理、Tier判定ロジック、Ledger更新処理 | 標準的なJSテストランナー |
| Integration | Renderer↔Main間のIPC経路 | IPCモック |
| E2E | 実際のUI操作シナリオ | Playwright（Inspector Agentの実行エンジンと共用） |
| Pluginテスト | Worker Thread権限境界（Tier bypassが起きないことの検証） | 専用テストハーネス |
| AIテスト | Tier分類の誤判定率の回帰測定 | 固定Webサイトスナップショットのデータセットで継続検知 |

## アクセシビリティ

- ブラウザChrome自体（Command Palette、Inspector Bar、Workspace切替UI）はキーボード操作のみで完結（Keyboard First #12をブラウザ自体のUIへ拡張適用）
- 状態表示は色だけに依存しない（アイコン/パターンを併用）
- カスタムUIコンポーネントは適切なARIAロール/ラベルを持たせ、スクリーンリーダーに対応する

## Non-goals（非目標）

- 一般ユーザー向けの最適化はしない（Power User First優先）
- 独自レンダリングエンジンは開発しない（検討・却下済み。[ADR-004](../architecture/adr/adr-004-chromium-fixed.md) 参照）
- SNS/エンタメ用ブラウザにはしない（Purpose First）
- Chromiumのフォーク（独自パッチ適用）は行わない。素のElectron/Chromiumを使う
- v1でのモバイル対応はしない
