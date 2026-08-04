# IPC Specification

IPC uses invoke-style (request/response). See [ADR-007](./adr/adr-007-ipc-invoke.md) for details.

## Main Channels

| Channel | Direction | Purpose |
|---|---|---|
| `workspace:load` / `workspace:switch-security-profile` | R→M | Load Workspace / change mode |
| `inspector-agent:generate-matrix` / `execute-case` | R→M | Generate/execute tests |
| `ai-broker:enqueue` / `ai-broker:status` | R→M / M→R | Centralized AI inference queue management |
| `plugin:register-test-pattern` | R→M | Register a Plugin-originated pattern (Tier self-declaration is invalid; recalculated on the Main side) |
| `inspector-bar:update` | M→R | Immediate state reflection |

## Channels for Workspace Git Integration

| Channel | Direction | Purpose |
|---|---|---|
| `workspace:git-status` | R→M | Get branch name, changed-file count, ahead/behind |
| `workspace:git-diff` | R→M | Get the diff body for the Diff Viewer (per file) |

## State Transitions (Summary)

- Security Mode: `production ⇄ development ⇄ testing ⇄ custom` (explicit user action only, no automatic transitions)
- Test Case: `generated → [queued(B) | awaiting-consent(C)] → executing → executed | rejected | failed`

Related: [Data Schema](./data-schema.md) / [Event Bus](./event-bus.md)
