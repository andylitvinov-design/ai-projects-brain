# Automation Registry

Last reconciled: `2026-07-29`

## Required fields

Every recurring automation record must include:

- name and scheduler;
- purpose and covered systems;
- cadence and timezone;
- owner;
- expected output or notification condition;
- state persistence location;
- overlap/duplicate check;
- failure signal;
- stop condition.

## Canonical management chain

| Automation | Exclusive role | Current health | Persistence | Failure signal / next action |
|---|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication, readiness handoff | healthy | Brain Management morning handoff | The 2026-07-29 handoff removed four duplicate/superseded chains and exposed one `READY_FOR_PR_DELIVERY` chain. |
| PR Delivery Sweep | Existing branch/PR/CI/conflict/merge stage only | active | Brain Management delivery result | Reuse AI Projects Brain PR #180, reconcile its stale current-state wording on the same branch, then apply the merge gate. |
| Daily Strategic Priorities | Ranking only | healthy | Brain Management ranked queue | Must not implement or create PRs; it assigns one executable dashboard-derived candidate when available. |
| Morning System Upgrade | Single primary implementation stage | completed latest assigned implementation | Brain Management implementation result | The second lifecycle rule was implemented and merged; do not create a duplicate implementation owner. |
| Evening Delivery Closure | Verification, one recovery attempt, terminal closure | latest assigned chain `LIVE_VERIFIED` | Brain Management closure result | The rule-lifecycle chain was verified on the canonical Brain Management APIs after publication. |
| Daily Dashboard Update | Metrics, collectors, immutable history, assignments, publication, trends and PWA sync | canonical single-project publication active | Brain Management API/history | Publish the dashboard and installable Apple/Android PWA through the existing `brain-management` Vercel project; root HTTP 200 alone is insufficient. |
| Weekly Delivery System Review | Weekly execution-quality evaluator | active carryover | Brain Management weekly scorecard + focused durable PR | Owns `weekly-delivery-direct-deploy-parity-gate` until explicit PR Delivery handoff and terminal state. |
| Sunday Dashboard Review | Metric/control-plane architecture and dashboard quality | separately owned | Brain Management health/history APIs + focused durable PR | Keep PR #178 separate; do not combine its architecture findings with PR #180 delivery-process scope. |
| Weekly Brain Refresh | Canonical durable-memory reconciler | scheduled | ai-projects-brain governance/catalog/index PR | Consumes weekly summaries; must aggregate rather than copy daily receipts. |

## Other enabled automation families

| Family | Scheduler | Purpose | Health |
|---|---|---|---|
| Weekly AI Trends | ChatGPT Automations | Own the Monday trend set, exact sources and weekly history. | active; Monday set and history are published in Brain Management |
| UI Design Intelligence | ChatGPT Automations | Evidence-backed `/audit-ui` marker maintenance. | active |
| Portfolio Sales Audit | ChatGPT Automations | Weekly read-only conversion audit of public sites. | active |
| Weekly Live Safe Sweep | ChatGPT Automations | Safe live-site checks and narrow confirmed repairs. | active; must not take ownership of daily delivery chains |

## Current reconciliation — 2026-07-29

1. Current Brain Management assignments contain zero concurrent implementation-owner conflicts.
2. `provider-live-readiness-ezohata-finance` is not a CI-repair chain anymore. PR #21 is merged, the full verification rerun passed, and the production readiness endpoint is live. The chain is `BLOCKED_BY_OWNER` under `Owner Verification` pending one current owner-session smoke and one read-only Wise or YooMoney journey.
3. `rule-lifecycle-activate-live-verification-rule` reached `LIVE_VERIFIED`; its input is `2 active/9`, and it must not remain active or be reassigned.
4. Brain Management web and the installable Apple/Android PWA use one canonical Vercel project and URL: `brain-management` at `https://brain-management.vercel.app`. Separate mobile-production or GitHub-token publication paths are non-canonical.
5. Weekly AI Trends is active. Daily Dashboard Update may publish readiness/source-access changes but must preserve the Monday set and weekly history.
6. PR #180 owns the direct-deploy parity correction. PR #178 remains the separately owned Sunday Dashboard Review chain.

## Historical week-ending 2026-07-26 findings

1. Discovery, ranking, implementation, GitHub delivery, closure, metrics/publication, delivery review, dashboard review and memory refresh remained separate.
2. Morning reconciliation removed four resolved, temporary, superseded or duplicate chains.
3. Brain Management PR #76 and AI Projects Brain PR #170 were stale/superseded operational artifacts and did not own active chains.
4. Direct-deploy source drift repeated across publication paths. Every automation claiming deploy/live evidence must apply the direct-deploy source-parity gate in `systems/live-upgrade-delivery-contract.md`.
5. Disabled duplicate publication watches remain superseded by Daily Dashboard Update and must not be re-enabled.

## Weekly reconciliation rules

1. Read the current automation list when available.
2. Compare by purpose, scope, cadence and output—not only by title.
3. Mark duplicates and recommend one canonical owner.
4. Check whether the previous run produced evidence and whether its actions were closed.
5. Record missing permissions or inaccessible schedulers as `needs verification`.
6. Never invent automation state from documentation alone.
7. Preserve active-chain ownership until a canonical terminal state or explicit reassignment.
8. For direct deployments, require current-main artifact parity and source/deploy binding before any live-success claim.
