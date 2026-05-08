# Project Capsule Standard

> Standard shape for `projects/<project_key>/` folders.  
> Use this as the target structure for active projects so agents can quickly find the right context without scanning unrelated repos.

## Required minimum

Each active project should have:

```text
projects/<project_key>/
  PROJECT.md
  STATE.md
  SYSTEM_MAP.md
  CODEX_BRIEF.md
  LOG.md
  CHECKS.md
  DECISIONS.md
```

Older projects may be incomplete. Do not block work only because a capsule is missing a file; mark gaps as `needs verification` and add the missing file when useful.

## File roles

### PROJECT.md

Project passport:

- name;
- project_key;
- purpose;
- canonical repo;
- production URL;
- hosting;
- status;
- known risks;
- important files;
- env variable names only;
- agent entry rules.

### STATE.md

Current working state:

- current focus;
- what is broken / important now;
- open risks;
- active next actions;
- what is outdated;
- needs verification.

### SYSTEM_MAP.md

Architecture and runtime map:

- app structure;
- important files;
- data flows;
- APIs;
- deploy/runtime paths;
- integrations;
- source-of-truth boundaries.

### CODEX_BRIEF.md

How to give coding tasks to Codex:

- repo boundary;
- branch/PR rules;
- verification commands;
- production checks;
- forbidden changes;
- reporting format.

### LOG.md

Short chronological history:

- date;
- task;
- changed files / PR;
- verification;
- risks / follow-up.

### CHECKS.md

How to verify work:

- unit/build/test commands;
- live endpoints;
- UI paths;
- audit endpoints;
- manual verification steps;
- known false positives.

### DECISIONS.md

Architecture decisions that should not be re-litigated:

- chosen source of truth;
- deprecated paths;
- naming choices;
- deploy strategy;
- data contracts;
- tradeoffs.

## Agent Entry block

Every active `PROJECT.md` should include an `Agent Entry` section:

```md
## Agent Entry

Use this project when the user mentions: ...

Read order:
1. STATE.md
2. PROJECT.md
3. SYSTEM_MAP.md
4. CHECKS.md
5. CODEX_BRIEF.md

Live checks:
- ...

Do not:
- change env/secrets;
- use deprecated repo/path;
- infer live state without checks.
```

## Type field

Use one of:

- `app` — production app/code product;
- `site` — website/content/UI;
- `course` — learning/course product;
- `method` — methodology/knowledge base;
- `infra` — bridges, agents, dashboards, operational tooling;
- `archive` — frozen/legacy; avoid unless explicitly requested.

## Safety rules

- Store env names only, never values.
- Mark unknowns as `needs verification`.
- Do not put private user/client data here.
- Distinguish production, preview, deprecated and local-only targets.
- Do not assume repo-to-live mapping unless verified.

## Update rule

After meaningful work, update only the relevant files:

- status/next actions → `STATE.md`;
- architecture/data flow → `SYSTEM_MAP.md`;
- verification → `CHECKS.md`;
- architecture choice → `DECISIONS.md`;
- work history → `LOG.md`.

## Main formula

**Project capsule = project boundary + current state + system map + coding brief + checks + decisions + short log.**
