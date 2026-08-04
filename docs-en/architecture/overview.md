# Architecture Overview

## Composition

- **Main Process (Node.js)**: Workspace management, settings, local AI integration, history index
- **Renderer**: BrowserView (independent session partition per Workspace)
- **Local DB**: better-sqlite3 (history, index, Workspace definitions)
- **Local AI**: Ollama (default)
- **Cloud AI**: Claude API (explicit opt-in per Workspace, no silent fallback)

For the rationale behind this choice, see [ADR-001: Electron + Chromium](./adr/adr-001-electron.md).

## Layer → Feature Mapping

| Layer | Feature |
|---|---|
| 0 | Command Palette (Ctrl+Shift+P) + Developer Home (direct links to Docs/GitHub/Status/API) |
| 1 | No Confusion: session separation per Workspace / Never Get Lost: Suggested Next (suggestion only) / Predictable: whitelist for auto-execution / Transparency: persistent Inspector Bar / Zero Noise: blocked by default + collapsed settings |
| 2 | Everything Configurable: settings.json + GUI / Security Is a Choice: Production・Development・Testing presets / Local First: Ollama default + cloud opt-in / Keyboard First: keybindings.json / Extensible: Plugin API / Inspectable: right-click inspection via CDP / Failure Friendly: automatic snapshots / Open Standards: Chromium compliance |
| 3 | Workspace = JSON manifest (Git-manageable) |

### Layer 0 (Core Values) Detail

**Command Palette + Developer Home**

- Ctrl+Shift+P accesses all operations (VSCode-style)
- Instead of a new-tab search page, "Developer Home" shows direct links to Docs / GitHub / Status / API
- Criterion for adding new features: "Does it save a click, or 5 seconds?" (#19 Time First)

### Layer 1 (Interaction Contract) Detail

| Principle | Feature |
|---|---|
| No Confusion | Session partitions separated per Workspace. Even for the same service, User/Developer accounts are distinguished by icon and color |
| Never Get Lost | "Suggested Next" panel (persistent, non-intrusive sidebar). Suggestion only — never auto-navigates |
| Predictable | Auto-execution uses a whitelist model. Everything is OFF by default; only opt-in is allowed |
| Transparency | A persistent "Inspector Bar" at the bottom of the screen. Current security mode, cookies sent, and AI context referenced can be expanded with one click |
| Zero Noise | Cookie banners / login popups / marketing overlays are blocked by default. Settings items are collapsed by default |

### Layer 2 (Technical Freedom) Detail

| Principle | Feature |
|---|---|
| Everything Configurable | settings.json + GUI. Settings items can be searched across the board from the Command Palette |
| Security Is a Choice | Per-Workspace security presets (Production / Development / Testing). The Inspector Bar reflects switches instantly |
| Local First | History, index, and AI default to local (Ollama). Cloud use is an explicit opt-in via Workspace settings |
| Keyboard First | keybindings.json allows all operations to be reassigned |
| Extensible | A custom Node.js-based Plugin API + support for loading standard Chrome extensions |
| Inspectable | Right-click for direct access to Cookies / Storage / Service Worker / Network / Security Headers (via CDP) |
| Failure Friendly | Automatic Workspace snapshots (borrowed from Gantt Chart Studio's autosave pattern) + manual restore |
| Open Standards | Compliant with Chromium rendering. Extension APIs stay as close to web standards as possible |

### Layer 3 (Work Unit Model) Detail

**Workspace**

- A Workspace = a JSON manifest (tabs, URL, profile, extension state). Exportable/importable in a Git-manageable format
- Tabs are always grouped under a Workspace. There is no flat tab bar

## Alternatives Considered and Rejected

| Candidate | Reason for Rejection |
|---|---|
| CEF (C++) | The learning/maintenance cost violates Layer 0 (Developer First — including the developer of this product themselves) |
| Tauri (Rust + WebView2) | WebView2 doesn't offer CDP access as freely as Chromium, lowering the achievability of Inspectable / Security Is a Choice |

→ This decision itself is an example of Layer 0 arbitrating a Layer 2 implementation choice.

Related: [ADR List](./adr/) / [Data Schema](./data-schema.md) / [IPC Specification](./ipc-spec.md)
