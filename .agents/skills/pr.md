# pr command

## Goals

- create .gitignore if no .gitignore committed
- create and switch to feature branch if on `main` or `dev`
- stage unstaged files
- commit with detailed change description
- push branch to remote
- create PR targeting `dev` and tell url
- if project is a TS Worker (wrangler.toml or wrangler.jsonc exists): run `bun run deploy:dev` and output URL

## Constraints

- don't commit with no .gitignore
- don't push to main branch directly
- don't push to dev branch directly
