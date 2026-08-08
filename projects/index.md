# Projects Index

> Fast routing index for agents.  
> **Current machine-readable active source:** `projects/portfolio-registry.json`  
> **Complete current owner-repository inventory:** `projects.json` / `data/project-index.json`

## Routing rule

1. Match project name, alias, repository or live URL in `projects/portfolio-registry.json`.
2. Open `projects/<slug>/PROJECT.md` before durable or production conclusions.
3. Use current GitHub/provider reachability as identity evidence; a historical repo URL that now returns 404 is not a current canonical repo.
4. For production, verified behavior/source timestamps override older `LIVE_VERIFIED` labels.
5. Do not promote backup, bootstrap, diagnostic or probe repositories into the active portfolio solely because they are accessible.
6. Keep uncertainty explicit as `NEEDS_VERIFICATION`.

## Current active portfolio — reconciled 2026-08-08

| project_id | Name | Canonical repo | Production URL | Durable state | Current evidence / gap |
|---|---|---|---|---|---|
| `ezohata` | Ezohata | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | BLOCKED | Preserve provider/live proof blocker; repo is accessible. |
| `ezohata-finance` | EzoHata Finance | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | BLOCKED_BY_OWNER | Owner-session + one read-only Wise/YooMoney journey still required. |
| `legacy-finance` | Legacy Finance / Incoming Ledger | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | WATCH | `finance` is canonical; `ezohata-incoming-ledger` remains a deprecated/reference repo alias. |
| `psitherapy` | Psitherapy | `andylitvinov-design/report` | https://psitherapy.vercel.app | BLOCKED | Repo and Vercel project exist; current deploy-source/auth cutover proof remains incomplete. |
| `reiki-yggdrasil` | Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | WATCH | Repo accessible; no newer durable state change proven this run. |
| `codex-links` | Codex Links | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | WATCH | Repo accessible; keep production behavior verification boundary. |
| `brain-management` | Brain Management | `andylitvinov-design/brain-management` | https://brain-management.vercel.app | DEGRADED_STALE_FAIL_CLOSED | Canonical APIs return `503 STALE_OPERATIONAL_DATA_FORBIDDEN`; source `2026-08-06T04:55:44.630Z` exceeded the 18h ceiling. Recovery remains owned by Brain Regression Guard. |
| `torontotantra` | Toronto Tantra | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | WATCH | Repo and canonical Vercel project are accessible; no newer durable state change proven this run. |
| `ai-projects-brain` | AI Projects Brain | `andylitvinov-design/ai-projects-brain` | NOT_APPLICABLE | IMPROVING | Durable source of truth; current reconciliation branch is documentation/index only. |
| `psihotavr` | Psihotavr | `NEEDS_VERIFICATION` | `https://psihotavr.vercel.app` historical / unverified | IDENTITY_UNRESOLVED | Current owner repository enumeration contains no `andylitvinov-design/psihotavr`; direct repo lookup returns 404 and current Vercel team inventory did not expose a `psihotavr` project. Preserve historical identity only until source/live mapping is re-proven. |

## Repository inventory

Current GitHub owner enumeration confirms **30 accessible repositories**. Nine map directly to currently active project identities; the remaining repositories are related, backup, bootstrap, experimental or not yet mapped to an active product. Their presence is evidence of repository existence, not active-product status.

Current unresolved identity: Psihotavr remains in the ten-project portfolio because it is a meaningful historical product identity, but its previously recorded GitHub repo is not currently reachable. Do not route code changes until a canonical repository is proven.

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

## Provider/deployment identity warning

The connected Vercel team currently contains the canonical `brain-management` project plus many temporary/probe/recovery projects created during recent release diagnostics. These are not alternate canonical products. Durable routing must continue to use project `brain-management` / `prj_Kxg8n2tZcjzlmkQxW1E0XkpCp64d` only.

## Guardrails

- `LIVE_VERIFIED` is time-bound; later stale-source or fail-closed evidence downgrades CURRENT state until reverified.
- Status/READY/HTTP 200 alone is insufficient; verify body, content type, source timestamps and user behavior.
- Scheduler evidence overrides stale automation documentation.
- Never infer secrets, owner sessions, protected finance proof or missing project mappings.
- Git history preserves prior detailed legacy inventories; current root indexes should route to capsules instead of duplicating stale details.