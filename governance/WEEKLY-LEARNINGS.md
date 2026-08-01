# Weekly AI System Learnings

> Append one compact evidence-backed section per week. Do not copy full task reports.

## Template

### Week ending YYYY-MM-DD

- **Key failures:** what materially failed or remained unfinished.
- **Root causes:** proven causes; uncertain items marked `needs verification`.
- **Repeated patterns:** issues seen more than once.
- **Fixes implemented:** links/files/PRs and verification.
- **Still open:** owner, blocker, and next exact action.
- **Efficiency changes:** context, tool, verification and automation signals.
- **Rules/index updates:** reusable lessons added to durable memory.

## Recorded weeks

### Week ending 2026-07-26 — Brain Management control-plane architecture

- **Key failures:** Brain Management production publication drifted from repository schema; canonical 24-metric history covered only `3/7` required dates; metric-level `source_refs` were absent; the action queue lacked the full measurable-input contract; one 100→100 collector refresh appeared among completed improvements; Weekly Delivery System Review had no structured operational receipt.
- **Root causes:** direct Vercel deployment bundles and repository source diverged; immutable history was introduced after the week started; evidence remained attached mainly to chains/global records; weekly review persistence was not enforced; regression tests retained obsolete routes and assumptions.
- **Repeated patterns:** merge/source readiness was mistaken for publication completeness; bundles omitted newly added routes; old tests verified previous UI/data contracts rather than current behavior.
- **Fixes implemented:** Brain Management PR #80 added read-only history/control-plane audits and current regression tests; PR #81 expanded the direct source bundle to include Trends, health/history APIs and immutable-snapshot dependencies.
- **Still open at cutoff:** attach evidence references to all metrics, accumulate four future honest snapshots, enrich action items with measurable inputs/effects, classify 100→100 events as collector refreshes, persist weekly-review output and publish exact-source health/history routes.
- **Efficiency changes:** weekly review separated source validation, regression repair and production verification without changing formulas.
- **Rules/index updates:** numeric 24/24 coverage alone is insufficient. Health also requires formula versions, raw inputs, sources, immutable history, unique ownership, anti-gaming guards, memory sync, complete action contracts and structured weekly persistence.

### Week ending 2026-08-01 — Production closure, API contracts and durable sync

- **Key failures:** the machine portfolio registry still routed Brain Management to historical Netlify after the capsule and live product had moved to Vercel; two canonical API routes returned the HTML application shell with HTTP 200; product delivery/task success/live completion remained a shared `1/4`; provider/live readiness remained `0/4`; the first API-repair design would have exceeded the Vercel Hobby limit with 14 functions.
- **Root causes:** durable registry reconciliation lagged behind operational recovery; prior checks accepted status without validating response body/content type; the route repair initially added functions instead of reusing the constrained shared runtime; the delivery-conversion handoff did not identify one exact denominator item and canonical implementation repository.
- **Repeated patterns:** operational fixes can reach production before durable indexes are reconciled; a successful transport status can hide the wrong application payload; direct/publication paths fail when dependency or platform-budget closure is incomplete; low metrics can generate duplicate work unless correlated inputs are explicitly deduplicated.
- **Fixes implemented:** Brain Management PR #161, merge `92cec78d0ee474ef53db904ec97abe5521a5824f`, reused existing functions and moved canonical API readiness `3/5 → 5/5`; production verified six routes, four Overview aggregates, 24 metrics, ten Trends, seven agents, six manifest shortcuts and no runtime-error cluster. Daily Dashboard Update then published fresh evidence at commit `1e297dfb9b0dc7bc4a327319107b27db47c706a8`, including public business-KPI coverage `4/6`. This weekly refresh reconciled the canonical Vercel mapping and closed the stale registry discrepancy in a focused documentation PR.
- **Still open:** `Owner Verification` must complete one current EzoHata Finance session/read-only provider journey; Daily Strategic Priorities must select one concrete deliverable for the shared `1/4` input; Psihotavr collector/live/source state remains `needs verification`; legacy `projects.md`, `projects.json` and `data/project-index.json` need bounded field reconciliation; complete seven-day history and per-metric source coverage must be accumulated honestly.
- **Efficiency changes:** Morning reconciliation removed four duplicate/terminal chains; PR hygiene reduced verified open PRs `46 → 36`, merged three focused docs PRs and closed seven obsolete/superseded PRs; implementation-owner conflicts remained zero; one diagnostic iteration replaced the over-budget 14-function candidate with a compliant shared-function solution.
- **Rules/index updates:** API success requires status, content type, body and parseability. Platform-budget closure is part of deployability. Correlated metrics with one raw input must share one implementation chain. Operational recovery and durable catalog sync are separate stages, and Weekly Brain Refresh owns the latter.
