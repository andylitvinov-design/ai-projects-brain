# Automation Registry

Last reconciled: `2026-08-01`

## Registry contract

Every recurring automation record must identify its scheduler, exclusive role, cadence, persistence target, failure signal, overlap boundary and stop condition. Documentation alone does not prove an automation is enabled; scheduler evidence is required.

## Canonical management chain

| Automation | Exclusive role | Current health | Persistence | Current evidence / next action |
|---|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication and readiness handoff | healthy | Brain Management morning handoff | Removed four duplicate/terminal chains; preserved one owner blocker and two ranking candidates; zero implementation-owner conflicts. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge stage plus open-PR hygiene | healthy, high backlog | Brain Management PR-delivery result | Valid handoff had zero PR-ready chains; portfolio hygiene still reduced open PRs `46 → 36`, merged three focused docs PRs and closed seven obsolete/superseded PRs. Remaining finance PRs include genuine owner/data-risk blockers. |
| Daily Strategic Priorities | Ranking only | healthy | Brain Management ranked queue | Selected the bounded auxiliary API repair after rejecting provider readiness as owner-blocked and the shared delivery input as insufficiently specified. |
| Morning System Upgrade | Single primary implementation owner | latest chain LIVE_VERIFIED | Brain Management implementation handoff | Brain Management PR #161 moved canonical operational APIs `3/5 → 5/5` JSON, stayed within the 12-function Hobby limit and preserved the frozen UI. |
| Daily Dashboard Update | Metrics, collectors, formulas, history, assignments and publication | latest publication LIVE_VERIFIED | Brain Management API/history | Published fresh 2026-08-01 data, public business KPI `4/6`, 24 metrics, ten Trends, seven agents, four Overview aggregates and service worker `v67`. |
| Evening Delivery Closure | Verification, bounded recovery and terminal closure | healthy | Brain Management closure result | Previous production-recovery chain reached `LIVE_VERIFIED`; next run should verify only current assigned carryover and never reopen closed chains without new evidence. |
| Weekly Delivery System Review | Weekly execution-quality evaluator | latest full review covers week ending 2026-07-26 | Brain Management weekly scorecard + durable governance PR | Next run should supply current seven-day denominators and evaluate the `1/4` delivery conversion, PR backlog and false-success/rework signals. |
| Sunday Dashboard Review | Metric/control-plane architecture and dashboard quality | latest review merged as AI Projects Brain #178 | Brain Management health/history + durable contract PR | Its route/source/history findings are incorporated; next review should verify metric-level sources, history coverage and memory sync after the current repairs. |
| Weekly Brain Refresh | Canonical durable-memory reconciler | active | AI Projects Brain catalog/governance/index PR | Reconciles durable state only; does not publish daily dashboard data or implement product work. |

## Other enabled automation families

| Family | Purpose | Ownership boundary |
|---|---|---|
| Weekly AI Trends | Own the Monday trend set, exact source evidence and immutable weekly history. | Daily Dashboard Update may publish the set but must not replace its source methodology or history. |
| UI Design Intelligence | Maintain evidence-backed `/audit-ui` markers. | Framework/docs only; no autonomous product redesign. |
| Portfolio Sales Audit | Weekly read-only conversion audit of active public sites. | Audit and recommendations only; no product mutation or invented conversion evidence. |
| Weekly Live Safe Sweep | Safe live checks and narrow confirmed repairs. | Must not take ownership of daily delivery chains or durable catalog reconciliation. |

## Reconciliation findings — 2026-08-01

1. Current enabled management stages remain separated; no concurrent implementation-owner conflict was found.
2. `provider-live-readiness-ezohata-finance` remains `BLOCKED_BY_OWNER` under `Owner Verification`; it is not a CI or deployment repair chain.
3. `auxiliary-api-json-route-contract` is terminal `LIVE_VERIFIED` and must not be reassigned. PR #161 and production evidence prove all five canonical operational APIs return parseable JSON.
4. The Brain Management dashboard/PWA has one canonical repository, `main` branch, Vercel project and production origin. Separate mobile/publication targets are noncanonical.
5. The current shared delivery-conversion gap covers product delivery, task success and live completion at `1/4`; it must remain one chain, not three metric-specific implementations.
6. PR hygiene has a material remaining backlog. Financial/account-sensitive PRs must not be merged or closed merely because they are old.
7. Weekly Delivery and Sunday Dashboard reviews have not yet produced a newer full-week scorecard than the week ending 2026-07-26; current daily receipts are evidence, not a substitute for those denominators.
8. Disabled legacy publication guards and one-off loops are not canonical owners and must not be re-enabled as duplicate publishers.

## Durable rules

1. Read assignment and carryover before acting.
2. Preserve one implementation owner until a canonical terminal state or explicit reassignment.
3. Reuse an existing chain/PR when equivalent.
4. Merge is not live success.
5. For APIs, verify status, content type, body and parseability.
6. For direct deployments, require current-main source binding and dependency closure.
7. Store routine receipts in Brain Management; aggregate only durable facts and lessons here.
8. Never treat protected owner/provider evidence as autonomously available.
