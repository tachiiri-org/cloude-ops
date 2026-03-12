---
name: setup-dev-versions
description: Refresh the stored recommended dependency versions that role and runtime setup workflows reconcile against.
---

# setup-dev-versions command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Purpose

- Maintain the agent-ops recommended version baseline.
- Keep `/home/tachiiri/.guide/tools.md` aligned with the currently approved tool and version baseline.
- Update materialized templates after the approved baseline changes.

## Workflow

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. Verify the current repository is the ops repository
4. Read `/home/tachiiri/.guide/tools.md`
5. Check the latest approved versions from primary upstream sources for the owned toolchain:
   - TypeScript toolchain packages
   - Cloudflare `wrangler`
6. Update `/home/tachiiri/.guide/tools.md` only after confirming the new versions are the intended baseline
7. Update any materialized templates that must stay in sync with the shared baseline:
   - `package.template.json`
   - setup modules or templates that materialize the selected tool versions
8. Run the repository's validation commands relevant to the touched files
9. Summarize the baseline changes and any downstream repos that will need reconciliation

## Constraints

- Use primary upstream sources only when checking versions
- Treat `tools.md` as the source of truth for ordinary setup runs
- Do not change application repositories directly from this command
- Do not auto-merge or deploy
