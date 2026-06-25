# Mentalica

## Identity

- **name:** Mentalica
- **slug:** `mentalica`
- **purpose:** Mentalica web app for psychotherapy/self-analysis reports, AI intake/analysis flows, and public/user-facing mentalica interface.
- **primary live URL:** https://mentalica.vercel.app
- **draft/staging URL:** https://2mentalica.vercel.app
- **relationship:** `2mentalica.vercel.app` is the draft/working variant for `mentalica.vercel.app` and should be treated as the source/baseline to compare before production-facing Mentalica changes.
- **repo URL:** needs verification
- **likely local checkout:** `/Users/andriilitvinov/projects/MYPROJECTS/reports` needs verification
- **hosting:** Vercel / needs verification
- **current status:** Both `https://2mentalica.vercel.app` and `https://mentalica.vercel.app` were reachable on 2026-06-25 and both returned the app title `Рейки Иггдрасиль`; exact Vercel project and deploy source still need verification.

## Source-of-truth rules

1. For any Mentalica task, first check this file, then inspect the actual repo-local docs.
2. Treat `https://2mentalica.vercel.app` as the draft/current working baseline unless the user explicitly says otherwise.
3. Treat `https://mentalica.vercel.app` as the target/production-facing Mentalica URL.
4. Do not assume the repo from name alone; verify local git remote, Vercel project, and deploy source.
5. Do not copy patterns from Reiki Yggdrasil, Artefacts, EzoHata, or Codex Links without checking the Mentalica repo.
6. Do not expose env values or secrets; store env names only.

## What to inspect first in repo

- `AGENTS.md` — if missing, report `AGENTS.md not found`
- `README.md`
- `STATE.md` / `project-state.md`
- `LOG.md`
- `package.json`
- `vercel.json`
- `.env.example` or env docs
- `src/`, `app/`, `pages/`, `components/` or actual app structure
- router/app shell
- layout/nav components
- report / self-analysis / AI intake pages

## Known URLs

- Draft/current working baseline: https://2mentalica.vercel.app
- Target Mentalica URL: https://mentalica.vercel.app

## Important files

needs verification. Based on prior local context, likely candidates in the `reports` app include:

- `src/components/Layout.jsx`
- `src/pages/SelfAnalysis.jsx`
- related styles/data for mobile navigation and `Краткий ИИ-приём`
- `package.json`
- `vercel.json`

These are not confirmed as canonical until the repo is inspected.

## Env names

needs verification. Do not infer or print env values.

## Known issues / context

- The user wants `2mentalica` migrated/synchronized into `mentalica` completely.
- `2mentalica` should be understood as the draft variant, not as an unrelated project.
- Earlier local workflow context referenced repo path `/Users/andriilitvinov/projects/MYPROJECTS/reports` and branch/worktree `reports-psitherapy-mobile-ux`, but canonical repo/deploy mapping is still needs verification.
- UI topics mentioned before: mobile navigation, top menu expanded instead of collapsed, `Краткий ИИ-приём` text should be compact/clear, bottom overflow stripe issue.

## Risks

- Confusing Mentalica with Reiki Yggdrasil because both live URLs currently expose title text `Рейки Иггдрасиль`.
- Editing the wrong repo or wrong Vercel project.
- Treating Vercel preview/staging as production without verification.
- Losing env variables during migration.
- Breaking report/test/AI analysis flows.
- Changing UX/design while the requested task is only migration/synchronization.

## Default Codex workflow

For Mentalica tasks:

1. Verify repo and deploy source.
2. Compare `2mentalica.vercel.app` and `mentalica.vercel.app`.
3. Use `2mentalica` as baseline/current draft unless user says otherwise.
4. Make minimal branch-based changes.
5. Run repo-defined checks.
6. Verify preview/live URLs.
7. Report changed files, checks run, risks, and what was not verified.

## Canonical Codex prompt seed

```text
Project: Mentalica
Draft/baseline URL: https://2mentalica.vercel.app
Target URL: https://mentalica.vercel.app
Repo: needs verification
Likely local checkout: /Users/andriilitvinov/projects/MYPROJECTS/reports needs verification
Hosting: Vercel / needs verification
Target branch: codex/mentalica-<task-slug>

Before changes:
- Read AGENTS.md, README.md, STATE.md/project-state.md, LOG.md, package.json, vercel.json, and app structure.
- Verify git remote and current branch.
- Verify which Vercel project serves 2mentalica.vercel.app.
- Verify which Vercel project serves mentalica.vercel.app.
- Treat 2mentalica.vercel.app as the draft/current working baseline for mentalica.vercel.app.
- Do not expose env values; list env names only.

Rules:
- Do not rewrite the whole project.
- Do not change UX/design unless required by the task.
- Do not break routes, forms, reports, AI intake/analysis flows, mobile layout, or Vercel rewrites.
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
- changed files
- checks run
- preview/live URLs checked
- env names needed
- risks
- what was not verified
```
