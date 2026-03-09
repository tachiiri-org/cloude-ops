# tenant-safety.md

## Scope

- tenant isolation across persistence, derived data, replay, and restore
- cross-tenant exception control
- resource ownership and data-bound access checks
- global resource handling

## Principles

- Treat tenant boundaries as the primary containment mechanism for tenant-scoped data.
- Preserve tenant context across persistence, caches, search, analytics, logs, backups, replay, and restore paths.
- Derive tenant context only from verified identity or established session context, not from unverified payload or headers.
- Forbid cross-tenant read and write by default.
- Introduce cross-tenant behavior only as explicit, typed, time-bounded, auditable exceptions.
- Treat global resources as explicit exceptions, not implicit defaults.
- Limit global writes to `service` or `ops` actors unless a stricter exception is declared.
- Keep ownership checks data-bound and adapter-owned; do not replace them with expanded token claims.
- Use stable identifiers only for ownership and containment checks.
- Prevent tenant contamination during restore, replay, reconciliation, and backfill.
- Default backfill and replay flows to no external effect unless the operation explicitly declares otherwise with audit and idempotency.

## Cross-tenant Exception Baseline

- Require an explicit `exception_type`.
- Require source and target tenant identification.
- Require actor-type constraints.
- Require forced audit.
- Require an explicit sunset or expiry.
- Require operation-level declaration and versioned rollout.

## Ownership Baseline

- Every tenant-scoped resource belongs to a single tenant.
- Final ownership enforcement belongs to adapters.
- Gateway and BFF may narrow access early, but they do not make final record-level ownership decisions.
- Do not use mutable attributes such as email or display name for ownership checks.

## Restore and Replay Safety

- Do not allow restore to contaminate tenant boundaries.
- Do not revive purged data silently during restore.
- Do not allow replay or backfill to create external effects by default.

## Prohibitions

- Do not allow implicit cross-tenant behavior for convenience, environment differences, or internal-only paths.
- Do not create global resources implicitly.
- Do not let human actors perform global writes by default.
- Do not move ownership semantics into expanding claims sets.
