# ADR-008: Adopt BrowserView

**Status**: Decided

## Decision

Use BrowserView for tab display; do not use the `<webview>` tag.

## Rationale

`<webview>` is officially deprecated-leaning by Electron and has well-known performance/security issues. BrowserView provides native process isolation and integrates naturally with per-Workspace session partition management.
