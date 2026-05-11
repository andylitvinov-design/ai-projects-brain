# Codex Token Efficiency Rollout Checklist

Use this checklist after `systems/codex-token-efficiency.md` is merged.
The goal is to make each high-impact repo fast for Codex to enter and safe to modify.

## Priority repos

1. `ai-projects-brain`
2. `brain-management`
3. `codex-links`
4. `finance` / `ezohata-incoming-ledger`

## Per-repo audit

For each repo, check:

```md
Repo:
Live URL:
Production source:
Deprecated/reference repos:

AGENTS.md:
- exists: yes/no
- under 200 lines: yes/no/needs verification
- routes to CODEX_BRIEF/STATE/LOG: yes/no
- contains secrets/env values: yes/no
- has verification commands: yes/no

CODEX_BRIEF.md:
- exists: yes/no
- explains project purpose: yes/no
- lists canonical repo/live target: yes/no
- lists key files: yes/no
- lists common tasks/exact areas: yes/no
- lists checks: yes/no
- includes token-efficiency rules: yes/no

STATE.md:
- exists: yes/no
- current enough: yes/no/needs verification
- separates production/preview/deprecated: yes/no

LOG.md:
- exists: yes/no
- recent entries useful: yes/no/needs verification

Workflow:
- minimal safe fix rule present: yes/no
- no broad repo scan rule present: yes/no
- compact/session summary rule present: yes/no
- final report format present: yes/no
- stop condition present: yes/no

Risks:
- ...

Needed changes:
- ...
```

## Rollout order

### 1. ai-projects-brain

- Ensure shared rules and templates are canonical.
- Avoid duplicating the same rule in many places.
- Keep new docs linked from workflow/rules.

### 2. brain-management

- Add or update repo `AGENTS.md` and `CODEX_BRIEF.md`.
- Make dashboard paths explicit:
  - `dashboard-thinking/data/current-thinking-audit.json`
  - `dashboard-thinking/data/current-daily-upgrade.json`
  - `dashboard-thinking/data/current-daily-changes.json`
  - `scripts/refresh-management-dashboards.js`
  - `functions/api/mobile-run.js`
- Add future dashboard signals from `systems/codex-token-efficiency.md`.

### 3. codex-links

- Add or update repo `AGENTS.md` and `CODEX_BRIEF.md`.
- Make command lifecycle boundaries explicit.
- Separate Slack-backed cloud delivery from local bridge/direct OpenAI paths.
- Mark Cloudflare/KV/Slack side effects clearly.

### 4. finance / ezohata-incoming-ledger

- Add or update repo `AGENTS.md` and `CODEX_BRIEF.md`.
- Separate active production repo from deprecated/reference repos.
- Make live verification contract explicit:
  - `/api/status`
  - `/api/audit-snapshot`
  - release guard/build/test commands
- Emphasize no secrets/env values.

## Dashboard metrics to implement later in brain-management

Track these signals when possible:

- `broad_repo_scan`
- `repeated_file_reads`
- `missing_codex_brief`
- `missing_state_log`
- `long_final_report`
- `no_compact_summary`
- `unnecessary_tool_use`
- `wrong_repo_context`
- `no_exact_failing_command`
- `skipped_verification`

Suggested composite metrics:

- Token Efficiency Score
- Context Discipline
- Loop Health
- Verification Discipline
- Memory Update Compliance

## Done criteria for rollout

A repo is token-efficiency ready when:

- `AGENTS.md` is short and routes to memory files;
- `CODEX_BRIEF.md` exists and gives fast project entry;
- `STATE.md` / `LOG.md` exist or absence is documented;
- exact verification commands are documented;
- production/deprecated boundaries are explicit;
- final report format includes checks, risks, changed files, and memory update status;
- session summary / compact handoff rule is present.
