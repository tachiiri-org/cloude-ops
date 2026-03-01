# inspect command

## Goals

- make this repository less ambiguous for claude code
- reduce complexity and ambiguity of architecture and codes
- identify file tree misalignments with the system model
- flag possibilities for god files, classes, or utilities
- find lack of unit test
- divide each type, state, component by 1 file

## NOT Goals

- modify any code or files
- suggest adding docs (suggest modifying architecture or code instead)

## Constraints

- Work only from files already in the conversation context.
- Do not read, glob, or explore additional files.

## What to do

- write each issue to `issues/{yyyyMMdd_hhmmss}_{i}.md`
- 1 markdown file per issue

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
