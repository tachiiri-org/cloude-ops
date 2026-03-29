---
name: setup-runtime-ops
description: Reconcile ops runtime requirements and delivery automation for repositories that act as shared guidance and automation layers.
---

# setup-runtime-ops command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Workflow

1. Read `roles/ops.md`
3. Verify the repository is intended to act as an ops or shared-guidance repository
4. Inspect ops runtime state as `present`, `missing`, or `drifted`
5. Ensure `.github/workflows/validate-shared-ops.yml` exists and emits the `validate-shared-ops` check
6. Ensure the validation workflow covers tracked workflow templates, scripts, and shared configuration baselines
7. Reconcile GitHub repository policy for this runtime when safe:
   - ensure the repository is PR-based
   - ensure repo auto-merge is enabled
   - ensure `dev` branch protection requires the `validate-shared-ops` check
8. Report `auto_merge_ready` only when the workflow file and GitHub policy are aligned
9. Report any unsafe drift that should not be overwritten automatically
10. Run the repository's standard validation commands

## Applies To

- repositories adopting the ops runtime

## Constraints

- Do not move shared-guidance authoring concerns into this runtime command
- Do not create product-runtime deployment behavior here
- Do not use npm
- Treat this command as an internal setup module that may be called repeatedly
