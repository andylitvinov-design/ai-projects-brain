# Daily Strategic Priorities — 2026-07-23

## Evidence boundary

Selection-only input for Morning System Upgrade. No implementation, merge, deploy, provider mutation, scorecard percentage change, or business outcome is claimed here.

Read and reconciled:

- `systems/live-upgrade-delivery-contract.md`
- `projects/portfolio-registry.json`
- `projects/codex-automation/strategic-goal-scorecard.json`
- `projects/codex-automation/task-sweep-runs/2026-07-23.md`
- `projects/codex-automation/evening-delivery-runs/2026-07-22.md`
- `projects/codex-automation/pr-delivery-sweep-runs/2026-07-23.md`
- previous strategic queue for 2026-07-22

The ten confirmed active-project Big Goals are preserved. No compatible proof-gated score observation crossed a strategic-rubric boundary, so persisted percentages remain unchanged.

## Active portfolio continuity

| Project | Preserved Big Goal | Next material quality threshold | Comparison with previous persisted state |
|---|---|---|---|
| Ezohata | A trusted bilingual esoteric-commerce platform with complete catalog parity, excellent mobile discovery, secure owner administration, durable orders and uploads, and measured conversion. | Prove one production owner journey: Google login → admin change or upload → public visibility → order handoff. | Still `BLOCKED_BY_OWNER`; draft PR #41 remains broad and no production provider/auth matrix was added. |
| EzoHata Finance | A trustworthy owner-only financial control system with reconciled history, current provider balances, explainable movements, secure sessions, and zero synthetic accounting. | Prove a production owner session and reconcile imported totals plus current provider balances in one evidence run. | No new provider, session, migration-parity, or current-balance evidence. |
| Legacy Finance | A stable and clearly bounded legacy ledger that remains reliable during transition and has an explicit migration, archival, or retirement decision. | Choose and document retained reference, migration source, or retired archive, with parity and rollback evidence. | Previously verified loading behavior remains valid but does not cross the transition-decision threshold; stale PR backlog is not a safe candidate. |
| Psitherapy | A polished therapeutic self-analysis product with a coherent workbook, secure production identity, durable progress, safe boundaries, and clear paid-support pathways. | Complete a reversible Firebase preview cutover proving login, saved progress, and the core intake journey before production. | Still `BLOCKED_BY_OWNER`; PR #122 remains a diverged draft without provider/domain/env or authenticated preview proof. |
| Reiki Yggdrasil | A coherent and trustworthy Reiki training and practitioner platform with excellent live journeys, safe administration, and measured inquiries or bookings. | Run one full product, live, and conversion audit and establish the first observed inquiry or booking KPI. | No current delivery artifact or observed KPI source; starting this now would bypass higher-value carryover. |
| Codex Links | A safe multi-project command and approval bridge with explicit human approval, correct routing, complete delivery evidence, and low retry cost. | Secure command creation through a fresh-main owner-session or short-lived capability implementation, then prove one approved proposal → command → delivered result. | Issue #174 remains open; no valid remote implementation branch or PR appeared. |
| Brain Management | A live and trustworthy command and observability surface showing current portfolio health, strategic progress, Daily Intelligence, and exact source-to-deploy evidence. | Prove the existing canonical publisher run, matching Netlify deploy, exact snapshot/receipt/assets, and visible desktop/mobile Portfolio values. | Still `BLOCKED_BY_OWNER`; Netlify remains on the old 2026-07-17 deploy and no runnable failed job is exposed. |
| Toronto Tantra | A premium and concise event-program ecosystem with excellent mobile experience, reliable publishing, clear safety and trust, and measured conversion of qualified Toronto interest. | Restore the facilitator portrait only from the exact approved source, then prove registry identity, binary integrity, matching deploy, and clean desktop/mobile rendering. | Corrected from pending browser verification to `BLOCKED_BY_OWNER`: current main intentionally has no portrait and the approved source bytes are absent. |
| AI Projects Brain | A self-improving portfolio operating system that preserves strategic goals, selects highest-leverage work, validates delivery, learns from failures, and maintains truthful evidence. | Consume this ranked queue and convert selected carryover into verified outcomes without replaying stale priorities. | Task Sweep and PR Sweep evidence are current. PR #166 improves audit documentation only and is not a strategic delivery outcome or candidate. |
| Psihotavr | A clearly governed legacy production platform whose source, live build, data and auth state, and retirement or coexistence role are explicitly proven. | Prove canonical source/live/data/auth state and choose coexistence, migration, archive, or retirement. | No new canonical-state or governance evidence; autonomous product changes remain premature. |

