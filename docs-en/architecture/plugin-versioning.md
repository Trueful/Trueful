# Plugin Versioning

A Plugin declares the Plugin API version it supports in its own manifest (`apiVersion: 1`).

- Main Process supports only the two most recent major versions (N, N-1)
- Plugins on N-2 or earlier get a warning at load time and are disabled (never silently run on an old API — Predictable)
- Breaking changes must always bump the major version. Breaking changes within a minor/patch release are prohibited

## Relationship to Settings Priority

Plugin-originated default values sit at the same tier as Global (weaker than Workspace/Profile/CLI). Plugins never override the user's explicit settings.

Related: [ADR-003: Adopt Worker Thread](./adr/adr-003-worker-thread.md)
