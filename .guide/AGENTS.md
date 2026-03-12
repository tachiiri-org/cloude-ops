# AGENTS.md

Project guidance for automated coding agents.

## Defaults

### TypeScript

- Use bun for package management.
- Use Prettier for formatting.
- Use ESLint for linting.
- Use Vitest for unit tests.
- Use tsc for type checking.
- Use Playwright for UI checks when UI changes.
- Use Cloudflare Pages for frontend.
- Use Cloudflare Workers for BFF, gateway, and adapter.

### Python

- Use uv for package management.
- Use ruff for formatting and linting.
- Use pyright for type checking.
- Use pytest for testing.

### Common

- Prefer delegation workflows (plan first, then implement).
- Use Japanese for user-facing conversation.
- Use English for documentation and code reading/writing.

## Global Constraints

- Respect architectural boundaries strictly.
- Keep changes minimal and localized.
- Do not create multi-responsibility or god files.
- Do not merge files based on size or convenience.
- Do not use `any` except at explicit external boundaries.
- Treat tenant as the top-level ownership scope; do not infer tenant context from unverified input.
- Do not accept browser-asserted identity or `x-actor-*` style identity headers.
- Do not use identity-related `x-*` headers as internal API contract inputs.
- Use verified session or token claims only for identity and authorization context.
- Use initiator fields for audit only; never as authorization input.
- Return `401` for authentication failure and `403` for authorization failure.
- Classify operations explicitly; do not infer semantic action from path or method alone.
- Require idempotency for `mutate`, `irreversible`, and `external_effect` operations.
- Keep idempotency end-to-end and let adapters complete it.
- Use operation catalogs and schemas as the authority for internal API contracts.
- Treat breaking semantic changes as explicit release-level changes with version and rollout strategy.
- Use explicit header allowlists with default drop; reject ambiguous or invalid identity-related header input.
- Keep secrets and signing keys out of repositories; store references only.
- Require explicit issuer allowlists and safe key rotation overlap for JWT trust.
- Keep normative guidance separate from staging or exploratory documents.
- Keep detailed policy and fault explanations internal.
- Require audit events for irreversible or external-effect operations.
- Do not add destructive git operations to `settings.local.json` allow lists.

## Git / Release

- Do not deploy to production with Wrangler directly.
- For Cloudflare runtime repositories, expose staging deploys as `bun run deploy:staging` via runtime setup.
- Run Cloudflare staging deploys from CI on `push` to `dev`.
- Deploy only via merge to main.
- Do not push directly to main.
- Use pull requests for all merges.
- Do not create commits if the repository has no committed `.gitignore`.

## Frontend Discipline

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

## Merge Semantics

- Do not invent merge behavior.
- Deep-merge objects.
- Concatenate arrays.
- Replace scalar values.
