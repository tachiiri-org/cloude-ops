# operations-and-delivery.md

## Scope

- operation classification
- idempotency
- async delivery and execution semantics
- internal API contract and schema authority
- limits and failure posture

## Operation Semantics

- Classify operations explicitly as `read`, `mutate`, `irreversible`, or `external_effect`.
- Keep operation meaning anchored in operation catalogs and schemas.
- Use operation identity rather than path or method as the stable unit for authorization, idempotency, audit, and rollout.

## Idempotency Baseline

- Require idempotency for `mutate`, `irreversible`, and `external_effect` operations.
- Treat idempotency as semantic action identity, not as a transport retry trick.
- Generate idempotency keys at the originator and preserve them end-to-end.
- Adapter is the only component that completes idempotency.
- BFF and gateway may validate and forward idempotency context but must not finalize it.
- Keep uniqueness scoped by at least operation identity, tenant context, actor context, contract version, normalized input, and key.
- Treat duplicate completion as stored-result replay rather than re-execution.
- Do not allow keyless retries for side-effecting operations.

## Async and Event Baseline

- Async executors are `service` or `ops` actors only.
- Preserve human origin through initiator fields rather than human async executors.
- Require tenant and actor continuity across jobs and events.
- Require `event_id` or equivalent delivery identity for dedupe scope.
- Keep event schema identity explicit through `event_type` and `event_version`.
- Keep retry, dedupe, and replay semantics explicit for jobs and events.
- Keep delivery and effect semantics separate: at-least-once delivery may be acceptable, but side effects must still happen once.
- Default replay, backfill, and reprocessing flows to no external effect unless declared otherwise.
- Send poison or repeatedly failing deliveries to an explicit dead-letter path rather than retrying forever.

## Contract and Schema Authority

- Use operation catalogs and schemas as the authority for internal API meaning.
- Keep machine-checkable contract details in tool-spec or per-project repositories.
- Do not infer contract details from routing conventions or implementation structure.

## Limits and Failure Posture

- Apply explicit size, timeout, concurrency, and queueing limits at each boundary.
- Keep size-limit failure semantics explicit, including request and header overflow handling.
- Keep timeout and retry chains safe so upstream components do not outlive downstream work indefinitely.
- Keep retry count, timeout, and backoff relationships explicit so their combined effect does not exceed upstream safety bounds.
- Fail fast when boundary limits are exceeded instead of spreading overload.
- Keep overload, abuse, and retry behavior explicit rather than incidental.
- Keep quota, budget, abuse, and resource-protection outcomes semantically distinct from authorization outcomes.

## SLO Baseline

- Bind SLO evaluation to operation classification rather than transport shape.
- Keep at least availability, latency, and error-rate dimensions applicable to every operation.
- Keep stricter or looser SLO exceptions explicit per operation rather than by service folklore.
- Ensure observability can distinguish failure domains needed for classification-based SLO evaluation.

## Audit Coupling

- Require audit events for irreversible or external-effect operations.
- Keep audit correlation aligned with operation identity, tenant context, actor context, and idempotency context.

## Prohibitions

- Do not infer operation meaning from path or HTTP method alone.
- Do not complete idempotency outside adapters.
- Do not allow human users to act as async executors.
- Do not leave schema authority implicit.
- Do not leave upstream timeout, concurrency, or queue behavior undefined.
- Do not normalize quota, budget, or abuse failures into unrelated semantic classes.
