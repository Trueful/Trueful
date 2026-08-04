# Inspector Agent: Tier Classification

The local AI generates inspection patterns, proposes execution procedures, configures inspection tools, and executes them. Treating "execution" as monolithic would simply violate the "guidance is free, execution requires consent" rule established in [Resolved Tensions: Tension 2](../philosophy/resolved-tensions.md). The solution is to split execution into three tiers based on presence of side effects.

## Tier Definitions

| Tier | Content | Execution Condition |
|---|---|---|
| A: Generation / suggestion | Pattern creation, procedure suggestions, draft configs | Always automatic |
| B: Read-only inspection | Link checking, header verification, a11y audits | Only when Security Mode = Testing AND the target origin is registered on the allowlist AND the Pattern Trust Ledger shows approvedCount>=3, anomalyCount=0 |
| C: State-changing operations | Form submission, login, deletion, payment | Explicit consent required every single time regardless of mode (a permanent rule, cannot be overridden by settings) |

If `sideEffectConfidence < 0.95`, it is forcibly classified as Tier C regardless of the AI's judgment.

## Why Tier C Always Requires Human Confirmation

Even in Testing mode, the possibility that the target is production-grade backend infrastructure (e.g. a payment API) cannot be ruled out. Layer 0 (the safety of the developer themselves and their downstream systems) takes precedence over the freedom of Layer 2.

## Architecture

- The local AI (Ollama) parses the DOM / Network tab, and OpenAPI specs where obtainable, to generate a test matrix
- Test matrix = JSON (Git-manageable, same as the Workspace manifest)
- Execution engine: Playwright, or a custom runner that directly drives CDP (invoked from the Node.js Main Process)
- The allowlist lives in Workspace settings as `testTargets: string[]` (managed per origin)
- All execution logs and generated artifacts can be referenced with one click from the Inspector Bar (an extension of Transparency #9)

## UI

An "Inspection" tab panel: displays the generated test matrix as a checklist

- Tier A: already auto-generated (shown in gray)
- Tier B: "auto-executing" badge
- Tier C: "awaiting confirmation" badge; clicking shows a pre-execution diff preview when available

## MVP Positioning

Similar in role to the "AI integration for Suggested Next" dropped from Phase 1, but a distinct feature (passive next-page suggestion vs. active inspection execution). Since the security-decision logic of Tier classification is safer to build once the Inspector Bar / Workspace foundation has stabilized, this is positioned as Phase 2.

Related: [Consent Fatigue Mitigation](./consent-fatigue.md) / [MVP Scope](../roadmap/mvp-scope.md)
