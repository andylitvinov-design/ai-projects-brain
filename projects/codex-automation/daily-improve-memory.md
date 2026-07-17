# Daily Improve Memory

Persistent memory for the Daily Strategic Improve loop.

## Purpose

Each run must preserve the large goals and quality trajectory of the active portfolio. Read this file, `projects/codex-automation/strategic-goal-scorecard.json` and `projects/codex-automation/strategic-evidence.json` before choosing work. Do not rediscover goals or replace evidence-based strategy with a list of small defects.

## Update rules

- Keep one canonical Big Goal and compatible weighted rubric for every confirmed active project.
- Every rubric must sum to 100; missing proof never counts as success.
- Preserve the original previous-day baseline through every evidence batch applied on the same day.
- Use `PROVEN`, `NEEDS_VERIFICATION`, `BLOCKED`, `RESOLVED`, `SUPERSEDED`.
- Record only merged, verified or explicitly blocked evidence. Draft work does not increase progress.
- Every score change must identify the exact rubric dimension and immutable source reference.
- Code-only evidence cannot satisfy provider, public-live or observed-business-outcome conditions.
- Keep provider/live proof separate from implementation and CI proof.
- Count each evidence ID and strategic system-intelligence gain exactly once.
- Never store secrets, provider payloads, financial records or personal data.

## Strategic portfolio baseline — 2026-07-17

The scorecard model remains `weighted_confirmed_progress_lower_bound`. Percentages below use the compatible 2026-07-16 baseline and the full previous-day → current-day delta. The source-linked evidence ingestor is now canonical; unsupported increases are rejected.

| Project | Big Goal | Yesterday | Today | Delta | Evidence | Next quality threshold |
|---|---|---:|---:|---:|---|---|
| Ezohata | Trusted bilingual esoteric-commerce platform with complete catalog, secure owner operations, durable orders/uploads and measured conversion. | 58.0% | 58.0% | 0.0 pp | BLOCKED | Prove Google owner login → admin change/upload → public visibility → order handoff. |
| EzoHata Finance | Trustworthy owner-only financial control with reconciled data, current balances, explainable movements and zero synthetic accounting. | 59.5% | 59.5% | 0.0 pp | BLOCKED | Prove production owner session, migration parity and current provider balances together. |
| Legacy Finance | Stable bounded legacy ledger with an explicit retained, migrated or retired role. | 56.5% | 56.5% | 0.0 pp | NEEDS_VERIFICATION | Record the transition decision with parity and rollback evidence. |
| Psitherapy | Polished therapeutic self-analysis product with secure identity, durable progress, coherent workbook and clear support pathways. | 53.5% | 53.5% | 0.0 pp | BLOCKED | Complete a reversible Firebase preview cutover and prove the authenticated intake journey. |
| Reiki Yggdrasil | Trustworthy Reiki training/practitioner platform with excellent journeys, safe administration and measured inquiries/bookings. | 43.5% | 43.5% | 0.0 pp | NEEDS_VERIFICATION | Run a full product/live/conversion audit and establish the first KPI source. |
| Codex Links | Safe multi-project approval and command bridge with correct routing, complete delivery evidence and low retry cost. | 56.2% | 56.2% | 0.0 pp | NEEDS_VERIFICATION | Replace the closed stale stack with one main-based approval/dispatch decision, a green suite and one proven approved delivery. |
| Brain Management | Live trustworthy command and observability surface with strategic progress, Daily Intelligence and exact publication evidence. | 81.2% | 82.5% | +1.3 pp | NEEDS_VERIFICATION | Verify a fresh publication receipt whose snapshot, source commit, content deploy, public timestamp and visible scoreboards all match. |
| Toronto Tantra | Premium concise event-program ecosystem with excellent mobile UX, reliable publishing and measured Toronto registration outcomes. | 65.2% | 65.2% | 0.0 pp | NEEDS_VERIFICATION | Instrument qualified interest → conversation → confirmed registration. |
| AI Projects Brain | Self-improving portfolio operating system that preserves goals, selects leverage, validates delivery and learns truthfully. | 81.3% | 83.0% | +1.7 pp | PROVEN | Connect the validated evidence ledger to provider, public-live, conversion and retry-cost sources. |
| Psihotavr | Clearly governed legacy platform with proven source/live/data/auth state and explicit coexist, migrate or retire role. | 50.8% | 50.8% | 0.0 pp | BLOCKED | Prove canonical source and choose coexistence, migration or retirement with rollback. |

