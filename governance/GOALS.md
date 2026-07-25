# AI System Goals

## G1 — Complete project memory

- Outcome: every active or meaningful project has a discoverable catalog record and a canonical capsule.
- Success: no accessible active repository is missing without an explicit exclusion reason.
- Next action: run weekly reconciliation across GitHub repositories, project indexes, recent PRs/issues, and known live targets.

## G2 — Reliable execution loops

- Outcome: important tasks do not disappear between chats, Codex Cloud runs, local Codex work, PRs, and automations.
- Success: dangling chains are identified with owner, blocker, last evidence, and next exact action.
- Next action: reconcile weekly findings with task-sweep and PR-sweep outputs when available.

## G3 — Efficient context use

- Outcome: agents load the smallest sufficient context and expand only with a named reason.
- Success: fewer broad scans, repeated reads, unnecessary tools, and oversized reports without reduced verification quality.
- Next action: aggregate signals defined in `systems/codex-efficiency-telemetry.md`.

## G4 — Current and non-duplicated automation map

- Outcome: each recurring workflow has one clear scheduler, owner, cadence, output, and stop condition.
- Success: no unjustified duplicate ChatGPT/Codex automations.
- Next action: update `AUTOMATIONS.md` weekly from available automation state and evidence.

## G5 — Useful search index

- Outcome: a human or agent can find the right project, state, architecture, checks, goals, and lessons quickly.
- Success: master and generated indexes have no stale aliases, broken paths, duplicate project identities, or missing canonical targets.
- Next action: improve `INDEX.md`, project aliases, and machine index during each weekly refresh.
