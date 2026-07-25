# Current AI System State

Last weekly refresh: `needs verification`

## Current operating model

- `ai-projects-brain` is the canonical cross-project memory and routing layer.
- Project-specific current truth belongs in `projects/<slug>/STATE.md`.
- Global agent rules belong in `systems/`.
- Cross-system goals, automation health, efficiency and lessons belong in `governance/`.
- ChatGPT Automations are the default recurring scheduler unless a Codex-side schedule has an explicit operational reason.

## Current health

| Area | Status | Evidence / next action |
|---|---|---|
| Project catalog completeness | needs verification | Run weekly repository and project reconciliation. |
| Human/machine index consistency | needs verification | Compare `projects/index.md`, `projects.md`, `projects.json`, and `data/project-index.json`. |
| Codex context efficiency | active | Policy and telemetry standards exist; weekly evidence collection is required. |
| Automation overlap | needs verification | Reconcile active ChatGPT and Codex-side automations. |
| Weekly error learning | active | Append evidence-backed findings to `WEEKLY-LEARNINGS.md`. |
| Search/navigation quality | active | Maintain `INDEX.md` and project routing aliases weekly. |

## Current priorities

1. Keep the project catalog complete and current.
2. Detect unfinished task chains and automation overlap.
3. Measure whether context and tool budgets are followed.
4. Improve the master index without duplicating canonical facts.
5. Preserve exact verification evidence for claims of completion.
