# setup-idp-auth0 command

## Applies To

- BFF repositories that terminate browser login or validate Auth0-issued tokens
- Electron repositories that perform desktop login flows
- Frontend repositories only when they own Auth0 browser-login initiation details without token termination
- Gateway or adapter repositories only when they directly validate Auth0-issued credentials at their own boundary

## Does Not Apply To

- Repositories that receive only normalized internal principal context
- Gateway or adapter repositories that do not directly terminate or validate Auth0 credentials
- Repositories that only consume downstream authorization results

## Workflow

1. Read `providers/auth0.md`
2. Read `identity/access.md`
3. Read only the relevant shared boundary guidance under `boundaries/` for the Auth0 edge in scope, especially `browser-idp.md` or `desktop-app-idp.md` when applicable
4. Read the role document that matches the repository when relevant:
   - `roles/bff.md`
   - `roles/desktop-app.md`
   - `roles/front.md`
   - `roles/gateway.md` when a gateway directly validates Auth0-issued credentials
   - `roles/adapter.md` when an adapter directly validates Auth0-issued credentials
5. Verify working tree is clean
6. Classify whether the repository directly terminates, exchanges, refreshes, initiates, or validates Auth0-issued credentials
7. Stop with an explanation if the repository does not directly integrate with Auth0
8. Prepare a single consolidated input checklist for the human before making repository changes
9. Prepare a single consolidated manual Auth0 console checklist so the human can complete it in one pass
10. Add minimal Auth0-related scaffolding only for the direct boundary in scope
11. Add only the concrete placeholders and validation needed for the repository boundary
12. Run the repository's standard validation commands
13. Commit the setup changes

## Required Inputs From Human

- Auth0 tenant or domain
- expected issuer or issuer family
- expected audience or API identifier
- application type in Auth0
- login callback URLs (deployed environments only; no localhost)
- logout or post-logout URLs if applicable (deployed environments only; no localhost)
- whether a separate local-development Auth0 application exists or needs to be created
- claims mapping inputs needed for `tenant_id`, `actor_id`, `actor_type`, and `subject_id`
- session mode or token mode at the repository boundary
- support or ops access flow if applicable

## Manual Auth0 Console Steps

- Create or identify the Auth0 application or API resource for the repository boundary
- Configure callback, logout, and allowed origin URLs in one pass using only the deployed environment URLs; never include `localhost` or `127.0.0.1` — local development must use a separate Auth0 application
- Configure application type and grant types
- Configure RBAC, permissions, roles, or custom claims sources if required
- Confirm issuer and audience values to be copied into repository placeholders
- Create or retrieve client credentials or secrets only for the boundary that needs them
- Record the exact human-provided values before returning to repository changes

## Common Automated Changes

- Add configuration placeholders only for:
  - issuer
  - audience
  - claims mapping inputs
  - session or token handling mode
- Add only the minimal scaffold needed for token validation, session handling, or login initiation at the repository boundary
- Keep all additions aligned with:
  - browser login through BFF when a BFF exists
  - `authorization_code` with PKCE for browser and desktop interactive login
  - `client_credentials` for machine-to-machine flows
- Do not add Auth0 awareness to repositories that only consume normalized internal principal context

### BFF

- Apply when the repository terminates browser login, exchanges authorization codes, validates Auth0 tokens, or creates first-party browser sessions
- Add callback and logout route placeholders only if the BFF owns them
- Add session configuration placeholders only if the BFF owns browser session issuance
- Normalize verified Auth0 claims into the internal principal shape before forwarding downstream

### Electron

- Apply when the repository performs desktop interactive login or refreshes desktop credentials
- Add PKCE-oriented desktop login placeholders
- Add secure-storage integration placeholders for refresh-capable credentials
- Keep token refresh and revocation logic out of renderer-facing surfaces

### Front

- Apply only when the repository owns login initiation details without terminating Auth0 tokens
- Add login-initiation placeholders only
- Do not add token validation, secret handling, or long-lived credential storage to the frontend

### Gateway And Adapter Exceptions

- Apply only when the repository directly validates Auth0-issued credentials at its own boundary
- Keep the setup limited to direct validation requirements
- Do not make gateway or adapter repositories Auth0-aware by default

## Verification

- Verify issuer and audience placeholders match the human-provided Auth0 values
- Verify the repository boundary matches the selected role section
- Verify browser repos do not bypass BFF session termination when a BFF exists
- Verify token or session handling does not leak raw provider tokens across internal boundaries
- Run the repository's standard validation commands

## Constraints

- Do not make gateway or adapter repositories Auth0-aware by default
- Do not bypass BFF as the browser authentication termination point when a BFF exists
- Do not add provider-specific values into shared guidance
- Do not invent repository-local auth flows that conflict with `providers/auth0.md`
- Do not use npm
- Do not add `localhost` or `127.0.0.1` to Allowed Callback URLs, Allowed Logout URLs, or Allowed Web Origins on any Auth0 application intended for deployed environments; local development requires a dedicated Auth0 application with its own Client ID
