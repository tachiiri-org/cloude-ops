# identity profiles

Identity profiles define concrete constraints for identity providers and authentication systems.

## Scope

- issuer and token-family considerations
- claims mapping expectations
- session and token-handling constraints
- key rotation and verification behavior
- client-type-specific authentication implications tied to the identity service
- repo-local adoption requirements for repositories that use an identity profile

## Typical Examples

- Auth0
- other OIDC-compatible identity services

## Non-goals

- adapter-facing third-party API constraints unrelated to identity establishment
- provider-agnostic identity semantics already owned by `principles/domains/identity-and-access.md`
- repository-local application identifiers and environment values

## Repo-local Adoption Baseline

- Repositories that adopt an identity profile must define:
  - accepted issuer values
  - accepted audience values
  - exact mapping into `tenant_id`, `actor_id`, `actor_type`, and `subject_id`
  - accepted roles, scopes, or permissions if any are used as upstream authorization input
  - supported application types and client classes in that repository
  - session lifetime, refresh behavior, and logout behavior where applicable
  - support or ops access flows where applicable
- Keep provider-specific claim names and environment values out of shared principles.
- Keep repository-specific boundary values and application identifiers out of profiles.

## Profile Expansion Rule

- Add one profile per identity provider or provider family.
- Keep provider-agnostic semantics in `../../principles/domains/identity-and-access.md`.
- Keep client authentication patterns in `../../principles/domains/interaction-edges.md`.
- Keep profile-specific concrete constraints in the corresponding file under `profiles/identity/`.
- Keep repository-local issuer lists, audience lists, claims mappings, and boundary values in repo-local specifications.
