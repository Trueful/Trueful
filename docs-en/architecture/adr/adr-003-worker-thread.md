# ADR-003: Adopt Worker Thread (for Plugin execution)

**Status**: Decided

## Decision

Plugins run in a Node.js Worker Thread rather than a BrowserView/iframe.

## Rationale

- Structurally eliminates network and filesystem access
- Lighter weight than a Chromium renderer

## Plugin Execution Architecture

Not a BrowserView/iframe but a Node.js Worker Thread (no fetch, require, filesystem, or direct IPC access at all). `execute:network` is not merely a policy restriction — it's architecturally impossible.

**Regarding CSP**: Since a Plugin never has a BrowserView/Chromium renderer, the concept of a Content Security Policy simply doesn't apply. CSP only relates to web pages (inside the Chromium renderer) and doesn't apply to the Plugin execution environment on a Worker Thread.

## Relationship to the Permission Model

- Since it requires no network and I/O is JSON round-trips only, this pairs well with the permission model in [the Command Palette tool collection](../../tools/command-palette-tools.md)
- Git integration (read-only) is also placed outside this boundary and not exposed to Plugins

Related: [Plugin Versioning](../plugin-versioning.md) / [Threat Model](../../security/threat-model.md)
