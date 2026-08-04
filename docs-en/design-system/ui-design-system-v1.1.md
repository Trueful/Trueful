# Browser Design System v1.1

(Revised from v1.0. Managed as a file separate from [Philosophy](../philosophy/mission-vision.md).)

## Mission

The UI is not about competing on beauty. It exists to reduce the amount of time developers spend thinking.

## Design Principles

### 1. Workspace First

The Workspace is the most important unit. The Workspace, not the tab, is the visual anchor point.

### 2. Zero Noise

Don't display information that isn't needed to get work done. "Can be displayed" and "is displayed" are different things.

### 3. Progressive Disclosure

Show things only once they're needed.

Normal → Detail → Advanced → Developer-level

**Revision**: The Command Palette always bypasses these 4 levels. No matter which disclosure level you're currently at, every feature is instantly reachable via the Command Palette (Time First takes priority).

### 4. Stable Layout

Positions never change.

- Workspace: left
- Inspector: right
- Command Palette: center
- In-page search: top

**Revision**: "Search at the top" and "Command Palette in the center" are distinct features with different roles. Top = in-page search (equivalent to Ctrl+F). Center = command/action/navigation launcher. Functionality is never duplicated between them.

### 5. Ambient Information

Information that's important but rarely looked at should be "always present but never in the way."

**Revision**: Ambient (always-visible) display is limited to only these 3 items:

- Security Mode
- AI Status
- Queue N

Cookie count and Network count are not shown ambiently; they're included in the expanded view when the Security Mode indicator is tapped (the resolution pattern for Transparency vs. Zero Noise: being explainable and being always-visible are separate axes).

### 6. Predictable Motion

Animation is used only to help understand state changes. Decoration is prohibited.

## Design Tokens

### Spacing (8px Grid)

`4 / 8 / 16 / 24 / 32 / 40 / 48 / 64` — nothing else is allowed.

### Radius

- Small: 6
- Medium: 10
- Large: 16

### Shadow

Only 3 levels: Low / Medium / High

### Typography

- Headings: 32 / 24 / 20
- Body: 16
- Auxiliary: 14 / 12
- Code: 14, monospace font

**Font families (finalized)**:

- Code: JetBrains Mono
- UI text (headings/body/auxiliary): Meiryo (covers both Japanese and English glyphs adequately, no separate English fallback font or fallback management needed)

**Language support**: Initial scope is Japanese/English only. Other languages are a Non-goal for now.

### Animation

- Hover: 100ms
- Normal: 150ms
- Screen transition: 200ms
- Tooltip display delay: 300ms (making Progressive Disclosure explicit — it doesn't appear instantly, and only reacts to intentional hover)
- Anything 300ms or above (main animations such as screen transitions) is prohibited

## Color Philosophy

Color is meaning, not decoration.

**Revision**: Colors representing Mode and colors representing Status live in separate namespaces (never reuse the same green/red for two different meanings — this is to avoid violating No Confusion).

### Mode Colors (SecurityProfile)

- Production: Blue
- Development: Teal
- Testing: Orange
- Custom: Purple

### Status Colors (success/failure/safety)

- Green: safe / success / passed
- Red: dangerous / failure / rejected
- Gray: no info / neutral
- Blue (selected): distinguished from Mode's Blue by context (Workspace-selection highlighting uses a separate, desaturated tone)

## Component Rules

### Button

Fixed height. Clearly clickable. Minimal use of color.

### Sidebar

At most 2 levels of hierarchy. A 3rd level is prohibited. Width is adjustable (drag-resizable). Instantly togglable with Ctrl/Cmd+B.

### Inspector Bar

Normally: only Security Mode / AI / Queue N. Clicking shows detail (including cookie count and network count).

**Error display**: When a 4xx/5xx network error occurs, no new always-visible item is added — instead a small red dot is overlaid on one of the existing 3 items (presumably Queue N). Tapping expands the detail (satisfies Transparency while preserving Zero Noise's "max 3 items" discipline).

### Command Palette

The single most important UI. Everything can be opened from here. It bypasses every level of Progressive Disclosure.

### Workspace Card

Displayed info: name / Security / Git / AI / number of open tabs

**Git display (finalized)**: Branch name + a badge showing the number of changed files (e.g. `main ● 3`). If there are uncommitted changes, indicated with an Orange dot in the Status color scheme (reusing the existing palette rather than adding new colors). Tapping the badge opens the Diff Viewer, showing collapsible per-file diffs in Code typeface (14px monospace). Unified/Side-by-side display is togglable.

**Scope**: Read-only. Only viewing branches and diffs — this feature does not include write operations like commit/stage/push (if those are added, they should be designed as a separate Tier C-equivalent feature).

Ahead/behind (difference vs. remote) is not shown on the Card itself — it's kept in the detail view after tapping (applying Ambient Information's principle of "always-visible = minimal, detail = on tap").

## Layout

```
+------------------------------------------------------+
| Workspace │             Browser          │ Inspector  |
| Workspace │                               │  Security  |
| Workspace │                               │  AI        |
| Workspace │                               │  Queue     |
+------------------------------------------------------+
```

(Cookie/Network were removed from ambient display and consequently also removed from the layout diagram.)

## Accessibility

100% operable via keyboard alone. Focus is always visible. State is never conveyed by color alone.

## Interaction Rules

Reduce the number of clicks.

**Revision**: "Click" is not limited to mouse operations. "1 action" = 1 click or 1 keyboard shortcut (consistent with Keyboard First #12).

- 1 action: operations used daily
- 2 actions: operations used occasionally
- 3+ actions: settings only

## AI Rules

AI is not the star of the UI. There is no persistent chat box. It's called only when needed.

## Anti Patterns

Absolutely never do these.

- × Bloat the settings screen
- × Spam popups
- × Overload with modals
- × Add more colors
- × Add more tabs
- × Put AI front-and-center

## Attention Economy

The core principle that translates "never steal the developer's time" into a UI evaluation criterion. Occupancy cost (the degree to which something permanently occupies screen space) and interruption cost (the degree to which something forcibly halts the user's actions) are different in nature, so they're managed as two separate ladders.

### Occupancy Cost Ladder

| UI Element | Cost |
|---|---|
| Inspector Bar | ★ |
| Sidebar | ★★ |

### Interruption Cost Ladder

| UI Element | Cost |
|---|---|
| Inline warning (banner, can continue working) | ★ |
| Notification (toast, auto-dismisses) | ★★ |
| Modal (blocks operation, closable with Esc) | ★★★ |
| Dialog (requires an explicit choice) | ★★★★ |

### Rule

A UI with a high interruption cost is used only when a lower-cost option cannot achieve the goal.

**Exception**: Overlays the user themselves invoked (e.g. the Command Palette) are exempt from this rule. The system isn't interrupting on its own — it's open because of the user's own intent, so it doesn't count as an "interruption."

---

This document is managed as a UI design file independent of the Browser Master Spec. For the IPC/schema definitions of Workspace Git status, see [Workspace Git Integration](../architecture/workspace-git-integration.md).
