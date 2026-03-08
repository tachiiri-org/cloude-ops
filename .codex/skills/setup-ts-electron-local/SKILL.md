---
name: setup-ts-electron-local
description: Bootstrap an Electron local app repository with updater-ready packaging scaffold.
---

# setup-electron command

## Goals

1. Run `bootstrap-electron.sh [TARGET_REPO_PATH]`
2. Read CLAUDE.md
3. Verify working tree is clean
4. Ensure `main` branch exists; ensure `dev` branch exists off `main` (create if not); switch to `dev`; create a feature branch off `dev` and switch to it
5. Verify auth status of GitHub
6. Verify availability of Codex via MCP
7. Verify availability of Serena via MCP; if unavailable output configuration instructions and stop; if available call `activate_project` with the current repository path
8. Call `activate_project` of Serena with the current repository path
9. Scaffold a minimal Electron app: `src/main.ts` (main process) and `src/renderer/index.html` that opens a window displaying "Hello World"
10. Add auto-update scaffolding to `src/main.ts`:
    - Import `autoUpdater` from `electron-updater`
    - On `app.ready`: call `autoUpdater.checkForUpdatesAndNotify()`
    - Handle `update-available` and `update-downloaded` events
11. Add publish config to `package.json`:
    ```json
    "build": {
      "publish": [{ "provider": "github" }]
    }
    ```
12. Add `"dist": "electron-builder"` to scripts in `package.json`
13. Run `tsc --noEmit` and confirm it passes
14. Run `bun run start` and confirm the window opens
15. Commit the scaffold

## Memo

`bootstrap-electron.sh [TARGET_REPO_PATH]` performs:

- Git fetch on the current branch
- Copies `package.template.json` if `package.json` is missing, then runs `bun init -y`
- Runs `bun install`
- Adds devDependencies: `prettier`, `eslint`, `typescript`, `vitest`, `electron`, `electron-builder`, `electron-updater`
- Adds `github:tachiiri-org/cloude-ops` package

## Constraints

- Don't read application/source code files before scaffold
- Don't implement application features beyond opening a window
- Don't use npm
