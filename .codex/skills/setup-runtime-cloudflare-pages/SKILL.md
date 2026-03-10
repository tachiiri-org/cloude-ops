---
name: setup-runtime-cloudflare-pages
description: Bootstrap Cloudflare Pages runtime requirements and baseline tooling for repositories that run on Pages.
---

# setup-runtime-cloudflare-pages command

## Workflow

1. Read `profiles/runtime/cloudflare-pages.md`
2. Verify the repository is intended to run on Cloudflare Pages
3. Run `bootstrap-pages.sh [TARGET_REPO_PATH]`
4. Ensure baseline tooling and Pages runtime dependencies are present
5. Add only the minimal Pages runtime scaffold required by the consuming role bundle
6. Keep Pages features and bindings explicit rather than implied by Pages adoption
7. Run the repository's standard validation commands

## Composes With

- `setup-role-front`

## Constraints

- Do not embed frontend business logic into this runtime command
- Do not imply non-essential Pages features by runtime setup alone
- Do not use npm
