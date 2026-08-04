# Logging Specification

| Item | Content |
|---|---|
| Retained | Error logs (with error codes), Tier execution logs, SecurityProfile switch history, tierRationale |
| Not retained | Form input contents, raw Cookie values (only whether they were sent is recorded), passwords / credentials |
| Rotation | Retained for 7 days, deleted oldest-first once the file size cap of 50MB is reached |
| Anonymization | Local logs don't need anonymization (Local First). PII scrubbing is mandatory for exports/sharing and for Sentry submissions |

## Usage Statistics Policy (Finalized)

Aside from crash reporting (Sentry, opt-in), no anonymous usage statistics such as feature-usage frequency are collected at all in v1. A consequence of Local First + prioritizing trust-building — for a niche tool where trust is its lifeline, collecting statistics for product-analytics purposes isn't worth the cost.

Related: [Crash Reporting Policy](./crash-reporting.md)