## Candidate score rubric

`priority = impact × urgency × completion_probability ÷ risk`

1–5 meanings applied in this run:

- Impact: `5` portfolio-wide reliability or critical security; `4` high user-visible single-project value.
- Urgency: `5` unresolved production regression/security carryover; `4` visible product regression awaiting exact source.
- Completion probability: `3` contained implementation is feasible once a valid artifact exists; `2` one exact owner action is missing; `1` required approved source bytes are absent.
- Risk: `1` bounded verification/recovery on an existing canonical path; `2` binary asset restoration requiring exact provenance; `3` authorization change requiring a complete regression matrix.

## Ranked queue for Morning System Upgrade

| Rank | Candidate | Category | I | U | P | R | Score | Evidence and affected threshold |
|---:|---|---|---:|---:|---:|---:|---:|---|
| 1 | Brain Management publisher → deploy → live closure | INFRASTRUCTURE — proven portfolio publication blocker | 5 | 5 | 2 | 1 | **50** | Current repository contains the strategic renderer and sole canonical publisher, while Netlify still serves deploy `6a59bc16f349e3e190a47208` from 2026-07-17. After the single owner start, close exact run → deploy source → snapshot → receipt → assets → clean desktop/mobile Portfolio behavior. |
| 2 | Codex Links command-create authorization artifact | OPERATIONAL / SECURITY | 5 | 5 | 3 | 3 | **25** | Issue #174 remains proven but has no fresh implementation artifact. Proceed only from a valid owner-session or short-lived capability branch and require anonymous, valid, expired/replayed, double-submit, public-serialization, and no-dispatch-after-denial regressions. |
| 3 | Toronto Tantra approved portrait delivery | PRODUCT | 4 | 4 | 1 | 2 | **8** | Current main intentionally contains no facilitator portrait and the canonical asset registry lacks approved source bytes. Continue only after the exact approved source is supplied; substitutes and old undersized assets are excluded. |

The queue has two product/operational candidates and one infrastructure candidate. The infrastructure exception is justified because the stale System Health Dashboard blocks truthful portfolio visibility across multiple active projects. No second infrastructure or meta-system candidate is allowed.

## Lower-priority exclusions

- Ezohata and Psitherapy require genuine provider/account actions and broad auth migrations; neither has a safer autonomous threshold crossing today.
- EzoHata Finance requires owner-session/provider-balance proof unavailable in current evidence.
- Legacy Finance has no reproduced current defect supporting salvage from its heavily stale PR backlog.
- Reiki Yggdrasil would begin a new audit while current carryover remains unresolved.
- Psihotavr requires canonical governance proof before implementation.
- AI Projects Brain audit-marker documentation is useful standards maintenance but does not advance a product/live threshold and is excluded under the meta-system rule.
- Additional dashboard/schema/harness work is excluded; the Brain Management need is execution of the existing publisher, not another publication design.

## Carryover-first order

1. Brain Management: retain `BLOCKED_BY_OWNER` until the existing canonical workflow is started once; then complete exact publication and user-visible proof without another publisher or heartbeat.
2. Codex Links: proceed only when a valid fresh-main implementation artifact exists; otherwise retain `NO_SAFE_UPGRADE`.
3. Toronto Tantra: proceed only after the exact approved portrait source bytes are supplied; then execute the complete provenance-to-live verification chain.

## Persistence boundary

This file is the current ranked strategic input for Morning System Upgrade. Morning owns implementation and delivery; Evening owns production closure. Unknown evidence remains unknown, and no strategic percentage or business result was fabricated.
