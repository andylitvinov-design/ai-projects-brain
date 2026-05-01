# Project Memory Schema

This file defines the shared memory model for
projects listed in this repo. It is designed for
ChatGPT, Codex, and humans who need one compact
source of project context without exposing
secrets.

## Memory Roles

- `projects.md` is the human-readable project
  map.
- `projects.json` is the machine-readable
  project database.
- `project-state.md` or `STATE.md` is the
  current state of one project.
- `project-log.md` or `LOG.md` is the dated
  history of decisions and changes.
- `agent-rules.md` defines agent behavior and
  safety rules.

## Required Project Memory Fields

Each project memory record should include these
fields when known:

- `project name`
- `purpose`
- `live URL`
- `repo URL`
- `hosting`
- `production source`
- `current status`
- `important files`
- `env variable names`
- `known issues`
- `recent tasks`
- `next actions`
- `risks`
- `rules for Codex`
- `verification commands`
- `last verified date`
- `confidence level`
- `needs verification fields`

## Field Guidance

### project name

- Stable project identifier used in
  `projects.md`, `projects.json`, and local
  memory files.

### purpose

- Short description of what the project does.

### live URL

- Production URL when known.
- If multiple targets exist, distinguish
  production, preview, and local.
- If unknown, write `needs verification`.

### repo URL

- Canonical repository URL for active work.
- Do not assume an older or deprecated repo is
  still the production source.

### hosting

- Hosting platform and, when known, project/app
  name.
- Example shape: `Vercel project foo`,
  `Cloudflare Pages bar`,
  `GitHub repository only`.

### production source

- The exact active repo or subdirectory that
  drives production.
- If there is repo drift, old worktrees, or
  legacy mirrors, call that out.

### current status

- Current state in operational terms: active,
  archived, broken, partial, migration in
  progress, or `needs verification`.

### important files

- High-signal files, directories, scripts, docs,
  state files, or deploy config that agents
  should read first.

### env variable names

- Names only, never values.
- If the set is incomplete, include known names
  and mark the rest `needs verification`.

### known issues

- Current bugs, drift risks, infra gaps, auth
  issues, workflow traps, or places where agents
  often confuse sources of truth.

### recent tasks

- Recent important work with enough context to
  understand momentum.
- Use short factual bullets, not long
  narratives.

### next actions

- Concrete follow-up actions an agent or human
  can take next.

### risks

- What could break, what could be confused, or
  what must be preserved.

### rules for Codex

- Project-specific working rules, guardrails,
  and non-goals.

### verification commands

- The narrowest commands that should be run to
  verify docs, code, or deploy assumptions.
- If unknown, write `needs verification`.

### last verified date

- Use an exact date such as `2026-04-29`.
- If not known, write `needs verification`.

### confidence level

- Suggested values: `high`, `medium`, `low`.
- `high` means recently verified.
- `medium` means partially verified with some
  drift risk.
- `low` means inference-heavy or stale.

### needs verification fields

- Explicit list of fields or claims that are not
  confirmed yet.
- This keeps unknowns visible instead of mixing
  them with confirmed facts.

## Freshness Rules

- Unknown, stale, or inferred data must be
  marked `needs verification`.
- If a live URL, repo mapping, hosting project,
  or production source is not confirmed, do not
  present it as certain.
- Prefer dated evidence over memory-derived
  assumptions.

## Secret Safety

- Store environment variable names only.
- Never store real tokens, keys, cookies, client
  secrets, refresh tokens, or private credential
  values.

## Recommended Per-Project Files

- `project-state.md` or `STATE.md`
- `project-log.md` or `LOG.md`
- `README.md`
- `AGENTS.md` when repo-specific rules are
  needed
- `.env.example` when env names need to be
  documented
