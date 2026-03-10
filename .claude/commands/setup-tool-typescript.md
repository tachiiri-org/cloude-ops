# setup-tool-typescript command

## Workflow

1. Verify the repository is intended to use TypeScript
2. Ensure `typescript` is configured
3. Ensure `tsconfig` and a baseline `tsc --noEmit` typecheck path exist
4. Ensure repository scripts expose typecheck consistently

## Constraints

- Do not add runtime-specific tsconfig assumptions unless required by the consuming runtime module
