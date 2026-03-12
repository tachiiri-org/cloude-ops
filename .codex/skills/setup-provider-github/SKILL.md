---
name: setup-provider-github
description: Add GitHub provider setup guidance and boundary-specific scaffolding for adapter repositories that directly integrate with GitHub.
---

# setup-provider-github command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Workflow

1. Read `profiles/providers/github.md`
2. Read `principles/roles/adapter.md`
3. Read `principles/domains/interaction-edges.md`
4. Read `principles/domains/operations-and-delivery.md`
5. Verify the repository directly integrates with GitHub at the adapter boundary
6. Stop with an explanation if the repository does not directly integrate with GitHub
7. Add only the minimal GitHub-related scaffolding and placeholders required for the adapter boundary
8. Run the repository's standard validation commands
9. Commit the setup changes

## Constraints

- Do not apply outside repositories that directly integrate with GitHub
- Do not treat development-platform bootstrap as provider integration
- Do not add provider values into shared `principles/`
- Do not use npm
