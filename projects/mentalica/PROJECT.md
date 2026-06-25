# Mentalica domain mapping

## Identity

- **name:** Mentalica / 2Mentalica
- **slug:** `mentalica`
- **type:** domain/deployment mapping for Reiki Yggdrasil, not a separate product repo.
- **canonical project:** `reiki-yggdrasil`
- **canonical project memory:** `projects/reiki-yggdrasil/PROJECT.md`
- **canonical repo URL:** https://github.com/andylitvinov-design/reiki-yggdrasil
- **canonical live URL:** https://reiki-yggdrasil.vercel.app
- **target Mentalica URL:** https://mentalica.vercel.app
- **draft/staging Mentalica URL:** https://2mentalica.vercel.app
- **hosting:** Vercel, Vite build / exact Vercel project aliases need verification
- **Supabase:** use the Reiki Yggdrasil Supabase context, not Psitherapy. Known env names from Reiki Yggdrasil memory: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAIL`. Values must never be printed.
- **current status:** User clarified on 2026-06-25 that Mentalica is the domain for the Reiki Yggdrasil project. Earlier live checks found both `2mentalica.vercel.app` and `mentalica.vercel.app` reachable and returning title `Рейки Иггдрасиль`, which is consistent with the Reiki Yggdrasil mapping.

## Hard boundary: Mentalica is not a separate project

The user explicitly clarified on 2026-06-25:

- `Mentalica` is a domain/deployment name for project `Reiki Yggdrasil`.
- `2Mentalica` is the draft/working variant for that same Reiki Yggdrasil project/domain flow.
- `Psitherapy` is a separate project and must not be mixed with Mentalica/Reiki Yggdrasil.

Therefore:

- Do **not** search for a separate `mentalica` repo as the default path.
- Do **not** use Psitherapy repo, Supabase project, env names, routes, or UI assumptions for Mentalica.
- Do use `andylitvinov-design/reiki-yggdrasil` as the canonical repo unless a later verified migration changes this.
- Do use `projects/reiki-yggdrasil/PROJECT.md` as the main project passport.
- Treat this file as an alias/domain note that prevents future agents from getting lost.

## Source-of-truth rules

1. For any `mentalica`, `2mentalica`, `mentalica.vercel.app`, or `2mentalica.vercel.app` task, route the work to **Reiki Yggdrasil**.
2. First read `projects/reiki-yggdrasil/PROJECT.md`, then repo-local `AGENTS.md`, `README.md`, `STATE.md`, `LOG.md`, `package.json`, `vercel.json`, and app structure.
3. Treat `https://2mentalica.vercel.app` as draft/current working baseline for the Mentalica domain.
4. Treat `https://mentalica.vercel.app` as target/production-facing Mentalica domain.
5. Compare against canonical Reiki Yggdrasil live URL `https://reiki-yggdrasil.vercel.app` when domain/deployment behavior is unclear.
6. Preserve Reiki Yggdrasil constraints: RU-default UI, routes `/`, `/profile`, `/masters`, `/profile/admin`, Supabase auth/data flows, Vercel rewrites, and accepted desktop three-column layout.
7. Do not expose env values or secrets; store env names only.

## Reiki Yggdrasil context to apply

From the canonical project memory:

- repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- live: https://reiki-yggdrasil.vercel.app
- hosting: Vercel, Vite build
- purpose: Reiki Yggdrasil Vite/React platform with public learning UI, master cabinet, public masters catalog, and admin moderation.
- important files:
  - `src/App.jsx`
  - `src/main.jsx`
  - `src/index.css`
  - `src/pages/ProfilePage.jsx`
  - `src/pages/MastersPage.jsx`
  - `src/pages/AdminPage.jsx`
  - `src/lib/supabaseClient.js`
  - `supabase/migrations/20260428_master_cabinet_mvp.sql`
  - `vercel.json`
