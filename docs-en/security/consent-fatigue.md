# Consent Fatigue Mitigation (Inspector Agent Reinforcement)

As a mitigation for consent fatigue on Tier C (state-changing operations), **automatic approval of individual fields is not introduced** — this would directly violate the invariant of Tier C (consent every time, cannot be overridden by settings).

## Solution: Batch Review UI

When multiple Tier C candidates exist at the same time, they are displayed together in a single screen where each can be individually approved/rejected. This doesn't skip consent itself — it reduces fatigue by cutting down the number of round trips through consent dialogs.

Related: [Inspector Agent Tier Classification](./inspector-agent-tiers.md)
