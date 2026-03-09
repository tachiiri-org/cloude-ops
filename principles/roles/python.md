# python.md

- Local processing engine; called exclusively from Electron.
- Not exposed to network or gateway.
- Handle batch processing (video, image) and repo launcher tasks.
- Stream progress back to Electron via IPC/stdio.
- No UI logic; output is data or status only.
- Treat automated execution as service-style execution rather than human authorization context.
- Preserve initiator context for audit or progress attribution only when needed.
- Do not become a hidden policy or identity authority.
- Keep batch and replay-style processing idempotent and free of undeclared external effects.
