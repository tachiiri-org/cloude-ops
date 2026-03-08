
# pr command

## Goals

- create .gitignore if no .gitignore committed
- create and switch to feature branch if on `main` or `dev`
- stage unstaged files
- commit with detailed change description
- push branch to remote
- create PR targeting `dev` and tell url
- if remote `dev` does not exist: create `dev` from `main` and push it, then create PR targeting `dev`
- if project is a TS Worker (wrangler.toml or wrangler.jsonc exists): run `bun run deploy:dev` and output URL

## Constraints

- don't commit with no .gitignore
- don't push to main branch directly
- don't push to dev branch directly
- exception: when remote `dev` is missing, creating `dev` from `main` and pushing `dev` is allowed only for branch bootstrapping
