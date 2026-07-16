# Daily Improve Memory

Persistent memory for the Daily Strategic Improve loop.

## Purpose

Each run must preserve the large goals and quality trajectory of the active portfolio. Read this file and `projects/codex-automation/strategic-goal-scorecard.json` before choosing work. Do not rediscover goals or replace evidence-based strategy with a list of small defects.

## Update rules

- Keep one canonical Big Goal and compatible weighted rubric for every confirmed active project.
- Every rubric must sum to 100; missing proof never counts as success.
- Preserve yesterday, today and percentage-point delta.
- Use `PROVEN`, `NEEDS_VERIFICATION`, `BLOCKED`, `RESOLVED`, `SUPERSEDED`.
- Record only merged, verified or explicitly blocked evidence. Draft work does not increase progress.
- Keep provider/live proof separate from implementation and CI proof.
- Never store secrets, provider payloads, financial records or personal data.

## Strategic portfolio baseline — 2026-07-16

The scorecard model is `weighted_confirmed_progress_lower_bound`. This is the first canonical compatible strategic baseline; yesterday values were reconstructed from the previous evidence boundary and are now persisted for future comparisons.

| Project | Big Goal | Yesterday | Today | Delta | Evidence | Next quality threshold |
|---|---|---:|---:|---:|---|---|
| Ezohata | Trusted bilingual esoteric-commerce platform with complete catalog, secure owner operations, durable orders/uploads and measured conversion. | 58.0% | 58.0% | 0.0 pp | BLOCKED | Prove Google owner login → admin change/upload → public visibility → order handoff. |
| EzoHata Finance | Trustworthy owner-only financial control with reconciled data, current balances, explainable movements and zero synthetic accounting. | 59.5% | 59.5% | 0.0 pp | BLOCKED | Prove production owner session, migration parity and current provider balances together. |
| Legacy Finance | Stable bounded legacy ledger with an explicit retained, migrated or retired role. | 56.5% | 56.5% | 0.0 pp | NEEDS_VERIFICATION | Record the transition decision with parity and rollback evidence. |
| Psitherapy | Polished therapeutic self-analysis product with secure identity, durable progress, coherent workbook and clear support pathways. | 53.5% | 53.5% | 0.0 pp | BLOCKED | Complete a reversible Firebase preview cutover and prove the authenticated intake journey. |
| Reiki Yggdrasil | Trustworthy Reiki training/practitioner platform with excellent journeys, safe administration and measured inquiries/bookings. | 43.5% | 43.5% | 0.0 pp | NEEDS_VERIFICATION | Run a full product/live/conversion audit and establish the first KPI source. |
| Codex Links | Safe multi-project approval and command bridge with correct routing, complete delivery evidence and low retry cost. | 56.2% | 56.2% | 0.0 pp | NEEDS_VERIFICATION | Rebase the stacked approval chain, obtain a green suite and prove one end-to-end approved delivery. |
| Brain Management | Live trustworthy command and observability surface with strategic progress, Daily Intelligence and exact publication evidence. | 81.2% | 81.2% | 0.0 pp | NEEDS_VERIFICATION | Prove a source-mapped deploy, equal public timestamp and visible strategic scoreboards for this snapshot. |
| Toronto Tantra | Premium concise event-program ecosystem with excellent mobile UX, reliable publishing and measured Toronto registration outcomes. | 65.2% | 65.2% | 0.0 pp | NEEDS_VERIFICATION | Instrument qualified interest → conversation → confirmed registration. |
| AI Projects Brain | Self-improving portfolio operating system that preserves goals, selects leverage, validates delivery and learns truthfully. | 69.4% | 81.3% | +11.9 pp | PROVEN | Automate strategic score evidence ingestion from provider/live/product/business sources. |
| Psihotavr | Clearly governed legacy platform with proven source/live/data/auth state and explicit coexist, migrate or retire role. | 50.8% | 50.8% | 0.0 pp | BLOCKED | Prove canonical source and choose coexistence, migration or retirement with rollback. |

## System Intelligence Big Goal

**Goal:** Consistently choose the highest-leverage work, execute safe improvements end-to-end, learn from failures, reduce rework, and prove live outcomes without false success.

- Yesterday: **65.7%**
- Today: **75.3%**
- Delta: **+9.6 percentage points**
- Evidence: `PROVEN`
- Why: canonical project Big Goals, weighted progress, daily deltas, strategic history, tests and publication automation were added.
- Next threshold: automate provider/live and observed business-outcome ingestion so scores no longer depend on manual evidence synthesis.

## Current Key Change Map

