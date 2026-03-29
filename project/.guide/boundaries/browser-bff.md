# browser-bff.md

## Goals

- Keep the browser to BFF edge as the only steady-state browser trust boundary.
- Let the BFF own browser session and CSRF state.
- Keep browser-facing security posture explicit, narrow, and reviewable.
- Preserve browser-originated operation intent without trusting browser-originated security assertions.
- Ensure browser session and CSRF cookies are issued only by the BFF.
- Ensure state-changing browser requests fail closed when CSRF or origin validation is missing or invalid.
- Ensure browser-specific headers, cookies, and trust assumptions do not cross internal boundaries.
- Ensure browser-facing responses keep an explicit security-header baseline with endpoint-scoped exceptions only.
- Ensure browser request identifiers and idempotency keys are handled as BFF-governed edge inputs rather than trusted identity signals.

## Qualities

- Keep browser-specific security behavior localized to the channel boundary rather than leaking it into gateway or adapter contracts.
- Favor boundary designs that let browser-facing UI evolve without forcing internal contract churn.
- Favor explicit exception surfaces over convenience-driven broadening of browser trust.

## Constraints

- Let the BFF be the only issuer of browser session and CSRF cookies.
- Use browser cookies only between browser and BFF.
- Do not propagate browser cookies downstream.
- Use `__Host-*` style cookies by default and avoid domain-wide cookie sharing.
- Require CSRF protection for state-changing browser requests that use cookie credentials.
- Combine origin checks and CSRF tokens rather than relying on only one signal.
- Treat missing `Origin` on state-changing browser requests as deny by default.
- Keep CORS allowlists minimal for origins, methods, and headers.
- Include required browser headers such as CSRF or idempotency headers explicitly in CORS policy.
- Apply a default-deny posture for browser-facing security headers and relax only with explicit exceptions.
- Reject browser-originated `authorization` headers by default.
- Reject pseudo-identity headers from browser traffic.
- Default to non-embedding and tightly scoped browser capabilities.
- Keep iframe, inline script, and similar relaxations explicit, narrow, and reviewable.
- Keep a minimum browser-facing response-header baseline explicit:
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - cross-origin isolation headers when applicable
- Keep browser response-header exceptions explicit and endpoint-scoped.
- Session cookies are BFF-owned.
- Session rotation must be possible.
- Session lifetime and extension rules must be explicit.
- Logout and revoke must invalidate session use without leaking cookie concerns downstream.
- Frontend, gateway, and adapter must not emit or mutate browser session cookies.
- Treat request identifiers on this edge as trust-boundary-generated rather than browser-trusted.
- Let the originator of a state-changing operation generate the idempotency key for browser user actions.
- Do not silently widen CORS for authenticated browser traffic.
- Do not accept missing-origin exceptions for state-changing browser requests by default.
