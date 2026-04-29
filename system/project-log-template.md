# Project Log Template

Use this template for a project's chronological memory, usually as `LOG.md` or
`docs/project-log.md` inside the project repo.

## Log Entry Format

### YYYY-MM-DD - Short Title

- **actor:** ChatGPT, Codex, human, or needs verification
- **scope:** needs verification
- **reason:** needs verification
- **files changed:** needs verification
- **commands run:** needs verification
- **verification:** needs verification
- **deploy/PR/commit:** needs verification
- **result:** needs verification
- **risks:** needs verification
- **next actions:** needs verification

## Rules

- Keep entries factual and dated.
- Include exact commands when they matter.
- Include PR URLs, commit hashes, deployment IDs, and live URLs when known.
- Do not paste long logs; summarize and keep the exact failing command.
- Never include secret values.
- Use `needs verification` for unknown or stale facts.

## Example

### 2026-04-29 - Provider Sync Verification

- **actor:** Codex
- **scope:** finance provider sync
- **reason:** verify live provider route after deploy
- **files changed:** none
- **commands run:** `curl ...`, `npm test`
- **verification:** local tests passed; live credentials need verification
- **deploy/PR/commit:** needs verification
- **result:** code path exists; live sync not fully verified
- **risks:** provider credentials may be missing in production
- **next actions:** verify provider dashboard env names and run live sync check
