# electron.md

## Use Cases

- local filesystem, native shell, notifications, or tray integration are required
- credentials must be stored with desktop-grade secure storage rather than browser storage
- offline, local-processing, or device-integration behavior is required

## Constraints

- treat `renderer` as untrusted UI code relative to `preload` and `main`
- keep OS access in `main` or a tightly scoped `preload` API
- keep filesystem access in `main` or a tightly scoped `preload` API
- keep secure storage access in `main` or a tightly scoped `preload` API
- keep process spawning in `main` or a tightly scoped `preload` API
- keep IPC contracts explicit
- keep IPC contracts minimal
- keep IPC contracts versioned
- keep local Python behind explicit runtime-owned contracts
- keep native helpers behind explicit runtime-owned contracts
- do not allow renderer reach-through to local Python
- do not allow renderer reach-through to native helpers
- treat desktop credentials as non-browser credentials by default
- store refresh-capable credentials only in OS-backed secure storage or an equivalent hardened mechanism
- keep raw credentials out of renderer storage
- keep raw credentials out of local files
- keep raw credentials out of logs
- keep cloud-bound token exchange out of renderer-visible code paths
- keep cloud-bound token refresh out of renderer-visible code paths
- keep cloud-bound token revocation out of renderer-visible code paths
- fail closed when the required secure storage surface is unavailable for credential-bearing flows
- keep development build tooling separate from packaging tooling
- keep development build tooling separate from publishing tooling
- keep update channels explicit
- standardize update channels as `dev` and `stable` unless the repository explicitly documents a stricter scheme
- keep signing explicit
- keep artifact sources explicit
- do not assume a private traceability artifact store is automatically a readable updater feed for packaged clients
- keep packaging configuration aligned with release and rollback rules
- keep auto-update configuration aligned with release and rollback rules
- keep production behavior explicit by branch or environment
- keep prerelease behavior explicit by branch or environment
- prefer merge-triggered publication workflows:
  - merge to `dev` publishes prerelease artifacts for channel `dev`
  - merge to `main` publishes release artifacts for channel `stable`
- keep the running application configured by trusted channel metadata rather than by reading Git branch state
- expose runtime and channel identity to `renderer` only through a narrow preload-owned surface suitable for diagnostics and smoke verification
- verify update readiness in addition to launch readiness when the repository adopts channel publication
- verify channel-specific updater metadata and artifact publication outputs explicitly rather than assuming publication correctness from build success alone
- if updater metadata is served from a public feed surface such as GitHub Pages, account for feed publication races and host-side file-size limits in the baseline design
- treat Electron setup as incomplete until both developer and production update channels have been verified explicitly
- treat feed readability alone as insufficient; require an explicit older-to-newer packaged version transition such as `0.1.0 -> 0.1.1` when auto-update is part of setup completion
- keep a baseline renderer contract explicit enough to verify:
  - application identity
  - runtime identity
  - update channel
  - bootstrap failure state
- fail closed when signing material, trusted update configuration, or required updater metadata is unavailable
