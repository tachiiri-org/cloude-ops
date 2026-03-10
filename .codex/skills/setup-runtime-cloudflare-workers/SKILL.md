---
name: setup-runtime-cloudflare-workers
description: Bootstrap Cloudflare Workers runtime requirements and baseline tooling for repositories that run on Workers.
---

# setup-runtime-cloudflare-workers command

## Purpose

- Preferred runtime-module name for Workers setup under the `setup-<axis>-<name>` taxonomy.
- Owns Workers-specific bootstrap and baseline runtime tooling.
- Composes with role bundles such as BFF, gateway, and adapter.

## Workflow

1. Read `profiles/runtime/cloudflare-workers.md`
2. Verify the repository is intended to run on Cloudflare Workers
3. Run `bootstrap-worker.sh [TARGET_REPO_PATH]`
4. Ensure baseline tooling and Worker runtime dependencies are present
5. Add only the minimal Worker runtime scaffold required by the consuming role bundle
6. Keep Cloudflare-native service selection explicit rather than implied by Workers adoption
7. Run the repository's standard validation commands

## Composes With

- `setup-role-bff`
- `setup-role-gateway`
- `setup-role-adapter`

## Constraints

- Do not embed BFF-, gateway-, or adapter-specific behavior into this runtime command
- Do not imply adoption of D1, KV, R2, Queues, Durable Objects, or Workflows by Workers setup alone
- Do not use npm
