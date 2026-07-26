# Projects Index

> Fast routing index for agents.  
> **Current machine-readable source:** `projects/portfolio-registry.json`  
> The older `projects.md` and `projects.json` remain historical continuity sources and are `needs_revision` until reconciled field by field.

## Routing rule

1. Read `projects/portfolio-registry.json`.
2. Match the user's project or alias.
3. Open the project capsule when it exists.
4. For code work, use the canonical repository.
5. For live/provider outcomes, require current deploy/source/behavior proof.
6. Never replace `unknown` with a guess.

## Current active portfolio

| project_id | Name | Canonical repo | Production URL | Current state | Main evidence |
|---|---|---|---|---|---|
| `ezohata` | Ezohata | `andylitvinov-design/ezohata` | https://ezohata.vercel.app | BLOCKED — provider/live proof | `projects/ezohata/PROJECT.md` |
| `ezohata-finance` | EzoHata Finance | `andylitvinov-design/ezohata-finance` | https://ezohata-finance.vercel.app | BLOCKED_BY_OWNER — session/provider proof | `projects/ezohata-finance/STATE.md` |
| `legacy-finance` | Legacy Finance / Incoming Ledger | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | WATCH — legacy/reference boundary | `projects/ezohata-incoming-ledger/PROJECT.md` |
| `psitherapy` | Psitherapy | `andylitvinov-design/report` | https://psitherapy.vercel.app | BLOCKED — auth cutover proof | Daily Improve memory |
| `reiki-yggdrasil` | Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | WATCH | `projects/reiki-yggdrasil/PROJECT.md` |
| `codex-links` | Codex Links | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | WATCH | `projects/codex-links/PROJECT.md` |
| `brain-management` | Brain Management | `andylitvinov-design/brain-management` | https://brain-management.netlify.app | BLOCKED — stale publication | dashboard publication trace |
| `torontotantra` | Toronto Tantra | `andylitvinov-design/torontotantra` | https://torontotantra.vercel.app | WATCH | audit-sales memory |
| `ai-projects-brain` | AI Projects Brain | `andylitvinov-design/ai-projects-brain` | NOT_APPLICABLE | IMPROVING | `systems/upgrade-cycle-metrics.md` |
| `psihotavr` | Psihotavr | `andylitvinov-design/psihotavr` | https://psihotavr.vercel.app | NEEDS_VERIFICATION — live/retirement/source | Daily Improve memory |

## Common aliases

| User wording | project_id |
|---|---|
| эзохата, ezohata, новый каталог | `ezohata` |
| новые финансы, ezohata finance | `ezohata-finance` |
| старые финансы, incoming ledger, legacy finance | `legacy-finance` |
| psitherapy, психотерапия, report site | `psitherapy` |
| reiki, yggdrasil | `reiki-yggdrasil` |
| codex links, commands, cloud dispatch | `codex-links` |
| dashboard, system health, brain management | `brain-management` |
| Toronto Tantra, Tantric Tarot, Business Mysteries | `torontotantra` |
| agent system, project brain, harness | `ai-projects-brain` |
| psihotavr, психотавр, legacy catalog | `psihotavr` |

## Secondary projects

Secondary and archived projects remain discoverable in the historical registries and project capsules. They are not added to current Portfolio Health unless current active status and routing are confirmed.

## Guardrails

- No provider/live success from merged code, READY preview or newest deploy alone.
- Do not expose or mutate secret/env values.
- Do not merge auth/payment/data/provider work without the explicit safe route.
- Audit evidence is readiness evidence, not revenue or verified impact.
- Preserve historical registry records until bounded reconciliation is complete.
