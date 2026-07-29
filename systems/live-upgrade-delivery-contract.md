# Live Upgrade Delivery Contract

Status: active canonical contract.
Last updated: 2026-07-26.

## Purpose

Turn Morning Task Sweep, Morning System Upgrade and Evening Architecture Upgrade into one closed delivery loop whose success is a verified useful result, not analysis, a commit, a PR, a merge or a deploy alone.

The daily chain is:

```text
Task Sweep -> Morning Delivery -> CI/merge/deploy -> Evening Verification/Recovery -> persisted carryover
```

## Canonical terminal states

Every selected upgrade chain must finish in exactly one state:

- `LIVE_VERIFIED`: the intended production behavior is independently verified.
- `MERGED_WAITING_DEPLOY`: canonical production branch contains the change, but the matching production deploy or live verification is still pending.
- `BLOCKED_BY_OWNER`: one exact owner-only permission, secret, account action or product decision is required and no safe connected tool can perform it.
- `NO_SAFE_UPGRADE`: no useful safe upgrade is supported by current evidence.

`DONE`, `COMPLETE`, `APPLIED`, `PR_CREATED`, `MERGED`, `DEPLOYED` and `LIVE` are forbidden as terminal success labels without the applicable evidence ladder.

Provider-specific internal failure states may be retained as diagnostic sub-statuses, but they must map to one canonical terminal state.

## Outcome priority

1. Reconcile unresolved chains from previous runs before discovering new work.
2. Finish `MERGED_WAITING_DEPLOY`, open PRs, failed CI, branches without PRs and tasks waiting for verification before starting a new upgrade.
3. Select at most three active chains per morning.
4. Prefer user-visible product value, operational reliability or measurable manual-work reduction.
5. Do not select work merely because it is architecturally interesting.

## Upgrade Candidate Score

Score every candidate using observable values:

```text
priority = impact * urgency * completion_probability / risk
```

Use a documented 1-5 rubric for each factor. Ties are broken by:

1. unresolved carryover;
2. user-visible value;
3. shorter path to verified live;
4. lower owner dependency.

Do not invent precision beyond the rubric.

## Product-to-infrastructure ratio

Across a rolling window, infrastructure/harness/dashboard upgrades may not exceed one for every three product or operational upgrades, unless a proven P0/P1 infrastructure defect blocks delivery of multiple projects.

A meta-upgrade requires evidence of a repeated failure class, production risk or material delivery bottleneck. Cosmetic dashboard, receipt, schema or prompt changes do not qualify by themselves.

## Morning responsibilities

Morning System Upgrade is the primary delivery stage:

1. read the persisted ledger and previous Evening handoff;
2. consume Task Sweep findings;
3. score candidates and select at most three;
4. finish carryover first;
5. implement the smallest safe change;
6. validate locally or through available project checks;
7. create or reuse the remote PR automatically;
8. merge when project policy permits;
9. identify the matching production deploy;
10. verify the actual user/operational behavior on live;
11. persist evidence and carryover.

A morning run is not required to modify harness/docs/schema. It may return `NO_SAFE_UPGRADE` when no safe useful work exists.

## Evening responsibilities

Evening Architecture Upgrade is a closure and recovery stage, not a second broad architecture ideation run:

1. verify every Morning claim against current canonical and production evidence;
2. retry incomplete safe stages once;
3. diagnose and minimally repair failed CI, deploy, routing or verification when safe;
4. finish one highest-priority carryover chain before starting any structural improvement;
5. detect regressions in the delivered behavior;
6. persist unresolved evidence and the ranked Morning handoff;
7. perform a harness/schema improvement only when a proven repeated failure class justifies it and the product-to-infrastructure ratio allows it.

## Recovery loop

For every safe selected chain execute:

```text
fresh main -> dedup -> minimal change -> tests -> remote branch -> PR -> CI -> merge -> deploy -> health check -> browser/user-flow check
```

On failure:

