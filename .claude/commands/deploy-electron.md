
# deploy-electron command

## Goals

- Package and publish an Electron app to GitHub Releases

## Steps

1. Verify GitHub auth: `gh auth status`
2. Read version from `package.json`
3. Ensure release tag does not already exist:
   - Check `gh release view vX.Y.Z`
   - If exists, stop and bump version first
4. Run `bun run build` (type check + compile)
5. Run electron packaging:
   - Prefer `bun run dist` when available
   - If `dist` script is missing, run `bunx electron-builder --win nsis --config.win.signAndEditExecutable=false --config.nsis.differentialPackage=false`
   - If build fails with wine errors, install prereqs first:
     - `sudo dpkg --add-architecture i386`
     - `sudo apt-get update`
     - `sudo apt-get install -y wine64 wine32:i386`
6. Ensure updater metadata exists:
   - Require `dist/latest.yml`
   - If missing in first-release/WSL edge case, generate `latest.yml` from installer sha512 + size and version
7. Determine release type:
   - On `main` branch → stable release
   - Other branches → pre-release (draft)
8. Create GitHub Release with `gh release create vX.Y.Z`
   - Add `--prerelease` flag if not on main
9. Upload built artifacts to the release:
   - Always upload installer artifact(s) for the target platform
   - Always upload `latest*.yml` metadata that matches uploaded installer(s)
10. Output release URL

## Constraints

- Do not deploy to prod from non-main branches (use --prerelease)
- Do not use npm
