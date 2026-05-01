# Codex Project Workflow

## 1. Read context first

- Read `README.md`.
- Read `AGENTS.md` if present.
- Read `STATE.md` or `project-state.md` if present.
- Read `projects.md`.
- Read `projects.json`.
- Read `systems/agent-rules.md`.

## 2. Identify target project

- Match by project name, URL, repo, live URL, or user
  wording.
- If the target is unclear, mark `needs verification`.

## 3. Confirm production source

- Do not assume an old repo is still active.
- Verify repo URL and hosting.
- Distinguish production, preview, and local.

## 4. Plan minimal safe change

- Do not rewrite the whole project.
- Use the smallest safe fix.
- Preserve accepted UX and business logic.

## 5. Implement

- Branch -> commit -> PR where possible.
- Keep changes focused.
- Do not expose secrets.

## 6. Verify

- Run available tests.
- Run build.
- Run lint if available.
- Run project-specific guard scripts if listed.
- Check live URL only when relevant and possible.

## 7. Report

- Changed files.
- What changed.
- Checks run.
- Risks.
- What still needs verification.
- Next action.

## 8. Memory Update Loop

- Read current `STATE.md`.
- Summarize what changed.
- Propose `STATE.md` update.
- Append `LOG.md` entry.
- Mark uncertain items as `needs verification`.
- Ask user to confirm memory update if changes are
  significant.
