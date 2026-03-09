# front.md

- Frontend is presentation only.
- No business logic in UI.
- Use composition patterns only.
- Explicitly model loading and error states.
- Keep components stateless by default.
- Interact with domain only via BFF contracts.
- Accessibility is mandatory.
- Lazy-load non-critical UI.
- Wrap app routes with an ErrorBoundary.
- Avoid global state unless strictly necessary.
- Treat BFF contracts as the only network-facing authority for UI behavior.
- Do not establish identity in the frontend; browser identity is established at the BFF boundary.
- Do not emit or mutate browser session cookies.
- Do not infer authorization or tenancy from client-local state alone.
- Do not treat UI routes as authorization or step-up policy boundaries.
- Do not trust browser-visible identity fields as authorization truth.
- Do not weaken browser response-header posture through ad hoc page-level exceptions.
