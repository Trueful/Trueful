# Browser Design System v1.1

（v1.0からの修正版。[Philosophy](../philosophy/mission-vision.md) とは別ファイルとして管理する）

## Mission

UIは美しさを競うものではない。開発者が考える時間を減らすために存在する。

## Design Principles

### 1. Workspace First

Workspaceが最も重要な単位。タブではなくWorkspaceが視線の起点になる。

### 2. Zero Noise

表示しなくても仕事ができる情報は表示しない。「表示できる」と「表示する」は違う。

### 3. Progressive Disclosure

必要になったら初めて表示する。

通常 → 詳細 → 高度 → 開発者向け

**修正**：Command Paletteは常にこの4段階をバイパスする。現在どの開示レベルにいても、Command Palette経由なら全機能に即座に到達できる（Time First優先）。

### 4. Stable Layout

位置は変えない。

- Workspace：左
- Inspector：右
- Command Palette：中央
- ページ内検索：上

**修正**：「上の検索」と「中央のCommand Palette」は役割が異なる別機能である。上＝ページ内検索（Ctrl+F相当）。中央＝コマンド/操作/ナビゲーション起動。機能を重複させない。

### 5. Ambient Information

重要だけど頻繁には見ない情報は「常にあるが邪魔しない」。

**修正**：常時表示（アンビエント）は以下の3つのみに絞る。

- Security Mode
- AI Status
- Queue N

Cookie件数・Network件数は常時表示せず、Security Modeインジケーターをタップした際の展開表示に含める（Transparency vs Zero Noiseの解決パターン：説明できることと常時見えることは別軸）。

### 6. Predictable Motion

アニメーションは状態変化を理解するためだけに使う。装飾は禁止。

## Design Tokens

### Spacing（8px Grid）

`4 / 8 / 16 / 24 / 32 / 40 / 48 / 64` — これ以外は禁止。

### Radius

- Small: 6
- Medium: 10
- Large: 16

### Shadow

3段階のみ：Low / Medium / High

### Typography

- 見出し：32 / 24 / 20
- 本文：16
- 補助：14 / 12
- Code：14、等幅フォント指定

**フォントファミリー（確定）**：

- Code：JetBrains Mono
- UI本文（見出し/本文/補助）：メイリオ（日本語・英語の両グリフを十分カバーするため、英語用の別フォント・フォールバック管理は不要）

**言語対応**：初期スコープはja/enの2言語のみ。他言語は当面Non-goals。

### Animation

- Hover：100ms
- 通常：150ms
- 画面遷移：200ms
- ツールチップ表示遅延：300ms（Progressive Disclosureの明文化。即座に出さず、意図的なホバーのみ反応する）
- 300ms以上（画面遷移等の主要アニメーション）は禁止

## Color Philosophy

色は意味。装飾ではない。

**修正**：Modeを表す色とStatusを表す色は別の名前空間にする（同じ緑/赤を2つの意味で使い回さない。これはNo Confusionへの抵触を避けるため）。

### Mode色（SecurityProfile）

- Production：Blue
- Development：Teal
- Testing：Orange
- Custom：Purple

### Status色（成否・安全性）

- Green：安全・成功・合格
- Red：危険・失敗・拒否
- Gray：情報なし・中立
- Blue（選択中）：Mode色のBlueとは文脈で区別（Workspace選択のハイライトは彩度を落とした別トーンを使う）

## Component Rules

### Button

高さ固定。押せると分かる。色は最小限。

### Sidebar

階層は2段まで。3段目は禁止。幅は可変（ドラッグリサイズ）。Ctrl/Cmd+Bで即時開閉可能。

### Inspector Bar

普段：Security Mode / AI / Queue N だけ。クリックすると詳細（Cookie件数・Network件数を含む）。

**エラー表示**：4xx/5xxのネットワークエラー発生時は、新しい常時表示項目を追加せず、既存3項目のいずれか（Queue N想定）に小さな赤ドットを重畳表示する。タップで詳細展開（Zero Noiseの「3項目まで」規律を維持したままTransparencyを満たす）。

### Command Palette

最重要UI。何でもここから開ける。Progressive Disclosureの全階層をバイパスする。

### Workspace Card

表示する情報：名前 / Security / Git / AI / 開いているタブ数

**Git表示（確定）**：ブランチ名 ＋ 変更ファイル数のバッジ（例：`main ● 3`）。未コミット変更がある場合はStatus色のOrangeドットで示す（新規の色を増やさず既存パレットを流用）。バッジをタップするとDiff Viewerが開き、ファイルごとに折りたたみ可能な差分をCode書体（14px等幅）で表示する。Unified/Side-by-side表示は切替可能。

**スコープ**：読み取り専用。ブランチ・差分の閲覧のみで、コミット/ステージ/pushなどの書き込み操作はこの機能に含まない（含める場合はTier C相当の別機能として改めて設計する）。

ahead/behind（リモートとの差）はCard上には出さず、タップ後の詳細表示に格納する（Ambient Informationの「常時表示は最小限、詳細はタップで」の原則を適用）。

## Layout

```
+------------------------------------------------------+
| Workspace │             Browser          │ Inspector  |
| Workspace │                               │  Security  |
| Workspace │                               │  AI        |
| Workspace │                               │  Queue     |
+------------------------------------------------------+
```

（Cookie/Networkはアンビエント表示から外したため、レイアウト図からも削除）

## Accessibility

キーボードだけで100%操作可能。フォーカスは必ず表示。色だけで状態を表現しない。

## Interaction Rules

クリック数を減らす。

**修正**：「クリック」はマウス操作に限定しない。「1アクション」＝クリック1回、またはキーボードショートカット1回（Keyboard First #12との整合）。

- 1アクション：毎日使う操作
- 2アクション：たまに使う操作
- 3アクション以上：設定だけ

## AI Rules

AIはUIの主役ではない。チャット欄は常設しない。必要になったら呼ぶ。

## Anti Patterns

絶対にやらない。

- × 設定画面を巨大化する
- × ポップアップを乱発する
- × モーダルだらけ
- × 色を増やす
- × タブを増やす
- × AIを全面に出す

## Attention Economy（注意資源）

「開発者の時間を奪わない」をUIの評価基準に落とし込む中核原則。占有コスト（常時画面を占有する度合い）と割り込みコスト（ユーザーの操作を強制的に止める度合い）は性質が異なるため、2本の別々のはしごとして管理する。

### 占有コストのはしご

| UI要素 | コスト |
|---|---|
| Inspector Bar | ★ |
| Sidebar | ★★ |

### 割り込みコストのはしご

| UI要素 | コスト |
|---|---|
| インライン警告（バナー、操作継続可） | ★ |
| 通知（Toast、自動で消える） | ★★ |
| モーダル（操作ブロック、Escで閉じられる） | ★★★ |
| ダイアログ（明示的選択を要求） | ★★★★ |

### ルール

高い割り込みコストを持つUIは、低いコストでは目的を達成できない場合にのみ使用する。

**例外**：ユーザー自身が呼び出したオーバーレイ（Command Palette等）はこのルールの対象外とする。システムが勝手に割り込むものではなく、ユーザーの意図で開いているため「割り込み」に該当しない。

---

本文書はBrowser Master Specとは独立したUI設計ファイルとして管理する。Workspace GitステータスのIPC/スキーマ定義は [Workspace Git連携](../architecture/workspace-git-integration.md) を参照。
