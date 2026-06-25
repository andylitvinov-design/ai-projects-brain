# Mentalica

## Identity

- **name:** Mentalica
- **slug:** `mentalica`
- **purpose:** Mentalica web app for self-analysis / mentalica interface flows. Exact product scope still needs verification from the canonical repo.
- **primary live URL:** https://mentalica.vercel.app
- **draft/staging URL:** https://2mentalica.vercel.app
- **relationship:** `2mentalica.vercel.app` is the draft/working variant for `mentalica.vercel.app` and should be treated as the source/baseline to compare before production-facing Mentalica changes.
- **repo URL:** needs verification
- **likely local checkout:** needs verification
- **hosting:** Vercel / needs verification
- **Supabase:** needs verification. Do **not** assume the `psitherapy` Supabase project belongs to Mentalica.
- **current status:** Both `https://2mentalica.vercel.app` and `https://mentalica.vercel.app` were reachable on 2026-06-25 and both returned the app title `Рейки Иггдрасиль`; exact Vercel project and deploy source still need verification.

## Hard boundary: Mentalica is not Psitherapy

The user explicitly clarified on 2026-06-25:

- `Psitherapy` is a separate project.
- `Mentalica` / `2Mentalica` is another project.
- Agents must not merge, mix, or infer backend/repo/deploy settings between Psitherapy and Mentalica.

Therefore:

- Supabase project `psitherapy` / ref `juzezltvilqozvmuxrvu` must **not** be recorded as Mentalica backend.
- Local paths, branches, or worktrees containing `psitherapy` are not canonical for Mentalica unless later explicitly verified.
- Any previous assumption that Mentalica might use Psitherapy backend is invalid.

## Source-of-truth rules

1. For any Mentalica task, first check this file, then inspect the actual repo-local docs.
2. Treat `https://2mentalica.vercel.app` as the draft/current working baseline unless the user explicitly says otherwise.
3. Treat `https://mentalica.vercel.app` as the target/production-facing Mentalica URL.
4. Do not assume the repo from name alone; verify local git remote, Vercel project, and deploy source.
5. Do not assume Supabase from similarly named therapy projects; verify the actual env names and Supabase project from the Mentalica repo/Vercel settings.
6. Do not copy patterns from Psitherapy, Reiki Yggdrasil, Artefacts, EzoHata, or Codex Links without checking the Mentalica repo.
7. Do not expose env values or secrets; store env names only.

## What to inspect first in repo

- `AGENTS.md` — if missing, report `AGENTS.md not found`
- `README.md`
- `STATE.md` / `project-state.md`
- `LOG.md`
- `package.json`
- `vercel.json`
- `.env.example` or env docs
- `.vercel/project.json`, if present, for Vercel `orgId`/`projectId`
- `src/`, `app/`, `pages/`, `components/` or actual app structure
- router/app shell
- layout/nav components
- actual Mentalica pages and user flows

## Known URLs

- Draft/current working baseline: https://2mentalica.vercel.app
- Target Mentalica URL: https://mentalica.vercel.app

## Important files

needs verification. Do not use Psitherapy paths/files as Mentalica source unless the repo/deploy mapping proves it.

Likely files to identify after repo verification:

- app/router entry
- layout/navigation components
- key page components
- styles
- `package.json`
- `vercel.json`
- env docs / Supabase client, if any

## Env names

needs verification. Do not infer from Psitherapy. Do not print env values.

## Known issues / context

- The user wants `2mentalica` migrated/synchronized into `mentalica` completely.
- `2mentalica` should be understood as the draft variant, not as an unrelated project.
- User clarified Psitherapy is separate and must not be confused with Mentalica/2Mentalica.
- UI topics mentioned before may be related to a separate reports/psitherapy app and must be re-verified before applying to Mentalica.

## Risks

- Confusing Mentalica with Psitherapy because of similar psychotherapy/report language.
- Confusing Mentalica with Reiki Yggdrasil because both live URLs currently expose title text `Рейки Иггдрасиль`.
- Editing the wrong repo or wrong Vercel project.
- Treating Vercel preview/staging as production without verification.
- Losing env variables during migration.
- Breaking actual Mentalica routes/user flows.
- Changing UX/design while the requested task is only migration/synchronization.

## Default Codex workflow

For Mentalica tasks:

1. Verify repo and deploy source.
2. Verify Vercel project(s), domains, aliases, production branch, and preview branch.
3. Verify whether Mentalica uses Supabase; if yes, identify only env names and Supabase project name/ref from Mentalica settings.
4. Compare `2mentalica.vercel.app` and `mentalica.vercel.app`.
5. Use `2mentalica` as baseline/current draft unless user says otherwise.
6. Make minimal branch-based changes.
7. Run repo-defined checks.
8. Verify preview/live URLs.
9. Report changed files, checks run, risks, and what was not verified.

## Canonical Codex prompt seed

```text
Project: Mentalica
Draft/baseline URL: https://2mentalica.vercel.app
Target URL: https://mentalica.vercel.app
Repo: needs verification
Hosting: Vercel / needs verification
Supabase: needs verification; do not assume Psitherapy backend
Target branch: codex/mentalica-<task-slug>

Hard boundary:
- Psitherapy is a separate project.
- Mentalica/2Mentalica is another project.
- Do not mix Psitherapy repo, Supabase project, env names, routes, or UI assumptions into Mentalica unless explicitly verified from Mentalica deploy settings.

Before changes:
- Read AGENTS.md, README.md, STATE.md/project-state.md, LOG.md, package.json, vercel.json, .vercel/project.json, and app structure.
- Verify git remote and current branch.
- Verify which Vercel project serves 2mentalica.vercel.app.
- Verify which Vercel project serves mentalica.vercel.app.
- Verify whether Mentalica uses Supabase and list env names only.
- Treat 2mentalica.vercel.app as the draft/current working baseline for mentalica.vercel.app.
- Do not expose env values.

Rules:
- Do not rewrite the whole project.
- Do not change UX/design unless required by the task.
- Do not break routes, forms, data flows, mobile layout, or Vercel rewrites.
- Keep 2mentalica available until mentalica is verified.
- Distinguish production and preview.

Checks:
- Use package.json scripts.
- Run build and lint/test if available.
- Browser-check draft and target URLs.
- Check console/network errors and mobile viewport.

Report:
- confirmed repo
- confirmed Vercel project(s)
- confirmed Supabase project or `none/needs verification`
- changed files
- checks run
- preview/live URLs checked
- env names needed
- risks
- what was not verified
```
