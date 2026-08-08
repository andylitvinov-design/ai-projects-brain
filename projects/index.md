# Projects Index

> Fast routing index for agents.  
> **Current machine-readable source:** `projects/portfolio-registry.json`  
> Legacy `projects.md`, `projects.json`, and `data/project-index.json` are continuity sources. Their exact current overrides are recorded in `data/legacy-project-index-reconciliation-2026-08-08.json` until a safe field-preserving patch is applied.

Last reconciled: `2026-08-08`

## Routing rule

1. Read `projects/portfolio-registry.json`.
2. Match project name, alias, canonical repository, or live URL.
3. Open the project capsule when it exists.
4. For code work, use the canonical GitHub repository and branch from the current overlay/capsule.
5. For production work, verified live evidence overrides a stale continuity record; record the discrepancy instead of guessing.
6. Never promote a repository to an active project merely because it is accessible.
7. Never replace `unknown`, `blocked`, or `needs verification` with an inference.

## Current active portfolio

| project_id | Name | Canonical repo | Production URL | Current state | Main evidence |
|---|---|---|---|---|---|
| `ezohata` | Ezohata | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | BLOCKED — provider/live proof | `projects/ezohata/PROJECT.md` |
| `ezohata-finance` | EzoHata Finance | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | BLOCKED_BY_OWNER — session/provider proof | `projects/ezohata-finance/STATE.md` |
| `legacy-finance` | Legacy Finance / Incoming Ledger | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | WATCH — legacy/reference boundary | `projects/ezohata-incoming-ledger/PROJECT.md` |
| `psitherapy` | Psitherapy | `andylitvinov-design/report` | https://psitherapy.vercel.app | BLOCKED — repo confirmed; auth/provider cutover still unverified | current connected GitHub inventory + durable memory |
| `reiki-yggdrasil` | Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | WATCH | `projects/reiki-yggdrasil/PROJECT.md` |
| `codex-links` | Codex Links | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | WATCH | `projects/codex-links/PROJECT.md` |
| `brain-management` | Brain Management | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | **DEGRADED_FAIL_CLOSED** — source stale >18h | `projects/brain-management/PROJECT.md`, `governance/CURRENT.md` |
| `torontotantra` | Toronto Tantra | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | WATCH | audit-sales memory |
| `ai-projects-brain` | AI Projects Brain | `andylitvinov-design/ai-projects-brain` | NOT_APPLICABLE | IMPROVING | `systems/management-control-plane-contract.md` |
| `psihotavr` | Psihotavr | `andylitvinov-design/psihotavr` | https://psihotavr.vercel.app | NEEDS_VERIFICATION — repo not visible in current installed inventory; live/source state unresolved | durable memory |

## Reconciliation status — 2026-08-08

- Connected GitHub inventory now enumerates **30 accessible repositories**. This closes the prior global `full accessible repository inventory = needs verification` gap for the installed connector view.
- The active portfolio remains **10 projects**. Secondary, backup, infrastructure, bootstrap, content and experimental repositories are not promoted merely because they are accessible.
- `andylitvinov-design/report` is currently accessible and confirms the Psitherapy repository mapping used by the active overlay.
- `andylitvinov-design/finance` remains canonical for `legacy-finance`; `andylitvinov-design/ezohata-incoming-ledger` remains a deprecated/read-only repository alias.
- Brain Management canonical repo/live mapping remains Vercel, but its **status changed**: current APIs are fail-closed because underlying source `2026-08-06T04:55:44.630Z` is about 49.8h old.
- `psihotavr` is not present in the current installed-repository inventory. Keep its prior repo/live mapping only as `needs verification` rather than deleting the project identity.
- Legacy `projects.md`, `projects.json`, and `data/project-index.json` still contain stale Brain Management Cloudflare routing and older Psitherapy ambiguity. They are historical continuity, not current routing authority.

## Common aliases

| User wording | project_id |
|---|---|
| эзохата, ezohata, новый каталог | `ezohata` |
| новые финансы, ezohata finance | `ezohata-finance` |
| старые финансы, incoming ledger, legacy finance | `legacy-finance` |
| psitherapy, психотерапия, report site, reports | `psitherapy` |
| reiki, yggdrasil, рейки | `reiki-yggdrasil` |
| codex links, commands, cloud dispatch | `codex-links` |
| dashboard, system health, brain management, дашборд | `brain-management` |
| Toronto Tantra, Tantric Tarot, Business Mysteries | `torontotantra` |
| agent system, project brain, harness, durable memory | `ai-projects-brain` |
| psihotavr, психотавр, legacy catalog, mandalas | `psihotavr` |

## Accessible secondary/support repository examples

The current installed-repository inventory also contains secondary/support identities such as `agent-loops`, `active-projects-ops`, `artefacts`, `ezohata_ads`, `hermes-cloud`, `psitrends-work`, `dao-usin-bach-report-kit`, `codex-daily-backups`, and `weblinks-private-backup`. Keep these discoverable through historical inventories/capsules, but do not add them to the ten-project Portfolio Health overlay without current meaningful project/live evidence.

## Guardrails

- No provider/live success from merged code, READY preview, newest deployment, or HTTP status alone.
- A fail-closed stale API is not a healthy current payload; preserve the guard and fix the source/publication cadence in the operational layer.
- Verify response body, content type, source/deploy binding, and actual user behavior.
- Do not expose or mutate secrets, private credentials, private finance data, or owner sessions.
- Do not merge auth/payment/destructive-data work without its explicit safe route.
- Preserve historical records while correcting current routing authority.
