# python.md

Python local-engine runtime profile for repositories and services that run local processing or launcher workloads on Python.

## Scope

- Python runtime and environment constraints for local engines
- process and dependency expectations tied to local Python execution
- concrete CI and validation expectations shared by Python engine repositories

## Applies When

- A repository role runs as a local Python engine.
- A repository uses `uv`, `ruff`, `pyright`, and `pytest` as its standard validation surface.

## Baseline

- Keep role responsibilities in `../../principles/roles/python.md`.
- Keep runtime-owned delivery policy in `../../principles/runtime/python.md`.
- Use this profile only for Python-runtime-specific concrete constraints.

## Runtime Constraints

- Keep Python execution local-service style rather than browser- or network-edge style.
- Keep virtual-environment management explicit through `uv`.
- Keep entrypoints, package layout, and tool configuration explicit rather than inferred from incidental file layout.

## Delivery Constraints

- Keep the validation workflow responsible for Ruff format check, Ruff lint, `pyright`, and `pytest`.
- Keep `dev` merge-gate policy aligned with the runtime-owned `validate-python` check.
- Do not treat ad hoc local execution as the repository's authoritative validation surface.

## Repo-local Requirements

- Each repository or shared concrete spec that adopts this profile must define:
  - launcher and entrypoint behavior
  - package import root
  - Python version baseline
  - local-engine dependency surface

## Non-goals

- UI responsibilities
- cloud-edge delivery semantics
- provider-specific integration policy
