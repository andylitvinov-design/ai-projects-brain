# Projects Index

> Fast routing index for agents.  
> **Current machine-readable source:** `projects/portfolio-registry.json`  
> `projects.md`, `projects.json`, and `data/project-index.json` remain historical continuity sources and are `needs_revision` until reconciled field by field.

## Routing rule

1. Read `projects/portfolio-registry.json`.
2. Match the project name, alias, repository, or live URL.
3. Open the project capsule when it exists.
4. For code work, use the canonical GitHub repository and branch.
5. For production work, verified live evidence and the project capsule override a stale registry field; record the discrepancy instead of guessing.
6. Never replace `unknown` or `needs verification` with an inference.

## Current active portfolio

| project_id | Name | Canonical repo | Production URL | Current state | Main evidence |
|---|---|---|---|---|---|
| `ezohata` | Ezohata | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | BLOCKED — provider/live proof | `projects/ezohata/PROJECT.md` |
| `ezohata-finance` | EzoHata Finance | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | BLOCKED_BY_OWNER — session/provider proof | `projects/ezohata-finance/STATE.md` |
| `legacy-finance` | Legacy Finance / Incoming Ledger | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | WATCH — legacy/reference boundary | `projects/ezohata-incoming-ledger/PROJECT.md` |
| `psitherapy` | Psitherapy | `andylitvinov-design/report` | https://psitherapy.vercel.app | BLOCKED — auth cutover proof | durable automation memory |
| `reiki-yggdrasil` | Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | WATCH | `projects/reiki-yggdrasil/PROJECT.md` |
| `codex-links` | Codex Links | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | WATCH | `projects/codex-links/PROJECT.md` |
| `brain-management` | Brain Management | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | LIVE_VERIFIED — six-button UI, 5/5 JSON APIs, 24 metrics | `projects/brain-management/PROJECT.md` |
| `torontotantra` | Toronto Tantra | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | WATCH | audit-sales memory |
| `ai-projects-brain` | AI Projects Brain | `andylitvinov-design/ai-projects-brain` | NOT_APPLICABLE | IMPROVING | `systems/management-control-plane-contract.md` |
| `psihotavr` | Psihotavr | `andylitvinov-design/psihotavr` | https://psihotavr.vercel.app | NEEDS_VERIFICATION — live/source and collector state | durable automation memory |

## Reconciliation status — 2026-08-01

- The Brain Management machine registry now uses the canonical Vercel origin and `LIVE_VERIFIED` state; the historical Netlify discrepancy is closed.
- `andylitvinov-design/finance` remains canonical for `legacy-finance`. `andylitvinov-design/ezohata-incoming-ledger` is a deprecated/read-only repository alias, not a second active project identity.
- The active overlay contains ten projects. A complete enumeration of every accessible repository remains `needs verification`; no additional repository is promoted into the active portfolio without evidence of current meaningful status.
- Legacy `projects.md`, `projects.json`, and `data/project-index.json` are still continuity sources, not current routing authority.

## Common aliases

| User wording | project_id |
|---|---|
| эзохата, ezohata, новый каталог | `ezohata` |
| новые финансы, ezohata finance | `ezohata-finance` |
| старые финансы, incoming ledger, legacy finance | `legacy-finance` |
| psitherapy, психотерапия, report site | `psitherapy` |
| reiki, yggdrasil, рейки | `reiki-yggdrasil` |
| codex links, commands, cloud dispatch | `codex-links` |
| dashboard, system health, brain management, дашборд | `brain-management` |
| Toronto Tantra, Tantric Tarot, Business Mysteries | `torontotantra` |
| agent system, project brain, harness, durable memory | `ai-projects-brain` |
| psihotavr, психотавр, legacy catalog, mandalas | `psihotavr` |

## Secondary and archived projects

Secondary, experimental, backup and archived projects remain discoverable through historical registries and capsules. They are not added to current Portfolio Health until current status, canonical repository, and routing are confirmed.

## Guardrails

- No provider/live success from merged code, READY preview, newest deployment, or HTTP status alone.
- Verify response body, content type, source/deploy binding, and actual user behavior.
- Do not expose or mutate secret/env values, private finance data, or owner sessions.
- Do not merge auth/payment/destructive-data work without its explicit safe route.
- Preserve historical records while correcting the canonical overlay.
