# setup command

## Goals

1. read CLAUDE.md
2. verify working tree is clean
3. fetch remote changes
4. get remote changes of github
5. create a new branch and switch to it
6. check if `package.json` exists; if absent run `bun init -y`
7. install dependencies (`bun install`)
8. ensure devDependencies include: `prettier`, `eslint`, `typescript`, `vitest`, `@playwright/test` — add missing with `bun add -D`
9. verify auth status of wrangler
10. verify auth status of github
11. verify availability of Codex via MCP; if unavailable output configuration instructions and stop
12. verify availability of Serena via MCP; if unavailable output configuration instructions and stop
13. read last 3 commit logs
14. `bun add github:tachiiri-org/cloude-ops`
15. classify repository role (front / bff / gateway / adapter)

## Constrains

- don't read application/source code files
- don't start development work
- don't use npm
