# Design System

TruefulのUIは、美しさを競うものではなく、開発者が考える時間を減らすために存在します。

## Design Tokens

### Spacing & Radius
* **Spacing**: 8px Grid (`4, 8, 16, 24, 32, 40, 48, 64`)
* **Radius**: 
  * Small: `4px` (Inputs, Buttons)
  * Medium: `8px` (Cards, Dialogs)
  * Large: `16px` (Workspace Containers)

### Colors
Tailwind CSSライクな階層を持たせ、セマンティックな役割を付与します。

* **Primary (Brand / Focus)**
  * `Primary-50`: `#eff6ff`
  * `Primary-100`: `#dbeafe`
  * `Primary-200`: `#bfdbfe`
  * `Primary-300`: `#93c5fd`
  * `Primary-400`: `#60a5fa`
  * `Primary-500`: `#3b82f6` (Default Action)
  * `Primary-600`: `#2563eb`
  * `Primary-700`: `#1d4ed8`
  * `Primary-800`: `#1e40af`
  * `Primary-900`: `#1e3a8a`

* **Neutral (Background / Text)**
  * `Neutral-50`: `#f8fafc` (App Background)
  * `Neutral-100`: `#f1f5f9`
  * `Neutral-200`: `#e2e8f0`
  * `Neutral-300`: `#cbd5e1` (Borders)
  * `Neutral-800`: `#1e293b` (Body Text)
  * `Neutral-900`: `#0f172a` (Headings)

* **Semantic Status**
  * `Success-500`: `#22c55e`
  * `Warning-500`: `#f59e0b`
  * `Danger-500`: `#ef4444`

### Typography
Line Heightまで厳密に定義し、コードと日本語の混植に最適化します。
* **UI/Body Font**: メイリオ / Inter
* **Code Font**: JetBrains Mono

| Role | Font Size | Line Height | Font Weight |
|---|---|---|---|
| `Heading1` | 32px | 1.3 | Bold |
| `Heading2` | 24px | 1.4 | Bold |
| `Heading3` | 20px | 1.4 | SemiBold |
| `Body` | 16px | 1.6 | Regular |
| `Caption` | 12px | 1.5 | Regular |
| `Label` | 14px | 1.2 | Medium |
| `Code` | 14px | 1.5 | Regular |

### Icons
* 採用ライブラリ: **Lucide Icons**
* サイズ: `24px` (通常アクション), `16px` (インライン/補助)
* スタイル: Filledは禁止。**Outlineのみ**を使用し、Stroke Widthは `2px` に統一。

## Components

### Button
* **Primary**: `Primary-500` bg, White text. メインアクション用。
* **Secondary**: Outline `Neutral-300`, `Neutral-800` text. キャンセル等のサブアクション用。
* **Ghost**: 背景なし、Hover時のみ `Neutral-100` bg. ツールバーアイコン等用。
* **Danger**: `Danger-500` bg, White text. 破壊的変更用。

### Input
* **Text**: Border `Neutral-300`, Radius Small, 14px text.
* **Password**: Textインプットにトグルアイコン (Eye) を内包。
* **Search**: 左側にSearchアイコン、Focus時に `Primary-500` リング。

### Dialog
* **Alert**: Danger Buttonを伴う、ユーザーの注意を引く警告。
* **Confirm**: 実行可否を問う（Cancel / OK）。
* **Bottom Sheet**: モバイルや画面下部からの補助設定メニュー。

### Toast
* 画面右下に表示。表示時間は3秒。
* **Success**: グリーンアイコン + メッセージ
* **Warning**: オレンジアイコン + メッセージ
* **Danger**: レッドアイコン + メッセージ（これのみ自動で消えず、明示的なCloseが必要）

### Card
* **Workspace Card**: プロジェクト名、Gitステータス、Security Modeバッジを含む。
* **Plugin Card**: プラグイン名、バージョン、設定トグルスイッチを含む。
* **Search Result**: Command Palette内での検索結果アイテム。キーボードフォーカス状態を明確化する。
