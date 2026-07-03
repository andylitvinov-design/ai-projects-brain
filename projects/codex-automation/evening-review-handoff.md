# Evening Architecture Review Handoff

Last updated: 2026-07-03

## Evidence reviewed

- `systems/agent-modes.md` existed and listed callable modes, but did not yet point to an active visibility map.
- `systems/active-skill-map.md`, `projects/codex-automation/morning-handoff-queue.md`, `projects/codex-automation/evening-review-handoff.md`, `projects/codex-automation/delivery-outcome-ledger.md`, and `projects/codex-automation/prompt-regression-tests.json` were not found at the requested paths before this run.
- `systems/improve-mode.md` already defined `/improve` as read-only strategic discovery and listed focus targets for finance, Psihotavr, Psitherapy, and Reiki Yggdrasil.
- Psihotavr recent PRs showed repeated hotfixes in the same live areas: Supabase/Google login, homepage latest mandalas, AI video fallback, Big Arcana service taxonomy, and admin persistence.
- Finance PR #613 added a live `verify:finance` gate but still reported strict live verification blocked by one remaining provider-balance gap.

## Repeated patterns found

1. Product fixes reached `main`, but live/provider readiness still remained ambiguous.
2. Multiple Psihotavr fixes addressed symptoms after the user saw live regressions, instead of a single provider/live proof gate catching them first.
3. Agent command vocabulary was drifting: `/improve` vs `/upgrade` and `/save` vs `/memory` vs `/handoff` needed a visible map.
4. The automation contract referenced handoff, ledger, and regression files that did not yet exist at the requested paths, so future loops could not reliably close the feedback loop.

## Selected root structural issue

The system lacked a durable routing map plus handoff/ticket bridge. As a result, strategic discovery, harness upgrades, operational handoffs, durable memory, and risky product/provider work could blur together.

## Active skill map impact

Drift found and partially fixed.

Safe docs changes applied:
- Created `systems/active-skill-map.md`.
- Updated `systems/agent-modes.md` to reference `systems/active-skill-map.md` before adding or advertising modes.
- Created `systems/to-delivery-tickets.md`.
- Created `projects/codex-automation/morning-handoff-queue.md`.
- Created this handoff file.

Current intended model:

```txt
/improve = read-only opportunity discovery
/upgrade = safe harness/system implementation
/save    = durable reusable lesson
/memory  = secondary read-only lookup
/handoff = operational continuation
```

## Recommended next Daily Improve input

Do not run broad new discovery tomorrow until the existing Psihotavr and finance blockers are checked. Focus Daily Improve on whether the new tickets are enough to prevent repeated live regressions:

1. Psihotavr: live provider/auth/persistence proof gap.
2. Finance: strict `verify:finance` provider-balance blocker.
3. Agent system: confirm active skill map reduced mode confusion.

## Recommended next Morning Upgrade input

1. Read `systems/active-skill-map.md` first.
2. Align `agent-skills/upgrade.md`, `agent-skills/upgrade-daily-protocol.md`, and automation prompt registry references with the map if they drift.
3. If `/memory` is still presented as a primary daily mode anywhere, demote it to secondary read-only lookup.
4. If `/improve` and `/upgrade` are described as synonyms anywhere, correct the boundary.
5. Add or propose compact regression tests for these routing failures.

## Agent-ready tickets

Created:

- Psihotavr issue #168 — verify Supabase auth and live admin persistence.
- Finance issue #614 — resolve live `verify:finance` provider-balance blocker.

Why not executed directly:
- Psihotavr requires provider/live config checks and possibly admin-auth verification.
- Finance requires source/provider balance investigation and must not mutate financial records blindly.

## Suggested skills

No new top-level skill recommended.

Use existing commands:
- `/safe` or `/delivery` for Psihotavr auth/provider/live proof.
- `/audit-fin` for finance provider-balance verification.
- `/upgrade` for harness/docs/memory alignment.

## Needs verification

- Run repository validation from a real checkout if available:
  - `node scripts/validate-agentic-prompts.mjs`
  - `node scripts/verify-context-scout.mjs`
  - `node scripts/validate-projects-brain.mjs`
- Check whether a prompt regression file already exists under another path before creating a new schema.
- Check whether a delivery outcome ledger exists under another path before creating a new ledger.
- Confirm the new docs were picked up by tomorrow's automation prompts.

## Single next action

Morning System Upgrade should align upgrade/save/memory/handoff docs with `systems/active-skill-map.md` and add the smallest regression coverage for mode-boundary drift.
