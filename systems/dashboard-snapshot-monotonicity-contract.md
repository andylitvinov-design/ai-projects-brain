# Dashboard Snapshot Monotonicity Contract

Status: active guardrail for Morning System Upgrade, Evening Architecture Upgrade, Daily Strategic Improve and dashboard publication recovery.

Last updated: 2026-07-19.

## Purpose

Prevent a stale writer, delayed workflow or recovery task from replacing a newer canonical or mirror dashboard snapshot with an older one.

This contract supplements `systems/upgrade-cycle-metrics.md` and the receipt-bound publication contract.

## Invariant

For every dashboard write or sync:

```text
candidate.last_updated >= current canonical.last_updated
candidate.last_updated >= current mirror.last_updated
```

A workflow must never decrease either stored timestamp. Equal timestamps are acceptable only when the full JSON blob is identical or the write is a proven reconciliation of the same snapshot.

## Required pre-write evidence

Record immediately before the write:

- canonical blob SHA and `last_updated`;
- mirror blob SHA and `last_updated`;
- candidate blob SHA and `last_updated`;
- current canonical and mirror main-branch commit SHAs;
- writer identity and run/cycle identity.

The read must be from current `main`, not a checkout captured before another automation completed.

## Decision rules

### Canonical is newer than mirror

Apply the current run delta on top of the latest canonical snapshot, then sync the resulting complete canonical JSON to the mirror using the current mirror blob SHA as a compare-and-swap precondition.

### Mirror is newer than canonical

Do not back-sync and do not overwrite either file. Preserve the newer mirror, classify the chain `DRIFTED`, identify the stale writer and reconcile the canonical source first.

### Candidate is older than either destination

Reject the write. A delayed workflow or cached checkout is not allowed to publish an older snapshot even when its tests pass.

### SHA conflict

Re-read canonical and mirror once, recompute the delta on top of the latest canonical snapshot and retry only when preservation of all newer fields and history is provable. Otherwise stop with a precise recoverable handoff; never force the write.

## Post-write proof

Immediately after a successful write:

1. re-read canonical and mirror from current `main`;
2. verify neither timestamp decreased;
3. verify canonical and mirror JSON blob SHAs are identical;
4. verify the latest mirror commit contains that blob;
5. keep publication `STALE` or `NEEDS_VERIFICATION` until the exact snapshot completes deploy and receipt verification.

## Publication gate

`LIVE` requires all of the following for the same snapshot:

- canonical snapshot committed;
- mirror blob identical to canonical;
- production content deploy identifies the latest mirror source commit;
- public JSON timestamp equals canonical;
- required Portfolio Health, project selection, Project Health and goal-pyramid UI checks pass;
- public publication receipt binds the exact snapshot timestamp to the verified content deploy ID and source commit.

A dispatch acceptance, recovery commit, READY deploy without exact source binding, receipt deploy by itself, or timestamp equality without the receipt is not LIVE proof.

## Ownership

- Morning, Evening and Daily Strategic Improve own their explicit canonical content deltas.
- The canonical publisher validates and mirrors the explicit latest snapshot; it must not regenerate business evidence.
- The publication watchdog may recover a stale publication but may not become a second snapshot writer.

## Failure classification

Use one exact state:

- `STALE_WRITER_REJECTED`
- `CANONICAL_NEWER_MIRROR_SYNC_REQUIRED`
- `MIRROR_NEWER_CANONICAL_RECONCILIATION_REQUIRED`
- `SHA_CONFLICT_RECOVERABLE`
- `PUBLICATION_STALE`
- `LIVE_VERIFICATION_BLOCKED`
- `RECOVERED`

Do not report `LIVE`, `RECOVERED` or successful synchronization without the post-write and receipt evidence above.
