---
name: setup-runtime-python
description: Reconcile Python local-engine runtime requirements and delivery automation for repositories that run on Python.
---

# setup-runtime-python command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/project/.guide/`.

## Goal

- Reconcile the repository to the Python runtime baseline defined by shared guidance.
- Use the matching Python tool profiles under `/home/tachiiri/project/.guide/tools/` as the authority for required Python tooling.
- Reach a state where the required runtime files, validation workflow, and Python tool surface are present without relying on bootstrap scripts.

## Tool Modules

- Required:
  - `setup-tool-uv`
  - `setup-tool-ruff`
  - `setup-tool-pyright`
  - `setup-tool-pytest`

## Workflow

1. Read `hosts/ubuntu.md`
2. Read `languages/python.md`
3. Verify the repository is intended to run as a Python local engine
4. Inspect Python runtime state as `present`, `missing`, or `drifted`
5. Reconcile required runtime files directly from the tracked templates when files or workflows are missing or safely drifted
6. Apply the required tool modules listed above and collect their reported status
7. Ensure `.github/workflows/validate-pr.yml` exists and emits the `validate-python` check on pull requests to `dev`
8. Ensure the validation workflow runs the Python validation surface selected in the matching files under `/home/tachiiri/project/.guide/tools/`
9. Reconcile GitHub repository policy for this runtime when safe:
   - ensure the repository is PR-based
   - ensure repo auto-merge is enabled
   - ensure `dev` branch protection requires the `validate-python` check
10. Report `auto_merge_ready` only when the workflow files and GitHub policy are aligned
11. Report any unsafe drift that should not be overwritten automatically
12. Run the repository's standard validation commands

## Applies To

- repositories adopting the Python runtime

## Constraints

- Do not embed Python-engine business logic into this runtime command
- Do not treat tool setup as a substitute for runtime-owned merge-gate policy
- Do not use pip directly; use `uv`
- Do not rely on bootstrap scripts; reconcile from the relevant files under `tools/` and tracked templates directly
- Treat this command as an internal setup module that may be called repeatedly
