# Contributing Guide

Truefulへの貢献を歓迎します！

## Issue
* バグ報告は `Bug Report` テンプレートを使用し、再現手順とログを必ず添付してください。
* 新機能の提案は、まず `Feature Request` Issueを作成し、Philosophyに沿っているか議論してから実装に進んでください。

## Pull Request
* PRのサイズは **500行以内** に収めるよう努力してください。大きすぎるPRはレビューが困難になります。
* 1つのPRには1つの機能追加、または1つのバグリファクタリングのみを含めてください。機能追加とリファクタリングを混ぜないでください。

## Commit Rule
Conventional Commitsを採用しています。
* `feat:` 新機能
* `fix:` バグ修正
* `docs:` ドキュメントのみの変更
* `refactor:` バグ修正や機能追加を含まないコードの書き換え
* `chore:` ビルドプロセスや補助ツールの変更

## Coding Style
詳細は `docs/coding-style.md` を参照してください。基本的に TypeScript Strict Mode と ESLint の標準ルールに従います。
