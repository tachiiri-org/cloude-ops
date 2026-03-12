---
name: deploy-electron
description: Package and publish an Electron app to GitHub Releases with branch-aware prerelease handling.
---

# deploy-electron command

Shared guidance reads in this workflow refer to files under `/home/tachiiri/.guide/`.

## Steps

1. Read `principles/domains/ops-governance.md`
2. Read `principles/domains/compatibility-and-change.md`
3. Read `principles/roles/electron.md`
4. Read `profiles/runtime/electron.md`
5. Verify GitHub auth: `gh auth status`
6. Read version from `package.json`
7. Ensure release tag does not already exist:
   - Check `gh release view vX.Y.Z`
   - If exists, stop and bump version first
8. Run `bun run build` (type check + compile)
9. Run electron packaging:
   - Prefer `bun run dist` when available
   - If `dist` script is missing, run `bunx electron-builder --win nsis --config.win.signAndEditExecutable=false --config.nsis.differentialPackage=false`
   - If build fails with wine errors, install prereqs first:
     - `sudo dpkg --add-architecture i386`
     - `sudo apt-get update`
     - `sudo apt-get install -y wine64 wine32:i386`
10. Ensure updater metadata exists:
   - Require `dist/latest.yml`
   - If missing in first-release/WSL edge case, generate `latest.yml` from installer sha512 + size and version
11. Determine release type:
   - On `main` branch → stable release
   - Other branches → pre-release (draft)
12. Create GitHub Release with `gh release create vX.Y.Z`
   - Add `--prerelease` flag if not on main
13. Upload built artifacts to the release:
   - Always upload installer artifact(s) for the target platform
   - Always upload `latest*.yml` metadata that matches uploaded installer(s)
14. Output release URL

## Constraints

- Do not deploy to prod from non-main branches (use --prerelease)
- Do not use npm