| Priority | Finding | Delta | Evidence state | Evidence / consequence | Next route |
|---:|---|---|---|---|---|
| 1 | The portfolio now has a canonical Big Goal and weighted quality rubric for all 10 active projects plus the operating system. | `CHANGED` | `PROVEN` | `strategic-goal-scorecard.json` preserves goal, rubric, yesterday/today progress, delta, missing conditions and next threshold. | `/upgrade` maintain compatibility and evidence ingestion |
| 2 | Daily Intelligence now preserves strategic project/system goals and a bounded 30-day strategic history. | `CHANGED` | `PROVEN` | The writer rejects invalid weights/scores, rolls prior progress forward and does not erase strategy during metric-only snapshots. | `/upgrade` keep regressions active |
| 3 | Strategic scorecards have a deterministic and idempotent dashboard publication path rather than remaining report-only prose. | `CHANGED` | `PROVEN` | PRs #122 and #123 added the applier, same-day rerun protection, explicit exact-snapshot dispatch and green validation. The current canonical and Brain Management mirror blobs are identical. Publication remains `STALE` until deploy and public timestamp proof complete. | `/safe` verify source-mapped deploy and visible public timestamp |
| 4 | The active portfolio routing overlay remains canonical and complete at 10 projects. | `UNCHANGED` | `PROVEN` | `projects/portfolio-registry.json` remains the active router; legacy maps are continuity sources only. | `/upgrade` bounded legacy reconciliation only |
| 5 | Provider/live proof and missing observed KPI sources remain the dominant portfolio constraints. | `UNCHANGED` | `BLOCKED` | Ezohata, EzoHata Finance, Psitherapy and Psihotavr retain provider/source blockers; growth projects lack observed outcome sources. | `/safe`, `/audit-fin`, `/audit-sales` |

## Current strategic decisions

- Prioritize movement toward Big Goals over the number of defects closed.
- Select exactly three highest-leverage strategic changes per run.
- Do not award progress for drafts, previews, READY deployments or code-only provider scaffolds.
- A percentage may change only when a persisted compatible rubric has new evidence.
- Rubric changes require `SUPERSEDED`; incompatible percentages must not be compared directly.
- Keep `andylitvinov-design/ezohata-finance` as the new finance product and `andylitvinov-design/finance` as separate legacy/reference until a formal transition decision.
- Keep `andylitvinov-design/report` as canonical Psitherapy implementation.
- Keep Brain Management publication status snapshot-specific; schema, CI and mirror identity alone are not LIVE proof.
- Do not infer that Psihotavr is retired without explicit source/live and owner decision evidence.

## Active blockers

- Brain Management: canonical/mirror identity is proven for the strategic snapshot; a source-mapped deploy, equal public timestamp and visible strategic scoreboards are still required.
- Ezohata: authorized Google owner login, server-side allowlist, upload/storage persistence and observed order outcome.
- EzoHata Finance: authorized origin, session-secret presence proof by name only, signed production session, migration application parity and current provider balances.
- Psitherapy: Firebase project/provider/domain/env access and preview/live login proof before cutover.
- Psihotavr: canonical source/build, provider/data/auth state and explicit coexist/migrate/retire decision.
- Codex Links: PRs #157–#159 are stacked drafts; full green mainline and one approved end-to-end delivery are missing.
- Portfolio growth: observed KPI source, owner and cadence are absent for commercial projects.
- Context/retry efficiency: no stable counter source exists.

## Current single next improvement

`/upgrade` build automatic strategic-evidence ingestion. Read the canonical scorecard, collect only current and source-linked evidence from project PRs/checks, provider/live traces and observed KPI ledgers, then propose score changes dimension-by-dimension. Reject unsupported score increases, preserve compatible rubrics and mark changed rubrics `SUPERSEDED`. Start with Brain Management publication freshness, Ezohata owner journey, EzoHata Finance reconciliation and Toronto Tantra registration outcomes.

## History

### 2026-07-16 — strategic upgrade

- Created the first canonical weighted Big Goal scorecard for all 10 active projects and System Intelligence.
- Added strategic progress persistence and 30-day history to Daily Intelligence.
- Added deterministic scorecard application to dashboard JSON/Markdown while preserving truthful `STALE` publication state.
- Added regression coverage for valid weights, prior-day rollover, idempotent rendering and no false LIVE state.
- Added PR validation and main-branch publication workflow.
- Merged PR #123 to preserve the original same-day delta during reruns and explicitly dispatch exact-snapshot publication.
- Verified Agent Harness Validators, Strategic Goal Scorecard and System Health Dashboard workflows green on the final PR head.
- Verified the current canonical and Brain Management mirror JSON share blob SHA `3a8eee6e876585a7c26bb747550ef8fc87a8fa64`.
- Counted AI Projects Brain `69.4% → 81.3%` and System Intelligence `65.7% → 75.3%`; all other projects remain unchanged because no new qualifying live or business evidence crossed the prior boundary.

### 2026-07-15 — publication and persistence upgrades

- Implemented deterministic Daily Intelligence writer, tests and exact canonical/mirror publication path.
- Aligned schema-v6 and `NOT_APPLICABLE` semantics across canonical and public repositories.
- Preserved public status as `STALE` until same-snapshot deployment and live verification.

### 2026-07-14 — portfolio routing

- Established the canonical active portfolio overlay and separated legacy continuity maps.
