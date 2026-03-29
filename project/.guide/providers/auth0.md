# auth0.md

## Use Cases

- Auth0 is used for browser login
- Auth0 is used for desktop login
- Auth0 is used for machine-to-machine authentication
- Auth0 issues tokens consumed by this architecture

## Constraints

- Use OIDC-conformant token validation.
- Validate signature before normalizing claims.
- Validate expiry before normalizing claims.
- Validate not-before before normalizing claims.
- Validate issuer before normalizing claims.
- Validate audience before accepting a token.
- Keep accepted issuer values explicit.
- Keep accepted audience values explicit.
- Do not trust user profile fields as authorization input unless they are explicitly mapped from verified claims.
- Treat Auth0 role claims as upstream authorization input only.
- Treat Auth0 permission claims as upstream authorization input only.
- Use Auth0 interactive browser login only through the BFF boundary.
- Do not use browser-held bearer tokens as the default steady-state downstream identity transport.
- Use `authorization_code` with PKCE for desktop login.
- Treat refresh-capable credentials as high-sensitivity secrets.
- Keep refresh-capable credentials out of renderer-equivalent surfaces.
- Store desktop credentials only in OS-backed secure storage or an equivalent hardened mechanism.
- Use machine-to-machine applications with `client_credentials` or an equivalent verified service-token flow.
- Normalize successful machine-to-machine authentication into `service` actor claims.
- Do not attach human `subject_id` semantics to machine-to-machine tokens by default.
- Normalize verified Auth0 token content into the internal claims shape expected by shared guidance.
- Define explicit mapping for tenant context.
- Define explicit mapping for `actor_id`.
- Define explicit mapping for `actor_type`.
- Define explicit mapping for `subject_id` when applicable.
- Define explicit mapping for accepted roles.
- Define explicit mapping for accepted scopes or permissions.
- Treat provider-local claim names as implementation details.
- Do not expose raw provider claim names as stable internal contract fields.
- Cache JWKS or equivalent verification material with explicit expiry behavior.
- Fail closed when issuer verification cannot be completed.
- Fail closed when key verification cannot be completed.
- Do not silently bypass signature verification during refresh conditions.
- Do not silently bypass signature verification during outage conditions.
