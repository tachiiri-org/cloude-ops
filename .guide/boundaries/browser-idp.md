# browser-idp.md

## Goals

- Keep browser interactive authentication explicit at the browser to identity-provider edge.
- Use the identity-provider edge only to complete interactive login or step-up flows.
- Prevent browser-held credentials from becoming the default downstream identity transport when a BFF is present.
- Ensure browser login uses an explicit PKCE-based interactive flow.
- Ensure successful browser login ends in BFF-managed session state instead of browser-held downstream bearer-token use.
- Ensure step-up and re-authentication are triggered by operation-level assurance requirements.
- Ensure browser-only assurance results remain in browser-session context and do not mutate shared internal authorization claims.

## Constraints

- Prefer `authorization_code` with PKCE for browser interactive login flows.
- Complete interactive browser login through an explicit identity-provider flow.
- Terminate browser authentication into a first-party BFF-managed `cookie_session` after login completion.
- Do not treat browser bearer tokens as the default steady-state session mechanism when a BFF is present.
- Treat assurance shortage as a re-authentication or step-up requirement rather than as an authorization denial.
- Bind step-up requirements to operations rather than to ad hoc routes or client-specific code paths.
- Keep assurance results in verified browser context such as session state.
- Do not expand internal authorization claims with browser-only assurance data.
- Route assurance failures to re-authentication or step-up flows rather than `403`.