- env names:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_EMAIL`

## Known URLs

- Canonical Reiki Yggdrasil live: https://reiki-yggdrasil.vercel.app
- Mentalica target domain: https://mentalica.vercel.app
- Mentalica draft/staging domain: https://2mentalica.vercel.app

## Known issues / context

- User wants everything from `2mentalica` moved/synchronized to `mentalica` fully.
- This means synchronizing the draft Mentalica deployment/domain state into the target Mentalica deployment/domain for the Reiki Yggdrasil project.
- Earlier confusion with Psitherapy is now corrected: Psitherapy is separate.
- Earlier confusion that Mentalica might be a separate repo is now corrected: Mentalica is a domain/deployment mapping for Reiki Yggdrasil.
- Exact Vercel project/alias mapping for `2mentalica`, `mentalica`, and `reiki-yggdrasil` still needs verification from Vercel CLI/dashboard or `.vercel/project.json`.

## Risks

- Confusing Mentalica with a separate project repo.
- Confusing Mentalica with Psitherapy.
- Breaking Reiki Yggdrasil public home page.
- Breaking RU-default interface.
- Breaking `/`, `/profile`, `/masters`, `/profile/admin` routes.
- Breaking Supabase auth/data flows.
- Breaking Vercel rewrites or aliases.
- Breaking accepted desktop three-column layout.
- Repointing production domains without confirming preview/production mapping.

## Default Codex workflow

For Mentalica/2Mentalica tasks:

1. Load `projects/reiki-yggdrasil/PROJECT.md` and this domain mapping file.
2. Open repo `andylitvinov-design/reiki-yggdrasil`.
3. Read repo-local `AGENTS.md`, `README.md`, `STATE.md`, `LOG.md`, `package.json`, `vercel.json`, and relevant source files.
4. Verify Vercel domain/project mapping for:
   - `https://reiki-yggdrasil.vercel.app`
   - `https://2mentalica.vercel.app`
   - `https://mentalica.vercel.app`
5. Treat `2mentalica.vercel.app` as draft baseline and `mentalica.vercel.app` as target domain.
6. Make minimal branch-based changes in `reiki-yggdrasil` only.
7. Run repo-defined checks.
8. Verify all three URLs where possible.
9. Report changed files, checks run, risks, and what was not verified.

## Canonical Codex prompt seed

```text
Project: Reiki Yggdrasil
Mentalica domain mapping:
- canonical repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- canonical live: https://reiki-yggdrasil.vercel.app
- draft Mentalica URL: https://2mentalica.vercel.app
- target Mentalica URL: https://mentalica.vercel.app

Important clarification:
- Mentalica is a domain/deployment name for Reiki Yggdrasil.
- 2Mentalica is the draft/working variant for the same Reiki Yggdrasil domain flow.
- Psitherapy is a separate project; do not mix it in.

Target branch: codex/mentalica-<task-slug>

Before changes:
- Read projects/reiki-yggdrasil/PROJECT.md and projects/mentalica/PROJECT.md from ai-projects-brain.
- In repo, read AGENTS.md, README.md, STATE.md, LOG.md, package.json, vercel.json, and app structure.
- Verify git remote is andylitvinov-design/reiki-yggdrasil.
- Verify Vercel mapping for reiki-yggdrasil.vercel.app, 2mentalica.vercel.app, and mentalica.vercel.app.
- Treat 2mentalica.vercel.app as draft/current baseline and mentalica.vercel.app as target.
- Do not expose env values. Env names only: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_EMAIL.

Must preserve:
- RU-default UI.
- Routes /, /profile, /masters, /profile/admin.
- Existing home page unless task explicitly changes it.
- Supabase auth/data flows.
- Vercel rewrites/domain routing.
- Accepted desktop three-column structure.

Checks:
- npm install or npm ci as appropriate.
- npm run build.
- npm test / npm run lint if available.
- Browser-check /, /profile, /masters, /profile/admin on available preview/live URLs.
- Compare draft 2mentalica and target mentalica.
- Check console/network and mobile/desktop layout.

Report:
- confirmed repo
- confirmed Vercel project/domain mapping
- changed files
- checks run
- URLs checked
- env names needed, no values
- risks
- what was not verified
```
