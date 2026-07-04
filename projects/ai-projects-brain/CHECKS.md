# CHECKS — ai-projects-brain

> Verification guide for Project Brain / project memory dispatcher work.

## Agent Entry

Use this project for: project memory, ai-projects-brain, project index, agent dispatcher, START-HERE-FOR-AGENTS, project capsule standard, memory schema.

## Local checks

Run in canonical repo: `andylitvinov-design/ai-projects-brain`.

Recommended checks:

- `node scripts/validate-projects-brain.mjs`
- `node scripts/verify-context-scout.mjs` when `/context-scout` or mode wiring
  changes
- `node scripts/sync-project-index.mjs` when project inventory changes
- `git diff --check` if available locally
- for Codex Cloud setup docs, verify `systems/codex-cloud-repo-mode.md` and the
  target project `CODE_ACCESS.md` launch contract stay aligned

If scripts are unavailable in the execution environment, report as `needs verification`.

## Consistency checks

When adding or changing project inventory, verify consistency between:

- `START-HERE-FOR-AGENTS.md`
- `projects/index.md`
- `CURRENT-FOCUS.md`
- `projects.md`
- `projects.json`
- `data/project-index.json`
- relevant `projects/<project_key>/PROJECT.md`

## Capsule checks

For active project capsules, verify whether these exist or should be added:

- `PROJECT.md`
- `STATE.md`
- `SYSTEM_MAP.md`
- `CODEX_BRIEF.md`
- `LOG.md`
- `CHECKS.md`
- `DECISIONS.md`

Missing files are not automatically blockers. Mark as `needs verification` and add only if useful.

## Safety checks

- No real secrets or env values.
- Env names only.
- Unknowns marked as `needs verification`.
- Deprecated/legacy repos clearly marked.
- Production vs preview vs local-only distinguished when known.

## Report format

Return:

- changed files;
- validation/sync checks;
- index consistency notes;
- secret-safety statement;
- needs verification;
- next memory updates.
