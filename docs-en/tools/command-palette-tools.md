# Developer Tool Collection (Command Palette Extension)

The rule is that everything is Tier A-equivalent (generation/conversion/display only, no side effects). Exceptions are noted at the end of each item.

## Conversion / Encoding

- JSON formatting/validation (pretty print, highlighting of validation error locations)
- JWT decoder (header/payload breakdown, color-coded expiration)
- Base64 / URL encode/decode
- Hex / Binary / Decimal / Octal mutual conversion
- Unix timestamp ⇄ datetime conversion (timezone-selectable)
- Cron expression decoder (`0 3 * * 1` → natural language)
- HTML entity encode/decode
- Markdown ⇄ HTML conversion preview (template-selectable)
  - Outputs not as raw HTML but as a standalone HTML file bundled with lightweight CSS
  - Code blocks read the fence's language spec (e.g. ` ```js `) and are styled with a background color, monospace font, and line numbers to be immediately recognizable as code
  - Multiple style templates are provided, selectable from a dropdown / Command Palette:
    - GitHub-style: white README.md-style background, code on a light gray background
    - Notion-style: generous whitespace, soft colors
    - Dark: eye-friendly palette for reading code
    - Print-oriented: minimal decoration, layout assuming articleization/PDF conversion
  - Output is via file save or clipboard copy. Generation only, no network access = Tier A
- YAML ⇄ JSON / CSV ⇄ JSON conversion
- URL parser (breaks down query parameters)
- MIME type lookup (extension ⇄ MIME type)
- User-Agent string parser
- Slug generator (title → URL-safe slug, Japanese support)
- Unicode code point lookup

## Verification / Debugging (Inspector Bar Integration)

- cURL command generation (right-click in the Network tab → "Copy as curl")
- HTTP status code quick reference
- Response header comparison (diff of 2 requests, also useful for mode-switch verification)
- Regex tester (live match highlighting)
- Diff viewer (text/JSON/API response diffs)
- Content-Security-Policy parser (formats a CSP header into human-readable form)
- SSL certificate expiration list (aggregated view of certificate status across all open origins)

**Note**: A DNS lookup result viewer is Tier A if it "only displays cache info the browser has already fetched." A version that issues new active DNS queries needs to be reclassified as Tier B-equivalent (a read-only external communication).

## Crypto / Hash

- Hash calculator (MD5/SHA1/SHA256/SHA512, text/file input)
- HMAC calculator
- Ed25519/RSA key pair generation & visualization
- X.509 certificate viewer (drill-down for certificates found in the Inspector Bar)
- Password/passphrase generator (with entropy display)
- bcrypt/argon hash generation & verification

## Math / Physics

- Unit conversion (SI units), vector arithmetic calculator
- Coordinate conversion (polar ⇄ cartesian, degrees ⇄ radians)
- Statistics calculator (mean, variance, standard deviation)
- Small-scale matrix arithmetic calculator (product, inverse)

## Generation

- UUID / ULID generator
- QR code generation (instantly check local dev URLs on a physical phone)
- Favicon / OGP preview (check how it looks when shared, in advance)
- Snippet management (instantly invoked from the Command Palette)

## Environment / Local Dev

- .env file quick viewer (values can be masked)
- Local port detection (a list of running processes on e.g. localhost:3000)
- Color picker + WCAG contrast ratio checker (shares functionality with Inspector Agent's a11y audit)

## Japanese / Text Processing

- Character counter (manuscript-paper conversion, full-width/half-width distinction)
- Furigana generator (adds ruby annotations to kanji)
- Full-width ⇄ half-width conversion
- Japanese kinsoku (line-break rule) checker

## Design / Accessibility

- Color palette generation (color-scheme suggestions from a base color)
- Preview list of locally installed fonts
- Responsive breakpoint simulator (pseudo-switches viewports without actually resizing)

## Personal Productivity

- Pomodoro timer (remaining time shown in the Inspector Bar)
- Clipboard history (searchable and reusable from the Command Palette)
- Quick memo/todo capture tied to a Workspace

## Implementation Positioning

- Available at all times regardless of Security Profile (no side effects = outside the Tier classification)
- Can be safely added via the Plugin API (Worker Thread) as well: requires no network, I/O is JSON round-trips only, so it pairs well with the permission model in [ADR-003](../architecture/adr/adr-003-worker-thread.md)
- Zero Noise principle: displayed only via Command Palette search, never crowding the default UI

## Additional Features (Command Palette / Tools / Integrations)

- **Fuzzy Search**: The Command Palette's search adopts fuzzy matching via something like Fuse.js. Prefix-only matching wouldn't satisfy Time First
- **Developer Home customization**: Rather than a static link list, made editable as a local Markdown file. Reuses the existing Markdown→HTML conversion tool (template-selectable) as-is
- **Tool execution history**: Retains the input/output history of Command Palette conversion tools (Base64 etc.) locally for the most recent N entries
- **Snippet management**: Stored as files (JSON/Markdown) rather than in SQLite, making it Git-manageable (consistent with Reproducibility #10)
- **Git branch-linked Workspace switching**: Even when a branch change is detected, auto-switching is not performed. Limited to a suggestion only — "Switch to the related Workspace?" (Predictable #8, a reapplication of the [Tension 2](../philosophy/resolved-tensions.md) resolution pattern)
- **DevTools integration**: The standard Chromium DevTools (F12) is kept as-is, no custom implementation. Inspector Agent coexists as a separate panel, with only a "Send to Inspector Agent"-style integration button added to the DevTools Network tab
- **Offline UX**: On network disconnect, show a dedicated offline page presenting a list of "what still works offline" — local AI, local tools, cached pages, etc.
- **CORS disable toggle**: Added as a setting within the Custom SecurityProfile only (absent from Production)
