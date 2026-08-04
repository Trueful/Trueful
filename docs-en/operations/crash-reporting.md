# Crash Reporting Policy (Finalized)

Adopt Sentry (cloud version). Collection policy is opt-in, off by default, with content to be sent disclosed upfront (Transparency #9). Following the Local First (#11) pattern, whether to send is always something the user can choose via Workspace/app settings.

## Expected Scale

At the projected user scale (a few hundred in the first year, see [Go-to-Market Strategy](../roadmap/go-to-market.md)), the Developer free tier (5,000 errors/month, 30-day retention) should suffice for the foreseeable future. Prioritizing zero operational overhead, self-hosting (e.g. GlitchTip) is not adopted. If error volume grows beyond the free tier in the future, migrate to the Team tier ($26/month).
