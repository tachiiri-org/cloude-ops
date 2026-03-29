# adapter.md

## Roles

- Own one adapter per external service provider.
- Absorb provider-specific API differences.
- Own the final authorization decision at the execution boundary.
- Apply provider-specific rate limiting.
- Handle retry.
- Handle backoff.
- Handle circuit breaking.
- Normalize external data into gateway-facing canonical form.
- Complete idempotency at the execution boundary.
- Enforce final record-level ownership checks.
- Enforce tenant containment checks.

## Constraints

- Keep provider-specific transport details from leaking upstream.
- Keep provider-specific error details from leaking upstream.
- Verify webhook signatures when applicable.
- Verify replay protection when applicable.
- Verify duplicate-delivery handling when applicable.
- Keep execution-boundary outcomes explicit.
- Do not rely on expanded claims sets instead of data-bound ownership checks.
- Canonicalize provider-specific event semantics before they cross upstream boundaries.
- Canonicalize provider-specific lifecycle semantics before they cross upstream boundaries.
