# Daily Strategic Priorities — 2026-07-21

## Evidence boundary

Selection-only input for Morning System Upgrade. No implementation, merge, deploy, provider mutation, percentage change or business outcome is claimed here.

Read evidence:

- `systems/live-upgrade-delivery-contract.md`
- `projects/portfolio-registry.json`
- `projects/codex-automation/strategic-goal-scorecard.json`
- PR Delivery Sweep PR #156
- Morning Task Sweep PR #157
- persisted Evening Delivery Closure PR #155

The ten active-project Big Goals remain unchanged. Current percentages remain on the compatible persisted scorecard because this run did not apply proof-gated score observations.

## Active portfolio continuity

| Project | Preserved Big Goal | Next material threshold | Current comparison |
|---|---|---|---|
| Ezohata | Trusted bilingual commerce with secure owner operations, durable catalog/orders/uploads and measured conversion. | Prove owner login → admin change/upload → public visibility → order handoff. | Still `BLOCKED_BY_OWNER`; no autonomous threshold crossing. |
| EzoHata Finance | Owner-only financial control with reconciled history, current balances and zero synthetic accounting. | Prove owner session, migration parity and current balances together. | Provider/owner evidence unchanged. |
| Legacy Finance | Stable bounded legacy ledger with an explicit retained, migrated or retired role. | Record transition decision, parity boundary and rollback. | PayPal loading lifecycle is already `LIVE_VERIFIED`; do not recycle it as a candidate. |
| Psitherapy | Polished therapeutic product with secure identity, durable progress and clear support pathways. | Complete reversible Firebase preview cutover and authenticated intake/progress proof. | Still `BLOCKED_BY_OWNER`. |
| Reiki Yggdrasil | Trustworthy training/practitioner platform with excellent journeys and measured inquiries/bookings. | Run one bounded product/live/conversion audit and register the first KPI. | Important but no current delivery artifact or new evidence. |
| Codex Links | Safe command/approval bridge with explicit authorization, correct routing and complete delivery evidence. | Secure command creation before Prompt Router work resumes; then prove one approved production delivery. | Issue #174 remains open; no fresh implementation PR exists. |
| Brain Management | Trustworthy live observability surface with exact source-to-deploy evidence. | Prove current source SHA, Netlify deploy, snapshot/receipt/assets and clean desktop/mobile Portfolio behavior. | PR #55 is canonical, but production still maps to the older deploy. |
| Toronto Tantra | Premium mobile event-program ecosystem with measured registrations. | Verify PR #37 portrait full-frame decode, dimensions and console/network state; registration instrumentation follows. | Matching READY deploy and HTTP JPEG exist, but user-visible decode proof is missing. |
| AI Projects Brain | Self-improving portfolio OS that preserves goals, selects leverage and learns truthfully. | Consume the fresh ranked queue without replaying stale priorities. | Current strategic selection is evidence-only. |
| Psihotavr | Governed legacy platform with proven source/live/data/auth and explicit future role. | Prove canonical state and choose coexistence, migration, archive or retirement. | Evidence remains insufficient and governance-dependent. |

## Candidate score rubric

`priority = impact × urgency × completion_probability ÷ risk`

- Impact: 1 minor/local; 3 material single-project value; 5 critical safety, delivery or multi-project value.
- Urgency: 1 optional; 3 active quality gap; 5 production regression, security exposure or unresolved delivery carryover.
- Completion probability: 1 speculative; 3 feasible with meaningful missing evidence; 5 implementation/deploy complete and verification-only.
- Risk: 1 bounded read-only verification/recovery; 3 contained code or authorization change; 5 provider/data/payment/irreversible risk.

## Ranked queue for Morning System Upgrade

| Rank | Candidate | Category | I | U | P | R | Score | Evidence / affected threshold |
|---:|---|---|---:|---:|---:|---:|---:|---|
| 1 | Toronto Tantra portrait production verification | PRODUCT | 4 | 5 | 5 | 1 | **100** | PR #37 is on `main` as `73bc3bd8fe480b35c1abfdca7b7bfb5bef291b49`; deploy `dpl_9iyththGpjPFKbB8X62NTWKzPrUo` is READY and mapped to it. Close clean mobile/desktop full-frame decode, dimensions and console/network proof. |
| 2 | Brain Management direct publisher/deploy/live closure | INFRASTRUCTURE — P0/P1 publication blocker | 5 | 5 | 3 | 1 | **75** | PR #55 is on canonical `main` as `0959d725016512af0ac68838cab165c3d2315db3`; Netlify still reports old deploy `6a59bc16f349e3e190a47208`. Close workflow execution → source-mapped deploy → exact receipt/assets → clean Portfolio behavior. |
| 3 | Codex Links command-create authorization boundary | OPERATIONAL / SECURITY | 5 | 5 | 3 | 3 | **25** | Issue #174 is proven but no fresh implementation artifact exists. Morning may create/reuse only the smallest fresh-main authorization PR; stale PR #163 stays closed. |

The queue contains two product/operational candidates and one infrastructure candidate. Brain Management qualifies because stale publication blocks trusted portfolio-wide delivery evidence.

## Lower-priority exclusions

- Business Mysteries and Legacy Finance loading are already `LIVE_VERIFIED` and cannot be counted again.
- Reiki Yggdrasil would start a new audit while two verification-only carryovers remain close to completion.
- Ezohata, EzoHata Finance and Psitherapy require genuine owner/provider actions.
- Psihotavr requires source/live/governance proof before autonomous work.
- Toronto registration instrumentation follows portrait/mobile verification.
- Additional dashboard, schema, harness or KPI infrastructure is excluded by the rolling ratio and lack of another proven cross-project P0/P1 blocker.

## Carryover-first order

1. Verify Toronto portrait production behavior. Do not create another image PR unless the failure is reproduced.
2. Observe or recover the single Brain Management direct publisher for `0959d725...`; require matching deploy, snapshot, receipt, assets and browser behavior.
3. Only after the two verification chains close or cannot safely advance, create/reuse the smallest Codex Links authorization PR for issue #174.

## Persistence state

Branch: `automation/daily-strategic-priorities-20260721`.

This file is the current ranked strategic input. Morning owns implementation and merge; Evening owns final production closure.
