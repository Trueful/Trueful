# ADR-002: Adopt SQLite (better-sqlite3)

**Status**: Decided

## Decision

Adopt better-sqlite3 as the local DB for Workspace / history / Pattern Trust Ledger.

## Rationale

- Embedded, no server required (directly aligned with Local First)
- The synchronous API pairs well with Electron Main Process's single-thread model
- Already proven in Gantt Chart Studio

## Notes

- SQLite (better-sqlite3) ships as part of the npm dependency tree, bundled with the Electron update cycle. It has no independent update path.
- Full encryption of history/manifest with sqlcipher etc. is not done (see [Threat Model](../../security/threat-model.md) for details).

Related: [Data Schema](../data-schema.md)
