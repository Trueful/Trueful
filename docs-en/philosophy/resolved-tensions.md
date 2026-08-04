# Resolved Tensions

All subsequent design decisions are nothing more than applications of the following 4 resolution patterns.

| Tension | Resolution Pattern |
|---|---|
| Everything Configurable vs Zero Noise | Separate as orthogonal axes: "can be configured" (capability) vs. "visible by default" (display) are different problems |
| Predictable vs Never Get Lost | Separate suggestion from execution: guidance is free, execution requires consent |
| Security Is a Choice vs. losing track of mode | Extend Transparency so mode is always visible (Ambient Indicator) |
| Local First vs. Time First | Arbitrated by the Layer structure. Local is the default; cloud is an explicit opt-in with transparency |

## Tension 1: Everything Configurable (#6) vs Zero Noise (#14)

**Problem**: Taking "if it can't be configured, it doesn't exist" to its logical conclusion means the configuration options themselves become "unnecessary information," i.e. noise.

**Resolution**: Configurability and Noise are not two ends of the same axis — they are orthogonal, separate axes.

| Axis | Meaning |
|---|---|
| Configurable | The degree of freedom that exists (backend capability) |
| Noise | The amount of information visible by default (frontend display) |

**Revised rule**: "If it can't be configured, it doesn't exist. But it doesn't need to be visible by default." All settings are collapsed by default and reachable only via explicit hierarchical navigation or search.

## Tension 2: Predictable (#8) vs Never Get Lost (#3)

**Problem**: Guiding the user so they "know what page to look at next" conflicts with "never move on its own," depending on the degree of agency involved.

**Resolution**: Clearly separate "Suggest" from "Execute."

- Suggest: The browser may always show the next candidate (highlighting, side panel, shortcut suggestions)
- Execute: Navigation, submission, and changes always require an explicit user action

**Revised rule**: "Guidance is free; execution requires consent." AI or browser judgments are always presented as inert suggestions and never change state without user action.

## Tension 3: Security Is a Choice (#7) vs. Risk of Losing Track of Mode

**Problem**: The freedom to change the security level per use case invites the accident of "not knowing which mode is currently active."

**Resolution**: Add "the current security/execution mode" to Transparency (#9) as a permanently visible item. It's not enough to be able to explain it on demand — a persistent, ambient UI display is mandatory.

**Revised rule**: "Modes can be switched. But the moment of switching is always visible."

## Tension 4: Local First (#11) vs Developer First / Time First (#1, #19)

**Problem**: Absolutizing local-first becomes a shackle in cases where the cloud clearly saves the developer more time.

**Resolution**: The Layer structure itself resolves this. Local First belongs to Layer 2 (Technical Freedom) and is subordinate to Layer 0 (Time First). However, "subordinate" does not mean "ignorable" — it must go through Transparency (Layer 1).

**Revised rule**: "Local is the default. Cloud is permitted only as an explicit choice accompanied by transparency. Silent cloud fallback is prohibited."

Related: [Priority Layers](./priority-layers.md)
