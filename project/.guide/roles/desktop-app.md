# desktop-app.md

## Roles

- Let the renderer process follow front principles.
- Let the main process act as a local BFF.
- Let the main process own OS management.
- Let the main process own file management.
- Let the main process own window management.
- Route cloud API calls through Cloudflare Gateway.
- Route local processing tasks to Python through IPC.

## Qualities

- Keep renderer concern roots explicit when the desktop app carries a reusable shell baseline.
- Let `contract` define renderer-facing semantics rather than absorb implementation helpers.
- Let `state` assemble screen state and selection state rather than own rendering or persistence side effects.
- Let `layout` describe static structure and static CSS targets rather than runtime measurement or adaptive placement logic.
- Let `component` render reusable shell fragments rather than orchestrate full screens.
- Let `screen` compose application-facing surfaces from layout, component, and state.
- Let `interaction` own user-flow interpretation and UI transitions rather than layout geometry or DOM structure.
- Let `bff` translate repository-local policy and runtime-owned data into renderer-facing inputs rather than call cloud APIs directly.

## Constraints

- Keep Python out of the renderer.
- Mediate Python through the main process.
- Define whether the desktop app supports auto-update.
- Do not leave update posture implicit.
- Prefer explicit prerelease and release update channels rather than one mixed desktop feed.
- Prefer merge-triggered publication to branch-specific artifact channels:
  - merge to `dev` -> prerelease developer channel
  - merge to `main` -> stable release channel
- Keep runtime channel identity explicit in desktop-owned metadata rather than deriving it from Git state at runtime.
- Run a desktop-app smoke check when user-visible UI behavior changes.
- Define whether scripted visual checks are required for the repository.
- Define whether scripted UI checks are required for the repository.
- Do not leave UI verification posture implicit.
- Keep a minimal baseline UI contract explicit enough for smoke verification.
