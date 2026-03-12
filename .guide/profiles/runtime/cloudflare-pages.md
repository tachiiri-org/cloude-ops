# cloudflare-pages.md

Cloudflare Pages runtime profile for repositories and services that host frontend assets or edge-rendered frontend surfaces on Pages.

## Scope

- hosting constraints specific to Cloudflare Pages
- frontend delivery implications tied to Pages adoption
- platform-native considerations for static assets, edge rendering, and frontend observability

## Applies When

- A frontend role is hosted on Cloudflare Pages.
- A repository uses Pages features for frontend asset delivery or edge-rendered frontend execution.

## Baseline

- Keep provider-agnostic frontend responsibilities in `../../principles/roles/front.md`.
- Keep browser-boundary semantics in `../../principles/domains/browser-boundary.md`.
- Use this profile only for Pages-specific concrete constraints.

## Runtime Constraints

- Treat frontend delivery as browser-facing infrastructure with untrusted client input by default.
- Keep build output, static assets, and edge-rendered code separate from secrets and private credentials.
- Do not assume Pages deployment implies Workers-side access to private services without explicit boundary design.
- Keep environment differences explicit; do not let preview or debug deployment defaults redefine shared semantics.

## Delivery Constraints

- Keep frontend behavior driven by BFF contracts rather than direct coupling to provider-specific backend surfaces.
- Do not treat static asset hosting or route configuration as an authorization boundary.
- Keep cache behavior explicit for HTML, auth-sensitive routes, and user-specific responses.
- Prevent browser-visible assets from embedding secret material, raw provider credentials, or internal-only topology assumptions.

## Observability Constraints

- Capture enough frontend delivery and error telemetry to correlate browser-visible failures with BFF-side request flows.
- Do not treat client-visible logs or browser console output as authoritative observability.
- Keep redaction rules explicit for frontend telemetry, especially when user context or identifiers may appear.

## Security Constraints

- Keep browser security headers explicit and environment-consistent.
- Keep origin and CORS behavior aligned with browser-boundary rules rather than ad hoc hosting defaults.
- Fail closed on missing required frontend configuration for identity, API origin, or security-header posture.
- Do not rely on client-side environment variables for secrets or authorization truth.

## Platform-native Services

- Treat Pages bindings, asset configuration, redirects, middleware, and edge-rendering features as separate adoption decisions.
- Evaluate each selected feature against browser-boundary, caching, identity, and observability constraints before use.
- Do not infer private-service access, storage selection, or observability backend selection from Pages adoption alone.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - selected Pages features
  - cache behavior by route class
  - preview and production environment behavior
  - frontend telemetry configuration
  - API origin and BFF integration configuration

## Non-goals

- backend authorization semantics
- identity-provider-specific token rules
- adapter-facing provider constraints
- repository-local route contracts or schemas
