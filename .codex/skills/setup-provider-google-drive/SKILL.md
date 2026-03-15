---
name: setup-provider-google-drive
description: Add Google Drive provider setup guidance and boundary-specific scaffolding for adapter repositories that directly integrate with Google Drive.
---

# setup-provider-google-drive command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Workflow

1. Read `profiles/providers/google-drive.md`
2. Read `principles/roles/adapter.md`
3. Read only the relevant shared data guidance under `data/`, especially `classification.md`, `persistence.md`, `deletion.md`, and `residency.md`
4. Read `principles/domains/operations-and-delivery.md`
5. Verify the repository directly integrates with Google Drive at the adapter boundary
6. Stop with an explanation if the repository does not directly integrate with Google Drive
7. Add only the minimal Google Drive-related scaffolding and placeholders required for the adapter boundary
8. Run the repository's standard validation commands
9. Commit the setup changes

## Constraints

- Do not apply outside repositories that directly integrate with Google Drive
- Do not add provider values into shared `principles/`
- Do not use npm
