# Priority Layers

When principles conflict, the higher layer always wins. When an implementation decision is unclear, first identify which layers' principles are actually in conflict.

## Layer 0 — Core Values

The reason for existence itself. Takes precedence over any other principle.

- Developer First
- Purpose First
- Power User First
- Time First

## Layer 1 — Interaction Contract

Defines the trust relationship between the user and the browser. Takes precedence over Layer 2/3 as long as it doesn't violate Layer 0.

- No Confusion
- Never Get Lost
- Predictable
- Transparency
- Zero Noise

## Layer 2 — Technical Freedom

Implementation-level freedom and extensibility. Maximized as long as it doesn't break the Layer 1 contract.

- Everything Configurable
- Security Is a Choice
- Local First
- Keyboard First
- Extensible
- Inspectable
- Failure Friendly
- Open Standards

## Layer 3 — Work Unit Model

How information is organized. A means to realize the other layers, not an end in itself.

- Reproducibility
- Workspace First

## Summary Table

| Layer | Character | Principles |
|---|---|---|
| 0: Core Values | Immutable values; takes precedence over everything | Developer First / Purpose First / Power User First / Time First |
| 1: Interaction Contract | Trust relationship with the user | No Confusion / Never Get Lost / Predictable / Transparency / Zero Noise |
| 2: Technical Freedom | Implementation-level freedom | Everything Configurable / Security Is a Choice / Local First / Keyboard First / Extensible / Inspectable / Failure Friendly / Open Standards |
| 3: Work Unit Model | Means of organizing information | Reproducibility / Workspace First |

Related: [Resolved Internal Tensions](./resolved-tensions.md) / [Layer → Feature Mapping](../architecture/overview.md)
