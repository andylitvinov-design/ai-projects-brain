# Metric Evidence Continuity Contract

Status: active control-plane contract
Accepted: 2026-08-16
Owner: Sunday Dashboard Review audits architecture; Daily Dashboard Update publishes operational evidence; Weekly Brain Refresh reconciles durable validity.

## Purpose

Prevent a fresh-looking dashboard from publishing metrics whose formulas, sources, history identities, queue semantics, or memory synchronization cannot be audited.

## Required metric evidence

Every canonical metric record must publish:

- stable `metric_id` and display name;
- unchanged `formula_version` plus readable formula text;
- exact `raw_value` and score derived from it;
- one measurement label: `DIRECT`, `PROXY`, or `COVERAGE`;
- one or more resolvable `source_refs` to the collector, immutable receipt, contract, or production evidence;
- daily/weekly comparison values only when immutable comparison identities exist.

Adding missing formula text or source references is a metric-data-quality repair. It must not mutate the score, denominator, or imply a product/business outcome.

## Immutable history

- Append at most one scored snapshot for each observed calendar date.
- Never fabricate missing days or copy one current snapshot into several dates.
- Report coverage honestly as `available / required` and preserve missing-date identities.
- A new observed snapshot may improve history coverage without changing any metric score.

## Queue and ownership evidence

Each action-queue item must carry current/yesterday/7-day scores, measurement mode, numerator and denominator gaps when applicable, target score, expected effect, cadence, exact chain, current owner, stage, next executable action, and required evidence.

Assignments remain unique by `chain_id`. An incomplete queue item is not executable merely because the metric gap is large.

## Weekly and durable continuity

The current operational snapshot must point to the latest structured Weekly Delivery System Review rather than serving a historical handler indefinitely.

`memory_sync_status` must include:

- canonical durable repository;
- last successful durable-main timestamp and commit;
- pending durable PRs or decisions;
- an explicit blocker or `null`.

A repository being reachable is not proof that durable memory is current.

## Anti-gaming guards

The control plane must enforce:

1. `NO_FORMULA_GAMING` — scores change only from verified raw inputs under the preserved formula.
2. `NO_META_AS_PRODUCT` — metadata/control-plane repair receives no product or business credit.
3. `NO_MISSING_AS_ZERO` — missing evidence remains missing or needs verification.
4. `CURRENT_PRODUCTION_PROOF` — `LIVE_VERIFIED` requires current canonical production behavior and API evidence.

## Regression condition

The contract fails when any canonical metric lacks formula/source evidence, current-window history is overstated, a queue item lacks execution evidence, the current weekly review pointer is stale, memory sync has no auditable success/pending state, or core anti-gaming guards are absent.

## Canonical review surfaces

The canonical control-plane release must publish both `/api/control-plane-health` and `/api/weekly-delivery-system-review` as dependency-closed JSON functions. Release construction and production verification must fail when either route is absent, non-JSON, or points behind the latest persisted structured review.

`memory_sync_status.pending_durable_updates` must enumerate every currently relevant open durable PR or decision. A hard-coded singleton is incomplete sync evidence when additional relevant durable updates are open.

