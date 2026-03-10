# auth0.md

Auth0 profile for repositories and services that use Auth0 as the identity provider.

## Scope

- OIDC and OAuth2 behavior relevant to Auth0 adoption
- issuer, audience, and token-family handling
- claims normalization inputs
- client-type-specific concrete constraints when Auth0 is in use

## Applies When

- Auth0 is used for browser login, desktop login, machine-to-machine authentication, or token issuance consumed by this architecture.

## Baseline

- Keep provider-agnostic semantics in `../../principles/domains/identity-and-access.md`.
- Keep client authentication patterns in `../../principles/domains/interaction-edges.md`.
- Keep BFF browser-boundary responsibilities in `../../principles/roles/bff.md`.

## Concrete Constraints

- Use OIDC-conformant token validation.
- Keep accepted `iss` values in explicit allowlists.
- Validate expected `aud` or equivalent API recipient binding before accepting a token.
- Validate signature, expiry, not-before, and issuer before normalizing claims.
- Do not trust user profile fields as authorization input unless they are explicitly mapped from verified claims.
- Treat Auth0 role and permission claims as upstream authorization input only.
- Do not let Auth0 RBAC replace adapter-side final authorization decisions.

## Browser Constraints

- Use Auth0 interactive login only through the BFF boundary.
- Prefer `authorization_code` with PKCE for browser login.
- Terminate browser login into a first-party BFF-managed session.
- Do not use browser-held bearer tokens as the default steady-state downstream identity transport.

## Desktop Constraints

- Use `authorization_code` with PKCE.
- Treat refresh-capable credentials as high-sensitivity secrets.
- Keep refresh-capable credentials out of renderer-equivalent surfaces.
- Store desktop credentials only in OS-backed secure storage or an equivalent hardened mechanism.

## Server-to-server Constraints

- Use machine-to-machine applications with `client_credentials` or an equivalent verified service-token flow.
- Normalize successful machine-to-machine authentication into `service` actor claims.
- Do not attach human `subject_id` semantics to machine-to-machine tokens by default.

## Claims Normalization Inputs

- Normalize from verified Auth0 token content into the internal claims shape expected by shared principles.
- Define explicit mapping for:
  - tenant context
  - `actor_id`
  - `actor_type`
  - `subject_id` when applicable
  - accepted roles
  - accepted scopes or permissions
- Treat provider-local claim names as implementation details.
- Do not expose raw provider claim names as stable internal contract fields.

## Rotation and Verification Constraints

- Keep signing-key rotation overlap explicit.
- Cache JWKS or equivalent verification material with explicit expiry behavior.
- Fail closed when issuer or key verification cannot be completed.
- Do not silently bypass signature verification during refresh or outage conditions.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - accepted issuer values
  - accepted audience values
  - exact claims mapping
  - supported Auth0 application types
  - session lifetime and refresh behavior
  - support or ops access flows if applicable

## Non-goals

- role-independent identity semantics
- repository-local operation catalogs
- environment-specific secrets, tenant names, or domain values
