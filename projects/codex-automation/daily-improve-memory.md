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
| 1 | The canonical portfolio registry is materially behind current project truth. | `CHANGED` | `PROVEN` | `projects/index.md`, `projects.md`, and `projects.json` conflict with current repo evidence: Ezohata, EzoHata Finance, and Toronto Tantra are absent; Brain Management still points to legacy Cloudflare in the index; Psitherapy is misclassified; Psihotavr was removed without live-retirement proof. Wrong routing now threatens every scheduled loop. | `/upgrade` |
| 2 | Ezohata has moved from catalog-parity recovery to provider activation and end-to-end persistence proof. | `CHANGED` | `BLOCKED` | Static catalog parity reached 500/500 and 17 owner decisions were resolved, but Google provider activation, real owner login, admin allowlist, uploads, storage, and refreshed production persistence are not all proven. Open PR #41 explicitly retains the external gate. | `/safe` |
| 3 | New and legacy Finance remain separate systems, but the new production target is missing from the central registry. | `CHANGED` | `NEEDS_VERIFICATION` | `ezohata-finance` documents the new clean-room Vercel/Supabase system; `finance` remains the legacy Incoming Ledger. Live GIS session, `FINANCE_SESSION_SECRET`, authorized origin, migration parity/application, and current provider/balance evidence must be proven separately. | `/upgrade`, then `/safe` or `/audit-fin` |
| 4 | Psitherapy repository mapping uncertainty is resolved; auth cutover readiness is not. | `RESOLVED` | `PROVEN` | `andylitvinov-design/report` README identifies it as the implementation repo for `psitherapy.vercel.app`, and the shared `/audit-sales` adapter was merged there. The old registry statement `repo needs verification` is superseded. Draft Firebase migration PR #122 remains blocked on provider/project/domain/env/live-login proof. | `/upgrade`, then `/safe` |
| 5 | Dashboard publication trace remains incomplete and already has a deduplicated Morning handoff. | `UNCHANGED` | `NEEDS_VERIFICATION` | Publication is still 3/4: canonical, mirror, and deploy are identified, but one attempt cannot yet tie source commit/branch and public timestamp together. Do not create a second discovery task. | `/upgrade`; provider closure via `/delivery /safe` |

## Current strategic decisions

- Treat `andylitvinov-design/ezohata-finance` as the new finance production project and `andylitvinov-design/finance` as a separate live legacy/reference system until a formal transition plan says otherwise.
- Treat `andylitvinov-design/report` as the canonical Psitherapy implementation repo.
- Treat `https://brain-management.netlify.app` as the current Brain Management production surface; Cloudflare is legacy unless current provider evidence changes this.
- Treat `andylitvinov-design/ezohata` and Toronto Tantra as active portfolio projects even though the central project index has not caught up.
- Do not infer that Psihotavr live is retired solely because its GitHub repo is no longer discoverable and its project capsule was deleted. Require explicit live/repository retirement evidence.
- Do not call provider-dependent work successful from merged code, a READY preview, or the newest deployment alone.
- The persistent Daily Improve delta contract is now operational; the earlier broad memory-contract task is `RESOLVED`. The remaining system gap is canonical portfolio registry reconciliation.

## Active blockers

- Ezohata: Google auth provider/live owner login, server-side admin allowlist, upload/storage persistence, and refreshed public/admin visibility.
- EzoHata Finance: authorized Google origin, `FINANCE_SESSION_SECRET`, signed live session, migration parity/application evidence, and current finance/provider verification.
- Psitherapy: Firebase access/project/provider/domain/env/live-login proof before draft PR #122 can become a cutover.
- Brain Management: same-attempt publication trace with source commit, branch, deploy, and public timestamp.
- Psihotavr: canonical repo/retirement state and current live source are unknown after the 2026-07-13 memory deletion.
- Portfolio growth: `/audit-sales` adapters exist, but current conversion analytics and completed portfolio sales-audit outcomes are not yet evidenced.

## Current single next improvement

`/upgrade` reconcile the canonical active-project registry across `projects/index.md`, `projects.md`, `projects.json`, and project capsules. Outcome: one deduplicated map that includes Ezohata, EzoHata Finance, legacy Finance, Psitherapy/report, Reiki Yggdrasil, Codex Links, Brain Management, Toronto Tantra, AI Projects Brain, and an explicit Psihotavr retirement/live-unknown state. Source of truth: current repo READMEs/STATE files, merged/open PR evidence, active-skill map, provider-live readiness gate, and existing production decisions in this memory. Constraints: harness/docs/memory only; do not edit product code, merge product PRs, deploy, mutate providers/data, create automations, or store secret values. Verification: cross-file repo/live/hosting/status equality, no duplicate aliases, no legacy URL marked production, every provider-dependent project has five-layer readiness fields, and validators pass. Final evidence: changed-file list, exact mapping table, validator outputs, commit/PR/CI evidence, and unresolved mappings labeled `NEEDS_VERIFICATION` rather than guessed.

## History

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
