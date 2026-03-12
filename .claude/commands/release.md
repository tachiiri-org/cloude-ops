# release command

## Steps

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. Verify current branch is `dev` (switch to dev if not)
4. Ensure `dev` is pushed to remote
5. Ensure there is an open PR from `dev` targeting `main`; create it only if it does not already exist
6. Output PR URL

## Constraints

- Don't deploy
- Don't push directly to main
- Don't merge; only ensure the PR exists
