# core.md

Shared principles are written primarily for AI and automated systems, and secondarily for humans.
They preserve value-free semantic guidance that should stay stable as the system grows across multiple repos, boundaries, and owners.

## Architectural Principles

- Prioritize loose coupling between modules.
- Divide files by single responsibility.
- Design for scalability from the start.

## Reading Order

1. Read this file first.
2. Read the role-specific document under `roles/` that matches the repository role.
3. Read the runtime-specific document under `runtime/` when the repository's execution or delivery platform is known.
4. Read domain documents under `domains/` as needed for the task scope.
5. Use `../architecture.mmd` for topology context when needed.

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
- Keep interaction-edge rules explicit per browser, client, HTTP, and webhook boundary.
- Keep data handling rules explicit across classification, persistence, deletion, residency, and billing-sensitive flows.
- Keep normative guidance separate from staging discussions.

## Responsibility Split

- `core.md`
  - cross-cutting semantic summary
  - reading map for `roles/`, `runtime/`, and `domains/`
- `domains/`
  - high-density cross-cutting semantics without role duplication
- `roles/`
  - role-specific responsibilities
  - role-specific prohibitions
  - how the role applies the shared core principles
- `runtime/`
  - runtime-owned delivery and merge-gate invariants
  - execution-platform principles that stay above profile-level concrete detail

## Document Semantics

- Markdown files are the source of intent, scope, invariants, and prohibitions.
- Shared guidance is normative for semantic rules, not for concrete runtime values.
- Concrete values, schemas, catalogs, and lint checks belong in tool-spec or per-project repositories.

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
- `domains/interaction-edges.md`
  - internal HTTP boundary rules
  - webhook trust and replay safety
  - client-type and authn-method constraints
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
  - tenant lifecycle and recovery safety
- `domains/data-governance.md`
  - data classification
  - persistence and deletion propagation
  - residency and billing-sensitive handling
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

## Runtime Documents

- `runtime/cloudflare-pages.md`
- `runtime/cloudflare-workers.md`
- `runtime/electron.md`
- `runtime/python.md`
- `runtime/ops.md`

## Authoring Rules

- Keep `core.md` free of role-specific implementation detail and use it as a navigation layer.
- Keep files under `roles/` free of duplicated core semantics unless the role adds a stricter rule.
- Add dense cross-cutting semantics to the appropriate file under `domains/`, then summarize them here.
- Add new role-local guidance to the corresponding file under `roles/`.
