---
name: setup-tool-bun
description: Ensure Bun package management and baseline Bun scripts are configured for Bun-managed repositories.
---

# setup-tool-bun command

## Workflow

1. Verify the repository is intended to use Bun
2. Ensure `package.json` exists
3. Ensure Bun is the package manager entrypoint for install and script execution
4. Ensure repository scripts assume `bun run` rather than npm

## Constraints

- Do not add runtime-specific assumptions
- Do not use npm
