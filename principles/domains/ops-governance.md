# ops-governance.md

## Scope

- release, rollout, abort, and rollback semantics
- configuration and environment governance
- human-operated lifecycle controls for shared systems

## Principles

- Treat changes in meaning as explicit releases, not as incidental config edits.
- Keep rollout, abort, and rollback semantics explicit.
- Distinguish abort from rollback.
- Require rollback safety or explicit rollback limits before release.
- Treat configuration changes as governed changes, not informal live edits.
- Keep all effective runtime configuration versioned or revisioned.
- Make environment differences explicit and prevent them from changing cross-cutting semantics.
- Treat emergency configuration as temporary, time-bounded, and reviewable.
- Route durable operational exceptions through normal release governance after the emergency ends.

## Release Baseline

- Every semantic change must be associated with a release unit.
- Compatible releases may use explicit dual-accept windows where appropriate.
- Breaking releases require explicit rollout strategy and may have limited rollback options.
- Rollback must not silently corrupt runtime state, persistence, or external effects.

## Configuration Baseline

- Do not use live-edit as the primary governance model.
- Do not allow rollback-impossible configuration changes by default.
- Do not allow prod-only semantics that are not declared explicitly.
- Do not let emergency config become permanent by drift.

## Relationship to Other Principles

- `compatibility-and-change.md`
  - defines semantic compatibility rules
- `operations-and-delivery.md`
  - defines execution and side-effect safety semantics
- `tenant-safety.md`
  - constrains operational exceptions that touch tenant boundaries

## Prohibitions

- Do not treat “it is only config” as justification for semantic drift.
- Do not blur rollout, abort, and rollback into a single operational action.
- Do not keep emergency behavior enabled without explicit expiry and follow-up release handling.
- Do not let environment-specific shortcuts bypass shared invariants.
