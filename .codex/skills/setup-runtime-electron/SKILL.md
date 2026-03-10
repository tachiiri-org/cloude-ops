---
name: setup-runtime-electron
description: Bootstrap Electron runtime requirements and baseline tooling for repositories that run as Electron applications.
---

# setup-runtime-electron command

## Workflow

1. Read `profiles/runtime/electron.md`
2. Verify the repository is intended to run as an Electron application
3. Run `bootstrap-electron.sh [TARGET_REPO_PATH]`
4. Ensure baseline tooling and Electron runtime dependencies are present
5. Add only the minimal Electron runtime scaffold required by the consuming role bundle
6. Keep update, packaging, and signing settings explicit rather than implied by Electron adoption
7. Run the repository's standard validation commands

## Composes With

- `setup-role-electron`

## Constraints

- Do not embed application-specific behavior into this runtime command
- Do not imply provider or update-channel choices by runtime setup alone
- Do not use npm
