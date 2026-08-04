# Trueful Developer Handbook

Truefulを開発するための公式ハンドブックです。

このドキュメントでは、Truefulの開発環境構築から、アーキテクチャ、実装方針、コードの書き方までを順番に説明します。

---

## このハンドブックの目的

Truefulは、単なるWebブラウザではありません。

開発者が最短で、安全に、迷わずWebを扱うための作業環境（Workspace）を目指しています。

そのため、Truefulの開発では「動くコードを書く」だけではなく、

- なぜこの設計にしたのか
- なぜこの技術を選んだのか
- どの問題を解決するための機能なのか

を理解することを重視します。

---

## 対象読者

このハンドブックは以下の人を対象にしています。

- Electron開発を初めて学ぶ人
- デスクトップアプリ開発を学びたい人
- Truefulの開発に参加したい人
- OSS開発の流れを理解したい人

プログラミング初心者でも読み進められるように、基礎から説明します。

---

# 学習ロードマップ

## 0. Introduction

Truefulとは何か、なぜ作るのかを理解します。

内容:

- Truefulの目的
- Philosophy
- 設計思想
- 開発方針

---

## 1. Development Environment

開発環境を構築します。

内容:

- Git / GitHub
- Node.js
- pnpm
- VS Code
- TypeScript
- Electron

---

## 2. Electron Basics

Electronの基本を学びます。

内容:

- Electronとは
- Main Process
- Renderer Process
- BrowserWindow
- BrowserView
- IPC

---

## 3. Project Structure

Truefulのコード構成を理解します。

内容:

- src構成
- 各ディレクトリの役割
- 命名規則
- ファイル管理

---

## 4. Architecture

Trueful内部の設計を理解します。

内容:

- Workspace
- Session Partition
- Database
- Event Bus
- IPC設計
- Plugin Architecture

詳細:

- `../architecture/`

---

## 5. UI Development

TruefulのUI開発について学びます。

内容:

- Design System
- Component設計
- Workspace UI
- Inspector Bar
- Command Palette

詳細:

- `../design-system/`

---

## 6. Browser Development

ブラウザ特有の技術を学びます。

内容:

- Chromium
- WebContents
- Cookie
- Storage
- Network
- CDP

---

## 7. Testing

品質を維持するためのテスト方法を学びます。

内容:

- Unit Test
- Integration Test
- E2E Test
- Playwright

---

## 8. Contribution

Truefulへの貢献方法を説明します。

内容:

- Issue作成
- Pull Request
- Commit規則
- Review

---

# 関連ドキュメント

## 設計思想

- [Philosophy](../philosophy/)

## アーキテクチャ

- [Architecture](../architecture/)

## UI設計

- [Design System](../design-system/)

## セキュリティ

- [Security](../security/)

## ADR（Architecture Decision Record）

- [ADR](../architecture/adr/)

## Roadmap

- [Roadmap](../roadmap/)

---

# 開発を始める

初めてTruefulを開発する場合は、以下の順番で読むことを推奨します。

1. このハンドブック
2. Development Environment
3. Electron Basics
4. Project Structure
5. Architecture Overview
6. 実装へ進む

---

## Philosophy

> Fast to Work. Easy to Reason. Hard to Misuse.

Truefulは、開発者の時間を奪わないために作られます。
