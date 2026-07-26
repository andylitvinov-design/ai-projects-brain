# Weekly AI System Learnings

> Append one compact evidence-backed section per week. Do not copy full task reports.

## Template

### Week ending YYYY-MM-DD

- **Key failures:** what materially failed or remained unfinished.
- **Root causes:** proven causes; uncertain items marked `needs verification`.
- **Repeated patterns:** issues seen more than once.
- **Fixes implemented:** links/files/PRs and verification.
- **Still open:** owner, blocker, and next exact action.
- **Efficiency changes:** context, tool, verification, and automation signals.
- **Rules/index updates:** reusable lessons added to system memory.

## Current week

### Week ending 2026-07-26 — Brain Management control-plane architecture

- **Key failures:** Brain Management production publication drifted from repository schema; canonical 24-metric history covers only 3 of the required 7 dates; metric-level `source_refs` are absent; the action queue does not yet carry the full measurable-input contract; one 100→100 collector refresh is listed among completed metric improvements; Weekly Delivery System Review has no structured operational receipt.
- **Root causes:** the direct Vercel deployment bundle and repository source list diverged; immutable history was introduced after the current week started and older dates cannot be reconstructed safely; evidence remains attached mainly to chains and global records rather than every metric; weekly review persistence was not enforced by a machine-readable contract; regression tests retained obsolete routes and control-plane assumptions.
- **Repeated patterns:** merge/source readiness was repeatedly mistaken for publication completeness; deployment bundles omitted newly added routes; old tests verified previous UI/data contracts rather than current canonical behavior.
- **Fixes implemented:** Brain Management PR #80 added read-only history and control-plane health audits plus current regression tests; PR #81 expanded the direct Vercel source bundle to include Trends, health/history APIs and immutable snapshot dependencies. The main production API was verified on schema v3 with 24 metrics, 10 projects, formula version, raw inputs, current assignments, active chains, guardrails and memory sync.
- **Still open:** Daily Dashboard Update should attach evidence references to all 24 metrics, collect four future honest daily snapshots rather than fabricate missing dates, enrich every action-queue item with numerator/denominator and expected-effect fields, reclassify 100→100 events as collector refreshes, persist Weekly Delivery System Review output, and publish the new health/history endpoints from the exact source bundle.
- **Efficiency changes:** the weekly review now separates source validation, regression repair and production verification; one repair cycle aligned stale tests with the current control-plane contract without changing scores or formulas.
- **Rules/index updates:** numeric 24/24 coverage alone is not sufficient evidence of control-plane health. Weekly architecture health requires valid formula versions, raw inputs, per-metric sources, immutable-history coverage, unique ownership, anti-gaming guards, memory-sync state, action-queue completeness and structured weekly-review persistence. Never backfill missing operational history without source evidence.
