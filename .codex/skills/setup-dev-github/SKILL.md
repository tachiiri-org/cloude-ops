---
name: setup-dev-github
description: Bootstrap GitHub development-platform state for a new repository, including remote creation and branch initialization.
---

# setup-dev-github command

## Workflow

1. Verify the target directory exists locally
2. Verify working tree is clean
3. Verify GitHub auth status
4. Create the remote repository on GitHub
5. Add or update the `origin` remote
6. Ensure `main` exists locally and remotely
7. Ensure `dev` exists off `main`
8. Push initial branches as needed
9. Confirm the repository is ready for role-, runtime-, idp-, and provider-setup modules

## Constraints

- Do not mix application scaffold with GitHub repository bootstrap
- Do not create provider-integration configuration here
- Do not push directly to `main` after initial repository bootstrap
