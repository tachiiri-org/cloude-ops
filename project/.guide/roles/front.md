# front.md

## Roles

- Keep the frontend presentation only.
- Use composition patterns only.
- Model loading states explicitly.
- Model error states explicitly.
- Interact with the domain only through BFF contracts.
- Keep accessibility mandatory.
- Lazy-load non-critical UI.
- Wrap app routes with an ErrorBoundary.

## Constraints

- Keep business logic out of the UI.
- Keep components stateless by default.
- Avoid global state unless strictly necessary.
- Treat BFF contracts as the only network-facing authority for UI behavior.
- Do not infer authorization from client-local state alone.
- Do not infer tenancy from client-local state alone.
