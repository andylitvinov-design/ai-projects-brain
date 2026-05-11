# Debug Log - ezohata-incoming-ledger

## 2026-05-11 - Movement total mismatch and deploy source preflight gap

### Problem

Production UI in `Движение средства` showed a wrong `Итого` value under `BALANCE`.

Observed screenshot period:

- selected period: `2026-05-05..2026-05-11`;
- rendered total row: `-340.5000`;
- visible numeric `NUMBER` rows under `BALANCE` summed manually to `218.2244`.

### Evidence

Visible row values from the screenshot:

```text
6 + 103 + 5.15 + 110.50 + 51.5 - 51.5 + 0 - 6 + 25.75 - 28.75 + 3 - 0.4256 = 218.2244
```

The total row displayed `-340.5000`, so the table total was not derived from currently visible period-filtered rows.

Cloud Code later reported that production was deployed from a stale feature branch and the intended PR was not present in production. This made the first failing layer `deploy/source-of-truth mismatch` before any formula patch.

### Failing Layer

Primary: deploy/source-of-truth.

Secondary risk: UI/client movement aggregation can preserve or rebuild a stale total row.

### Root Cause

The debugging process patched code before proving production source of truth. The live production deployment did not contain the intended movement total fix, so the live UI kept showing old behavior.

### Fix Plan

1. Verify live deploy source before any further patch:
   - live status endpoint;
   - Vercel production deploy branch/commit;
   - GitHub default branch HEAD;
   - relevant open PR status.
2. Merge/deploy the movement total fix if checks pass.
3. Verify live period `2026-05-05..2026-05-11`.
4. If the total is still wrong after source alignment, patch the final movement render/aggregation layer so `Итого BALANCE` equals the sum of visible numeric rows.

### Regression Requirement

Add/keep a fixture where:

- visible rows sum = `218.2244`;
- stale total = `-340.5000`;
- expected rendered total = `218.2244`.

### Prevention

New mandatory preflight:

- prove production branch/commit before patching;
- if live does not include the intended fix, classify as `deploy/source-of-truth mismatch`;
- do not debug formulas until the deploy mismatch is resolved.

### Changed Memory Files

- `systems/production-debug-protocol.md`
- `projects/ezohata-incoming-ledger/DEBUG_PLAYBOOK.md`
- `projects/ezohata-incoming-ledger/CHECKS.md`
- `projects/ezohata-incoming-ledger/RISKS.md`
- `projects/ezohata-incoming-ledger/DEBUG_LOG.md`

### Verification

needs verification: run project-memory validation and then verify the actual app deploy.

### Remaining Risks

- Production can still point to a stale feature branch if release guard does not enforce production branch/commit.
- Screenshot-only debugging can still mislead agents unless the preflight is followed.

## 2026-05-01 - Project memory initialized

### Problem

Project-specific memory files were missing or incomplete for
this project.

### Evidence

projects.json listed the project, but the expanded
eight-file memory set needed to be created.

### Root Cause

The repo previously used central inventory plus minimal
Level 2 memory wiring.

### Fix

Created the expanded project memory file set from safe
inventory data.

### Changed Files

- PROJECT.md
- SYSTEM_MAP.md
- DATA_SCHEMA.md
- CODE_ACCESS.md
- DATA_SAMPLES.md
- DEBUG_LOG.md
- RISKS.md
- CODEX_BRIEF.md

### Verification

needs verification

### Remaining Risks

Inventory facts may be stale. Unknown fields remain marked
as needs verification.
