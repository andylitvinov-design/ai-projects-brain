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
| 1 | Daily Intelligence now has a merged public UI and an automation contract, but the canonical snapshot still has no top-level `daily_intelligence` object. | `NEW` | `BLOCKED` | Brain Management PR #38 added the tab and fallback renderer. The current canonical and mirror blobs remain schema v6 without explicit Daily Intelligence history. This run could read the full snapshot only through truncated connector responses; the contents API requires a full-file replacement, so a safe unrelated-field-preserving write could not be proven. | `/upgrade` |
| 2 | The active portfolio routing problem is substantially resolved by a canonical overlay and routing index. | `RESOLVED` | `PROVEN` | `projects/portfolio-registry.json` now carries 10 active projects and `projects/index.md` routes agents to it first. The previous claim that the canonical registry omitted Ezohata, EzoHata Finance, Toronto Tantra and Psitherapy/report is superseded. Legacy `projects.md` and `projects.json` remain continuity sources marked `needs_revision`, not the active router. | `/upgrade` only for bounded legacy reconciliation |
| 3 | The adaptive dashboard validation path moved from local-only evidence to green CI, while public publication remains stale. | `CHANGED` | `PROVEN` | PR #115 merged the schema-v6 consistency gate; Agent Harness Validators run #161 passed. Canonical Markdown and JSON agree, and canonical/mirror blobs match. Netlify still lacks a current source-mapped deploy and public timestamp equality, so Publication Freshness remains `STALE 2/4`. | `/delivery /safe` |
| 4 | Toronto Tantra gained substantial product/content and deployment preparation, but live delivery is not yet proven. | `CHANGED` | `NEEDS_VERIFICATION` | PRs #15-#17 restored stronger copy/program sections, compacted mobile layouts and added the existing-project deployment runbook. The workflow still requires authorized `VERCEL_TOKEN` execution and current production verification; merged code is not counted as a live outcome. | `/delivery /safe`, then `/audit-sales` |
| 5 | Provider/live blockers and missing outcome instrumentation remain the main portfolio-wide constraint. | `UNCHANGED` | `BLOCKED` | Ezohata still lacks complete owner-auth/upload/storage/live persistence proof; EzoHata Finance lacks signed live session, authorized origin, migration/provider/balance proof; Psitherapy draft PR #122 lacks Firebase/provider/domain/env/live-login proof; Psihotavr repo/source/retirement truth remains inaccessible; Business Growth Outcomes still has no observed KPI source. | `/safe`, `/audit-fin`, `/planner` as routed |

## Current strategic decisions

- `projects/portfolio-registry.json` is the canonical active-project router. `projects.md` and `projects.json` are historical continuity sources until bounded reconciliation is complete.
- Treat `andylitvinov-design/ezohata-finance` as the new finance production project and `andylitvinov-design/finance` as a separate live legacy/reference system until a formal transition plan says otherwise.
- Treat `andylitvinov-design/report` as the canonical Psitherapy implementation repo.
- Treat `https://brain-management.netlify.app` as the current Brain Management production surface; Cloudflare is legacy unless current provider evidence changes this.
- Treat Toronto Tantra's 2026-07-14 merged landing changes as implementation evidence only until a current Vercel production deployment and visible behavior are verified.
- Do not infer that Psihotavr live is retired solely because its repository is inaccessible to the current connector. Require explicit repository/live-retirement evidence.
- Do not call provider-dependent work successful from merged code, a READY preview, or the newest deployment alone.
- Do not use `/audit-sales` baseline records as conversion or business-impact evidence until the scheduled audit produces observed checks.

## Active blockers

- Daily Intelligence: no persisted top-level snapshot/history in the canonical dashboard JSON; this run could not safely replace the minified full file through the available connector without risking unrelated-field loss.
- Brain Management: same-attempt publication trace with canonical commit, mirror commit, deploy ID/source commit/branch and equal public timestamp.
- Ezohata: Google auth provider/live owner login, server-side admin allowlist, upload/storage persistence, and refreshed public/admin visibility.
- EzoHata Finance: authorized Google origin, `FINANCE_SESSION_SECRET` presence proof by name only, signed live session, migration parity/application evidence, and current finance/provider verification.
- Psitherapy: Firebase access/project/provider/domain/env/live-login proof before draft PR #122 can become a cutover.
- Psihotavr: canonical repo/retirement state and current live source remain unknown to the current connector.
- Portfolio growth: observed KPI source, owner, cadence and outcome records are missing; `/audit-sales` baselines remain `NOT_TESTED`.

## Current single next improvement

`/upgrade` implement a deterministic Daily Intelligence snapshot writer for `projects/codex-automation/system-health-dashboard.json`. Outcome: every Daily Improve run can preserve the previous snapshot, derive observed yesterday→today rows from the existing metric schema and current decision map, append one compact dated history entry (latest 30 only), validate required fields and sync the identical JSON to `andylitvinov-design/brain-management/system-health-dashboard/data/current-system-health-dashboard.json`. Source of truth: `daily-improve-memory.md`, the current canonical dashboard JSON, `metric_schema`, `projects/portfolio-registry.json`, publication evidence and observed GitHub/provider evidence. Constraints: harness/schema/script/tests only; preserve all unrelated dashboard fields byte-for-byte where possible; no product code, merge, deploy, provider/data/auth/payment/env/billing/secrets mutation; missing evidence stays `unknown`; no invented 0-100 score. Verification: tests for first snapshot, next-day rollover, NEW/CHANGED/UNCHANGED/RESOLVED/SUPERSEDED labels, non-numeric deltas, 30-day trimming, unrelated-field preservation, canonical/mirror identity and LIVE guard. Final evidence: changed files, before/after top-level keys, test output, canonical and mirror blob SHAs, history length, and publication status kept separate from merge status.

## History

### 2026-07-15

- Marked the canonical active portfolio overlay and routing index `RESOLVED`; legacy maps remain bounded continuity cleanup rather than the primary routing emergency.
- Confirmed schema-v6 dashboard consistency and CI closure through PR #115 / run #161, while preserving truthful `STALE 2/4` public publication status.
- Recorded Toronto Tantra's merged content/mobile/deployment preparation as `CHANGED` but not live-proven.
- Preserved all provider/auth/data blockers as `UNCHANGED` where no new live evidence exists.
- Recorded `DAILY_INTELLIGENCE_UPDATE_BLOCKED`: memory was updated, but the available contents connector could not safely patch the large minified canonical/mirror JSON without full unrelated-field-preserving replacement.
- Narrowed the next improvement to a deterministic Daily Intelligence writer and validator so future runs can persist snapshots safely.

### 2026-07-14

- First full delta-based run consumed the persistent memory and updated it instead of rediscovering the previous findings.
- Proved central registry drift across new projects, production URLs, Psitherapy mapping, and Psihotavr retirement handling.
- Marked the persistent-analysis contract `RESOLVED`; narrowed the next improvement to portfolio registry reconciliation.
- Shifted Ezohata from parity/UI recovery to provider/live persistence proof.
- Preserved the existing dashboard publication handoff without creating duplicate work.

### 2026-07-13

- Created persistent Daily Improve memory.
- Seeded durable findings from recent portfolio sweeps.
- Next runs must report `NEW`, `CHANGED`, `UNCHANGED`, `RESOLVED`, or `SUPERSEDED` for each major conclusion.
