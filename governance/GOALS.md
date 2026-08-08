# AI System Goals

Last reconciled: `2026-08-08`

## G1 — Complete and trustworthy project memory

- Outcome: every active or meaningful project has one discoverable identity, canonical repository/live mapping, status and capsule.
- Current state: the ten-project active overlay remains canonical. Connected GitHub now provides a bounded inventory of 30 accessible repositories, allowing secondary/backups/experimental repos to be distinguished from the ten active identities instead of leaving repository enumeration globally unknown.
- Owner: `Weekly Brain Refresh`.
- Next action: safely patch the three legacy continuity indexes without deleting secondary historical records; current routing remains `projects/portfolio-registry.json` + `projects/index.md` until that patch is complete.
- Success: no verified active project is missing, no duplicate canonical identity remains, and uncertainty/access gaps are explicit.

## G2 — Reliable execution loops with real outcomes

- Outcome: important tasks move from selection to verified product/live result without disappearing, duplicating ownership, or stopping at merge.
- Current state: ranking and discovery remain enabled, but the canonical primary implementation stage is disabled. This creates an execution ownership gap even if queue generation is healthy.
- Owner: daily management chain; scheduler state must provide exactly one enabled implementation owner before new work is treated as executable.
- Next action: restore/confirm one canonical implementation stage, then consume exactly one ranked chain rather than allowing regression/recovery guards to become routine implementers.
- Success: one implementation owner consumes the exact assigned `chain_id` through verified terminal evidence.

## G3 — Verified production and API integrity

- Outcome: deployment success means current source, complete dependencies, correct response contracts and real user behavior are verified.
- Current state: Brain Management is currently `DEGRADED_FAIL_CLOSED`. On 2026-08-08 `/api/data`, `/api/agent-productivity`, and `/api/trends` reject the shared source timestamp `2026-08-06T04:55:44.630Z` as about 49.8h old. The freshness guard is correctly preventing false-current data.
- Owner: atomic publisher for routine refresh/publication; Regression Guard only for bounded recovery.
- Next action: operational owner performs a current atomic source refresh, builds the guarded full release, publishes it, and re-reads canonical APIs.
- Success: all required APIs return current source-bound payloads and no wrapper/build/deploy timestamp masks stale source age.

## G4 — Current and non-duplicated automation map

- Outcome: each recurring workflow has one scheduler, exclusive role, persistence target, failure signal and stop condition.
- Current state: Morning Task Sweep, PR Delivery Sweep, Daily Strategic Priorities, Evening Delivery Closure and Brain Regression Guard are enabled; Morning System Upgrade, Daily Dashboard Update and Brain Data Freshness Watch are disabled. Weekly AI Trends is also disabled after its Aug 7 run. The resulting gaps are implementation, routine atomic publication/freshness, and future Trends cadence.
- Owner: `Weekly Brain Refresh` for durable registry; scheduler changes belong to the appropriate automation-management decision, not this docs-only run.
- Next action: restore only the minimum canonical stages needed for one complete chain; do not revive legacy duplicate publishers/guards.
- Success: one enabled implementation owner, one routine publisher, one closure stage, guards limited to detection/bounded recovery, and no duplicate scheduler for the same role.

## G5 — Honest business and provider evidence

- Outcome: business and provider readiness are based on fresh accepted sources, with protected or missing evidence explicitly limited.
- Current state: previous verified public business-KPI coverage was `4/6`; the current operational API is stale/fail-closed, so no newer business score is inferred here. EzoHata Finance protected provider evidence remains owner-only.
- Owner: operational collector/publisher for public sources; owner verification for protected provider proof.
- Next action: after operational freshness is restored, use only current collector evidence; separately complete protected provider verification when owner access is available.
- Success: business/provider numerators change from dated evidence, never from copied configuration or stale wrapper metadata.

## G6 — Efficient context, tools and verification

- Outcome: agents load the smallest sufficient context, reuse existing chains, avoid broad scans and measure verification rather than activity.
- Current state: repeated release/source-parity recovery and pre-step CI reachability failures consumed significant week-to-date capacity. The durable CI rule now distinguishes external `steps=null` failures from branch-code failures.
- Owner: all management automations; weekly synthesis here and in Weekly Delivery System Review.
- Next action: stop duplicate recovery PR churn, preserve exact head SHA across pre-step CI outages, and recover freshness via one canonical publication chain.
- Success: fewer repeated deploy/CI recovery attempts, no false-green substitution, and increasing share of user-visible/business outcomes after P0 recovery.

## G7 — Useful human and machine search

- Outcome: a human or agent finds the right project, state, architecture, checks and lessons through compact canonical routes.
- Current state: active routing authority is clear, but legacy continuity files still expose stale Brain Management Cloudflare mapping and older Psitherapy ambiguity.
- Owner: `Weekly Brain Refresh`.
- Next action: route legacy-index consumers through the current overlay and the Aug 8 reconciliation deltas until field-safe patches are completed.
- Success: no stale canonical target wins search precedence, while secondary/archived historical records remain discoverable.
