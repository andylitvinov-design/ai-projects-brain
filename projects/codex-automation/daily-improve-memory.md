# Daily Improve Memory

Persistent memory for the Daily Improve strategic loop.

## Purpose

Each Daily Improve run must read this file before forming conclusions and update it after the analysis when GitHub write access is available. The next run should compare new evidence with the previous state instead of rediscovering the same findings from scratch.

## Update rules

- Keep only durable cross-project observations, active blockers, strategic decisions, and the single next improvement prompt.
- Never store secret values, provider payloads, financial records, or personal data.
- Use evidence states: `PROVEN`, `NEEDS_VERIFICATION`, `BLOCKED`, `RESOLVED`, `SUPERSEDED`.
- If evidence has not changed, preserve the previous conclusion and say `UNCHANGED`; do not present it as a new discovery.
- When a finding changes, record the old state, new state, evidence, and consequence.
- Mark resolved or superseded items instead of silently deleting them.
- Keep the current map compact. Retain only a short dated history below it.

## Current Key Change Map

| Priority | Finding | Delta | Evidence state | Evidence / consequence | Next route |
|---:|---|---|---|---|---|
| 1 | The missing deterministic Daily Intelligence persistence layer is implemented and CI-proven. | `RESOLVED` | `PROVEN` | PR #116 added `scripts/update-daily-intelligence.mjs`, five regression tests and the test entry in Agent Harness Validators. Run #165 passed and the PR was squash-merged as `98a844940001111fc2c94cf6980a3f28b4f00697`. The writer preserves unrelated fields, keeps publication evidence separate, derives all five delta labels and trims history to 30 days. | `/upgrade` only to bootstrap the first canonical/mirror snapshot |
| 2 | The active portfolio routing problem is substantially resolved by a canonical overlay and routing index. | `RESOLVED` | `PROVEN` | `projects/portfolio-registry.json` carries 10 active projects and `projects/index.md` routes agents to it first. Legacy `projects.md` and `projects.json` remain continuity sources marked `needs_revision`, not the active router. | `/upgrade` only for bounded legacy reconciliation |
| 3 | The adaptive dashboard validation path has green CI, while public publication remains stale. | `UNCHANGED` | `PROVEN` | PR #115 closed schema-v6 consistency drift and PR #116 added Daily Intelligence tests. Netlify still lacks a current source-mapped deploy and public timestamp equality, so Publication Freshness remains separate from merge status. | `/delivery /safe` |
| 4 | Toronto Tantra gained substantial product/content and deployment preparation, but live delivery is not yet proven. | `UNCHANGED` | `NEEDS_VERIFICATION` | PRs #15-#17 restored stronger copy/program sections, compacted mobile layouts and added the existing-project deployment runbook. Current production verification is still required. | `/delivery /safe`, then `/audit-sales` |
| 5 | Provider/live blockers and missing outcome instrumentation remain the main portfolio-wide constraint. | `UNCHANGED` | `BLOCKED` | Ezohata, EzoHata Finance, Psitherapy and Psihotavr still require their previously recorded provider/live evidence. Business Growth Outcomes still has no observed KPI source. | `/safe`, `/audit-fin`, `/planner` as routed |

## Current strategic decisions

- `projects/portfolio-registry.json` is the canonical active-project router. `projects.md` and `projects.json` are historical continuity sources until bounded reconciliation is complete.
- Treat `andylitvinov-design/ezohata-finance` as the new finance production project and `andylitvinov-design/finance` as a separate live legacy/reference system until a formal transition plan says otherwise.
- Treat `andylitvinov-design/report` as the canonical Psitherapy implementation repo.
- Treat `https://brain-management.netlify.app` as the current Brain Management production surface; Cloudflare is legacy unless current provider evidence changes this.
- Treat Toronto Tantra's 2026-07-14 merged landing changes as implementation evidence only until a current Vercel production deployment and visible behavior are verified.
- Do not infer that Psihotavr live is retired solely because its repository is inaccessible to the current connector. Require explicit repository/live-retirement evidence.
- Do not call provider-dependent work successful from merged code, a READY preview, or the newest deployment alone.
- Do not use `/audit-sales` baseline records as conversion or business-impact evidence until the scheduled audit produces observed checks.
- Daily Intelligence snapshots must be produced through `scripts/update-daily-intelligence.mjs`; manual full-file reconstruction of the dashboard JSON is superseded.

