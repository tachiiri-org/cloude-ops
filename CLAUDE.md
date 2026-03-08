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

## Behavioral Constraints

- Respect architectural boundaries strictly.
- Write tests before implementation.
- Don't merge files based on size or convenience.
- Don't create multi-responsibility or god files.
- Don't deploy to prod with Wrangler
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
