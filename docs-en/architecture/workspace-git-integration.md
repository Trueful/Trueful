# Workspace Git Integration

The technical spec underlying the Git status display on the Workspace Card (see [Design System](../design-system/ui-design-system-v1.1.md)). **Read-only**. Write operations such as commit/stage/push are out of scope.

## Schema Addition

For the additional fields on the Workspace Manifest, see [Data Schema](./data-schema.md).

## Implementation Approach

Invoke the system-installed `git` CLI via `child_process` (`git status --porcelain`, `git diff`, `git rev-parse --abbrev-ref HEAD`). Do not maintain a self-written JS implementation such as `isomorphic-git` — the target users almost certainly already have git installed, saving implementation and maintenance cost (the same reuse logic as the decision not to fork Chromium).

## Tier Classification

`git status` / `git diff` are filesystem reads only with no side effects, so they are **Tier A** (always automatic, no consent needed).

**Permission boundary**: This feature is implemented only as a native Main Process capability and is not exposed to Plugins (Worker Thread). Since Plugins structurally have no filesystem access, Git integration is placed outside that boundary as well.

## IPC

For the channels, see [IPC Specification: Channels for Workspace Git Integration](./ipc-spec.md#channels-for-workspace-git-integration).

## Update Timing

Fetched once when a Workspace is activated, then updated event-drivenly via filesystem watching (`fs.watch`) on the `.git` directory. No polling (to satisfy both the performance budget and Zero Noise).
