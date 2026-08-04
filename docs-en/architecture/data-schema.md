# Data Schema

## Versioning

Every schema carries a `schemaVersion` (number, initial value 1). When the spec changes, a migration function is prepared on the Main Process side to automatically convert older Workspace/Ledger versions (an application of Failure Friendly).

## Common Schema Overview

| Schema | Role |
|---|---|
| Workspace Manifest | Project definition including tabs, SecurityProfile, and AI settings. Git-manageable |
| Security Profile | production/development/testing/custom. A Tier C automation field is intentionally absent (making it configurable would itself be a risk) |
| Inspector Agent Test Matrix | The set of test cases. Holds `sideEffectConfidence` and `tier (A/B/C)` |
| Pattern Trust Ledger | Approval track record per pattern. New patterns always start as C-only. Local only (never made portable) |
| Inspector Bar State | Current SecurityProfile, AI status, queue count (queueCount), cookies, and reasonLog (Cookie/reasonLog hidden by default, expandable on tap). `aiContext.currentAction` (status string) and `aiContext.queueCount` (number) are kept as separate fields |

## Workspace Manifest — Additional Fields (Git Integration)

```json
"gitInfo": {
  "repoPath": "string | null",
  "enabled": "boolean"
}
```

For Workspaces without `repoPath` set (non-code use cases), Git display is not shown at all.

## SQLite Schema

```sql
CREATE TABLE workspace (
  workspace_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  security_profile TEXT NOT NULL,
  schema_version INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE tab (
  tab_id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspace(workspace_id),
  url TEXT NOT NULL,
  title TEXT,
  pinned INTEGER DEFAULT 0
);

CREATE TABLE history (
  entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
  workspace_id TEXT NOT NULL REFERENCES workspace(workspace_id),
  url TEXT NOT NULL,
  visited_at TEXT NOT NULL
);

CREATE TABLE pattern_trust_ledger (
  pattern_signature TEXT PRIMARY KEY,
  origin_id TEXT NOT NULL,
  approved_count INTEGER DEFAULT 0,
  anomaly_count INTEGER DEFAULT 0,
  tier_eligibility TEXT NOT NULL,
  last_verified_at TEXT,
  reverify_due_at TEXT
);

CREATE TABLE snapshot (
  snapshot_id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspace(workspace_id),
  manifest_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

**Migration strategy**: Starting from `workspace.schema_version`, at Main Process startup the diff against the current version is detected, and migration functions are applied sequentially in order (no skipping). Before applying, an automatic backup is created in the `snapshot` table (Failure Friendly).

## Memory / Data Sharing Model

| Data Type | Scope |
|---|---|
| Session / Cookie | Per-Workspace (partition-separated) |
| Credentials (safeStorage) | Per-Workspace (tied to the partition) |
| Browsing history | Per-Workspace |
| Pattern Trust Ledger | Shared across Workspaces per Origin (Tier decisions still pass through the same Profile/allowlist gate, so sharing doesn't bypass the gate itself) |
| AI model instance (Ollama) | A single shared instance across the whole app (AI Broker manages the queue with per-Workspace context) |
| Plugin execution environment | Independent per Worker Thread; no data sharing with the Workspace or other Plugins |

## Import/Export Policy

| Format | Purpose |
|---|---|
| JSON | The Workspace manifest itself. Git-manageable (default) |
| Zip | A sharing bundle of Manifest + Pattern Trust Ledger + cached snapshots. Does not include credentials (managed by safeStorage) |
| Git | JSON-format Manifests are directly Git-manageable as-is. No dedicated wrapper needed |
| Cloud sync | Phase 3+. When implemented, follows the same "explicit opt-in, no silent fallback" pattern as AI cloud usage |

Related: [IPC Specification](./ipc-spec.md) / [Workspace Git Integration](./workspace-git-integration.md)
