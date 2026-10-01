# Management Control Plane Contract

## Purpose

Define one non-duplicating management architecture across ChatGPT Automations, `ai-projects-brain`, and `brain-management`.

## Canonical roles

### `ai-projects-brain` — durable source of truth

Owns:

- project catalog and canonical repo/live mappings;
- project capsules, current state, decisions, checks, risks, and lessons;
- AI-system governance memory;
- automation registry, ownership rules, weekly errors, goals, and reusable operating knowledge;
- human and machine indexes.

It stores durable facts and decisions. It is not the daily metrics calculator and not the live dashboard.

### `brain-management` — operational control plane

Owns:

- current metrics and immutable daily snapshots;
- action queues and automation assignments;
- current chain status, stalls, regressions, and collector health;
- dashboard/API publication and operational visualization;
- short-lived operational evidence needed for today's execution.

It computes and displays current operational state. It must not become a second project catalog or long-term policy archive.

### ChatGPT Automations — collectors and workers

Own:

- reading the canonical memory and current operational queue;
- executing their assigned stage only;
- writing operational results to `brain-management` when supported;
- persisting durable outcomes, decisions, errors, and lessons to `ai-projects-brain`.

They must not create parallel registries, duplicate ownership, or independent score definitions.

## Read order for every management automation

1. Read `ai-projects-brain/systems/management-control-plane-contract.md`.
2. Read the relevant project capsule and durable governance memory in `ai-projects-brain`.
3. Read current `brain-management` API/control-plane data.
4. Read only the automation-specific carryover and evidence required for its role.

## Write contract

Every enabled management automation must produce two outputs:

### Operational write

Update or prepare evidence for `brain-management`:

- chain stage and terminal state;
- selected metric and exact changed input;
- timestamps;
- PR/CI/merge/deploy/live evidence;
- blockers and next automatic action;
- collector or publication findings.

### Durable memory write

Update or propose a focused PR to `ai-projects-brain` only when durable facts changed:

- project state or canonical mapping;
- important decision;
- repeated error/root cause;
- reusable verification lesson;
- automation ownership or contract change;
- weekly goal, unresolved strategic blocker, or efficiency finding.

Routine daily receipts must not bloat project memory. Aggregate them in weekly summaries.

## Exclusive ownership

- `PR Delivery Sweep`: GitHub branch/PR/CI/merge reachability only.
- `Morning Task Sweep`: discovery, reconciliation, carryover, and executable handoff.
- `Daily Strategic Priorities`: ranking only; no implementation.
- `Morning System Upgrade`: primary implementation owner.
- `Evening Delivery Closure`: verification, recovery, and terminal closure.
- `Daily Dashboard Update`: metrics, collectors, formulas, history, assignments, and publication.
- `Weekly Delivery System Review`: delivery-process effectiveness and durable corrections.
- `Sunday Dashboard Review`: metric/control-plane architecture and dashboard quality.
- `Weekly Brain Refresh`: durable catalog, governance memory, automation registry, and indexes.

No two automations may own the same implementation task or metric action simultaneously. Carryover ownership persists until terminal state or explicit reassignment.

## Handoff schema

Each automation should persist or report:

- `run_date`
- `automation_name`
- `role`
- `project_id`
- `chain_id`
- `target_metric`
- `before_input`
- `action_taken`
- `current_stage`
- `terminal_state`
- `evidence_refs`
- `next_owner`
- `next_action`
- `durable_memory_update`: `none | proposed | committed | PR`
- `needs_verification`

## Anti-duplication gates

Before acting, each automation must:

1. check current assignment and carryover owner;
2. reuse an existing chain/PR when equivalent;
3. refuse parallel implementation if another owner is active;
4. write a handoff rather than duplicating work;
5. distinguish durable memory from daily operational telemetry.

## Weekly reconciliation

`Weekly Brain Refresh` is the canonical weekly memory reconciler. It reads weekly summaries from `brain-management` and other automations, then updates `ai-projects-brain`.

`Sunday Dashboard Review` may improve the operational control plane but must not independently rebuild project memory or governance indexes.

`Weekly Delivery System Review` evaluates execution quality and writes durable lessons into the weekly governance memory; it does not own dashboard formulas unless a repeated delivery defect proves a required contract change.

## Source precedence

1. Verified live/product evidence.
2. GitHub PR/commit/workflow evidence.
3. `brain-management` immutable operational history.
4. Current `ai-projects-brain` project state and decisions.
5. Automation report claims.

Conflicts must be marked `needs verification`; newer claims do not override verified evidence automatically.
## Metric evidence continuity

The reusable metric-evidence contract is defined in [metric-evidence-continuity-contract.md](metric-evidence-continuity-contract.md).

A metric publication is structurally healthy only when the unchanged-formula chain is auditable: `raw input → measurement mode → formula text + formula version → source refs → immutable daily identity`. Missing evidence metadata is a control-plane reliability defect, not evidence of a product or business score change.

## Accepted dependent-overlay semantics — 2026-09-27

A compatibility, historical, or publication overlay is a dependent surface; it is not an independent source of current operational truth.

- if its canonical dependency returns a non-200 status or omits the required schema, the overlay must not apply historical patches, invent a partial payload, or throw an unhandled runtime exception;
- the overlay must return a structured fail-closed response that preserves the upstream status and error class;
- release validation must exercise the full dependency chain against an unavailable or stale canonical source;
- an immutable source manifest must match the exact byte count and content hash of every tracked source before tests and release; identity drift is a release-blocking control-plane defect;
- reconciling an identity manifest to already committed content does not refresh the source timestamp, change a metric formula, or earn metric/product credit.

Acceptance evidence: Brain Management PR #629. On the unchanged 2026-09-27 source evidence, `/api/data-publication-current` changes from an unhandled `500 FUNCTION_INVOCATION_FAILED` path to a structured dependency `503`; the six-file source manifest changes from `5/6` to `6/6` exact identities. Canonical source time remains `2026-09-18T18:26:12.350Z`, production snapshot time remains `2026-09-15T11:34:55.858Z`, and formula version `2026-07-25-v1-preserved` remains unchanged. This is reliability/evidence repair only and receives zero business or product outcome credit.
