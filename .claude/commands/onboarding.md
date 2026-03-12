# onboarding command

## Guidance Files

SOT is at `/home/tachiiri`.

- `.guide/`: docs of principles, profile and etc
- `AGENTS.md`: project-wide agent defaults and constraints
- `CLAUDE.md`: behavioral constraints for this repository
- `architecture.mmd`: system topology
- `tools.md`: default tools and version

## Goal

- Guidance Files in repo root are synced with SOT
- Read guidance files.
- Repository role and runtime are classified.
- Read related documents of the role, runtime, domain, and profile.
- Working tree is clean and `dev` is aligned with `origin/dev`.
- Ask Human's goal.

## Hints

- Fetch remote refs before branch decisions; fast-forward `dev` to `origin/dev` if behind.
- Classify role and runtime from `architecture.mmd` and repo-local signals.
- In a sandboxed environment, run remote git commands with escalated permissions from the start; do not retry after a network-resolution failure.

## Constraints

- Run each shell command separately; do not chain with `&&`.
- Do not change code.
- Do not read unrelated role, runtime, domain, and profile documents.
- Do not run authentication checks or install tools.
- Do not implement, setup, deploy, or release.

## Output Format

- Status of guidance files at repo root
- Classified role and runtime
- What docs read
- Working tree and branch status
