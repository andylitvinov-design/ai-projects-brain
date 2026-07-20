# Evening Delivery Closure Runtime Contract

Status: active.
Last updated: 2026-07-20.

This contract is subordinate to `systems/live-upgrade-delivery-contract.md`. When instructions conflict, the live delivery contract wins.

## Purpose

Evening is the closure, verification and recovery stage of the daily delivery loop. It is not a second broad architecture-ideation run and is not required to create a harness, schema, dashboard or automation change.

## Required inputs

Read, in order:

1. `systems/live-upgrade-delivery-contract.md`.
2. `systems/upgrade-cycle-metrics.md`.
3. today's Morning Task Sweep result.
4. today's Daily Strategic Priorities result.
5. today's Morning System Upgrade result.
6. unresolved-chain ledger and previous Evening handoff.
7. current canonical branch, checks, deploy and production evidence for selected chains.
8. dashboard publication evidence only when dashboard state is relevant.

Do not reread unchanged large project files unless the selected chain requires them.

## Execution order

1. Verify every Morning claim against current independent evidence.
2. Finish the highest-priority unresolved chain before considering any new work.
3. For incomplete safe work, retry the failed stage once.
4. Diagnose the exact failing layer.
5. Apply one minimal safe repair when supported by evidence.
6. Repeat the failed stage and production verification.
7. Detect regressions in intended user or operational behavior.
8. Persist carryover, failed stage, last verified evidence and next automatic action.
9. Prepare at most three ranked chains for the next Morning Task Sweep.

## Structural-upgrade gate

Evening may change harness, schema, validator, dashboard or automation instructions only when all are true:

- a repeated confirmed failure class, P0/P1 delivery bottleneck or material production risk exists;
- the change is not duplicate or cosmetic;
- it directly prevents recurrence or unblocks multiple projects;
- the rolling infrastructure ratio defined in `systems/live-upgrade-delivery-contract.md` permits it, unless the P0/P1 exception applies;
- product or operational carryover has been processed first.

## Recovery ladder

```text
fresh main -> dedup -> minimal repair -> checks -> remote branch -> PR -> CI -> merge -> deploy -> health check -> production behavior check
```

One evidence-based retry is allowed. Do not create multiple speculative repair PRs or loop indefinitely.

## Canonical terminal states

Every selected chain maps to exactly one:

- `LIVE_VERIFIED`
- `MERGED_WAITING_DEPLOY`
- `BLOCKED_BY_OWNER`
- `NO_SAFE_UPGRADE`

`APPLIED_UPGRADE`, `PARTIAL_UPGRADE_RECOVERABLE`, `PR_CREATED`, `MERGED`, `DEPLOYED`, `READY` and receipt-created are diagnostic stages only, not terminal success.

## Proof boundary

Technical proof and user proof are separate.

Technical proof may include branch, commit, PR, checks, merge SHA, deploy ID and deploy source SHA.

User proof requires the intended production route, flow or operational result to work. For applicable UI changes verify clean session, desktop, mobile and console/network state. A deploy, receipt or screenshot alone is insufficient.

## Dashboard publication boundary

The dashboard publisher remains the single deployer. Evening may verify or dispatch the canonical publisher once, but must not create a second deployer, direct provider mutation path or cosmetic heartbeat commit.

A new snapshot invalidates older live proof. Dashboard `LIVE_VERIFIED` requires exact snapshot equality, source/deploy mapping, valid receipt and visible required UI.

## Trigger-independent publication recovery

- The canonical dashboard publisher is the only workflow allowed to deploy the dashboard or create a publication receipt.
- Any watchdog, sweep or closure recovery path must not contain Netlify credentials, provider mutation logic or direct deployment commands; it may only verify or dispatch the canonical publisher once.
- A valid matching receipt and equal public timestamp require a healthy no-op: do not create a heartbeat, duplicate deploy or cosmetic commit when the exact snapshot is already proven live.
- A retry commit, queued workflow or dispatch request is not publication evidence. Require the completed canonical run, matching deploy source, equal public timestamp, required UI hooks and receipt identity.
- Recovery must work from current evidence rather than depending on one specific trigger type; push, merge and manual dispatch are diagnostic trigger sources, not separate publishers.

## Metrics update

Update daily and rolling-seven-day:

- Verified Live Upgrade Count;
- Live Completion Rate;
- Carryover Count;
- Median Cycle Time;
- Product Upgrade Ratio;
- Infrastructure Upgrade Ratio;
- Regression Rate;
- Owner Blocker Count;
- Autonomous Recovery Rate.

Unknown values remain `unknown`; non-applicable values remain `NOT_APPLICABLE`.

## Compact final report

1. `LIVE VERIFIED` today.
2. Morning claims confirmed or corrected.
3. `NOT CLOSED`: state, failed stage and next automatic action.
4. `OWNER ACTION`: one exact action, direct link and reason.
5. metrics and change since morning.
6. ranked next-morning handoff, maximum three.

Internal commits, validators, receipts and schemas are shown only when they support a delivered result or explain a blocker.
