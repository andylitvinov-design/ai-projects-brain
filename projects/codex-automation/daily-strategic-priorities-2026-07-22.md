# Daily Strategic Priorities — 2026-07-22

## Evidence boundary

Selection-only input for Morning System Upgrade. No implementation, merge, deploy, provider mutation, percentage change or business outcome is claimed here.

Read evidence:

- `systems/live-upgrade-delivery-contract.md`
- `projects/portfolio-registry.json`
- `projects/codex-automation/strategic-goal-scorecard.json`
- `projects/codex-automation/task-sweep-runs/2026-07-22.md`
- `projects/codex-automation/evening-delivery-runs/2026-07-21.md`
- previous strategic queue for 2026-07-21

The ten active-project Big Goals remain unchanged. Strategic percentages remain on the compatible persisted scorecard because no new proof-gated score observation crossed a rubric boundary.

## Active portfolio continuity

| Project | Preserved Big Goal | Next material threshold | Comparison with previous persisted state |
|---|---|---|---|
| Ezohata | Trusted bilingual commerce with secure owner operations, durable catalog/orders/uploads and measured conversion. | Prove owner login → admin change/upload → public visibility → order handoff. | Still `BLOCKED_BY_OWNER`; no new production auth or storage proof. |
| EzoHata Finance | Owner-only financial control with reconciled history, current balances and zero synthetic accounting. | Prove owner session, migration parity and current provider balances together. | Provider and owner evidence remain unchanged. |
| Legacy Finance | Stable bounded legacy ledger with an explicit retained, migrated or retired role. | Record transition decision, parity boundary and rollback. | Previously verified loading behavior is not a new strategic threshold crossing. |
| Psitherapy | Polished therapeutic product with secure identity, durable progress and clear support pathways. | Complete reversible Firebase preview cutover and authenticated intake/progress proof. | Still `BLOCKED_BY_OWNER`; no authenticated preview evidence. |
| Reiki Yggdrasil | Trustworthy training/practitioner platform with excellent journeys and measured inquiries/bookings. | Run one bounded product/live/conversion audit and register the first observed KPI. | No current delivery artifact or observed KPI source. |
| Codex Links | Safe command/approval bridge with explicit authorization, correct routing and complete delivery evidence. | Secure command creation before Prompt Router work resumes; then prove one approved production delivery. | Issue #174 remains open; no fresh implementation branch or PR exists. |
| Brain Management | Trustworthy live observability surface with exact source-to-deploy evidence. | Prove canonical workflow run, matching Netlify deploy, exact snapshot/receipt/assets and clean desktop/mobile Portfolio behavior. | Reclassified from `MERGED_WAITING_DEPLOY` to `BLOCKED_BY_OWNER`; current repository is ahead of the old production deploy and the visible `INSUFFICIENT_DATA` regression remains. |
| Toronto Tantra | Premium mobile event-program ecosystem with measured registrations. | Close portrait rendering through clean desktop/mobile full-frame decode and console/network proof; registration instrumentation follows. | Technical evidence improved from PR #37 to canonical PR #39 with exact production deploy and JPEG mapping, but target-browser proof remains missing. |
| AI Projects Brain | Self-improving portfolio OS that preserves goals, selects leverage and learns truthfully. | Consume the fresh ranked queue and convert selected work into verified outcomes without replaying stale priorities. | Latest Task Sweep and PR Sweep ledgers are current; no new production outcome is credited. |
| Psihotavr | Governed legacy platform with proven source/live/data/auth and explicit future role. | Prove canonical state and choose coexistence, migration, archive or retirement. | Evidence remains insufficient and governance-dependent. |

## Candidate score rubric

`priority = impact × urgency × completion_probability ÷ risk`

Relevant 1–5 meanings used in this run:

- Impact: `4` high user-visible single-project value; `5` critical security or portfolio-wide reliability.
- Urgency: `5` unresolved production regression, security exposure or delivery carryover.
- Completion probability: `4` implementation and source/deploy mapping complete with browser proof missing; `3` contained implementation is feasible but no artifact exists; `2` one exact owner action is missing and no runnable job is exposed.
- Risk: `1` bounded read-only verification/recovery; `3` contained authorization change requiring regression coverage.

## Ranked queue for Morning System Upgrade

| Rank | Candidate | Category | I | U | P | R | Score | Evidence / affected threshold |
|---:|---|---|---:|---:|---:|---:|---:|---|
| 1 | Toronto Tantra production portrait verification | PRODUCT | 4 | 5 | 4 | 1 | **80** | `torontotantra/main` is merge `df432e020f13271bb5e7697bcb4a336f3abda322`; production deploy `dpl_CPEQWRUmu54L4V8UUCXAvX3BTymG` maps to it and the JPEG returns the expected MIME and byte length. Close clean desktop/mobile decode and console/network proof; do not create another image PR unless the defect reproduces. |
| 2 | Brain Management publisher/deploy/live closure | INFRASTRUCTURE — portfolio publication blocker | 5 | 5 | 2 | 1 | **50** | `brain-management/main` contains the strategic renderer and sole canonical publisher, but Netlify still serves deploy `6a59bc16f349e3e190a47208` from 2026-07-17 and no workflow run or failed job is exposed. After the exact owner start, verify run → deploy → snapshot → receipt → assets → visible Portfolio values. |
| 3 | Codex Links command-create authorization boundary | OPERATIONAL / SECURITY | 5 | 5 | 3 | 3 | **25** | Issue #174 is proven; no fresh implementation artifact exists. Morning may proceed only from a valid fresh-main owner-session or short-lived capability branch and must require anonymous, valid, expired/replayed, double-submit and public-serialization regressions. |

The queue contains two product/operational candidates and one infrastructure candidate. Brain Management qualifies for the exception because stale portfolio publication affects evidence visibility across the active project set; no additional meta-system candidate is allowed.

## Lower-priority exclusions

- Ezohata, EzoHata Finance and Psitherapy require genuine owner/provider actions and have no safer autonomous threshold crossing today.
- Legacy Finance already has the recently verified loading lifecycle; repeating it would not create new value.
- Reiki Yggdrasil would start a new audit while two existing verification carryovers remain closer to completion.
- Psihotavr requires canonical source/live/governance proof before autonomous improvement.
- AI Projects Brain meta-work is excluded because the current delivery bottleneck is execution and live proof, not another schema, prompt or dashboard refinement.
- Additional Toronto registration instrumentation follows closure of the current portrait/mobile regression.

## Carryover-first order

1. Verify Toronto Tantra production portrait behavior; no new image PR unless the defect reproduces.
2. Retain Brain Management as `BLOCKED_BY_OWNER` until the existing canonical workflow is started once; then automatically close exact deploy, receipt and UI proof without another trigger repair.
3. Only after the first two chains close or cannot safely advance, create or reuse the smallest fresh-main Codex Links authorization PR for issue #174.

## Persistence boundary

This file is the current ranked strategic input. Morning owns implementation and delivery; Evening owns final production closure. Unknown evidence remains unknown and no scorecard percentage was modified.