## Active blockers

- Daily Intelligence bootstrap: the writer is merged and proven, but the first top-level `daily_intelligence` snapshot must still be generated in a full repository checkout and mirrored to Brain Management.
- Brain Management: same-attempt publication trace with canonical commit, mirror commit, deploy ID/source commit/branch and equal public timestamp.
- Ezohata: Google auth provider/live owner login, server-side admin allowlist, upload/storage persistence, and refreshed public/admin visibility.
- EzoHata Finance: authorized Google origin, `FINANCE_SESSION_SECRET` presence proof by name only, signed live session, migration parity/application evidence, and current finance/provider verification.
- Psitherapy: Firebase access/project/provider/domain/env/live-login proof before draft PR #122 can become a cutover.
- Psihotavr: canonical repo/retirement state and current live source remain unknown to the current connector.
- Portfolio growth: observed KPI source, owner, cadence and outcome records are missing; `/audit-sales` baselines remain `NOT_TESTED`.

## Current single next improvement

`/upgrade` bootstrap and sync the first persisted Daily Intelligence snapshot using the merged writer. In a fresh `andylitvinov-design/ai-projects-brain` checkout at current `main`, run `node scripts/update-daily-intelligence.mjs --input projects/codex-automation/system-health-dashboard.json --observed-at 2026-07-15`, validate with `node scripts/validate-portfolio-dashboard.mjs` and `node tests/daily-intelligence-writer.test.mjs`, commit the canonical snapshot, then copy the exact resulting JSON to `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json` on a fresh branch and prove canonical/mirror semantic identity. Do not change publication status or call the dashboard LIVE without current Netlify source/deploy/timestamp proof. Final evidence: both commit SHAs, both blob SHAs, history length, indicator count, validation outputs and publication status.

## History

### 2026-07-15 — applied upgrade

- Implemented deterministic Daily Intelligence writer in PR #116.
- Added tests for first snapshot, rollover, all required labels, 30-day trimming, unrelated-field preservation and invalid explicit labels.
- Added the new test suite to Agent Harness Validators; run #165 passed.
- Squash-merged PR #116 as `98a844940001111fc2c94cf6980a3f28b4f00697`.
- Marked the previous writer blocker `RESOLVED`; narrowed the remaining work to one controlled first-snapshot bootstrap and mirror sync.

### 2026-07-15 — analysis

- Marked the canonical active portfolio overlay and routing index `RESOLVED`; legacy maps remain bounded continuity cleanup rather than the primary routing emergency.
- Confirmed schema-v6 dashboard consistency and CI closure through PR #115 / run #161, while preserving truthful stale public publication status.
- Recorded Toronto Tantra's merged content/mobile/deployment preparation as `CHANGED` but not live-proven.
- Preserved all provider/auth/data blockers as `UNCHANGED` where no new live evidence exists.
- Recorded the missing writer as the next structural upgrade.

### 2026-07-14

- First full delta-based run consumed the persistent memory and updated it instead of rediscovering the previous findings.
- Proved central registry drift across new projects, production URLs, Psitherapy mapping, and Psihotavr retirement handling.
- Marked the persistent-analysis contract `RESOLVED`; narrowed the next improvement to portfolio registry reconciliation.

### 2026-07-13

- Created persistent Daily Improve memory.
- Seeded durable findings from recent portfolio sweeps.
- Next runs must report `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED` for each major conclusion.
