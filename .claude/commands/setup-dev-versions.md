# setup-dev-versions command

## Purpose

- Maintain the agent-ops recommended version baseline.
- Keep the tool profiles under `/home/tachiiri/project/.guide/tools/` aligned with the currently approved tool and version baseline.
- Update materialized templates after the approved baseline changes.

## Workflow

1. Read `governance/operations.md`
2. Read `compatibility/change.md`
3. Verify the current repository is the ops repository
4. Read the relevant tool profiles under `/home/tachiiri/project/.guide/tools/`
5. Check the latest approved versions from primary upstream sources for the owned toolchain:
   - TypeScript toolchain packages
   - Cloudflare `wrangler`
6. Update the relevant files under `/home/tachiiri/project/.guide/tools/` only after confirming the new versions are the intended baseline
7. Update any materialized templates that must stay in sync with the shared baseline:
   - `package.template.json`
   - setup modules or templates that materialize the selected tool versions
8. Run the repository's validation commands relevant to the touched files
9. Summarize the baseline changes and any downstream repos that will need reconciliation

## Constraints

- Use primary upstream sources only when checking versions
- Treat the matching files under `tools/` as the source of truth for ordinary setup runs
- Do not change application repositories directly from this command
- Do not auto-merge or deploy
