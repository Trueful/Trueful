# MVP Scope

Implementing all 19 principles from day one would violate Layer 0 (Time First). Prioritize and implement in stages.

## Phase 1 (True MVP)

- Workspace management, Command Palette (Fuzzy Search), minimal Inspector Bar display
- Electron+Chromium foundation, SQLite, session partitions, settings priority
- Basic Threat Model, performance budget (startup/switching/Palette)
- Auto-update, safeStorage authentication
- Tier A tool collection
- i18n (ja/en), onboarding
- Bookmarks-only import

**Rationale for prioritization**:

1. Workspace management (Layer 3) — the most differentiating feature
2. Inspector Bar (Layer 1: Transparency / Security) — the foundation of trust-building
3. Command Palette (Layer 0) — immediate impact on developer experience

**Deliberately excluded from Phase 1**: Plugin API, Chrome extension compatibility, AI integration for Suggested Next (start with rule-based suggestions first, add AI after accuracy is confirmed)

## Phase 2

- Full Inspector Agent (Tier A/B/C, AI Broker, Pattern Trust Ledger, Ollama, Consent Fatigue batch review)
- Plugin API (Worker Thread, Versioning)
- Chrome extension compatibility (including per-Workspace partition isolation)
- Full import including history/cookies/passwords
- Workspace Git integration
- Multi-window (tear-off), tree-style tabs

## Phase 3 and Beyond

- Cloud sync
- Multi-AI-provider support (OpenAI/Gemini, etc.)

## Risk List (Status Tracking)

| Risk | Status |
|---|---|
| Electron's memory consumption | Resolved. Concrete caps set via the performance budget (300MB per Workspace / 2GB total cap) and a max of 30 BrowserViews with LRU eviction |
| Misjudgment of the Tier B/C boundary | Resolved. Switched to an empirical trust model via the Pattern Trust Ledger, where new patterns always start at Tier C and are promoted only after building a track record (with a conservative fallback built in) |
| Confidence threshold for Suggested Next | Unresolved. A separate feature from Inspector Agent (passive next-page suggestion); the threshold and display conditions haven't been specified yet. To be designed in the latter half of Phase 1 |
| Decision to drop Chrome extension compatibility from Phase 1 | Confirmed for Phase 2. Known MV3 limitations are also documented in ADR-006 |

## Performance Budget

| Item | Target |
|---|---|
| Startup time (cold start, until Developer Home is displayed) | Within 2 seconds |
| Workspace switch time | Within 300ms |
| Inspector Bar update latency | Within 100ms (immediate reflection is the principle) |
| AI response wait cap (time users can wait with no notification) | 10 seconds (cancelable notification beyond that) |
| Memory cap (per active Workspace, guideline) | 300MB |
| Memory cap (total across all Workspaces, warning line) | 2GB |
| Command Palette response | Within 16ms (a 60fps-equivalent frame budget) |
| Initial display of AI suggestion (Suggested Next) | Within 500ms (until the first hint is shown, not the full response) |

All are default values and adjustable via settings.json (Everything Configurable #6).

## Workspace Lifecycle and Resource Caps

```
Created → Loaded (active) → Deactivated (dormant) → [Reactivated | Archived] → Deleted
```

| State | Retained | Discarded |
|---|---|---|
| Active | BrowserView, session cache, Manifest, Ledger | — |
| Dormant | Manifest, Pattern Trust Ledger, on-disk session data | The BrowserView instance (RAM released) |
| Archived | Manifest only | Session cache |
| Deleted | Nothing (an automatic snapshot is created once before deletion: Failure Friendly) | Everything |

- **Active cap**: A maximum of 5 fully-active Workspaces. Excess Workspaces are automatically made Dormant, starting with the longest-inactive one (a pause, not a discard — can be resumed anytime).
- **Cache eviction condition**: Session cache for a Workspace that has stayed Dormant for 7 continuous days is auto-discarded (Manifest/Ledger are retained). Also immediately triggerable via a manual "Clear cache" action.
- **State preserved on going Dormant**: Only the scroll position is captured before the BrowserView is destroyed, saved to the Workspace Manifest, and restored upon reactivation. In-progress form input values are not saved (skipped due to both variance in reliability across site structures and the privacy risk of leaving unsubmitted sensitive info on disk).

## BrowserView Count Limit

"5 active Workspaces" alone isn't sufficient (since a single Workspace can have multiple tabs = multiple BrowserViews).

- Total BrowserView instances across all Workspaces: max 30
- On excess, evict via LRU (the tab unfocused the longest)
- Evicted tabs retain only their URL/title in the Workspace Manifest, and are instantly regenerated on re-click

**The per-Workspace active cap (5) and the per-tab BrowserView cap (30) are two independent constraints; whichever is hit first takes effect.** Example: even with only 3 active Workspaces, if the total tab count exceeds 30, per-tab LRU kicks in first. Conversely, even with few tabs, if a 6th Workspace is reached, per-Workspace Dormant-ing kicks in first.

## Test Strategy

| Type | Target | Tooling |
|---|---|---|
| Unit | Workspace management, Tier decision logic, Ledger update processing | Standard JS test runner |
| Integration | IPC path between Renderer↔Main | IPC mocks |
| E2E | Actual UI operation scenarios | Playwright (shared with the Inspector Agent execution engine) |
| Plugin tests | Worker Thread permission boundaries (verifying no Tier bypass occurs) | A dedicated test harness |
| AI tests | Regression measurement of Tier-classification misjudgment rate | Continuous detection against a fixed dataset of website snapshots |

## Accessibility

- The browser chrome itself (Command Palette, Inspector Bar, Workspace switch UI) is fully operable via keyboard alone (extending Keyboard First #12 to the browser's own UI)
- State display never relies on color alone (icons/patterns are used together with color)
- Custom UI components carry appropriate ARIA roles/labels, supporting screen readers

## Non-goals

- No optimization for general/consumer users (Power User First takes priority)
- No custom rendering engine is developed (considered and rejected — see [ADR-004](../architecture/adr/adr-004-chromium-fixed.md))
- Not built as an SNS/entertainment browser (Purpose First)
- No forking of Chromium (custom patches). Vanilla Electron/Chromium only
- No mobile support in v1
