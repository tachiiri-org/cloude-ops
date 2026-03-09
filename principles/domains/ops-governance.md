# ops-governance.md

## Scope

- release, rollout, abort, and rollback semantics
- configuration and environment governance
- incident and emergency controls
- automation and human-operated lifecycle boundaries
- support, override, and break-glass operations
- security and dependency incident response

## Principles

- Treat changes in meaning as explicit releases, not as incidental config edits.
- Keep rollout, abort, and rollback semantics explicit and distinct.
- Require rollback safety or explicit rollback limits before release.
- Treat configuration changes as governed changes, not informal live edits.
- Keep environment differences explicit and prevent them from changing cross-cutting semantics.
- Treat emergency controls as temporary, incident-bound, reviewable exceptions.
- Keep automation and human-operated actions distinct in governance and audit trails.
- Keep support and break-glass work operation-based rather than ad hoc.
- Keep security and dependency response inside the incident model rather than hiding it inside ordinary release flow.

## Release and Change Baseline

- Every semantic change must be associated with a release unit.
- Compatible changes may use explicit dual-accept windows.
- Breaking changes require explicit rollout strategy and may have limited rollback options.
- Abort applies only to not-yet-effective rollout scope.
- Rollback is a semantic retreat and must not silently corrupt runtime state, persistence, or external effects.

## Disaster-recovery Baseline

- Treat disaster recovery as a change of state, not a change of semantic rules.
- Do not allow disaster recovery mode to permit operations that are forbidden in normal operation.
- Do not allow irreversible or external-effect operations to execute twice across restore, retry, or failover boundaries.
- Preserve idempotency state across restore boundaries for side-effecting operations.
- Keep restore boundaries explicit and tenant-safe.
- Keep degraded-mode semantics explicit rather than ad hoc.
- Record DR entry, exit, restore boundary, and degraded-mode state in audit or structured observability.

## Configuration Baseline

- Keep all effective runtime configuration versioned or revisioned.
- Do not use live-edit as the primary governance model.
- Do not allow rollback-impossible configuration changes by default.
- Do not allow prod-only semantics that are not declared explicitly.
- Route durable emergency behavior through normal release governance after the incident ends.
- Record the fact of configuration change even when sensitive values are redacted.
- Classify runtime config changes explicitly as ordinary release-governed changes or incident-bound emergency changes.

## Incident and Emergency Baseline

- Incidents must be explicitly declared.
- Emergency controls must be bound to an active incident.
- Incident-bound exceptions must have expiry, audit, and closure behavior.
- Do not let emergency privileges or behavior survive incident closure silently.
- Keep break-glass and override behavior explicit, narrow, and auditable.
- Keep override evaluation order explicit rather than implementation-inferred.
- Fail closed or fall back to normal policy explicitly when override evaluation fails.

## Automation and Human Boundary

- Keep human-operated approvals, overrides, and emergency actions explicit.
- Keep automation-triggered actions within declared operational boundaries.
- Do not let automation silently redefine release or authorization semantics.
- Represent automation executors as `service` actors and keep human origin in initiator context when present.
- Make approval requirements operation-scoped and fail closed when required approval is missing.

## Support and Break-glass Baseline

- Define support and break-glass work as operations rather than hidden channels.
- Keep support operation classes explicit, for example:
  - investigation
  - mitigation
  - repair
  - recovery
  - break_glass
- Keep adapter as the final authorization decision point even for support and break-glass operations.
- Require strong audit, explicit reason, and incident or ticket binding for break-glass work.
- Keep break-glass time-bounded and revocable.
- Do not allow permanent privileged exceptions.
- Keep support operations tenant-scoped by default.

## Security and Dependency Incident Baseline

- Treat security issues, dependency failures, and trust-surface changes as incidents.
- Prioritize containment before durable remediation.
- Do not hide issuer, key, or dependency trust changes inside normal release flow.
- Make rollback limits explicit when key rotation or dependency replacement is not fully reversible.

## Prohibitions

- Do not treat “it is only config” as justification for semantic drift.
- Do not blur rollout, abort, and rollback into one operational action.
- Do not keep emergency behavior enabled without explicit expiry and follow-up handling.
- Do not let environment-specific shortcuts bypass shared invariants.
- Do not justify privileged backdoors such as hidden endpoints, direct database edits, or ad hoc operator channels as shared policy.
- Do not treat disaster recovery as justification for semantic shortcuts or double execution of side effects.
