# Automation Registry

Last reconciled: `2026-08-30`

## Registry contract

Every recurring automation record must identify its scheduler, exclusive role, cadence, persistence target, failure signal, overlap boundary and stop condition. Documentation alone does not prove an automation is enabled; scheduler evidence is required.

## Canonical management chain

| Automation | Exclusive role | Current health | Persistence | Current evidence / next action |
|---|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication and readiness handoff | healthy with one readiness gap | Brain Management morning handoff | Latest reconciliation removed four duplicate/terminal aliases, preserved three carryover chains and rejected an assignment that lacked the exact denominator item, deliverable, repository and branch. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge stage plus open-PR hygiene | healthy, high backlog | Brain Management PR-delivery result | Latest valid handoff had zero PR-ready chains; portfolio inventory remained 36 open PRs, one docs-only conflict was repaired and merged, and no product metric was changed. |
| Daily Strategic Priorities | Ranking only | ranking receipt valid; published shared-input model conflicted | Brain Management ranked queue | The ranking receipt selected the bounded Psihotavr chain. The later canonical snapshot instead publishes the shared `1/4` delivery input as three strategic aliases with three owner labels and must be reconciled to one chain. |
| Morning System Upgrade | Single primary implementation owner | latest technical repair LIVE_VERIFIED; assignment adherence and metadata failed | Brain Management implementation handoff | Implemented assignment-source parity and atomic publication guards instead of the ranked Psihotavr chain. Current `morning_system_upgrade_assignment` names `strategic-product-delivery` but retains a Daily Strategic Priorities owner label rather than the execution owner. |
| Daily Dashboard Update | Metrics, collectors, formulas, history, assignments and atomic publication | production healthy; ownership publication inconsistent | Brain Management API/history | Published current 2026-08-02 data and verified six routes, four Overview aggregates, 24 metrics, ten projects, ten Trends, seven agents, five operational APIs and no runtime-error cluster. It must now reconcile strategic priorities, assignments and active chains to the same ownership model. |
| Evening Delivery Closure | Verification, bounded recovery and terminal closure | current report still VERIFYING after a live publication | Brain Management closure result | Must reconcile the current deployment identity and close only canonical production evidence; it must not compete with routine dashboard publication. |
| Weekly Delivery System Review | Weekly execution-quality evaluator | operational scorecard merged; correction proposed | Brain Management weekly scorecard + durable governance PR | Current rolling counts are `1/4` live completion, `1/3` rework, `1/3` false-success correction, `1/1` recovery, `26/27` validations, three reconciled carryover chains, one owner blocker and one published ownership-conflict group. |
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

1. The six named management stages remain structurally separate, and the operational `automation_assignments` array currently declares no active implementation owner. However, the published strategic layer violates the one-chain contract by splitting the same `1/4` raw delivery input into `strategic-product-delivery`, `strategic-delivery-to-live` and `strategic-task-success` with three different owner labels.
2. One ranking-to-implementation handoff defect is proven: Daily Strategic Priorities assigned `psihotavr-public-collector-reachability`, while Morning System Upgrade implemented assignment-source parity/publication guards. A technically valid repair does not satisfy a different ranked assignment.
3. The published `morning_system_upgrade_assignment` is internally inconsistent: it targets `strategic-product-delivery` but labels Daily Strategic Priorities as owner. Ranking source and execution owner must be separate fields.
4. `provider-live-readiness-ezohata-finance` remains `BLOCKED_BY_OWNER` under `Owner Verification`; it is not a CI, collector or deployment repair chain.
5. `delivery-conversion-one-of-four` remains one shared chain for product delivery, task success and live completion. Morning Task Sweep owns readiness until the exact four items and one existing deliverable/repository/branch are published.
6. `psihotavr-public-collector-reachability` remains a bounded classification chain. No product code or business-KPI credit is allowed until deployment, domain, source registry and collector transport are distinguished.
7. Carryover publication is incomplete: Morning Task Sweep reconciled three chains, while canonical `active_chains` exposes only the provider blocker and does not explicitly classify omission of the delivery-conversion and Psihotavr chains.
8. The enabled Brain Regression Guard and Brain Data Freshness Watch overlap Daily Dashboard Update and Evening Delivery Closure in their current recovery language. Detection is useful; routine parallel deployment or closure is not. Emergency recovery requires a single-owner lock, exact chain_id and explicit release of ownership after terminal evidence.
9. Current rolling delivery evidence remains weak: product delivery, task success and live completion are each `1/4`; rework and false-success correction are each `1/3`. Infrastructure/control-plane closures outnumber observed operational/product closures `2:1`.
10. The repository still contains a weekly scorecard handler for the previous week, while canonical production returns 404 for that route. Weekly reviews should persist immutably in Brain Management and be published only through the dependency-closed canonical topology.
11. Disabled legacy publication guards and one-off loops remain noncanonical and must not be revived as duplicate publishers.

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
12. Correlated metrics that share one raw input must use one strategic chain and one owner label across priorities, assignments, active chains and handoffs.
13. `morning_system_upgrade_assignment` must identify Morning System Upgrade as execution owner and preserve the ranking source in a separate field.
14. Canonical publication must either expose every latest reconciled carryover chain or publish an explicit exclusion/terminal classification for each omitted chain.

