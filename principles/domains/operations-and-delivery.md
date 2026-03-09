# operations-and-delivery.md

## Scope

- operation classification
- idempotency
- internal API contract authority
- async delivery and execution semantics

## Principles

- Classify operations explicitly as `read`, `mutate`, `irreversible`, and `external_effect`; do not infer semantics from path or method alone.
- Require idempotency for `mutate`, `irreversible`, and `external_effect` operations.
- Keep idempotency end-to-end; originators generate the key, upstream boundaries validate and forward it, and adapters complete it.
- Use operation catalogs and schemas as the authority for internal API meaning; do not infer contracts from routing conventions.
- Treat async executors as `service` or `ops` actors only; preserve human origin through initiator fields instead.
- Apply explicit size, timeout, concurrency, and queueing limits at each boundary.
- Keep retry and timeout chains safe so upstream boundaries do not outlive downstream work.
- Fail fast when boundary limits are exceeded instead of letting overload spread.
- Require audit events for irreversible or external-effect operations.

## Boundary Summary

- BFF
  - validate and forward semantic action identity
  - do not complete idempotency
- gateway
  - orchestrate use cases over stable operations
  - preserve idempotency and operation context across adapters
- adapter
  - complete idempotency
  - enforce final execution-boundary authorization

## Prohibitions

- Do not infer operation meaning from path or HTTP method alone.
- Do not complete idempotency outside adapters.
- Do not allow keyless retries for side-effecting operations.
- Do not treat human users as async executors.
- Do not leave upstream timeouts, concurrency, or queue limits implicit.