1. perform one evidence-based automatic retry;
2. identify the failing layer;
3. apply one minimal safe repair when supported;
4. repeat the failed stage;
5. otherwise map to `BLOCKED_BY_OWNER` or `MERGED_WAITING_DEPLOY` with exact evidence.

Never loop indefinitely or create multiple speculative repair PRs.

## Direct-deploy source parity gate

This gate is mandatory for Vercel/API/artifact deployments that are not built automatically from the canonical Git branch, including hand-assembled source bundles and connector-driven deployments.

Before a direct deployment can advance beyond `MERGED_WAITING_DEPLOY`:

1. generate the artifact from the current canonical production branch after merge;
2. use a repository-owned explicit file manifest or build output, not an ad hoc partial file list;
3. prove that every runtime route, API endpoint, history file, static asset and configuration file required by the delivered behavior is present;
4. bind the artifact to the canonical source commit SHA and record the artifact/file-manifest evidence;
5. deploy that exact artifact and inspect the deployed assets or production APIs for source/schema parity;
6. verify the intended production route or operation independently after deployment;
7. map any missing file, stale deployed asset, unknown source SHA or schema drift to `MERGED_WAITING_DEPLOY`, never `LIVE_VERIFIED`.

A repeated omission from a direct-deploy bundle is a delivery failure class. The recovery must update the repository-owned manifest or build process and add a regression check; another manual one-off bundle is not a durable correction.

## Evidence schema

Every upgrade record must contain:

```text
upgrade_id
observed_at
project_id
source_cycle: TASK_SWEEP | MORNING | EVENING
summary
category: PRODUCT | OPERATIONAL | INFRASTRUCTURE
candidate_score:
  impact
  urgency
  completion_probability
  risk
  priority
carryover_from
terminal_state
technical_evidence:
  branch
  commit_sha
  pr_url
  checks
  merge_sha
  deploy_id
  deploy_source_sha
user_evidence:
  production_url
  tested_route_or_flow
  desktop_result
  mobile_result
  clean_session_result
  console_network_result
blocker:
  owner_action
  direct_link
  reason
next_automatic_action
started_at
verified_at
cycle_time_minutes
regression_detected
recovery_attempted
```

Unknown fields remain `unknown`; non-applicable fields use `NOT_APPLICABLE`.

## Proof rules

Technical proof and user proof are separate.

Technical proof may include commit, PR, checks, merge SHA and deploy ID.

User proof requires the intended production route or operation to work. For relevant UI changes verify clean session, desktop and mobile, plus console/network errors. For API or background changes verify the production-equivalent observable result.

A deploy is not user proof. A screenshot without source/deploy mapping is not technical proof.

## Core metrics

Track by day and rolling seven days:

- `Live Completion Rate`: selected chains ending `LIVE_VERIFIED` / all selected chains.
- `Carryover Count`: unresolved chains at cycle close.
- `Median Cycle Time`: median minutes from selection to `LIVE_VERIFIED`.
- `Product Upgrade Ratio`: PRODUCT + OPERATIONAL verified upgrades / all verified upgrades.
- `Regression Rate`: verified upgrades with a confirmed regression / verified upgrades.
- `Owner Blocker Count`: chains ending `BLOCKED_BY_OWNER`.
- `Autonomous Recovery Rate`: failed chains recovered automatically / recoverable failed chains.
- `Infrastructure Upgrade Ratio`: INFRASTRUCTURE verified upgrades / all verified upgrades.

The primary weekly outcome is the count of useful `LIVE_VERIFIED` upgrades.

## Compact report schema

Report only:

1. `LIVE VERIFIED`: change, project, production URL and proof.
2. `NOT CLOSED`: current state, failed stage and next automatic action.
3. `OWNER ACTION`: one exact action, direct link and reason.
4. `METRICS`: daily and rolling-seven-day core metrics.

Internal validators, receipts and commits are included only when they support a delivered result or explain a blocker.

## Safety

Do not expose or mutate secret values, billing, irreversible account settings, destructive production data, risky auth/payment/provider configuration or migrations without an explicitly safe approved route.
