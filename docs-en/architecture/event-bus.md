# Event Bus (Internal Events)

While IPC handles Renderer↔Main communication, a separate event bus (Node.js EventEmitter-based) is provided for inter-module coordination within the Main Process.

## Main Events

- `WorkspaceLoaded`
- `TabCreated`
- `SecurityChanged`
- `SnapshotCreated`
- `TierCaseExecuted`

## Purpose

Keeps AI Broker, Inspector Bar, and the snapshot mechanism loosely coupled without referencing each other directly (Extensible #15).

Related: [IPC Specification](./ipc-spec.md)
