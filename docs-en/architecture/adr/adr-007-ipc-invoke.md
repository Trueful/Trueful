# ADR-007: Adopt Invoke-Style IPC (request/response)

**Status**: Decided

## Decision

Renderer→Main communication is unified on `ipcRenderer.invoke`-based one-request-one-response; fire-and-forget `send` is not used.

## Rationale

Ensures every operation's result can be reliably tracked (Transparency). Main→Renderer push notifications are clearly distinguished via `webContents.send`, avoiding confusion between the two directions (No Confusion).

Related: [IPC Specification](../ipc-spec.md)
