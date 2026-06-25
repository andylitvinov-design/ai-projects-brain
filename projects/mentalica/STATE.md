# Mentalica STATE

Last updated: 2026-06-25

## Current understanding

- `Mentalica` / `2Mentalica` is a domain/deployment mapping for project `Reiki Yggdrasil`.
- Canonical repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- Canonical project memory: `projects/reiki-yggdrasil/PROJECT.md`
- Draft → production transfer protocol: `projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md`
- Canonical live URL: https://reiki-yggdrasil.vercel.app
- `https://2mentalica.vercel.app` is the draft/current working Mentalica domain variant for Reiki Yggdrasil.
- `https://mentalica.vercel.app` is the target/production-facing Mentalica domain for Reiki Yggdrasil.
- Both Mentalica URLs were reachable on 2026-06-25 and returned the app title `Рейки Иггдрасиль`, consistent with the Reiki Yggdrasil mapping.
- Exact Vercel project/alias mapping for all three URLs still needs verification.

## Current transfer status

On 2026-06-25, draft code/schema migrations were transferred from `main/2mentalica` to `production/mentalica`:

- PR: `https://github.com/andylitvinov-design/reiki-yggdrasil/pull/455`
- direction: `main` → `production`
- merge commit: `b8c312ee6d69c258e42755df0794fdd565061c1d`
- CI before merge: success
- transferred: code, UI, app files, docs, tests, and Supabase migration files present in Git
- not transferred: raw Supabase table rows, auth users, Storage files, env values

When asked `всё готово?`, answer precisely:

- code/schema branch transfer: done;
- raw database/auth/storage/env transfer: not done and not attempted;
- live Vercel deployment/browser QA: requires current verification after deploy.

## Hard boundaries

User clarified on 2026-06-25:

- `Mentalica` is the domain for project `Reiki Yggdrasil`.
- `2Mentalica` is the draft/working variant for the same Reiki Yggdrasil domain flow.
- `Psitherapy` is a separate project.
- Mentalica/2Mentalica must not be treated as a separate project repo.

Invalidated assumptions:

- Do not look for a separate `mentalica` repo as the default path.
- Do not treat Supabase project `psitherapy` / ref `juzezltvilqozvmuxrvu` as Mentalica backend.
- Do not use Psitherapy repo/path/env/routes/UI as Mentalica context.

## Default working assumption

When the user says `Mentalica`, `mentalica`, `2Mentalica`, `2mentalica`, or asks to move/copy/sync from `2mentalica`, route the work to **Reiki Yggdrasil** and treat `2mentalica.vercel.app` as the baseline to compare against `mentalica.vercel.app`.

When the user asks to transfer from draft to clean/production, use `projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md`.

## Confirmed context from Reiki Yggdrasil memory

- repo: https://github.com/andylitvinov-design/reiki-yggdrasil
- live: https://reiki-yggdrasil.vercel.app
- hosting: Vercel, Vite build
- env names:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_EMAIL`
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

## Needs verification

- Vercel project/alias mapping for `reiki-yggdrasil.vercel.app`.
- Vercel project/alias mapping for `2mentalica.vercel.app`.
- Vercel project/alias mapping for `mentalica.vercel.app`.
- Production vs preview branch mapping.
- Whether `mentalica.vercel.app` and `2mentalica.vercel.app` are aliases of the same Vercel project or separate Vercel projects.
- Whether the app title `Рейки Иггдрасиль` is the desired title for Mentalica domains.
- Current post-merge live Vercel deployment status for `mentalica.vercel.app`.
- Live browser QA for `/`, `/profile`, `/masters`, `/profile/admin` after deployment.

## Recent user intent

- User asked to transfer everything currently in `2mentalica` to `mentalica` fully.
- User asked to register this mapping so future agents immediately understand that `2mentalica.vercel.app` is the draft variant of `mentalica.vercel.app`.
- User added Vercel and Supabase integrations and asked to find and record everything so agents no longer get lost.
- User corrected that Psitherapy is separate and must not be mixed with Mentalica.
- User clarified that Mentalica is the domain for Reiki Yggdrasil.
- User asked to store the draft → production transfer protocol in `ai-projects-brain`.

## Safe next action

Before implementing any Mentalica/2Mentalica changes, Codex should work in `andylitvinov-design/reiki-yggdrasil`, inspect repo-local docs, verify Vercel domain mapping for all three URLs, and preserve Reiki Yggdrasil constraints.
