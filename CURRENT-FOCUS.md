# Current Focus

> Текущий диспетчер приоритетов для агентов.  
> Использовать после `START-HERE-FOR-AGENTS.md` и `projects/index.md`, если пользователь не указал явно проект.

## Top priorities

1. **ezohata-incoming-ledger / finance** — balance reconciliation, ledger correctness, PayPal/Wise/Yandex/provider imports, plan/fact analytics, audit snapshot.
2. **codex-links** — Codex Cloud routing, Slack bridge, command dispatch, delivery timeline, report surfaces, codex-save diagnostics.
3. **brain-management** — Codex efficiency dashboards, daily thinking/change reports, management report flow.
4. **reiki-yggdrasil** — course/site platform, masters/profile/admin, Supabase verification.
5. **artefacts** — artefact marketplace/site, repo and deploy mapping needs verification.
6. **ai-projects-brain** — project memory dispatcher, project index, agent rules, memory standard.

## Frozen / do not spend time unless explicitly requested

- Old/deprecated finance repository variants.
- Backup repositories, unless task is about backup coverage.
- Unknown Cloudflare Pages projects until repo mapping is verified.
- Bootstrap or experimental repos unless user names them directly.
- Any repo with `needs verification` mapping, until the canonical source is confirmed.

## Current routing rules

- Finance / ledger / PayPal / Wise / Яндекс / balance / plan-fact → `ezohata-incoming-ledger`.
- Codex Links / dispatch / Slack bridge / Codex Cloud / commands → `codex-links`.
- Dashboards / thinking / daily changes / management reports → `brain-management`.
- Reiki / Yggdrasil / masters / profile / admin / Supabase → `reiki-yggdrasil`.
- Artefacts / артефакты / marketplace → `artefacts`.
- Project memory / agent dispatcher / project index → `ai-projects-brain`.

## Current infrastructure risks

- Agents may confuse `finance` with old `ezohata-incoming-ledger` repo names.
- Agents may read too many unrelated repos instead of using `project_key`.
- Some repo/live mappings are `needs verification`.
- Some repos may not have code search indexing enabled.
- Live state must not be inferred from code alone.
- Secrets/env values must never be stored here.

## Current agent workflow

1. Read `START-HERE-FOR-AGENTS.md`.
2. Open `projects/index.md`.
3. Identify `project_key`.
4. Read only the selected project capsule.
5. If code task: open canonical GitHub repo.
6. If production task: run/check the specified live endpoint/checks.
7. Report changed files, checks, risks, and memory updates.

## Next improvements

- Add or normalize missing `CHECKS.md` and `DECISIONS.md` in high-priority project capsules.
- Verify repo/live mapping for `artefacts`, `psitrends`, `ezohata-save`, `ezohata-dashboard`, and other `needs verification` projects.
- Keep `projects/index.md` synchronized with `projects.md` and `projects.json` when project inventory changes.
- Consider folders by project type later if the project list grows.