## System Intelligence Big Goal

**Goal:** Consistently choose the highest-leverage work, execute safe improvements end-to-end, learn from failures, reduce rework, and prove live outcomes without false success.

- Yesterday: **75.3%**
- Today: **76.8%**
- Delta: **+1.5 percentage points**
- Evidence: `PROVEN`
- Why: source-linked evidence can now update named rubric dimensions automatically; score increases require proven evidence, live-required dimensions reject code-only proof, duplicate evidence is idempotent, and the original daily baseline survives multiple evidence batches.
- Next threshold: automate provider, public-live, observed-business-outcome and context/retry evidence collection.

## Current Key Change Map

| Priority | Finding | Delta | Evidence state | Evidence / consequence | Next route |
|---:|---|---|---|---|---|
| 1 | Strategic evidence is now ingested automatically at rubric-dimension level from immutable source references. | `CHANGED` | `PROVEN` | PR #127 added `apply-strategic-evidence.mjs`, a canonical evidence ledger and deterministic weighted recomputation. | `/upgrade` build source adapters |
| 2 | Unsupported percentage growth is structurally rejected. | `CHANGED` | `PROVEN` | Increases require `PROVEN`; live-required dimensions reject code-only evidence; source-state ceilings, HTTPS source allowlisting and duplicate-ID idempotency are enforced. | `/upgrade` keep regression gates mandatory |
| 3 | Evidence ingestion is part of strategic publication and Agent Harness validation. | `CHANGED` | `PROVEN` | Strategic publication and harness runs were green; PR #128 repaired same-day baseline drift and added a sixth regression. | `/upgrade` preserve yesterday → final-today semantics |
| 4 | Canonical and Brain Management mirror snapshots are byte-identical for the current strategic timestamp. | `CHANGED` | `PROVEN` | Exact mirror identity is established; public receipt/current-alias verification remains separate. | `/safe` close public publication proof |
| 5 | Provider/live proof and observed KPI sources remain the dominant portfolio constraints. | `UNCHANGED` | `BLOCKED` | Ezohata, EzoHata Finance, Psitherapy and Psihotavr retain provider/source blockers; commercial projects still lack observed outcome ledgers. | `/safe`, `/audit-fin`, `/audit-sales` |

## Current strategic decisions

- Prioritize movement toward Big Goals over the number of defects closed.
- Select exactly three highest-leverage strategic changes per run.
- Do not award progress for drafts, previews, READY deployments or code-only provider scaffolds.
- A percentage may change only through a persisted compatible rubric and source-linked evidence record.
- Rubric changes require `SUPERSEDED`; incompatible percentages must not be compared directly.
- Multiple evidence batches on one day must preserve the original previous-day baseline.
- Reapplying an evidence ID may refresh validation but must not change scores or counters again.
- Keep `andylitvinov-design/ezohata-finance` as the new finance product and `andylitvinov-design/finance` as separate legacy/reference until a formal transition decision.
- Keep `andylitvinov-design/report` as canonical Psitherapy implementation.
- Keep Brain Management publication status snapshot-specific; schema, CI and mirror identity alone are not LIVE proof.
- Do not infer that Psihotavr is retired without explicit source/live and owner decision evidence.
- Treat closed Codex Links PRs #157–#159 as stale-source closure, not completed product capability.

