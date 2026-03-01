# refactor Command

## Goals

- make this repository less inference for claude code
- reduce complexity of architecture and codes
- modify file tree to direct projection of the system model.
- erase possibility for god files, classes, utility

## NOT Goals

- modify codes in this command
- suggest to add docs(should suggest to modify architecture or codes)

## Constraints

- Work only from files already in the conversation context.
- Do not read, glob, or explore additional files.

## What to do

- write how to modify in `refactor/{yyyyMMdd_hhmmss}_{i}.md`
- 1 markdown file should have 1 issue

## Output Format

```

# Suggestion

## What confused

-

## Caused by

-

## How should be

-

## How to refactor
```
