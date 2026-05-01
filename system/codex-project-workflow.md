# Codex Project Workflow

Use this workflow when Codex works on any project listed in `projects.md` or
`projects.json`.

## 1. Context First

- Read `projects.md`.
- Use `projects.json` for structured lookup and raw file discovery.
- Read `systems/agent-rules.md`.
- Read the target repo's `AGENTS.md`, `README.md`, `STATE.md`, and project log when present.
- Confirm the canonical repo and target environment before editing.
- If anything is uncertain, write `needs verification`.

## 2. Project Memory First

- Treat `STATE.md` as current human-readable memory when it exists.
- Treat `projects.json` as the machine-readable index, not the full source of truth.
- Use project logs for dated decisions and previous verification evidence.
- Prefer fresh repo and provider checks over stale memory.

## 3. Safe Change

- Check git status before editing.
- Do not mix unrelated dirty worktree changes into the task.
- Use a branch, temp clone, or worktree when needed.
- Make the smallest change that solves the requested problem.
- Preserve public routes, raw links, APIs, data contracts, and deployment targets unless explicitly asked to change them.

## 4. Production Awareness

- Distinguish local, preview, and production.
- Do not deploy to production unless the task requires it and the repo rules allow it.
- For integrations, separate `code path exists`, `credentials configured`, and `live sync verified`.
- Record exact deploy IDs, aliases, PRs, or commit hashes when available.

## 5. Secrets Safety

- Report environment variable names only.
- Never print or store secret values.
- If a secret is missing, say which env name is missing and where it must be configured.

## 6. Verification

- Run the narrowest meaningful check first.
- Keep `projects.json` valid JSON after edits.
- Verify README raw links when changing file paths.
- For docs-only changes, validate links, JSON, and references.
- Report checks that were not run instead of implying they passed.

## 7. Reporting

Final reports should include:

- changed files
- what was added or changed
- how the memory system now works
- checks performed
- risks
- next steps
