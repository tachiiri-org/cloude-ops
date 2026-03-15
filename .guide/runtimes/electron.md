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
- keep signing explicit
- keep artifact sources explicit
- keep packaging configuration aligned with release and rollback rules
- keep auto-update configuration aligned with release and rollback rules
- keep production behavior explicit by branch or environment
- keep prerelease behavior explicit by branch or environment
- fail closed when signing material, trusted update configuration, or required updater metadata is unavailable
