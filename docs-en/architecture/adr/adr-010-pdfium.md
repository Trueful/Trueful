# ADR-010: Use PDFium As-Is for the PDF Viewer

**Status**: Decided

## Decision

Use Chromium's built-in PDFium as-is; do not develop a custom PDF viewer.

## Rationale

There is demand for viewing API specs and papers, but this is a direct application of the existing pattern of reusing Chromium (see [ADR-004](./adr-004-chromium-fixed.md) etc.).
