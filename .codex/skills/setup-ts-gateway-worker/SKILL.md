---
name: setup-ts-gateway-worker
description: Bootstrap a TypeScript Cloudflare Gateway Worker repository with baseline tooling and /health scaffold.
---

# setup-cloudflare-worker command

## Goals

1. Run `bootstrap-worker.sh [TARGET_REPO_PATH]`
2. Read CLAUDE.md
3. Verify working tree is clean
4. Ensure `main` branch exists; ensure `dev` branch exists off `main` (create if not); switch to `dev`; create a feature branch off `dev` and switch to it
5. Verify auth status of GitHub
6. Verify availability of Codex via MCP
7. Verify availability of Serena via MCP; if unavailable output configuration instructions and stop; if available call `activate_project` with the current repository path
8. Call `activate_project` of Serena with the current repository path
9. Scaffold a minimal Worker: a single `src/index.ts` that handles `GET /health` and returns `200 OK` with `{ status: "ok" }`
10. Run `tsc --noEmit` and confirm it passes
11. Commit the scaffold
12. Create a pull request targeting `dev`

## Memo

`bootstrap-worker.sh [TARGET_REPO_PATH]` performs:

- Git fetch on the current branch
- Copies `package.template.json` if `package.json` is missing, then runs `bun init -y`
- Runs `bun install`
- Adds devDependencies: `prettier`, `eslint`, `typescript`, `vitest`, `wrangler`
- Adds `github:tachiiri-org/cloude-ops` package

## Constraints

- Don't read application/source code files before scaffold
- Don't implement application features beyond `/health`
- Don't use npm
- Don't deploy with Wrangler directly