## Reconciliation findings — 2026-08-30

1. Morning Task Sweep and Daily Strategic Priorities persisted 7/7; PR Delivery persisted all 13 due morning/evening slots; independent Evening Delivery Closure persisted only 5/6 due days.
2. Ranking and implementation diverged on Aug 24–25: freshness recovery held the ranking lease while Morning System Upgrade also executed multiple Trend pilots.
3. PR Delivery Sweep merged and repaired 0 PRs while 52 Brain Management PRs merged. Implementation, control-plane and recovery workers continue to bypass the exclusive GitHub delivery stage.
4. Eight Trend pilots used `LIVE_VERIFIED_NO_EFFECT_EXPLAINED`; two closure receipts used `DEPLOYMENT_PENDING`; two Morning System Upgrade receipts used `PIPELINE_BROKEN`. All 12 violate the canonical top-level terminal enum.
5. Carryover ownership is structurally named, but publication is incomplete: `/api/data` exposes only the Finance chain while freshness and the current exact Trend assignment remain nonterminal elsewhere.
6. Daily Dashboard Update remains the exclusive publisher in the contract, yet Brain Regression Guard published current refresh work on Aug 29 and Aug 30. Detection and handoff are allowed; snapshot mutation, deployment or self-closure are not.
7. The prior publisher-cadence candidate failed: six new delayed regressions, 23.5h between observed source snapshots, no second <=12h cycle, and current manifest 404.
8. Current canonical health is DEGRADED 16/18 because immutable history is 1/7 and the data/priority assignment surfaces disagree.
9. The next recovery candidate must reuse `operational-source-freshness-refresh-20260818`; a dated replacement chain or another prompt/schedule-only repair receives zero credit.
10. Success next week requires two publisher-owned <=12h cycles, zero recovery PRs, manifest 200, source SHA/artifact/deployment parity, one coherent assignment surface and delayed Evening Closure using one canonical terminal state.

## Enforcement clarifications — 2026-08-30

- A detector may open or update the existing chain and hand it to the exclusive owner; it may not become a parallel publisher or terminal closer.
- Rich diagnostic outcomes belong in a detail field. Top-level `terminal_state` remains exactly one of `LIVE_VERIFIED`, `MERGED_WAITING_DEPLOY`, `BLOCKED_BY_OWNER`, or `NO_SAFE_UPGRADE`.
- Implementation may prepare a branch and tests, but PR/CI/merge evidence is accepted only from PR Delivery Sweep and terminal closure only from Evening Delivery Closure.
- Every nonterminal reconciled chain must appear in the canonical active-chain surface or in an explicit exclusion record with owner and reason.

