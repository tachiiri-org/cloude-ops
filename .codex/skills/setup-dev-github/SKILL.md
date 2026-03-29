---
name: setup-dev-github
description: Bootstrap GitHub development-platform state for a new repository, including remote creation and branch initialization.
---

# setup-dev-github command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Terms

- Target Directory: the local repository root the user wants to bootstrap on GitHub
- Repository Name: the basename of the Target Directory unless the user explicitly overrides it

## Goals

- bootstrap GitHub development-platform state for a repository that may not yet be initialized on GitHub
- support Target Directories that may not yet be initialized as local Git repositories
- create or reconcile the GitHub repository using the Repository Name by default
- ensure `origin` points at the created or selected GitHub repository
- ensure `main` exists locally and remotely as the bootstrap branch
- ensure `dev` exists locally and remotely from `main`
- normalize local and remote branch state so follow-up setup commands can assume the standard baseline
- keep this workflow limited to repository bootstrap rather than policy or application setup

## Constraints

- do not mix application scaffold with GitHub repository bootstrap
- do not create provider-integration configuration here
- do not modify ongoing branch protection, required checks, or auto-merge policy here
- do not use this command as the steady-state GitHub policy reconciler
- do not push directly to `main` after the initial bootstrap commit and branch publication
- do not overwrite an existing remote, branch history, or dirty working tree without reporting the decision point
- run each shell command separately, not as compound commands (e.g. `&&`)

## Hints

- read `principles.md` before repository bootstrap decisions
- read `roles/ops.md` when bootstrapping shared guidance or automation repositories
- read only the minimum additional guidance needed for the repository role and stated goal
- verify the Target Directory exists before any Git or GitHub operation
- inspect the repository file tree with `git ls-files` when the repository already has Git metadata and with visible non-ignored files when it does not
- if the Target Directory sits under another Git repository, verify the actual repo root before interpreting `git status`, `git remote`, or branch output
- if `.git` is missing, initialize the repository locally before any GitHub remote setup
- if the Target Directory is intended to be its own repository, initialize Git inside that directory rather than reusing a parent repository by accident
- if the repository has no commits yet, create the initial bootstrap commit from the existing local contents before pushing branches
- if the directory is effectively empty apart from local agent metadata, ignore that metadata first and then create the minimal bootstrap commit
- use the Target Directory basename as the Repository Name unless the user explicitly requests a different remote name
- verify GitHub auth status before attempting repository creation
- create the GitHub repository when `origin` is absent and no matching remote repository is already configured
- if `origin` exists, verify whether it already matches the intended Repository Name before changing it, and confirm the current remote is not inherited from a parent repository
- ensure the local default branch is `main`
- create `dev` from `main` after `main` is established
- push `main` first when the remote repository is empty, then push `dev`
- if remote branches already exist, reconcile to them without rewriting history
- if the working tree is dirty, the local branch is diverged, or the remote target is ambiguous, report the state instead of auto-resolving it

## Output

Return:

- target directory and repository name used for bootstrap
- whether local Git initialization was already present or was created
- whether the GitHub repository was already present or was created
- `origin` remote status after reconciliation
- current branch, working tree state, and local/remote sync state
- whether `main` and `dev` are ready locally and remotely
- which guidance was loaded
- any decision points or follow-up constraints for later setup commands
