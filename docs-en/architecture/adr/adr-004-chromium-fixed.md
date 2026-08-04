# ADR-004: Fixed on Chromium (no engine switching per OS)

**Status**: Decided

## Decision

Unify on Chromium (via Electron) across all OSes; do not adopt OS-native WebView switching like Tauri.

## Rationale

Prioritizes consistency of CDP-based Inspector Agent / Inspectable / Security Is a Choice. A direct consequence of [ADR-001](./adr-001-electron.md).
