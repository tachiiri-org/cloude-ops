# browser-boundary.md

## Scope

- browser to front and BFF security boundaries
- session and cookie responsibility
- CSRF and CORS coupling
- browser-facing response security headers
- step-up and assurance behavior at the browser boundary

## Principles

- Let the BFF be the only issuer of browser session and CSRF cookies.
- Do not propagate browser cookies beyond the BFF; use verified internal context or bearer transport downstream.
- Use `__Host-*` style cookies and avoid domain-wide cookie sharing by default.
- Require CSRF protection for state-changing browser requests that use cookie credentials.
- Combine origin checks and CSRF tokens rather than relying on only one signal.
- Keep CORS allowlists minimal for origins, methods, and headers.
- Include required browser headers such as CSRF or idempotency headers explicitly in CORS policy when they are needed.
- Reject browser-originated `authorization` headers and other pseudo-identity headers.
- Apply a default-deny posture for browser-facing security headers and relax only with explicit endpoint-level exceptions.
- Keep iframe, inline script, and similar relaxations explicit, narrow, and reviewable.
- Treat assurance shortage as a re-authentication or step-up requirement, not as an authorization denial.
- Bind step-up requirements to operations, not to ad hoc UI routes or client-specific logic.
- Keep step-up results in verified browser context such as session state; do not expand internal AuthZ claims with assurance data.

## Session Baseline

- Session cookies are BFF-owned.
- Session rotation must be possible.
- Logout or revoke must invalidate session use without leaking browser cookie concerns downstream.

## Browser Security Baseline

- Use explicit browser response security headers.
- Default to non-embedding and tighten browser capabilities unless an exception is declared.
- Keep browser-boundary exceptions explicit and version-aware.

## Prohibitions

- Do not let front, gateway, or adapter emit browser session cookies.
- Do not forward browser cookies downstream.
- Do not accept missing-origin exceptions for state-changing browser requests by default.
- Do not silently widen CORS for authenticated browser traffic.
- Do not turn assurance failures into `403` authorization denials.
- Do not inject step-up results into internal claims sets.
