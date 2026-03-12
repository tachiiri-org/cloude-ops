---
name: setup-dev-github
description: Bootstrap GitHub development-platform state for a new repository, including remote creation and branch initialization.
---

# setup-dev-github command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Workflow

1. Read `principles/core.md`
2. Read `principles/roles/ops.md`
3. Read `principles/domains/ops-governance.md`
4. Verify the target directory exists locally
5. Verify working tree is clean
6. Verify GitHub auth status
7. Create the remote repository on GitHub
8. Add or update the `origin` remote
9. Ensure `main` exists locally and remotely
10. Ensure `dev` exists off `main`
11. Push initial branches as needed
12. Confirm the repository is ready for role-, runtime-, idp-, and provider-setup modules
13. Do not modify ongoing branch protection, required checks, or auto-merge policy here; role setup owns that reconciliation after bootstrap

## Constraints

- Do not mix application scaffold with GitHub repository bootstrap
- Do not create provider-integration configuration here
- Do not push directly to `main` after initial repository bootstrap
- Do not use this command as the steady-state GitHub policy reconciler
