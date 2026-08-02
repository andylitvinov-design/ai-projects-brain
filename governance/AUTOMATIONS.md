# Automation Registry

Last reconciled: `2026-08-02`

## Registry contract

Every recurring automation record must identify its scheduler, exclusive role, cadence, persistence target, failure signal, overlap boundary and stop condition. Documentation alone does not prove an automation is enabled; scheduler evidence is required.

## Canonical management chain

| Automation | Exclusive role | Current health | Persistence | Current evidence / next action |
|---|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication and readiness handoff | healthy with one readiness gap | Brain Management morning handoff | Latest reconciliation removed four duplicate/terminal aliases, preserved three carryover chains and rejected an assignment that lacked the exact denominator item, deliverable, repository and branch. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge stage plus open-PR hygiene | healthy, high backlog | Brain Management PR-delivery result | Latest valid handoff had zero PR-ready chains; portfolio inventory remained 36 open PRs, one docs-only conflict was repaired and merged, and no product metric was changed. |
| Daily Strategic Priorities | Ranking only | ranking contract passed; handoff consumption failed downstream | Brain Management ranked queue | Rejected provider readiness as owner-blocked and the shared `1/4` delivery input as not ready; selected the bounded Psihotavr reachability classification for Morning System Upgrade. |
| Morning System Upgrade | Single primary implementation owner | latest technical repair LIVE_VERIFIED; assignment adherence failed | Brain Management implementation handoff | Implemented assignment-source parity and atomic publication guards instead of the ranked Psihotavr chain. The repair was valid and claimed zero metric points, but the ranked `chain_id` was not consumed or explicitly returned first. |
| Daily Dashboard Update | Metrics, collectors, formulas, history, assignments and atomic publication | latest publication LIVE_VERIFIED | Brain Management API/history | Published current 2026-08-02 data and verified six routes, four Overview aggregates, 24 metrics, ten projects, ten Trends, seven agents, five operational APIs and no current runtime-error cluster. |
| Evening Delivery Closure | Verification, bounded recovery and terminal closure | current report still VERIFYING after a live publication | Brain Management closure result | Must reconcile the current deployment identity and close only canonical production evidence; it must not compete with routine dashboard publication. |
| Weekly Delivery System Review | Weekly execution-quality evaluator | current review persisted on focused branches | Brain Management weekly scorecard + durable governance PR | Current rolling counts are `1/4` live completion, `1/3` rework, `1/3` false-success correction, `1/1` recovery, `26/27` validations, three carryover chains and one owner blocker. |
| Sunday Dashboard Review | Metric/control-plane architecture and dashboard quality | active | Brain Management health/history + durable contract PR | Owns metric architecture only; current delivery-process defects remain with Weekly Delivery System Review. |
| Weekly Brain Refresh | Canonical durable-memory reconciler | active | AI Projects Brain catalog/governance/index PR | Reconciles durable state only; does not publish daily dashboard data or implement product work. |

## Other enabled automation families

| Family | Purpose | Ownership boundary |
|---|---|---|
| Brain Regression Guard | Detect release-integrity, rendered-contract and API regressions. | May perform emergency recovery only under a single-owner lock and current canonical assignment. It must not become a routine parallel publisher beside Daily Dashboard Update or a parallel terminal closer beside Evening Delivery Closure. |
| Brain Data Freshness Watch | Detect source timestamps entering warning or forbidden freshness states. | May refresh or initiate emergency recovery only after claiming the same single publication chain; routine source refresh and atomic publication remain Daily Dashboard Update. |
| Weekly AI Trends | Own the Monday/Friday trend set, exact source evidence and immutable weekly history. | Daily Dashboard Update may publish the set but must not replace its source methodology or history. |
| UI Design Intelligence | Maintain evidence-backed `/audit-ui` markers. | Framework/docs only; no autonomous product redesign. |
| Portfolio Sales Audit | Weekly read-only conversion audit of active public sites. | Audit and recommendations only; no product mutation or invented conversion evidence. |
| Weekly Live Safe Sweep | Safe live checks and narrow confirmed repairs. | Must not take ownership of daily delivery chains, Brain Management routine publication or durable catalog reconciliation. |

## Reconciliation findings — 2026-08-02

1. The six named management stages remain structurally separate and no current chain has two declared implementation owners after reconciliation.
2. One ranking-to-implementation handoff defect is proven: Daily Strategic Priorities assigned `psihotavr-public-collector-reachability`, while Morning System Upgrade implemented assignment-source parity/publication guards. A technically valid repair does not satisfy a different ranked assignment.
3. `provider-live-readiness-ezohata-finance` remains `BLOCKED_BY_OWNER` under `Owner Verification`; it is not a CI, collector or deployment repair chain.
4. `delivery-conversion-one-of-four` remains one shared chain for product delivery, task success and live completion. Morning Task Sweep owns readiness until the exact four items and one existing deliverable/repository/branch are published.
5. `psihotavr-public-collector-reachability` remains a bounded classification chain. No product code or business-KPI credit is allowed until deployment, domain, source registry and collector transport are distinguished.
6. The enabled Brain Regression Guard and Brain Data Freshness Watch overlap Daily Dashboard Update and Evening Delivery Closure in their current recovery language. Detection is useful; routine parallel deployment or closure is not. Emergency recovery requires a single-owner lock, exact chain_id and explicit release of ownership after terminal evidence.
7. Current rolling delivery evidence remains weak: product delivery, task success and live completion are each `1/4`; rework and false-success correction are each `1/3`. Infrastructure/control-plane closures outnumber observed operational/product closures `2:1`.
8. The repository still contains a weekly scorecard handler for the previous week, while canonical production returns 404 for that route. Weekly reviews should persist immutably in Brain Management and be published only through the dependency-closed canonical topology.
9. Disabled legacy publication guards and one-off loops remain noncanonical and must not be revived as duplicate publishers.

## Durable rules

1. Read assignment and carryover before acting.
2. Preserve one implementation owner until a canonical terminal state or explicit reassignment.
3. Reuse an existing chain/PR when equivalent.
4. Merge is not live success.
5. For APIs, verify status, content type, body and parseability.
6. For direct deployments, require current-main source binding, exact manifest parity and dependency closure.
7. Store routine receipts in Brain Management; aggregate only durable facts and lessons here.
8. Never treat protected owner/provider evidence as autonomously available.
9. Morning System Upgrade must implement the exact ranked `chain_id`; if new evidence makes another repair more important, return the assignment for reconciliation before switching scope.
10. Regression/freshness guards must acquire one canonical recovery chain and may not independently publish or close the same incident in parallel with Daily Dashboard Update or Evening Delivery Closure.
11. Rolling weekly metric fields are not additive event counts without immutable daily identities.
