# python.md

- Local processing engine; called exclusively from Electron.
- Not exposed to network or gateway.
- Handle batch processing (video, image) and repo launcher tasks.
- Stream progress back to Electron via IPC/stdio.
- No UI logic; output is data or status only.
