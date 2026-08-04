# Update Strategy

## Security Update Policy

**Premise**: Since a browser "continuously executes unknown web content," its attack surface is orders of magnitude larger than other self-built tools. Chromium generally ships stable-channel vulnerability fixes roughly every 2-4 weeks.

### Benefits of Being Electron+Chromium-Based

- Zero need to hunt for CVEs or write fixes ourselves
- The only necessary work is the operational task of "bump the electron package version, rebuild, and redistribute"
- We get the continuous benefit of the Chromium team's ongoing security investment for free (unattainable with a custom engine)

### Operating Rules (Minimum Baseline)

- Check/update the Electron version monthly
- Rebuild and redistribute after verifying functionality
- State the expected update cadence in the README etc. to lower the trust cost for users

**Reference case**: Even after Arc completely halted feature development, it continued applying Chromium security patches. The Browser Company itself judged this to be "the one thing that can't be stopped."

## Auto-Update Policy

Distributed via `electron-updater` + GitHub Releases. Downloads are automatic, but a restart always requires explicit user confirmation (Predictable #8). If there's a significant unapplied patch, the Inspector Bar's warning display is progressively intensified, but installation is never forced — this is to give freedom to those who understand the settings (Power User First #5).

## Integrated Update Strategy

| Target | Trigger | Method |
|---|---|---|
| Electron/Chromium | Monthly check | Via electron-updater; restart requires user confirmation |
| Schema | Next Workspace load after an app update | Automatically runs the Main Process migration function |
| Plugin | Detection of a Plugin version change | If permissions change, existing consent is invalidated and re-confirmation is required. Unauthorized permission escalation is never possible |

The 3 paths trigger independently, but a Schema migration is run in tandem with the app-body update to avoid a version-mismatch window.

## Settings Priority

Winning order on conflict (low → high):

```
Default < Global < Workspace < Profile < Temporary Override < CLI
```

CLI launch options take the highest priority as the most explicit statement of intent. Temporary Override is a one-time override that disappears at session end. Plugin-originated defaults sit at the same tier as Global (see [Plugin Versioning](../architecture/plugin-versioning.md) for details).

## Error Code Scheme

Unified format: `<3-4 char domain><3-digit sequence number>`.

| Domain | Meaning | Example |
|---|---|---|
| SEC | SecurityProfile/certificate related | SEC001: Certificate verification error |
| AI | AI Broker/Inspector Agent | AI002: Ollama connection timeout |
| WS | Workspace management | WS003: Manifest load failure (version mismatch) |
| PLG | Plugin | PLG004: Schema validation failure (invalid Tier declaration) |
| INSP | Inspector Bar | INSP001: State-update reflection failure |
| UPD | Auto-update | UPD001: Patch download failure |
| CFG | Settings | CFG001: Circular reference detected during priority resolution |

## CI

Unit/Integration/E2E (Playwright) are automatically run on GitHub Actions for every commit/PR (consistent with the existing GitHub Releases operation).
