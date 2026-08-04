# ADR-001: Runtime is Electron + Chromium

**Status**: Decided

## Decision

Adopt Electron instead of Tauri.

## Options Considered and Rationale

| Option | Evaluation |
|---|---|
| Electron (Chromium fixed) | ✓ CDP, certificate handling, and Inspector Agent behavior are consistent across all OSes. Existing assets (Gantt Chart Studio) can be reused |
| Tauri (OS-native WebView) | ✗ Diverges by OS: Windows=WebView2 (Chromium), macOS/Linux=WebKit-based. Violates No Confusion. Existing Electron assets would need to be rebuilt from scratch |
| Tauri + cef-rs | △ Unifying on Chromium across all OSes is possible, but this loses Tauri's biggest advantage (lightness) and effectively converges toward Electron. Maturity is also still developing |

## Deciding Factors

- Reuse of the existing stack (knowledge of IPC design, session partitioning, and BrowserView management carries over directly)
- Insurance against future WebKit divergence when expanding cross-platform
- Since this browser is designed to be used with Workspaces left open, the frequency of benefiting from Tauri's strengths (startup speed, low RAM) is low

## Reconsideration Conditions

If the project fully commits to Windows-only and there's a separate reason to write Rust itself, Tauri would also be reasonable. However, it doesn't fit this project's goal (finishing the browser as fast as possible).

Related: [ADR-004: Fixed on Chromium](./adr-004-chromium-fixed.md)
