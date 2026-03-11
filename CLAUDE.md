# CLAUDE.md

This document defines Claude's behavioral constraints in this repository.

## Formatting Rules

- Use short imperative bullet points only.
- Do not include explanations.
- Do not introduce exceptions unless explicitly instructed.

## Tools Default

### TypeScript

- Use bun for package management.
- Use Prettier for formatting.
- Use ESLint for linting.
- Use Vitest for testing.
- Use tsc for type checking.
- Use Playwright to check UI.
- Use Cloudflare Pages for frontend.
- Use Cloudflare Workers for bff, gateway, and adapter.

### Python

- Use uv for package management.
- Use ruff for formatting and linting.
- Use pyright for type checking.
- Use pytest for testing.

### Common

- Use Serena via MCP to read and locate code.
- Use GitHub for version control.
- Use Japanese for user-facing conversation.
- Use English for documentation and code reading/writing.

## Behavioral Constraints

- Respect architectural boundaries strictly.
- Write tests before implementation.
- Don't merge files based on size or convenience.
- Don't create multi-responsibility or god files.
- Treat tenant as the top-level ownership scope.
- Don't infer tenant context from unverified input.
- Don't accept browser-asserted identity.
- Don't accept `x-actor-*` style identity headers.
- Don't use identity-related `x-*` headers as internal API contract inputs.
- Use verified session or token claims only for identity and authorization context.
- Use initiator fields for audit only, never as authorization input.
- Return `401` for authentication failure and `403` for authorization failure.
- Classify operations explicitly, not by path or method alone.
- Require idempotency for `mutate`, `irreversible`, and `external_effect` operations.
- Keep idempotency end-to-end and let adapters complete it.
- Use operation catalogs and schemas as the authority for internal API contracts.
- Treat breaking semantic changes as explicit release-level changes with version and rollout strategy.
- Use explicit header allowlists with default drop.
- Reject ambiguous or invalid identity-related header input.
- Keep secrets and signing keys out of repositories; store references only.
- Require explicit issuer allowlists and safe key rotation overlap for JWT trust.
- Keep normative guidance separate from staging or exploratory documents.
- Keep detailed policy and fault explanations internal.
- Require audit events for irreversible or external-effect operations.
- Don't deploy to prod with Wrangler directly
- Expose Cloudflare staging deploys as `bun run deploy:staging` via runtime setup
- Run Cloudflare staging deploys from CI on push to `dev`
- Don't commit with no .gitigonore in repository
- Setup tools if default tools not installed
- Deploy only via merge to main.
- Do not push directly to main.
- Use pull requests for all changes to merge.
- Do not use `any` except at explicit external boundaries.
- Annotate all function signatures and variables with types.
- Do not add destructive git operations to settings.local.json allow list.

## Merge Semantics

- Do not invent merge behavior.
- Merge objects recursively (deep merge).
- Concatenate arrays.
- Replace scalar values.
