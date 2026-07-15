# Evening Architecture Upgrade Handoff — 2026-07-15

Status: `PARTIAL_UPGRADE_RECOVERABLE`

## Main upgrade applied

The recurring Evening Architecture Upgrade was converted from a duplicated long-form prompt into a compact runtime contract with explicit partial-failure recovery.

## Why this mattered

The prior scheduled run returned only a generic task error. The automation duplicated the full metrics contract inside the scheduler prompt, increasing context size and leaving no durable recovery state when dashboard publication could not complete.

## Applied changes

1. Added `systems/evening-upgrade-runtime-contract.md`.
2. Updated the enabled `Evening Architecture Upgrade` automation to read the canonical metric contract and runtime contract instead of embedding the entire model.
3. Added the required `PARTIAL_UPGRADE_RECOVERABLE` state so saved work is not lost behind a generic scheduler failure.

## Validation evidence

- Runtime contract committed to `ai-projects-brain/main`.
- Automation registry confirms exactly one enabled Evening Architecture Upgrade.
- Automation prompt now references the adaptive portfolio/project/goal model and preserves all critical guardrails.
- No product code, provider configuration, production data, auth, payment, billing, env values or secrets were changed.

## Portfolio and project-health impact

- Portfolio Health remains `NEEDS_ATTENTION` from the latest canonical snapshot.
- `brain-management` remains `BLOCKED` in Reliability because the public Netlify deploy is older and source-unmapped.
- No audit readiness score was converted into a business outcome.
- Goal pyramid membership was not changed; all 24 global metrics retain their existing IDs and assignments.

## Metric lifecycle impact

- `scheduler_health`: remains active; automation uniqueness confirmed.
- `rule_lifecycle`: runtime recovery rule added as active harness guidance, but the canonical dashboard value must be refreshed by the next successful publication pipeline.
- `publication_freshness`: unchanged `STALE` until current Netlify deploy and visible UI are verified.

## Morning handoff

1. **P0 — brain-management / Reliability / Publication Freshness**
   Run the source-mapped Netlify production deploy, verify public JSON timestamp equality and visible Portfolio Health/project selector/goal pyramid. Expected effect: `publication_freshness STALE -> LIVE`, publication ladder `2/4 -> 4/4`.

2. **P1 — Agent/Codex OS / Learning / Rule Lifecycle**
   Add a deterministic test or validator that requires every Morning/Evening automation contract to reference the canonical metrics file and include a recoverable partial-failure state. Expected effect: stronger replay protection and failure-class coverage.

3. **P1 — Portfolio / Business Growth**
   Register one observed KPI source, owner and cadence for the first commercial project rather than inferring growth from `/audit-sales`. Expected effect: `business_growth_outcomes` moves from `needs_revision/not_instrumented` toward an observed project-specific metric.

## Blocked step

Canonical dashboard JSON and Markdown were not rewritten in this manual recovery because the connected GitHub response exposed the current large JSON only in truncated form; overwriting it would risk data loss. The identical `brain-management` mirror was therefore also left unchanged.

Resumable action: run the repository publication script from a full checkout, then validate and sync the complete snapshot.
