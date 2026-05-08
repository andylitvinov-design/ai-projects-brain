# Projects Index

> Быстрый диспетчер проектов для агентов.  
> Использовать перед чтением подробных `projects/<project_key>/PROJECT.md` файлов.

## How to use

1. Найди `project_key` по словам пользователя.
2. Открой главный файл из колонки `main file`.
3. Читай только capsule выбранного проекта.
4. Если задача про код — открой canonical repo.
5. Если задача про production — проверь live URL и checks.
6. Если поле `needs verification` — не угадывай.

## Active / important projects

| project_key | Название | Repo | Prod URL | Type | Status | Main file | Checks |
|---|---|---|---|---|---|---|---|
| ezohata-incoming-ledger | Финансы / ledger | `andylitvinov-design/finance` | https://ezohata-incoming-ledger.vercel.app | app | active | `projects/ezohata-incoming-ledger/PROJECT.md` | `/api/status`, `/api/audit-snapshot`, tests/build/release guard |
| codex-links | Codex Links | `andylitvinov-design/codex-links` | https://codex-links.pages.dev | infra | active | `projects/codex-links/PROJECT.md` | Cloudflare live checks, version triplet, command lifecycle |
| brain-management | Brain Management | `andylitvinov-design/brain-management` | https://brain-management.pages.dev | infra | active | `projects/brain-management/PROJECT.md` | dashboard JSON paths, report publish/API checks |
| reiki-yggdrasil | Reiki Yggdrasil | `andylitvinov-design/reiki-yggdrasil` | https://reiki-yggdrasil.vercel.app | site/course | active | `projects/reiki-yggdrasil/PROJECT.md` | Vercel live, Supabase auth/profile flow |
| psychotherapist | Психотерапевт / Profile | `andylitvinov-design/Profile` | not applicable | method/personal therapy | active | `projects/psychotherapist/PROJECT.md` | verify Profile operating files; no client data; no secrets/env |
| artefacts | Артефакты | `andylitvinov-design/artefacts` | needs verification | site | active/cloud-ready; repo+stack verified; live needs verification | `projects/artefacts/PROJECT.md` | `npm run build`, `npm run lint`, `npm run smoke:release`; live deploy needs verification |
| active-projects-ops | Active Projects Ops | `andylitvinov-design/active-projects-ops` | mixed: sales + ezohata links confirmed in README | infra/site | active shared repo; subproject boundary required | `projects/active-projects-ops/PROJECT.md` | choose subproject first; verify live/deploy source |
| psitrends | PsiTrends | `andylitvinov-design/psitrends-work` | https://psitrends.pages.dev | site | repo verified; live/deploy source needs verification | `projects/psitrends/PROJECT.md` | inspect repo tree; verify Cloudflare deploy source |
| report | Report Template Reference | `andylitvinov-design/report` | not applicable / needs verification | method/site | public reference repo verified; no root package found | `projects/report/PROJECT.md` | restore reference image; inspect design docs |
| council | Council | `andylitvinov-design/council` | needs verification | app | private Next.js candidate; default branch `codex/agent-work`; deploy needs verification | `projects/council/PROJECT.md` | verify branch, package, app structure, deploy target |
| ai-projects-brain | AI Projects Brain | `andylitvinov-design/ai-projects-brain` | not applicable | infra | active | `README.md`, `START-HERE-FOR-AGENTS.md` | validation/sync scripts |
| codex-save | Codex Save | `andylitvinov-design/codex-links` | https://codex-save-cjb.pages.dev | infra | active subproject | `projects/codex-save/PROJECT.md` | verify KV binding and command side effects |
| agent-auditor | Agent Auditor | needs verification | not applicable | method/infra | design | `projects/agent-auditor/PROJECT.md` | verify canonical repo and audit snapshot contracts |

## Secondary / needs verification projects

| project_key | Название | Repo | Prod URL | Type | Status | Main file |
|---|---|---|---|---|---|---|
| codex-links-myportal | Codex Links MyPortal | unknown | https://codex-links-myportal.pages.dev | app | needs verification | `projects/codex-links-myportal/PROJECT.md` |
| ezohata_ads | EzoHata Ads | `andylitvinov-design/ezohata_ads` | needs verification | app/site | needs verification | `projects/ezohata_ads/PROJECT.md` |
| codex-daily-backups | Codex Daily Backups | `andylitvinov-design/codex-daily-backups` | not applicable | infra/archive | sensitive | `projects/codex-daily-backups/PROJECT.md` |
| ezohata-save | EzoHata Save | unknown | https://ezohata-save.pages.dev | infra | repo mapping not found in GitHub inventory | `projects/ezohata-save/PROJECT.md` |
| ezohata-dashboard | EzoHata Dashboard | unknown | https://ezohata-dashboard.pages.dev | app/archive | repo mapping not found in GitHub inventory | `projects/ezohata-dashboard/PROJECT.md` |
| sales-bwa-photo | Sales BWA Photo | unknown | https://sales-bwa-photo.pages.dev | site | likely under `active-projects-ops/sales`; needs deploy source verification | `projects/sales-bwa-photo/PROJECT.md` |

## Agent Entry map

| User wording | project_key |
|---|---|
| финансы, ledger, balance, PayPal, Wise, Яндекс, расходы, план/факт | `ezohata-incoming-ledger` |
| Codex Links, Slack bridge, dispatch, Codex Cloud, commands | `codex-links` |
| dashboard, thinking, daily changes, management reports | `brain-management` |
| Reiki Yggdrasil, masters, profile, admin, Supabase | `reiki-yggdrasil` |
| психотерапевт, терапевтический агент, AI-психотерапевт, психосоматика Andrey, профиль Andrey, сжатие груди/нёба/лица/горла, вина, стыд, контакт, проявленность | `psychotherapist` |
| artefacts, артефакты, marketplace | `artefacts` |
| sales landing, sales-bwa-photo | `active-projects-ops` / subproject `sales` |
| ezohata ops/docs hub | `active-projects-ops` / subproject `ezohata` |
| report template, A4 report, Алхимия Души report | `report` |
| council, SIA Council | `council` |
| project brain, память проектов, базы проектов | `ai-projects-brain` |
| auditor, audit snapshot, data auditor | `agent-auditor` |

## Type meanings

- `app` — application/code/product; verify tests/build/deploy.
- `site` — website/content/UI; verify live rendering and deploy source.
- `course` — course/learning product; verify content structure and UX.
- `method` — methodology/knowledge; verify text boundaries and no private data.
- `infra` — operational infrastructure, agents, dashboards, bridges.
- `archive` — avoid unless explicitly requested.

## Guardrails

- Do not change secrets/env values.
- Do not assume unknown repo/live mappings.
- Do not use old/deprecated repos as production source unless explicitly confirmed.
- Prefer project capsule first, then canonical repo, then live checks.
