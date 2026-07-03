# Morning Handoff Queue

Last updated: 2026-07-03

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### 2026-07-04 — skill visibility and handoff loop stabilization

Source: Evening Architecture Review 2026-07-03.

Status: ready for safe `/upgrade` docs/harness work.

Inputs:
- `systems/active-skill-map.md` was created as the source of truth for visible commands, secondary tools, and internal guardrails.
- `systems/agent-modes.md` now points to `systems/active-skill-map.md` before adding or advertising modes.
- `systems/to-delivery-tickets.md` was created as the ticket shape for work that should be routed out of architecture review.
- `projects/codex-automation/evening-review-handoff.md` contains the selected root structural issue and next recommendations.

Recommended Morning action:
1. Read `systems/active-skill-map.md` first.
2. Align `agent-skills/upgrade.md`, `agent-skills/upgrade-daily-protocol.md`, and automation prompt registry references with the map if they drift.
3. If a file still advertises `/memory` as a primary mode or treats `/improve` and `/upgrade` as synonyms, apply markdown-only corrections.
4. Add compact prompt regression tests if the test file exists; if not, create only a minimal schema after checking references.
5. Do not touch product code or provider settings from Morning System Upgrade.

Needs verification:
- `delivery-outcome-ledger.md` and `prompt-regression-tests.json` were requested by the automation contract but were not found in this repo path during Evening Review.
- Validation scripts were not run from a local checkout in this automation run; verify from Codex/local repo if available.

## Closed / consumed items

- None yet.
