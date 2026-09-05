# Projects Index

> Fast human/agent routing. Machine overlay: `projects/portfolio-registry.json`. Repository inventory: `projects.json` / `data/project-index.json`.

## Routing rules

1. Match name, alias, repo or live URL in the machine overlay.
2. Open `projects/<slug>/PROJECT.md` before durable or production conclusions.
3. Use current GitHub/provider reachability as identity evidence.
4. Use current live source timestamps for operational state.
5. Do not promote backup/bootstrap/diagnostic repositories into the active portfolio.
6. Keep uncertainty explicit as `NEEDS_VERIFICATION`.

## Active portfolio — reconciled 2026-09-05

| project_id | Canonical repo | Production | Durable state |
|---|---|---|---|
| `ezohata` | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | `BLOCKED` — provider/live proof incomplete. |
| `ezohata-finance` | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | `BLOCKED_BY_OWNER` — read-only owner provider proof required. |
| `legacy-finance` | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | `WATCH`; incoming-ledger repo is reference/deprecated alias. |
| `psitherapy` | `andylitvinov-design/report` | https://psitherapy.vercel.app | `BLOCKED` — deploy-source/auth proof incomplete. |
| `reiki-yggdrasil` | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | `WATCH`. |
| `codex-links` | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | `WATCH`. |
| `brain-management` | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | `CURRENT_DEGRADED_HISTORY_ATTRIBUTION_AND_GATE_OPEN` — fresh 7/7 APIs; health DEGRADED at history 1/7; weekly review, attribution and full release gate stale/red. |
| `torontotantra` | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | `WATCH`. |
| `ai-projects-brain` | `andylitvinov-design/ai-projects-brain` | not applicable | `IMPROVING`; durable reconciliation PR #193. |
| `psihotavr` | `NEEDS_VERIFICATION` | historical https://psihotavr.vercel.app | `IDENTITY_UNRESOLVED`. |

## Repository inventory

Owner enumeration on 2026-09-05 confirms 30 accessible repositories. Production-overlay identities remain 10. The extended catalog now has 21 meaningful memory records. Psihotavr remains the unresolved production identity.

## Development / verification routing

| Wording | Route | State |
|---|---|---|
| books, book library, книги, homeopathy library | `projects/books/PROJECT.md` | `ACTIVE_DEVELOPMENT_PREPRODUCTION`; repo confirmed, canonical production branch/provider/live mapping unresolved. |

The connected provider exposes both `books` and `codex-public-book-library` Vercel projects with preview-only deployments. Route both to the one Books identity until a canonical target is proven.

## Common aliases

| Wording | project_id |
|---|---|
| эзохата, ezohata, новый каталог | `ezohata` |
| новые финансы, ezohata finance | `ezohata-finance` |
| старые финансы, incoming ledger | `legacy-finance` |
| psitherapy, психотерапия, report site | `psitherapy` |
| reiki, yggdrasil, рейки | `reiki-yggdrasil` |
| codex links, commands | `codex-links` |
| dashboard, system health, brain management, дашборд | `brain-management` |
| Toronto Tantra, Tantric Tarot | `torontotantra` |
| agent system, project brain, durable memory | `ai-projects-brain` |
| psihotavr, психотавр, mandalas | `psihotavr` |
| books, book library, книги, homeopathy library | `books` (development routing; outside production overlay) |

## Guardrails

- Current live evidence supersedes historical `LIVE_VERIFIED`.
- Status/READY/HTTP 200 alone is insufficient; verify body, source identity and user behavior.
- Operational assignment names require enabled scheduler evidence.
- Zero-effect pilots receive zero completion credit.
- Never infer secrets, owner sessions or missing identity.
