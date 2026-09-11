# Contributing to Trueful

Trueful への参加方法です。コアメンバー向けの詳しい手順はチーム開発ガイドを参照してください。
<!-- ガイドのリポジトリURLに差し替え: https://github.com/Trueful/team-guide -->

## 流れ

1. Issue を作成、または既存の Issue に自分をアサインする
2. `main` から作業ブランチを作る
3. 変更してコミットする
4. Pull Request を出し、レビューを受ける
5. 承認後、作成者が **Squash and merge** する

`main` への直接 push はできません。

## ブランチ名

`種類/Issue番号-短い説明`（英小文字とハイフン）

例：`feature/12-tab-group`、`fix/15-crash-on-startup`

種類：`feature` / `fix` / `docs` / `refactor` / `chore`

## コミットメッセージ・PR タイトル

[Conventional Commits](https://www.conventionalcommits.org/ja/) の種類 + 日本語の説明

```
feat: ワークスペースの新規作成フローを追加
fix: 起動時にDBが見つからないとクラッシュする問題を修正
```

種類：`feat` / `fix` / `docs` / `refactor` / `style` / `test` / `chore`

## Pull Request

- 1つの Issue につき1つの PR。小さく保つ
- 本文に `Closes #Issue番号` を書く
- 承認1つ以上、未解決の会話なしでマージ可能

## 禁止事項

- 秘密情報（APIキー、トークン、`.env`）のコミット
- `git push --force`
- 他の人のブランチへの無断 push

## 言語

Issue・PR は日本語で書いています。English issues and pull requests are also welcome.