# 更新戦略

## セキュリティアップデート方針

**前提**：ブラウザは「未知のWebコンテンツを常時実行する」ため、他の自作ツールとは攻撃面が桁違い。Chromiumは概ね2〜4週間おきに安定版の脆弱性修正が出る。

### Electron+Chromiumベースであることの恩恵

- CVEを自分で探す・修正コードを書く必要はゼロ
- 必要な作業は「electronパッケージのバージョンを上げて再ビルド・再配布する」運用のみ
- Chromiumチームの継続的なセキュリティ投資をそのまま享受できる（自作エンジンでは得られない）

### 運用ルール（最低ライン）

- 月次でElectronバージョンを確認・更新
- 動作確認後、再ビルド・再配布
- README等で更新頻度の期待値を明示し、利用者の信頼コストを下げる

**参考事例**：Arcは機能開発を完全停止した後も、Chromiumのセキュリティパッチ適用だけは継続している。The Browser Company自身が「ここだけは止められない」と判断している。

## 自動更新方針

`electron-updater` + GitHub Releasesで配信する。ダウンロードは自動、ただし再起動は必ずユーザー確認を挟む（Predictable #8）。重大な未適用パッチがある場合はInspector Barの警告表示を段階的に強めるが、強制インストールはしない——設定を理解できる人には自由を与える（Power User First #5）ため。

## 更新戦略の統合

| 対象 | トリガー | 方式 |
|---|---|---|
| Electron/Chromium | 月次確認 | electron-updater経由、再起動はユーザー確認必須 |
| Schema | アプリ更新後の次回Workspace読込時 | Main Process内マイグレーション関数を自動実行 |
| Plugin | Plugin側のバージョン変更検知 | 権限（permissions）が変更された場合、既存の同意を無効化し再確認を要求。無断の権限拡大は不可 |

3経路は独立してトリガーされるが、アプリ本体更新時にSchemaマイグレーションを同時に走らせ、バージョン不整合の窓を作らない。

## 設定の優先順位

競合時の勝ち順（低→高）：

```
Default < Global < Workspace < Profile < Temporary Override < CLI
```

CLI起動オプションが最も明示的な意図として最優先される。Temporary Overrideはセッション終了で消える一時上書き。Plugin由来の初期値はGlobalと同じ階層（詳細は [Plugin Versioning](../architecture/plugin-versioning.md) 参照）。

## エラーコード体系

`<ドメイン3〜4文字><連番3桁>` 形式で統一する。

| ドメイン | 意味 | 例 |
|---|---|---|
| SEC | SecurityProfile/証明書関連 | SEC001: 証明書検証エラー |
| AI | AI Broker/Inspector Agent | AI002: Ollama接続タイムアウト |
| WS | Workspace管理 | WS003: Manifest読込失敗（バージョン不一致） |
| PLG | Plugin | PLG004: スキーマ検証失敗（Tier申告不正） |
| INSP | Inspector Bar | INSP001: 状態更新の反映失敗 |
| UPD | 自動更新 | UPD001: パッチダウンロード失敗 |
| CFG | 設定 | CFG001: 優先順位解決の循環参照検出 |

## CI

GitHub Actions上でUnit/Integration/E2E（Playwright）をコミット・PRごとに自動実行する（GitHub Releases採用済みとの一貫性）。
