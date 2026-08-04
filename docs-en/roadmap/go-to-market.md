# Go-to-Market Strategy

## Projected Market Share

The comparison target is not the general browser market, but the "niche developer-alternative browser" category.

| Case | License / Funding | Outcome |
|---|---|---|
| Arc Browser | Closed source, ~$610M-class funding | Development halted in 2025. The CEO said "the high learning cost prevented mainstream adoption" |
| Zen Browser | OSS, no funding | 500,000 users in 2 years (an upside success case) |

This project is an even narrower niche than Zen (developer-only + inspection/AI agent). A realistic range for a solo-to-small, unfunded effort: **a few hundred users in the first year, a few thousand to 10,000 over several years**.

## Headwinds

- The high switching cost of dropping tabs in favor of a Workspace-centric model (same type of risk as Arc)
- Inspector Agent is the biggest differentiator and simultaneously the feature people will be most wary of
- The trust-building barrier of a certificate/cookie-handling tool built by an anonymous individual
- A Windows-centric design doesn't reach the core developer community well (which skews macOS-heavy)
- Doubts about the continuity of a solo/small-scale project (staying current on security patches is the lifeline)

## Mitigations

- Ship Inspector Agent disabled by default / opt-in, positioning it as a feature to adopt once trust is established
- Allow tab display and Workspace display to coexist, enabling a gradual migration path
- Actively promote the fact that it's "built on the battle-tested foundation of Electron+Chromium" (the same pattern as Zen's "Firefox fork" strategy)
- Rather than targeting developers broadly, grow reliably starting from existing communities (Discord bot development, tools for architecture firms)
- If open-sourced, communicate roadmap, release cadence, and known-issue transparency before feature marketing

## Finalized Decisions

- **Community building**: Launching a Discord server etc. begins only after the prototype is complete. "Building in public" before there's a credible chance of success risks raising expectations only to disappoint, so this is deliberately pushed later.
- **Onboarding**: On first launch, provide a guided tour using a sample Workspace (Testing profile) that touches no real data, demonstrating how to use the Command Palette, Workspace switching, and Inspector Bar. Directly addresses the high switching cost (the biggest barrier identified above).
- **Feedback mechanism**: No custom backend is built — a "Send feedback" command in the Command Palette opens a GitHub Issue template (consistent with the existing GitHub Releases operation).
- **Accelerated migration tooling**: Bookmarks-only import is pulled forward into Phase 1. Full import including history/cookies/passwords remains in Phase 2.

Related: [Code Signing Policy](../operations/code-signing.md)
