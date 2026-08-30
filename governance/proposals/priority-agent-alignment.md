# Priority → Agent Alignment proposal

Status: candidate
Date: 2026-08-10

## Purpose

Make the current strategic-priority set an auditable input into agent work without turning ranking into implementation ownership.

## Proposed durable contract

1. Daily Strategic Priorities remains ranking-only and publishes the ranked top set with stable `priority_id`, `chain_id`, metric, current input, target input, executability state and blocker.
2. A strategic implementation result may receive strategic-impact credit only when the executing record points to the exact current `chain_id` (or an explicit canonical reassignment record maps the prior chain to the current chain).
3. Agent work that is valid but has no exact current priority/chain relationship must be classified `ROLE_MAINTENANCE_NOT_PRIORITY_WORK`; it may receive maintenance/delivery credit but not strategic-priority impact credit.
4. The control plane must publish the stages `RANKED → EXECUTABLE/BLOCKED → ASSIGNED → IMPROVED → LIVE_VERIFIED` for each current strategic priority.
5. Dashboard/agent reporting must expose aggregate coverage: ranked, executable, assigned, metric-improved and LIVE_VERIFIED priority counts.
6. Regression guards must fail if the current top set disappears, ranks are incomplete, strategic credit is shown without a current chain link, or maintenance work is presented as priority impact.
7. The published priority surface must be atomic: exactly one rank sequence `1..8`, one current `morning_system_upgrade_assignment`, and one `selected_trend_task` whose task and chain identities match that assignment. Terminal prior tasks must not remain selected beside a new assignment.
8. One implementation owner per chain remains unchanged. Ranking does not itself create an implementation owner.
9. Activating this candidate as a lifecycle rule is forbidden until repeated production evidence proves the contract is used across ranking, assignment, agent reporting and terminal verification. Activation must not be performed merely to increase `rule_lifecycle`.

## Current implementation evidence

Brain Management now renders a `priority-agent-alignment` view on Overview and Agents, computes strategic impact only from exact current `chain_id` matches, classifies unmatched agent work as maintenance, and has a runtime regression guard for the alignment contract. This proposal records the reusable architecture without changing metric formulas or active-rule counts.

On 2026-08-30 the canonical priority API exposed a concrete atomicity defect: eight rows contained duplicate rank `1` and no rank `3`, `selected_trend_task` still named terminal Persistent work, while `morning_system_upgrade_assignment` named the next CLAP task. Brain Management PR #473 proposes a source and regression-guard repair. The raw metric formulas and business/product scores remain unchanged; this is control-plane reliability evidence only.

## Acceptance for future activation

- At least two independent ranked cycles with current top-set identities.
- At least one assigned current priority implemented by its named execution owner.
- Exact before/after raw input and metric evidence tied to the same chain.
- Canonical production `LIVE_VERIFIED` proof for the assigned chain.
- A tested negative case showing unmatched maintenance work does not receive strategic-impact credit.
