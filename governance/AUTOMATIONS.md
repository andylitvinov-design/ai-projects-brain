# Automation Registry

Last reconciled: `2026-09-13`

## Registry contract

Every recurring automation record must identify its scheduler, exclusive role, cadence, persistence target, failure signal, overlap boundary and stop condition. Documentation alone does not prove an automation is enabled; scheduler evidence is required.

## Canonical management chain

| Automation | Exclusive role | Current health | Persistence | Current evidence / next action |
|---|---|---|---|---|
| Morning Task Sweep | Discovery, carryover reconciliation, deduplication and readiness handoff | healthy with one readiness gap | Brain Management morning handoff | Latest reconciliation removed four duplicate/terminal aliases, preserved three carryover chains and rejected an assignment that lacked the exact denominator item, deliverable, repository and branch. |
| PR Delivery Sweep | PR/branch/CI/review/conflict/merge stage plus open-PR hygiene | active but bypassed; hosted gate red | Brain Management PR-delivery result | Sep 7–13: 0 merges and 0 repairs while 46 Brain Management PRs merged externally; one superseded duplicate PR was closed. The latest inventory is 49 open and 0 ready. |
| Daily Strategic Priorities | Ranking only | active; handoff coverage partial | Brain Management ranked queue | Five of seven daily receipts are persisted. The recurring freshness blocker stayed rank 1, but Morning System Upgrade executed 14 Trend pilots instead. It must now rank the runnable-publisher recovery candidate before another pilot. |
| Morning System Upgrade | Single primary implementation owner | active; stage and terminal-state overlap | Brain Management implementation handoff | Implemented, merged, deployed and self-terminalized 14 zero-effect Trend pilots. Its enabled prompt explicitly uses noncanonical success labels; routine publication and terminal closure must be removed from this stage. |
| Daily Dashboard Update | Metrics, collectors, formulas, history, assignments and atomic publication | **disabled; exclusive owner not runnable** | Brain Management API/history | Scheduler evidence shows the existing automation disabled since 2026-08-28. Re-enable this same publisher on one fixed <=6h cadence; do not create a parallel publisher. |
| Evening Delivery Closure | Verification, bounded recovery and terminal closure | active; immutable coverage failed | Brain Management closure result | Only 2/6 due receipts are canonical on main; the Sep 12 receipt remains open in PR #569 after a failed release gate. Diagnostic no-effect labels must map beneath one canonical terminal state. |
| Weekly Delivery System Review | Weekly execution-quality evaluator | current scorecard and durable correction proposed | Brain Management weekly scorecard + durable governance PR | Sep 7–13: 0/17 canonical live closures, 0 metric gains, 14 zero-effect pilot receipts, 137/158 failed Actions runs, three carryover chains and one disabled-owner defect selected for recovery. |
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

## Reconciliation findings — 2026-09-13

1. **Exclusive-owner availability failed.** Daily Dashboard Update is the canonical publication owner but its scheduler is disabled. A chain must not be assigned to an automation that cannot run; restore the existing automation or explicitly reassign before implementation.
2. **Publication execution overlapped.** Morning System Upgrade and Sunday Dashboard Review created publication/deployment changes while the exclusive publisher was unavailable. Emergency diagnosis does not grant routine publisher ownership.
3. **GitHub delivery remained separate only on paper.** PR Delivery Sweep merged/repaired 0 PRs while 46 Brain Management PRs merged elsewhere. Production CI failed 61/61, Mobile Release had 0/67 successes, and canary failed 13/13; merges using local/focused checks did not close the repository-owned gate.
4. **Closure ownership and vocabulary failed.** Only 2/6 due Evening Closure receipts are on main. All 14/14 Trend terminal receipts use LIVE_VERIFIED_NO_EFFECT_EXPLAINED, although the delivery contract allows only LIVE_VERIFIED, MERGED_WAITING_DEPLOY, BLOCKED_BY_OWNER and NO_SAFE_UPGRADE.
5. **Ranking and implementation diverged.** Five recorded ranking receipts kept the freshness chain at rank 1, while implementation completed 14 rank-2 Trend pilots with zero same-metric effect.
6. **Carryover identity persisted but runnable ownership did not.** The same freshness, Finance and Trend lease IDs recur in recorded handoffs; publication must remain nonterminal until a runnable publisher and delayed independent closure exist.
7. **The previous cadence candidate failed.** No observed interval met <=12 hours, at least four recovery PRs were created, exact source/deploy attribution remains open and the immutable window is 1/7.

### Focused ownership correction

- Daily Dashboard Update: re-enable the existing automation and make it the only routine operational snapshot writer/publisher on one fixed <=6h cadence.
- Morning System Upgrade: implementation only; may repair a blocking publisher contract once, but must hand PR/CI/merge to PR Delivery Sweep and never self-issue terminal success.
- Sunday Dashboard Review: metric/control-plane architecture and read-only verification; no routine operational publication.
- PR Delivery Sweep: one unchanged-head green hosted gate before merge; red/cancelled hosted delivery is not replaceable by a merge count.
- Evening Delivery Closure: independent delayed verification and canonical terminal mapping only.

The recovery target is two consecutive publisher-owned cycles <=12 hours, zero new recovery PRs, exact source/artifact/deployment attribution, manifest/API health and honest 7/7 daily identities by the next weekly reconciliation. Prompt, scheduler, documentation, PR, merge and deploy changes receive zero improvement credit until that actual-effect receipt exists.
