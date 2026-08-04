# ADR-005: Ollama as Default (Local AI)

**Status**: Decided

## Decision

Ollama is the default engine for local AI inference.

## Rationale

- Directly aligned with Local First (#11)
- Existing Discord bot development patterns can be reused
- Zero additional cost while also preserving privacy

## AI Provider Interface

```ts
interface AIProvider {
  generate(prompt: string, options?: object): Promise<string>
  summarize(text: string, options?: object): Promise<string>
  extract(text: string, schema: object): Promise<object>
  classify(input: string, categories: string[]): Promise<string>
  embed(text: string): Promise<number[]>
  tokenize(text: string): Promise<number>
  cancel(requestId: string): void
}
```

Both `OllamaProvider` (default) and `CloudProvider` (Claude API, opt-in) implement this interface. AI Broker accesses AI only through this interface and never has to be aware of the specific engine.

Includes `embed()` (for future semantic history search) and `tokenize()` (for context length management). Additional providers such as OpenAI/Gemini can be swapped in as long as they satisfy this interface, but the implementation itself is Phase 3+ scope (Phase 1/2 is Ollama + Claude API only).

## Model Management

- On first launch, if Ollama isn't installed or no model has been pulled, show a one-time setup screen (with a progress bar)
- Context window management uses `tokenize()` to truncate DOM/Network snapshots to fit within the model's native window limit
- The Storage & Cleanup panel (in settings) shows disk usage for Electron cache, Ollama models, and snapshots separately, and provides a one-click garbage-collection feature per category (Failure Friendly: user-triggered, not automatic deletion)

Related: [Roadmap: MVP Scope](../../roadmap/mvp-scope.md)
