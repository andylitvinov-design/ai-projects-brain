# Codex Project Workflow

## 1. Read context first

- Read `README.md`.
- Read `AGENTS.md` if present.
- Read `STATE.md` or `project-state.md` if present.
- Read `projects.md`.
- Read `projects.json`.
- Read `systems/agent-rules.md`.

## 1.1 Token-efficient context budget

Use the smallest context set that can safely identify the
project, production source, files, and verification path.

Required first-pass reads:

- `projects.md` project record.
- `projects.json` project record or memory map.
- Target `PROJECT.md` when the project is listed.
- Target repo `AGENTS.md`, `README.md`, and `STATE.md` when
  present.

Read only when needed:

- `LOG.md` for recent history or suspected repeated work.
- `SYSTEM_MAP.md` for runtime/deploy flow questions.
- `DATA_SCHEMA.md` for data, finance, import, or contract
  tasks.
- `CODEX_BRIEF.md` for fast task intake when present.
- Source files outside the listed important files only after
  a specific function, route, error, or search result points
  to them.

Do not read the whole repo before forming a scoped plan. If
more context is needed, state the exact missing question and
read only the next most relevant file.

Stop context reading when all are known:

- canonical repo and live/hosting target;
- production vs preview/local/deprecated status;
- concrete files or functions to inspect;
- narrow verification command or check;
- risks and `needs verification` items.

## 2. Identify target project

- Match by project name, URL, repo, live URL, or user
  wording.
- If the target is unclear, mark `needs verification`.
- If two repos or live targets are plausible, choose the
  canonical project record only when it is explicit; otherwise
  ask or mark `needs verification`.

## 3. Confirm production source

- Do not assume an old repo is still active.
- Verify repo URL and hosting.
- Distinguish production, preview, and local.
- If live behavior matters and live cannot be checked, do not
  claim it works; report `live verification not run`.

## 4. Plan minimal safe change

- Do not rewrite the whole project.
- Use the smallest safe fix.
- Preserve accepted UX and business logic.
- Name the exact files expected to change before editing.
- Name the files that must not change when the risk of scope
  creep is high.

## 5. Implement

- Branch -> commit -> PR where possible.
- Keep changes focused.
- Do not expose secrets.
- Keep unrelated formatting, renames, and refactors out of
  the task unless required.

## 6. Verify

- Run available tests.
- Run build.
- Run lint if available.
- Run project-specific guard scripts if listed.
- Check live URL only when relevant and possible.
- For docs-only changes, verify JSON validity when JSON was
  touched and check changed links or file references.
- If a check is skipped, say exactly why.

## 7. Report

Use a compact final report:

- Studied files.
- Changed files.
- What changed.
- Checks run.
- Risks.
- What still needs verification.
- STATE/LOG update status.
- Next action.

Avoid long narrative logs. Do not repeat command output unless
it contains the exact failing command, error, or proof needed
for the user.

## 8. Memory Update Loop

- Read current `STATE.md`.
- Summarize what changed.
- Propose `STATE.md` update.
- Append `LOG.md` entry.
- Mark uncertain items as `needs verification`.
- Ask user to confirm memory update if changes are
  significant.

## 9. Compact / handoff trigger

Before the session becomes long or repetitive, produce a short
handoff summary with:

- target project and canonical repo;
- files already read;
- files changed;
- checks already run;
- open risks and exact next command.

Do this instead of re-reading files or restating the full
history.
