# Mentalica CODEX_BRIEF

Use this brief whenever the user asks about Mentalica, 2Mentalica, `mentalica.vercel.app`, or `2mentalica.vercel.app`.

## Confirmed context

- Mentalica is the domain/deployment name for project **Reiki Yggdrasil**.
- 2Mentalica is the draft/working variant for the same Reiki Yggdrasil domain flow.
- Canonical repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- Canonical project memory: `projects/reiki-yggdrasil/PROJECT.md`
- Draft → production transfer protocol: `projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md`
- Canonical live URL: https://reiki-yggdrasil.vercel.app
- Draft/baseline Mentalica URL: https://2mentalica.vercel.app
- Target Mentalica URL: https://mentalica.vercel.app
- User clarified Psitherapy is separate and must not be mixed into Mentalica/Reiki Yggdrasil.

## Critical command routing

If the user asks to transfer from draft to clean/production, e.g.:

- `перенеси данные с черновой на чистовой`
- `перенеси 2mentalica на mentalica`
- `обнови mentalica из 2mentalica`
- `выпусти черновую версию в чистовую`

then use `projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md`.

Default meaning:

- transfer code/UI/app files/docs/tests/Supabase migration files from `main` to `production` through PR;
- do **not** copy raw Supabase table rows, auth users, Storage files, or env values unless the user explicitly asks for a separate database/data migration plan;
- do **not** overwrite production data.

Known release mapping:

- draft branch/site: `main` → `https://2mentalica.vercel.app`
- production branch/site: `production` → `https://mentalica.vercel.app`

Known transfer event:

- 2026-06-25 PR: `https://github.com/andylitvinov-design/reiki-yggdrasil/pull/455`
- merge commit: `b8c312ee6d69c258e42755df0794fdd565061c1d`
- result: code/schema migrations from `main/2mentalica` were merged to `production/mentalica`.
- not transferred: raw Supabase rows/auth users/storage/env values.

## Vercel / Supabase context

- Hosting: Vercel, Vite build, exact domain/alias/project mapping needs verification.
- Supabase context: use Reiki Yggdrasil env names only:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_EMAIL`
- Do not use Psitherapy Supabase project/ref/env names.
- Do not print env values.

## Mandatory first checks

```bash
pwd
git status --short
git remote -v
git branch --show-current
```

Confirm repo remote is `andylitvinov-design/reiki-yggdrasil`.

Then inspect:

```bash
cat AGENTS.md 2>/dev/null || echo 'AGENTS.md not found'
cat README.md 2>/dev/null || echo 'README.md not found'
cat STATE.md 2>/dev/null || echo 'STATE.md not found'
cat LOG.md 2>/dev/null || echo 'LOG.md not found'
cat docs/release-workflow.md 2>/dev/null || echo 'docs/release-workflow.md not found'
cat package.json
cat vercel.json
ls src
```

Important files to review for Reiki Yggdrasil / Mentalica domain work:

- `src/App.jsx`
- `src/main.jsx`
- `src/index.css`
- `src/pages/ProfilePage.jsx`
- `src/pages/MastersPage.jsx`
- `src/pages/AdminPage.jsx`
- `src/lib/supabaseClient.js`
- `supabase/migrations/20260428_master_cabinet_mvp.sql`
- `vercel.json`

If Vercel CLI is available and authenticated:

```bash
vercel whoami
vercel project ls
vercel inspect https://reiki-yggdrasil.vercel.app
vercel inspect https://2mentalica.vercel.app
vercel inspect https://mentalica.vercel.app
vercel env ls
```

Do not print env values.

## Default task prompt

```text
Project: Reiki Yggdrasil
Mentalica domain mapping:
- canonical repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- canonical live: https://reiki-yggdrasil.vercel.app
- draft Mentalica URL: https://2mentalica.vercel.app
- target Mentalica URL: https://mentalica.vercel.app
- draft → production protocol: projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md

Important clarification:
- Mentalica is a domain/deployment name for Reiki Yggdrasil.
- 2Mentalica is the draft/working variant for the same Reiki Yggdrasil domain flow.
- Psitherapy is a separate project; do not mix it in.

Target branch: codex/mentalica-task

Before changes:
- Read projects/reiki-yggdrasil/PROJECT.md, projects/mentalica/PROJECT.md, and projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md from ai-projects-brain.
- In repo, read AGENTS.md, README.md, STATE.md, LOG.md, docs/release-workflow.md, package.json, vercel.json, and app structure.
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
