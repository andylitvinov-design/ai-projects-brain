# Harness Stabilization Gate

Use this gate for agent/Codex operating-system work, dashboard publication work, automation contracts, validators, memory schemas, and other harness changes.

## Purpose

Prevent a confirmed fix from turning into a rapid chain of narrowly scoped follow-up PRs that repeatedly expose adjacent contract drift.

The gate does not forbid legitimate regression fixes. It changes the operating mode from feature growth to stabilization when repeated follow-ups show that the affected execution path was not exercised end to end before promotion.

## Trigger

Enter `STABILIZATION_MODE` when any condition is true:

1. A second post-merge regression PR is required for the same failure chain within 24 hours.
2. Three or more PRs touch the same harness path, workflow, schema, publisher, or evidence contract within 72 hours.
3. A merged harness change causes a new failure in an adjacent canonical layer such as writer -> validator -> publisher -> provider -> public proof.
4. The same run repeatedly changes architecture, evidence wording, counters, or lifecycle state before one clean scheduled cycle is observed.

Security, data-loss, auth, payment, billing, or production-severity incidents may bypass batching when delay is unsafe, but they still require the delivery-proof ladder and an explicit incident reason.

## Required response

When the trigger fires:

1. Stop adding new features, score increases, new abstractions, or unrelated cleanup to the affected chain.
2. Re-fetch fresh `main` and search open/recently closed PRs for the same failure chain and target files.
3. Mark the finding `POST_MERGE_REGRESSION` and record the merge/PR that exposed it.
4. Inventory the whole affected path before editing. Example:
   `writer -> canonical snapshot -> mirror -> workflow trigger -> CI -> provider deploy -> public receipt -> visible behavior`.
5. Consolidate all currently proven compatible fixes into one stabilization PR. Reuse an existing open PR when possible.
6. Run the widest relevant safe regression set for that path, not only the single newly failing check.
7. Do not claim the chain stabilized until one clean scheduled or production-equivalent cycle completes without another corrective PR.
8. Update durable memory with the original failure, follow-up count, final regression coverage, and the clean-cycle evidence.

## PR budget

During `STABILIZATION_MODE`:

- one open stabilization PR per failure chain;
- no separate evidence-only PR when the evidence update can safely travel with the stabilization change;
- no follow-up PR solely to repair wording, IDs, counters, or documentation that could have been covered by the same end-to-end replay;
- a new PR after merge requires a proven newly observed regression and must link the exposing run/commit.

## Promotion boundary

A stabilization change may be merged when:

- fresh-main and duplicate-work checks pass;
- the PR is remotely accessible and based on the canonical branch;
- all relevant validators and workflow checks pass;
- the change is minimal and safely reversible;
- no risky provider/auth/payment/data boundary is crossed.

`MERGED` ends the code-change phase but not stabilization. The chain exits `STABILIZATION_MODE` only after the required clean cycle is proven.

## Completion states

Use exactly one:

- `STABILIZATION_REQUIRED`
- `STABILIZATION_PR_OPEN`
- `STABILIZATION_MERGED_AWAITING_CLEAN_CYCLE`
- `STABILIZED_VERIFIED`
- `STABILIZATION_BLOCKED`

Do not use `COMPLETE`, `LIVE`, or `STABILIZED` from local checks, a green PR, or merge evidence alone when the failure chain includes provider/public behavior.

## Weekly review check

The Weekly Agent Harness Review must report:

- failure chains that crossed the trigger;
- number of follow-up PRs and why they were needed;
- whether feature work was frozen;
- reused/superseded PRs;
- stabilization PR and CI evidence;
- clean scheduled/live cycle evidence or the exact remaining blocker;
- whether instruction/context size decreased, stayed neutral, or increased.
