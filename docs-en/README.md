# Developer Browser Documentation

"Never steal the developer's time."

This repository documents the philosophy, design, and implementation strategy for a developer-focused browser project. It has been split from a single consolidated spec into purpose-oriented files for readability.

## Suggested Reading Order

Reading top to bottom takes you through philosophy → design → implementation → operations.

1. **Want to understand the philosophy?** → [`philosophy/`](./philosophy/)
   - [Mission / Vision](./philosophy/mission-vision.md)
   - [Priority Layers](./philosophy/priority-layers.md)
   - [Resolved Internal Tensions (Design Patterns)](./philosophy/resolved-tensions.md)

2. **Want to understand the design / architecture?** → [`architecture/`](./architecture/)
   - [Architecture Overview / Layer → Feature Mapping](./architecture/overview.md)
   - [ADR (Architecture Decision Records)](./architecture/adr/)
   - [Data Schema](./architecture/data-schema.md)
   - [IPC Specification](./architecture/ipc-spec.md)
   - [Event Bus](./architecture/event-bus.md)

3. **Want to understand security / threat model?** → [`security/`](./security/)
   - [Threat Model](./security/threat-model.md)
   - [Inspector Agent Tier Classification](./security/inspector-agent-tiers.md)
   - [Consent Fatigue Mitigation](./security/consent-fatigue.md)

4. **Want to understand UI design?** → [`design-system/`](./design-system/ui-design-system-v1.1.md)

5. **Want to see the developer tool collection?** → [`tools/command-palette-tools.md`](./tools/command-palette-tools.md)

6. **Want to understand operations / release?** → [`operations/`](./operations/)
   - [Update Strategy](./operations/update-strategy.md)
   - [Logging Spec](./operations/logging.md)
   - [Crash Reporting Policy](./operations/crash-reporting.md)
   - [Code Signing Policy](./operations/code-signing.md)

7. **Want to understand the roadmap / go-to-market?** → [`roadmap/`](./roadmap/)
   - [MVP Scope (Phase 1/2/3)](./roadmap/mvp-scope.md)
   - [Go-to-Market Strategy](./roadmap/go-to-market.md)

8. **Want to know why a conclusion was reached?** → [`decision-log/convergence-log.md`](./decision-log/convergence-log.md)

## In One Sentence

> A browser built for work, where developers can reach the information they need by the shortest path, safely and without confusion. Conflicting requirements are arbitrated by layer priority.

## Design Motto

**Fast to Work. Easy to Reason. Hard to Misuse.**

| Motto | Corresponding Layer |
|---|---|
| Fast to Work | Layer 0 (Time First / Purpose First) |
| Easy to Reason | Layer 1 (Transparency / Predictable) |
| Hard to Misuse | Intersection of Layer 1 × Layer 2 (No Confusion + Failure Friendly) |
