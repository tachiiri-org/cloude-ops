# identity-and-access.md

## Scope

- tenant, actor, subject, initiator semantics
- authentication and authorization boundaries
- claims governance
- signing-key and issuer governance

## Principles

- Treat tenant as the top-level ownership scope; require explicit tenant context for tenant-scoped operations.
- Keep actor types unambiguous across boundaries: `human`, `service`, and `ops`.
- Use `subject` only for end-user human identity; do not attach `subject` to `service` or `ops` actors.
- Use `initiator` for audit and causality only; never use initiator fields as authorization input.
- Establish browser identity only at the BFF boundary; do not trust browser-asserted identity.
- Propagate identity and authorization context only through verified session or token claims.
- Reject identity injection through headers, query params, or request bodies, including `x-actor-*` style headers.
- Evaluate authorization against stable operation semantics, not raw transport details alone.
- Return `401` for authentication failure and `403` for authorization failure.
- Treat async executors as `service` or `ops` actors only; preserve human origin through initiator fields instead.
- Require explicit issuer allowlists, rotation overlap, and non-bypass verification behavior for JWT trust.
- Keep secrets and signing keys out of repositories; specify only references, locators, and rotation expectations.
- Use explicit claims-set versioning and rollout policy; do not silently expand AuthZ input claims.

## Boundary Summary

- BFF
  - establish browser identity
  - normalize principal before internal calls
- gateway
  - apply coarse-grained policy checks and early rejection
  - do not become the final source of provider-specific authorization truth
- adapter
  - own the final authorization decision at the execution boundary

## Prohibitions

- Do not trust browser-asserted identity.
- Do not accept `x-actor-*` style identity injection.
- Do not use initiator fields as authorization input.
- Do not store secrets or key material in repositories.
- Do not add AuthZ-relevant claims without explicit versioning and rollout strategy.
