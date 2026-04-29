# Project Memory Schema

This schema defines the shared project memory model for ChatGPT and Codex.
It extends `projects.md` and `projects.json`; it does not replace them.

## Memory Layers

1. `projects.md`
   - Human-readable project index.
   - Use first for orientation, project boundaries, current status, risks, and Codex rules.

2. `projects.json`
   - Machine-readable project index.
   - Use for structured lookup, routing, automation, and raw file discovery.

3. `system/project-state-template.md`
   - Human-readable per-project state file template.
   - Store current status, canonical repo, production targets, env variable names, verification status, and open risks.

4. `system/project-log-template.md`
   - Human-readable per-project decision and change log template.
   - Store dated events, exact commands, deploy IDs, PRs, failures, and follow-up actions.

5. `system/codex-project-workflow.md`
   - Operational workflow for Codex when working with a project from this base.

## Recommended Per-Project Files

Each active project should eventually have:

- `STATE.md` in the project repo for current human-readable state.
- `LOG.md` or `docs/project-log.md` in the project repo for chronological history.
- `README.md` for stable onboarding and user-facing setup.
- `AGENTS.md` for repo-local agent rules when needed.
- `.env.example` for environment variable names only.

If a project does not have these files, mark the gap as `needs verification`.

## Required Fields For Project State

- `project_name`
- `canonical_repo`
- `live_url`
- `hosting`
- `status`
- `production_awareness`
- `important_files`
- `env_variable_names`
- `known_issues`
- `recent_changes`
- `verification_status`
- `risks`
- `next_actions`
- `agent_rules`

Unknown fields must be written as `needs verification`.

## Secret Policy

- Store environment variable names only.
- Never store real tokens, keys, cookies, client secrets, refresh tokens, private credentials, or account-specific secret values.
- If a value is needed to debug a live service, verify it in the provider dashboard or runtime without copying it into this repository.

## Freshness Policy

- Prefer dated evidence over memory.
- Mark stale, inferred, or unverified facts as `needs verification`.
- Do not claim a live integration works unless it was verified against the live target.
- Separate these states:
  - `code path exists`
  - `env names documented`
  - `credentials configured`
  - `live sync verified`
