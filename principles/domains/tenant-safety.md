# tenant-safety.md

## Scope

- tenant isolation across persistence, derived data, replay, and restore
- cross-tenant exception control
- resource ownership and record-level access checks
- global resource handling
- tenant lifecycle constraints

## Principles

- Treat tenant boundaries as the primary containment mechanism for tenant-scoped data and operations.
- Preserve tenant context across persistence, caches, search, analytics, logs, backups, replay, and restore paths.
- Forbid cross-tenant reads and writes by default.
- Introduce cross-tenant behavior only as explicit, typed, time-bounded, auditable exceptions.
- Treat global resources as explicit exceptions, not implicit defaults.
- Keep ownership checks data-bound and adapter-owned.

## Resource Ownership Baseline

- Every tenant-scoped resource belongs to a single tenant.
- Final ownership enforcement belongs to adapters.
- Gateway and BFF may narrow access early but do not make final record-level ownership decisions.
- Use stable identifiers only for ownership and containment checks.
- Do not use mutable profile attributes such as email or display name for ownership checks.

## Cross-tenant Exception Baseline

- Require an explicit exception type.
- Require source and target tenant identification.
- Require actor-type constraints.
- Require forced audit.
- Require explicit expiry or sunset.
- Require operation-level declaration and versioned rollout.

## Global Resource Baseline

- Mark global resources explicitly rather than deriving them implicitly.
- Limit global writes to `service` or `ops` actors unless a stricter rule is declared.
- Do not let human actors perform global writes by default.

## Tenant Lifecycle and Recovery

- Keep tenant creation, suspension, deletion, restore, and replay semantics explicit.
- Prevent restore from contaminating tenant boundaries.
- Do not revive purged data silently during restore.
- Default backfill and replay flows to no external effect unless declared otherwise with idempotency and audit.

## Prohibitions

- Do not allow implicit cross-tenant behavior for convenience, environment differences, or internal-only paths.
- Do not create global resources implicitly.
- Do not move ownership semantics into expanding claims sets.
- Do not let restore, replay, or reconciliation break tenant containment.
