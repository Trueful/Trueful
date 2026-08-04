# ADR-006: Chrome Extension Compatibility

**Status**: Decided

## Decision

Use Electron's built-in `session.loadExtension` (electron-chrome-extensions); do not develop a custom compatibility layer.

## Rationale

Building a compatibility layer from scratch would violate Time First, and Electron itself already sufficiently supports MV2 extensions.

## Known Limitations

As of February 2026, Manifest V3 (API injection into Service Worker background scripts) is still only partially supported by Electron itself (`electron/electron#49984` is unresolved). Since many Chrome Web Store extensions have already migrated to MV3, Phase 2 planning proceeds under the assumption that "some major extensions won't work."

## Workspace Isolation

`ses.extensions.loadExtension` operates per session. Leveraging the existing design of an independent `persist:workspace-<id>` partition per Workspace, extensions are individually loaded per Workspace via `loadExtension`. This also separates extension data such as IndexedDB across Workspaces.

**Cost**: Even the same extension is duplicated per Workspace, increasing memory consumption. Extensions are loaded only into Workspaces where they're explicitly enabled; there's no uniform auto-load across all Workspaces (Zero Noise).

Related: [Roadmap: MVP Scope](../../roadmap/mvp-scope.md)
