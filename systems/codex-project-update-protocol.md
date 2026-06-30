# Codex Project Update Protocol

Use this protocol whenever Codex changes a project listed in
`projects.json`.

## Required Steps

1. Before changes, read the relevant project folder in
   `projects/<slug>/`.
2. Do not change unrelated projects without explicit
   instruction.
3. After work, update `DEBUG_LOG.md` when the task involved
   debugging, production behavior, data flow, deploy, auth,
   provider sync, dashboards, or agent workflow.
4. If new important files were discovered, update
   `PROJECT.md`.
5. If data flow changed, update `SYSTEM_MAP.md`.
6. If schema or data contract changed, update
   `DATA_SCHEMA.md`.
7. If new risks appeared, update `RISKS.md`.
8. Do not store secrets.
9. Write `needs verification` for all unknown or unverified
   data.

## Harness Learning / Save Upgrade

When a task involved debugging, production behavior, data flow, deploy, auth,
provider sync, dashboards, agent workflow, repeated tool loops, or meaningful
token waste, create or propose a compact `/save` entry using
`templates/codex-save-entry-template.md` and
`systems/codex-save-harness-upgrade.md`.

The `/save` entry should capture only reusable operational lessons:

- source of truth used;
- files that actually mattered;
- files that were noise;
- exact failing command or check;
- repeated loop or wasted step;
- minimal safe fix;
- verification performed;
- memory files updated;
- proposed rule update;
- remaining `needs verification`.

Do not store secrets, raw env values, irrelevant chat history, or broad logs.
Codex may propose a rule update, but must not perform broad self-rewrites.
Default proposed lessons to `proposal` or `needs verification` until validated.

## Response Contract

Codex final reports should include:

1. What was found
2. What changed
3. Changed files
4. Verification commands
5. Preview/live links
6. Risks
7. Needs verification

## Safety Rules

- Keep project boundaries strict.
- Preserve current raw links.
- Keep `projects.json` valid.
- Keep env variable names as names only.
- Do not claim live behavior is fixed unless live behavior
  was verified.
