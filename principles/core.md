# core.md

## Architectural Principles

- Prioritize loose coupling between modules.
- Divide files by single responsibility.
- Design for scalability from the start.

## Cross-cutting Semantics

- Treat tenant as the top-level ownership scope.
- Keep actor types unambiguous across boundaries.
- Establish and propagate identity only through verified session or token claims.
- Evaluate authorization against stable operation semantics.
- Distinguish authentication failure (`401`) from authorization failure (`403`).
- Classify operations explicitly and require idempotency for side-effecting work.
- Keep internal API meaning anchored in operation catalogs and schemas.
- Make breaking semantic changes explicit, versioned, and rollout-governed.
- Enforce trust boundaries with header allowlists, redaction, and structured observability.
- Keep secrets, signing keys, and policy internals out of user-visible or repository-stored surfaces.
- Keep normative guidance separate from staging discussions.

## Domain Documents

- `domains/identity-and-access.md`
  - tenant, actor, subject, initiator
  - authn/authz boundaries
  - claims, issuer, and key governance
- `domains/operations-and-delivery.md`
  - operation classification
  - idempotency
  - async execution semantics
  - internal API contract authority
- `domains/compatibility-and-change.md`
  - release-level breaking change control
  - version acceptance and rollout
  - deprecation and removal
  - normative versus staging separation
- `domains/observability-and-trust.md`
  - header trust-boundary rules
  - structured observability
  - decision traces
  - internal-only fault explanation
- `domains/tenant-safety.md`
  - tenant containment across persistence and restore
  - cross-tenant exceptions
  - resource ownership
  - global resource safety
- `domains/browser-boundary.md`
  - browser session and cookie ownership
  - CSRF, CORS, and security headers
  - browser identity rejection rules
  - step-up and assurance semantics
- `domains/spec-governance.md`
  - what belongs in shared semantics
  - non-goal taxonomy
  - defaults and staging rules
- `domains/ops-governance.md`
  - release, rollback, and abort governance
  - configuration and environment controls
  - human-operated lifecycle guardrails

## Role Documents

- `roles/front.md`
- `roles/bff.md`
- `roles/gateway.md`
- `roles/adapter.md`
- `roles/electron.md`
- `roles/python.md`
- `roles/ops.md`
