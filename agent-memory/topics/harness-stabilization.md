# Harness stabilization failure class

## RAPID_FOLLOW_UP_PR_CASCADE

**Status:** active durable lesson  
**First confirmed:** 2026-07-19  
**Scope:** agent harness, dashboard publication, automation contracts, validators, schemas, evidence ledgers

### Observed failure

From 2026-07-15 through 2026-07-19, the dashboard/strategic publication chain required a dense sequence of implementation and corrective PRs. Several later PRs explicitly repaired behavior exposed only after the immediately preceding PR was merged or exercised, including:

- writer/publication integration;
- Morning/Evening ownership races;
- `NOT_APPLICABLE` evidence semantics;
- same-day strategic baseline and counter idempotency;
- cycle identity and attempt IDs;
- Markdown/JSON synchronization;
- immutable live receipts and recovery observation.

The individual changes were generally safe and evidence-aware, but the chain showed that adjacent layers were being validated incrementally rather than through one end-to-end stabilization replay.

### Root cause

1. The harness rewarded each newly discovered narrow gap with another immediately mergeable PR.
2. Fresh-main and duplicate-PR checks prevented parallel duplicates but did not limit sequential follow-up PR cascades.
3. A green PR proved its own checks, not a clean scheduled cycle across writer, validator, publisher, provider, receipt, and visible public behavior.
4. Evidence/dashboard updates were sometimes split into separate PRs after the implementation PR.
5. Progress metrics could increase before the affected runtime path completed a clean cycle.

### Permanent rule

Apply `systems/harness-stabilization-gate.md` whenever a failure chain reaches two post-merge regression PRs within 24 hours or three related PRs within 72 hours.

The response is:

```text
freeze feature growth
-> fresh-main/dedup
-> inventory the full affected path
-> one consolidated stabilization PR
-> widest relevant safe regression set
-> merge proof
-> one clean scheduled/production-equivalent cycle
-> durable memory closure
```

### Forbidden behavior

- opening multiple simultaneous stabilization PRs for the same chain;
- increasing strategic/harness progress from architecture-only evidence while the affected runtime cycle remains unstable;
- using a green PR or merge as proof that a provider/public chain is stabilized;
- creating a separate evidence-only follow-up PR when the evidence update can safely be included in the stabilization PR;
- continuing feature additions while the same chain keeps producing corrective PRs.

### Required evidence

Record:

- first PR/merge in the chain;
- follow-up PR count and time window;
- exact adjacent layer that failed;
- stabilization PR URL and remote head SHA;
- relevant CI/workflow checks;
- clean-cycle run/deploy/public proof when applicable;
- final state: `STABILIZED_VERIFIED` or exact blocked state.

### Review condition

Promote this lesson from `active` to `proven` after three qualifying chains correctly enter stabilization mode and avoid an unnecessary additional follow-up PR.
