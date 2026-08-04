# 01. Development Environment

## この章の目的

この章では、Truefulを開発するための環境を構築します。

開発環境とは、コードを書くための道具だけではありません。

Truefulでは、以下の要素を組み合わせて開発を行います。

- コードを書く環境
- バージョン管理
- パッケージ管理
- ビルド環境
- デバッグ環境

この章を終了すると、Truefulの開発を開始できる状態になります。

---

# 1. Truefulの開発スタック

Truefulでは、以下の技術を使用します。

| 技術 | 役割 |
| --- | --- |
| Electron | デスクトップアプリケーション基盤 |
| Chromium | ブラウザレンダリングエンジン |
| TypeScript | メイン開発言語 |
| React | UI構築 |
| SQLite | ローカルデータ管理 |
| Git | バージョン管理 |
| pnpm | パッケージ管理 |

TruefulはElectron + Chromiumを中心とした構成を採用します。

ElectronはMain Processでアプリケーション管理を担当し、
Renderer側ではブラウザUIを構築します。

---

# 2. 必要なツール

## Visual Studio Code

## 概要

Visual Studio Code（VS Code）は、Microsoftが提供するコードエディタです。

Truefulでは以下の用途で使用します。

- TypeScript編集
- Markdown編集
- Git操作
- デバッグ
- 拡張機能による開発支援

---

## Git

## 概要

Gitはソースコードの変更履歴を管理するシステムです。

開発では、コード変更をcommitという単位で保存します。

例：

```
コードを書く
 ↓
変更を確認
 ↓
commit
 ↓
履歴として保存
```

TruefulではGitHubを利用してソースコードを管理します。

---

## Node.js

## 概要

Node.jsはJavaScriptをコンピューター上で実行するための環境です。

ElectronはNode.jsを利用して動作します。

関係は以下のようになります。

```
Trueful
 |
Electron
 |
Node.js
 |
OS
```

---

## pnpm

## 概要

pnpmはNode.jsプロジェクトのパッケージ管理ツールです。

Truefulでは以下のような依存関係を管理します。

```
Trueful
 |
 ├ Electron
 ├ React
 ├ TypeScript
 ├ Testing Tools
 └ その他ライブラリ
```

---

# 3. インストール

以下のツールをインストールします。

## 必須

- Visual Studio Code
- Git
- Node.js
- pnpm

---

# 4. インストール確認

ターミナルを開き、以下のコマンドを実行します。

## Node.js

```bash
node -v
```

表示例:

```
v24.x.x
```

---

## pnpm

```bash
pnpm -v
```

表示例:

```
10.x.x
```

---

## Git

```bash
git --version
```

表示例:

```
git version 2.x.x
```

---

# 5. Truefulを取得する

GitHubからリポジトリを取得します。

```bash
git clone https://github.com/Trueful/Trueful.git
```

取得後、ディレクトリへ移動します。

```bash
cd Trueful
```

VS Codeで開きます。

```bash
code .
```

---

# 6. 開発環境の確認

現在、以下のような構成になっていることを確認します。

```
Trueful/
├── README.md
├── LICENSE
├── assets/
├── docs-ja/
├── docs-en/
└── src/
```

---

# 7. 開発時の基本ルール

Truefulでは、以下の考え方を重視します。

## 理由を理解する

コードを書く前に、

- なぜ必要なのか
- なぜこの技術を選ぶのか
- 他の方法ではなぜ駄目なのか

を理解します。

---

## 小さく変更する

大きな変更を一度に行わず、小さい単位でcommitします。

例:

```
feat: add workspace model

fix: correct ipc error handling

docs: update architecture guide
```

---

## ドキュメントを残す

Truefulではコードだけではなく、設計理由も重要な成果物です。

変更理由は必要に応じてADR（Architecture Decision Record）へ記録します。

---

# 8. 次の章

次はElectronの基礎を学びます。

```
02-electron-basics.md
```

内容:

- Electronとは何か
- Chromiumとの関係
- Main Process
- Renderer Process
- BrowserWindow
- BrowserView
- IPC

ここから実際のアプリケーション作成へ進みます。
