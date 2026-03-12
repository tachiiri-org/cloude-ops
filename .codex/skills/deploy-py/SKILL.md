---
name: deploy-py
description: Build a Python wheel, upload release artifacts to R2, and publish latest.json metadata.
---

# deploy-py command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Steps

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. Read `principles/roles/python.md`
4. Verify `wrangler` is available and authenticated (`wrangler whoami`)
5. Read project `name` and `version` from `pyproject.toml`
6. Read `public_url` from `[tool.release]` in `pyproject.toml`; stop with instructions if empty
7. Run `uv build` and confirm it produces a wheel in `dist/`
8. Upload wheel to R2: `wrangler r2 object put tachiiri-releases/{name}-{version}.whl --file dist/{name}-{version}.whl`
9. Create `latest.json`: `{ "version": "{version}", "url": "{public_url}/{name}-{version}.whl" }`
10. Upload `latest.json` to R2: `wrangler r2 object put tachiiri-releases/{name}/latest.json --file latest.json`
11. Output the public wheel URL and `latest.json` URL

## Constraints

- Don't deploy from `main` branch
- Don't use pip directly; use `uv` for build
- Don't deploy to production Cloudflare Workers
- Don't push directly to main
