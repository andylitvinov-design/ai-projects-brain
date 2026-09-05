# Project Memory — Current Human Catalog

Last reconciled: `2026-09-05`

> Compact current catalog. Canonical active machine overlay: `projects/portfolio-registry.json`. Full accessible repository inventory: `projects.json` / `data/project-index.json`. Detailed state: project capsules.

## Source boundaries

- `ai-projects-brain` — durable catalog/governance source of truth.
- `brain-management` — operational metrics, chains, assignments, receipts and publication.
- GitHub/provider/live reachability — current identity and operational evidence.

## Active portfolio

| ID | Canonical source | Live | Current durable state |
|---|---|---|---|
| `ezohata` | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | `BLOCKED`; provider/live proof incomplete. |
| `ezohata-finance` | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | `BLOCKED_BY_OWNER`; read-only owner journey required. |
| `legacy-finance` | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | `WATCH`; incoming-ledger repo is reference/deprecated. |
| `psitherapy` | `andylitvinov-design/report` | https://psitherapy.vercel.app | `BLOCKED`; deploy-source/auth proof incomplete. |
| `reiki-yggdrasil` | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | `WATCH`. |
| `codex-links` | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | `WATCH`. |
| `brain-management` | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | `CURRENT_DEGRADED_HISTORY_ATTRIBUTION_AND_GATE_OPEN`; live is fresh and 7/7 APIs plus `/sw.js` are readable, but history is 1/7, weekly review/attribution are stale and the complete release gate is red. |
| `torontotantra` | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | `WATCH`. |
| `ai-projects-brain` | `andylitvinov-design/ai-projects-brain` | not applicable | `IMPROVING`; durable PR #193 open. |
| `psihotavr` | `NEEDS_VERIFICATION` | historical/unverified https://psihotavr.vercel.app | `IDENTITY_UNRESOLVED`. |

## Repository inventory

GitHub owner enumeration on 2026-09-05 confirms 30 accessible repositories. Nine map directly to production-overlay identities. The remaining repositories are related, backup, bootstrap, experimental, pre-production or inactive identities; accessibility alone is not production evidence.

## Active development outside the production overlay

| ID | Canonical source | Provider/live | Durable state |
|---|---|---|---|
| `books` | `andylitvinov-design/books`; observed default `codex/bootstrap-books` | two preview-only Vercel projects; canonical target `needs verification` | `ACTIVE_DEVELOPMENT_PREPRODUCTION`; PR #4 is a 444-file stacked/conflicted change without hosted checks or reviews. |

## Reconciliation changes

- Added Books as a meaningful extended-catalog project with a confirmed repo and explicit branch/provider/live gaps; it is not promoted to the production overlay.
- Flagged the duplicate `books` and `codex-public-book-library` Vercel projects as one unresolved provider identity, not two products.
- Brain Management remains current-but-degraded: live is fresh, while immutable history, weekly review publication, internal deployment attribution and the complete release gate remain incomplete.
- Preserved Psihotavr uncertainty rather than inventing a replacement source.
- Kept 10 production identities separate from 21 meaningful memory records and 30 accessible repositories.

## Agent usage

1. Route through `projects/index.md` or the portfolio registry.
2. Open the capsule.
3. Verify current repo/provider/live evidence.
4. Treat `LIVE_VERIFIED` as time-bound.
5. Never infer protected data, owner proof or missing mappings.
