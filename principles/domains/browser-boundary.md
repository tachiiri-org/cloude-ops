# browser-boundary.md

## Scope

- browser to front and BFF security boundaries
- session and cookie ownership
- CSRF and CORS coupling
- browser response security headers
- step-up and assurance behavior

## Principles

- Let the BFF be the only issuer of browser session and CSRF cookies.
- Use browser cookies only between browser and BFF; do not propagate them downstream.
- Use `__Host-*` style cookies by default and avoid domain-wide cookie sharing.
- Require CSRF protection for state-changing browser requests that use cookie credentials.
- Combine origin checks and CSRF tokens rather than relying on only one signal.
- Treat missing `Origin` on state-changing browser requests as deny by default.
- Keep CORS allowlists minimal for origins, methods, and headers.
- Include required browser headers such as CSRF or idempotency headers explicitly in CORS policy.
- Apply a default-deny posture for browser-facing security headers and relax only with explicit exceptions.
- Treat assurance shortage as a re-authentication or step-up requirement, not as an authorization denial.

## Session Baseline

- Session cookies are BFF-owned.
- Session rotation must be possible.
- Session lifetime and extension rules must be explicit.
- Logout and revoke must invalidate session use without leaking cookie concerns downstream.
- Frontend, gateway, and adapter must not emit or mutate browser session cookies.

## Browser Security Baseline

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

## Step-up and Assurance

- Bind step-up requirements to operations, not ad hoc routes or client-specific code paths.
- Keep assurance results in verified browser context such as session state.
- Do not expand internal authorization claims with browser-only assurance data.
- Route assurance failures to re-authentication or step-up flows rather than `403`.

## Prohibitions

- Do not let front, gateway, or adapter emit browser session cookies.
- Do not forward browser cookies downstream.
- Do not silently widen CORS for authenticated browser traffic.
- Do not accept missing-origin exceptions for state-changing browser requests by default.
- Do not turn assurance failures into authorization denials.
