---
name: setup-py-engine-local
description: Bootstrap a Python local engine repository with uv tooling, release metadata scaffold, and initial launcher/engine structure.
---

# setup-python command

## Goals

1. Run `bootstrap-python.sh [TARGET_REPO_PATH]`
2. Read CLAUDE.md
3. Verify working tree is clean
4. Ensure `main` branch exists; ensure `dev` branch exists off `main` (create if not); switch to `dev`; create a feature branch off `dev` and switch to it
5. Verify auth status of GitHub
6. Verify `uv` is installed and `.venv` exists
7. Verify availability of Codex via MCP
8. Verify availability of Serena via MCP; if unavailable output configuration instructions and stop; if available call `activate_project` with the current repository path
9. Call `activate_project` of Serena with the current repository path
10. Add `[tool.release]` section to `pyproject.toml`:
    ```toml
    [tool.release]
    bucket = "tachiiri-releases"
    public_url = ""
    ```
    Instruct human to fill in `public_url` after enabling public access on the R2 bucket
11. Scaffold the 2-layer structure:
    - `launcher.py` — fetches `{public_url}/{name}/latest.json`, compares with installed version via `importlib.metadata.version`, installs updated wheel with `uv pip install {url}` if newer, then launches the engine as a subprocess; exits after engine exits
    - `src/{name}/__init__.py` — empty
    - `src/{name}/__main__.py` — entry point (prints "engine started" for now)
12. Add `httpx` as a dependency: `uv add httpx`
13. Add scripts to `pyproject.toml`:
    ```toml
    [project.scripts]
    engine = "{name}.__main__:main"
    ```
14. Run `pyright` and confirm it passes
15. Run `pytest` and confirm it passes
16. Commit the scaffold
17. Create a pull request targeting `dev`

## Memo

`bootstrap-python.sh [TARGET_REPO_PATH]` performs:

- Git fetch on the current branch
- Installs `uv` if not present (`~/.local/bin/uv`)
- Creates `.venv` with `uv venv` if missing
- Adds dev dependencies: `ruff`, `pyright`, `pytest`
- Syncs dependencies with `uv sync`

## Constraints

- Don't read application/source code files
- Don't start development work
- Don't use pip directly; use `uv` for all package operations
