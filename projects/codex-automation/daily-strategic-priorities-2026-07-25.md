# Daily Strategic Priorities — 2026-07-25

## Evidence boundary

Selection and routing only. This record does not claim implementation, score growth, business outcomes or `LIVE_VERIFIED`.

Read evidence:

- live Brain Management control plane;
- `systems/live-upgrade-delivery-contract.md`;
- `projects/codex-automation/task-sweep-runs/2026-07-25.json`;
- `projects/codex-automation/pr-delivery-sweep-runs/2026-07-25.md`;
- current project registry and preserved Big Goals;
- current Vercel production source mapping.

All ten active-project Big Goals remain unchanged.

## Lowest actionable metrics

| Metric | Today | Yesterday | 7 days | Weekly trend | Current input |
|---|---:|---:|---:|---|---|
| Business KPI coverage | 0 | 0 | 0 | Flat baseline | 0/6 collectors |
| Provider/live readiness | 0 | 0 | 0 | Flat baseline | 0/4 verified projects |
| Rule lifecycle maturity | 0 | 0 | 0 | Flat baseline | 0/9 active rules |

No metric currently has a negative seven-day delta. History is still baseline-heavy, so the worst trends are flat critical scores rather than actual declines.

## Ranked executable queue

### 1. Finance PR #188 production verification

- **Primary metric:** Product Delivery Rate — `33.3 / 33.3 / 33.3`.
- **Exact input:** product chains `LIVE_VERIFIED` from `1 → 2`; denominator remains `3`.
- **Expected score:** `33.3 → 66.7`.
- **Secondary effect:** Live Completion Rate `33.3 → 66.7`; Deployment Frequency `33.3 → 66.7` if this production deployment is counted as the second verified product deployment.
- **Big Goal:** owner-only financial control with correct provider imports, reconciled facts and trustworthy expense-channel views.
- **Material threshold:** prove the canonical production deploy, PayPal hold exclusion and channel-filtered expense behavior.
- **Priority score:** `5 × 5 × 5 ÷ 1 = 125`.
- **Current proof:** PR #188 merged as `aeecdc4ba585a921d355a94534d1a63d837ef847`; Vercel deployment `dpl_9ysMVyDjpVWjGgCHociDx1uoixmx` is `READY`; `/api/status` maps production to the exact merge SHA.
- **Missing proof:** read-only PayPal behavior; desktop/mobile expense-channel flow; console/network state.
- **Owner:** Morning System Upgrade.
- **Executable next action:** use the existing production deployment; prove T1501/T1503 holds are absent from expenses, then verify channel selection, visible totals and category-save scoping on desktop/mobile.

This is the carryover-first candidate because it is already merged and deployed and has the shortest path to a product `LIVE_VERIFIED` result.

### 2. Ingest verified delivery timestamps

- **Primary metric:** Lead Time to Live coverage — `33.3 / 33.3 / 33.3`.
- **Exact input:** timestamp pairs `1/3 → 3/3`.
- **Expected score:** `33.3 → 100`.
- **Big Goal:** a self-improving portfolio OS that measures delivery truthfully and routes current evidence.
- **Material threshold:** every completed chain has start/discovery, `live_verified_at` and cycle time.
- **Priority score:** `4 × 4 × 5 ÷ 1 = 80`.
- **Current proof:** Task Sweep persisted two verified pairs: 10.8 minutes and 15 minutes.
- **Owner:** Daily Dashboard Update.
- **Executable next action:** ingest the two pairs, save their source references in immutable history and republish the score as `3/3`.

This infrastructure exception is allowed because the collector gap affects routing and measurement across multiple delivery automations.

### 3. Reiki Yggdrasil provider/live readiness

- **Primary metric:** Provider/live readiness — `0 / 0 / 0`.
- **Exact input:** fully verified provider projects `0/4 → 1/4`.
- **Expected score:** `0 → 25`.
- **Big Goal:** a trustworthy training/practitioner platform with reliable public, profile and masters journeys and measured inquiries/bookings.
- **Material threshold:** prove named configuration presence, auth/session smoke and one complete production primary journey.
- **Priority score:** `4 × 5 × 3 ÷ 2 = 30`.
- **Owner:** Morning System Upgrade.
- **Executable next action:** verify configuration names without reading secrets, run bounded auth/session smoke, then verify public production routes on desktop/mobile with console/network checks.
- **Boundary:** if account access is unavailable, use `BLOCKED_BY_OWNER` with one exact action; do not count partial proof as `1/4`.

## Carryover-first order

1. Finance PR #188 production verification.
2. Lead-time timestamp ingestion.
3. Reiki Yggdrasil provider/live readiness.

## Excluded work

- Toronto Tantra PR #41: genuine approved-image-source owner blocker.
- Ezohata PR #41: production Google provider activation and owner/non-owner proof remain owner-only.
- Psitherapy PR #122: Firebase provider/domain/environment access is missing.
- Codex Links issue #174: no fresh-main implementation artifact; remains `NO_SAFE_UPGRADE`.
- Rule-lifecycle score repair: lower leverage today than product carryover and already-proven timestamp ingestion.
- New dashboard/harness design: excluded because the active bottleneck is production verification and provider readiness.

## Persistence

Machine-readable queue: `projects/codex-automation/daily-strategic-priorities-2026-07-25.json`.

Morning owns product implementation and live verification. Daily Dashboard Update owns timestamp ingestion. Evening independently verifies terminal claims.
