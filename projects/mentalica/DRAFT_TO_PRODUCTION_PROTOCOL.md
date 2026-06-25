# Mentalica draft → production transfer protocol

Last updated: 2026-06-25

## Trigger phrase

Use this protocol when the user asks, in any wording:

- `перенеси данные с черновой на чистовой`
- `перенеси 2mentalica на mentalica`
- `перенеси черновой проект на чистовой`
- `обнови mentalica из 2mentalica`
- `выпусти черновую версию в чистовую`
- `скопируй 2mentalica на mentalica`
- `скопируй черновую в чистовую`
- `сделай чтобы mentalica работала как 2mentalica`

## Project mapping

- Canonical project: Reiki Yggdrasil
- Repo: `https://github.com/andylitvinov-design/reiki-yggdrasil`
- Draft site: `https://2mentalica.vercel.app`
- Target production site: `https://mentalica.vercel.app`
- Legacy/current canonical URL: `https://reiki-yggdrasil.vercel.app`
- Draft branch: `main`
- Production branch: `production`

Mentalica/2Mentalica is a domain/deployment flow for Reiki Yggdrasil, not a separate repo.

Psitherapy is separate and must not be used.

## Meaning of “перенести данные” / “скопировать”

By default, when the user asks to transfer/copy from draft to production, it means:

1. Transfer/copy **everything that can be safely transferred by GitHub/Vercel workflow**:
   - code;
   - UI;
   - app files;
   - docs;
   - tests;
   - public assets committed to Git;
   - Supabase migration files committed to Git;
   - release notes / memory updates.
2. Use GitHub PR workflow from `main` to `production`.
3. Do **not** copy raw Supabase table rows, auth users, Storage files, or env values unless the user explicitly asks for a database/data migration and approves a separate database plan.
4. Do **not** overwrite production data.
5. After doing the safe transferable part, immediately provide a ready Codex prompt for the remaining work: Vercel live verification, env/domain checks, Supabase redirects, database/storage copy plan if needed, and browser QA.

Use this wording in the report:

```text
Код/миграции и всё, что безопасно переносится через Git, перенесено. Сырые Supabase rows/auth users/storage/env values не копировались, чтобы не перетереть production-данные. Ниже даю prompt для Codex, чтобы он доделал оставшуюся проверку и то, что требует Vercel/Supabase/live доступа.
```

## Required checks before transfer

1. Open repo `andylitvinov-design/reiki-yggdrasil`.
2. Read repo-local rules:
   - `AGENTS.md`
   - `README.md`
   - `STATE.md`
   - `LOG.md`
   - `docs/release-workflow.md`
   - `package.json`
   - `vercel.json`
3. Confirm `main` is draft branch and `production` is production branch.
4. Compare branches:

```bash
git fetch origin --prune
git log --oneline origin/production..origin/main | head -50
git log --oneline origin/main..origin/production | head -50
git diff --stat origin/production..origin/main
```

If using GitHub connector, use compare commits:

```text
base=production, head=main
base=main, head=production
```

5. Check whether an open release PR already exists from `main` to `production`.

## GitHub PR workflow

Preferred safe path:

1. Create PR:

```text
base: production
head: main
title: Release main draft to production
```

2. If the diff is large or branches are diverged, create it as draft first.
3. Wait for CI on the PR/head commit.
4. If CI fails: do not merge. Report exact failure and next fix.
5. If CI passes and PR is mergeable: mark ready and merge.
6. Prefer a normal merge commit for release PRs so the release history stays explicit.
7. Never force-push `production`.
8. Never direct-push to `production` unless the user explicitly approves an emergency manual path.

## What to do after the safe transfer

After Git/PR transfer, always produce a Codex continuation prompt. The prompt must tell Codex to:

1. Verify `mentalica.vercel.app` deployed from `production` after the merge.
2. Compare `mentalica.vercel.app` against `2mentalica.vercel.app`.
3. Verify Vercel env names exist for production, without printing values.
4. Verify Supabase Auth Site URL and redirects include:
   - `https://mentalica.vercel.app/profile`
   - `https://mentalica.vercel.app/profile/admin`
   - keep legacy/draft redirects during migration.
5. Verify Supabase schema/migrations are applied.
6. Verify private Storage bucket/policies if the app uses uploaded photos/media.
7. Verify routes:
   - `/`
   - `/profile`
   - `/masters`
   - `/profile/admin`
   - `/profile/mandalas` if present.
8. Run browser QA: console, network, mobile, desktop three-column layout, RU-default UI.
9. If raw database rows/storage/auth users must be copied, stop and propose a separate safe database migration plan before doing it.

## Current known transfer event

On 2026-06-25:

- PR: `https://github.com/andylitvinov-design/reiki-yggdrasil/pull/455`
- Direction: `main` → `production`
- CI: success before merge
- Merge commit: `b8c312ee6d69c258e42755df0794fdd565061c1d`
- Meaning: draft code/schema migrations from `2mentalica/main` were transferred to `mentalica/production`.
- Not transferred: raw Supabase rows, auth users, Storage files, env values.

## Post-merge verification

After merge, verify or ask Codex/local browser to verify:

```text
https://mentalica.vercel.app/
https://mentalica.vercel.app/profile
https://mentalica.vercel.app/masters
https://mentalica.vercel.app/profile/admin
```

Compare against draft:

```text
https://2mentalica.vercel.app/
https://2mentalica.vercel.app/profile
https://2mentalica.vercel.app/masters
https://2mentalica.vercel.app/profile/admin
```

Also verify legacy/canonical if needed:

```text
https://reiki-yggdrasil.vercel.app/
```

Check:

- page loads;
- no obvious 404;
- no console/network errors where browser access is available;
- RU-default UI;
- desktop three-column layout;
- mobile layout;
- `/profile`, `/masters`, `/profile/admin` routes;
- Supabase auth redirects only if live auth/browser access is available.

## Final report format

Every draft → production transfer/copy report must include:

1. Summary: transferred/copied or blocked.
2. Direction: `main/2mentalica` → `production/mentalica`.
3. PR link and merge commit, if merged.
4. CI/checks status.
5. What was transferred/copied.
6. What was **not** transferred/copied.
7. Ready Codex prompt for remaining work.
8. URLs that still need live verification.
9. Risks/blockers.

## If the user asks “всё готово?”

Answer precisely:

- If PR is merged: `Код и миграции перенесены в production.`
- If Vercel deploy status was not verified: say `Vercel live deploy нужно ещё проверить.`
- If raw database rows were not copied: say `Сырые данные Supabase не переносились.`
- Do not claim raw data/env/storage/auth were transferred unless a separate data migration was performed and verified.
- Always provide the Codex continuation prompt when anything remains to verify or copy.