## Active blockers

- Brain Management: canonical/mirror identity and receipt architecture are proven; a current source-mapped content deploy, matching public timestamp, matching public receipt and visible scoreboards are still required.
- Ezohata: authorized Google owner login, server-side allowlist, upload/storage persistence and observed order outcome.
- EzoHata Finance: authorized origin, session-secret presence proof by name only, signed production session, migration application parity and current provider balances.
- Psitherapy: Firebase project/provider/domain/env access and preview/live login proof before cutover.
- Psihotavr: canonical source/build, provider/data/auth state and explicit coexist/migrate/retire decision.
- Codex Links: the previous stacked drafts are closed; a fresh main-based approval/dispatch architecture, green suite and one approved end-to-end delivery are missing.
- Portfolio growth: observed KPI source, owner and cadence are absent for commercial projects.
- Context/retry efficiency: no stable counter source exists.

## Current single next improvement

`/upgrade` build automatic strategic-evidence source adapters. Read the canonical scorecard and ingest only current source-linked evidence from provider readiness checks, snapshot-bound public receipts, observed conversion/registration ledgers and context/retry counters. Start with Brain Management publication freshness, Ezohata owner journey, EzoHata Finance reconciliation and Toronto Tantra registration outcomes. Preserve source-state ceilings, require live proof where appropriate, and never increase a score from code-only evidence.

## History

### 2026-07-17 — source-linked strategic evidence

- Merged PR #127 with exactly three strategic changes: deterministic evidence ingestion, anti-inflation truth gates, and mandatory publication/harness validation.
- Added five source-linked evidence records for Brain Management publication architecture, immutable receipt separation, false-LIVE resistance, evidence-ingestion validation and System Intelligence execution leverage.
- Verified Agent Harness Validators, Strategic Goal Scorecard and System Health Dashboard workflows green for PR #127.
- Detected same-day baseline drift after a second evidence batch; merged PR #128 to preserve the original previous-day baseline and added a sixth regression.
- Corrected AI Projects Brain to `81.3% → 83.0% (+1.7 pp)` and System Intelligence to `75.3% → 76.8% (+1.5 pp)`.
- Preserved Brain Management at `81.2% → 82.5% (+1.3 pp)` because publication architecture improved while live freshness remains unproven.
- Verified the canonical and Brain Management mirror dashboard blobs are identical for timestamp `2026-07-17T07:03:49+02:00`.
- Kept publication `STALE`; no public LIVE claim was made without a matching current receipt and public-alias proof.

### 2026-07-16 — strategic upgrade

- Created the first canonical weighted Big Goal scorecard for all 10 active projects and System Intelligence.
- Added strategic progress persistence and 30-day history to Daily Intelligence.
- Added deterministic scorecard application to dashboard JSON/Markdown while preserving truthful `STALE` publication state.
- Added regression coverage for valid weights, prior-day rollover, idempotent rendering and no false LIVE state.
- Added PR validation and main-branch publication workflow.
- Merged PR #123 to preserve the original same-day delta during reruns and explicitly dispatch exact-snapshot publication.
- Merged PR #124 to count system-intelligence gains exactly once and repair the duplicate counter signature.
- Verified strategic scorecard and Agent Harness workflows green after the exactly-once repair.
- Counted AI Projects Brain `69.4% → 81.3%` and System Intelligence `65.7% → 75.3%`; all other projects remained unchanged because no qualifying live or business evidence crossed the prior boundary.

### 2026-07-15 — publication and persistence upgrades

- Implemented deterministic Daily Intelligence writer, tests and exact canonical/mirror publication path.
- Aligned schema-v6 and `NOT_APPLICABLE` semantics across canonical and public repositories.
- Preserved public status as `STALE` until same-snapshot deployment and live verification.

### 2026-07-14 — portfolio routing

- Established the canonical active portfolio overlay and separated legacy continuity maps.
