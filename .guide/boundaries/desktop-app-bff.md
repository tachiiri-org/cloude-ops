# desktop-app-bff.md

## Goals

- Keep the desktop app to BFF edge explicit as a non-browser client boundary.
- Preserve shared semantics across desktop and browser clients without importing browser-only assumptions.
- Keep operation initiation and edge trust explicit for desktop-originated user actions.
- Ensure desktop app requests are treated as an explicit non-browser client class.
- Ensure browser-only mechanisms such as CSRF and CORS are not applied by default unless the desktop edge explicitly adopts browser semantics.
- Ensure desktop-originated request identifiers and idempotency keys are validated as edge inputs rather than trusted identity facts.
- Ensure shared tenant, actor, authorization, and error semantics stay aligned with other client boundaries.

## Qualities

- Favor channel-specific adaptation in the BFF over changes to shared gateway semantics.
- Keep non-browser client support additive so desktop and future CLI surfaces do not force browser-centric assumptions into shared contracts.
- Minimize cross-channel coupling so one channel can evolve without destabilizing others.

## Constraints

- Keep assumptions explicit for the `desktop_app` client type on this edge.
- Keep supported authentication method classes explicit at this edge rather than inferred from implementation convenience.
- Keep core semantics such as tenant, actor, authorization, idempotency, and error meaning client-agnostic.
- Do not let browser-specific trust assumptions leak into desktop-client semantics.
- Do not let non-browser transport shortcuts weaken identity or contract semantics.
- Apply CSRF only to cookie-based browser boundaries by default.
- Apply CORS only to browser-facing boundaries by default.
- Treat request identifiers as trust-boundary-generated rather than desktop-client-trusted.
- Let the originator of a state-changing operation generate the idempotency key for desktop user actions.
- Do not hardcode client-specific trust exceptions into shared semantics.
