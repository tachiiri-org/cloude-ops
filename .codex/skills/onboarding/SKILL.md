---
name: onboarding
description: "Understand the repository, load the minimum guidance for the intended work, and prepare a safe git baseline for follow-up commands."
---

# onboarding command

## Terms

- Required Documents: `principles/`, `profiles/`, `architecture.mmd`, `CLAUDE.md`, and `AGENTS.md` available from the shared guidance root at `/home/tachiiri/.guide`
- Required Reads: `architecture.mmd` and the instruction file for the current agent (`CLAUDE.md` for Claude, `AGENTS.md` for Codex)

## Goals

- understand how to behave in this repository
- ensure Required Documents are available from the shared guidance root at `/home/tachiiri/.guide`
- read Required Reads before reading code or making workflow decisions
- classify the repository role and runtime
- understand the expected git workflow, including `dev` as the baseline branch and feature work on branches derived from it
- load only the minimum guidance required for the stated goal
- inspect the git state and prepare a safe baseline for follow-up commands when possible

## Constraints

- don't read code before the guidance and workflow context is loaded
- don't overwrite repo-local guidance files blindly
- don't change application code
- don't install tools or use npm
- stop after onboarding; do not start setup, implementation, deploy, PR, or release work
- run each Bash command separately, not as compound commands (e.g. `&&`)

## Hints

- use the shared guidance root at `/home/tachiiri/.guide` as the default source of Required Documents
- classify role from architecture and explicit repo-local evidence
- classify runtime from explicit repo-local adoption, concrete runtime files, and role defaults
- read only the domain and profile documents that directly constrain the stated goal
- read adopted tool profiles only when the repository explicitly uses that tooling or framework
- always read `architecture.mmd`
- always read the instruction file for the current agent
- fetch remote refs before evaluating branch alignment
- in sandboxed environments, run remote Git operations with escalated permissions from the start
- ensure `dev` exists; create it if missing
- if the tree is clean and `dev` is only behind its remote, fast-forward it
- if the tree is dirty or the branch is diverged, do not auto-resolve; report the state instead
- if already on an active feature branch, preserve it and report the decision point: continue there or prepare a PR first

## Output

Return:

- Required Documents status
- Required Reads completed
- classified role and runtime
- user goal
- current branch, working tree state, and remote sync state
- whether `dev` is ready, created, initialized, or not normalized
- which guidance was loaded
- key constraints for the intended work
- the next recommended command(s)
