# onboarding command

Understand the repository structure without starting development work.
Assumes authentication and environment setup are already complete.

## Goals

1. Read CLAUDE.md (and any project-specific instruction files if present)
2. Verify working tree is clean and show current status
3. Read last 10 commit logs
4. Use Serena via MCP to retrieve project structure and key symbols
5. Classify repository role (front / bff / gateway / adapter)

## Constrains

- no authentication checks
- no tool installation
- don't start development work
- don't use npm
