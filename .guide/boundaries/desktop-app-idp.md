# desktop-app-idp.md

## Goals

- Keep desktop interactive authentication explicit at the desktop app to identity-provider edge.
- Support desktop login without inheriting browser session assumptions.
- Protect long-lived desktop credentials as high-sensitivity secrets.
- Ensure desktop login uses an explicit PKCE-based interactive flow.
- Ensure desktop authentication does not rely on browser cookie-session assumptions by default.
- Ensure refresh-capable credentials are handled as protected desktop secrets rather than renderer-visible state.
- Ensure the edge keeps desktop-specific authentication behavior explicit instead of inheriting browser defaults.

## Constraints

- Use `authorization_code` with PKCE for desktop interactive login.
- Keep assumptions explicit for the `desktop_app` client type on this edge.
- Keep supported authentication method classes explicit at this edge rather than inferred from implementation convenience.
- Treat refresh-capable credentials as high-sensitivity secrets.
- Keep refresh-capable credentials out of renderer-equivalent surfaces.
- Do not let browser-specific trust assumptions leak into desktop-client semantics.
- Do not let non-browser transport shortcuts weaken identity or contract semantics.
