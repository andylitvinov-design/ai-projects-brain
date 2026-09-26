# Project Memory — Current Human Catalog

Last reconciled: `2026-09-26`

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
| `brain-management` | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | `DEGRADED_STALE_FAIL_CLOSED_OWNER_ACTIVATION_AND_PUBLISHER_BLOCKED`; 2/7 APIs, 265.1h Sep 15 source, no production deployment after Sep 15. |
| `torontotantra` | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | `WATCH`. |
| `ai-projects-brain` | `andylitvinov-design/ai-projects-brain` | not applicable | `IMPROVING`; durable PR #193 open. |
| `psihotavr` | `NEEDS_VERIFICATION` | historical/unverified https://psihotavr.vercel.app | `IDENTITY_UNRESOLVED`. |

## Repository inventory

GitHub owner enumeration on 2026-09-26 confirms 31 accessible repositories. Nine map directly to production-overlay identities. The new `psitrends-ops` repo is a related operations source for existing PsiTrends, not a new product identity.

## Active development outside the production overlay

| ID | Canonical source | Provider/live | Durable state |
|---|---|---|---|
| `books` | `andylitvinov-design/books`; default `codex/bootstrap-books`, production source `codex/public-book-library` | canonical https://holistichouse.vercel.app on Vercel project `prj_4jAwcx6lrKyUKZ3R9vgC5xwwyC0b` | `ACTIVE_HOLISTIC_HOUSE_PUBLIC_PRODUCTION_PROTECTED_FLOW_PARTIAL`; public root and `/books` are live, protected journey remains owner-dependent. |
| `psitrends` | `sales` public source; `psitrends-ops` operations; `psitrends-work` coordination | canonical https://psitrends.com on Joomla/Hetzner | `ACTIVE_PRODUCTION_MULTI_REPO`; exact source/live binding and same-source effect metric remain open. |

## Reconciliation changes

- Updated Books canonical live to Holistic House; the old public-library alias now redirects there.
- Replaced the stale PsiTrends Pages/workspace mapping with the verified Joomla/Hetzner multi-repo topology.
- Brain Management remains stale fail-closed: source architecture is restored, but scoped activation, one publisher, fresh source, 7/7 reread and durable sync remain incomplete.
- Preserved Psihotavr uncertainty rather than inventing a replacement source.
- Kept 10 production identities separate from 21 meaningful memory records and 31 accessible repositories.

## Agent usage

1. Route through `projects/index.md` or the portfolio registry.
2. Open the capsule.
3. Verify current repo/provider/live evidence.
4. Treat `LIVE_VERIFIED` as time-bound.
5. Never infer protected data, owner proof or missing mappings.
