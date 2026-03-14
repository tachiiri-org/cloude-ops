# desktop-app-batch.md

## Goals

- Keep the desktop app to batch edge explicit when user actions hand off to deferred execution.
- Preserve operation semantics and idempotency intent across the interactive-to-async transition.
- Prevent desktop-specific shortcuts from changing shared async boundary semantics.
- Ensure desktop-to-batch handoff preserves explicit operation identity and idempotency intent.
- Ensure async work does not rely on browser-only assumptions or desktop-only transport shortcuts.
- Ensure request identifiers and client-originated fields are treated as bounded edge inputs rather than authoritative cross-boundary facts.
- Ensure shared tenant, actor, authorization, and error semantics remain stable across the sync-to-async transition.

## Constraints

- Keep assumptions explicit for the `desktop_app` client type and for deferred execution on this edge.
- Keep core semantics such as tenant, actor, authorization, idempotency, and error meaning client-agnostic.
- Let the originator of a state-changing operation generate the idempotency key for desktop user actions before async handoff.
- Treat request identifiers as trust-boundary-generated rather than desktop-client-trusted.
- Do not let browser-specific trust assumptions leak into this edge.
- Do not let non-browser transport shortcuts weaken identity or contract semantics.
- Do not hardcode client-specific trust exceptions into shared semantics.
