# Mentalica STATE

Last updated: 2026-06-25

## Current understanding

- `https://2mentalica.vercel.app` is the draft/current working variant for Mentalica.
- `https://mentalica.vercel.app` is the target/production-facing Mentalica URL.
- Both URLs were reachable on 2026-06-25 and returned the app title `Рейки Иггдрасиль`.
- Exact repo, Vercel project names, deployment source branches, env names, Supabase project, and build settings are still `needs verification`.

## Hard boundary

User clarified on 2026-06-25:

- `Psitherapy` is a separate project.
- `Mentalica` / `2Mentalica` is a separate project.
- They must not be confused.

Invalidated assumption:

- Supabase project `psitherapy` / ref `juzezltvilqozvmuxrvu` is **not** Mentalica backend.
- Do not use Psitherapy repo/path/env/routes/UI as Mentalica context unless the user later explicitly says so.

## Default working assumption

When the user says `Mentalica`, `mentalica`, or asks to move/copy/sync from `2mentalica`, treat `2mentalica.vercel.app` as the baseline to compare against `mentalica.vercel.app`.

## Needs verification

- Canonical GitHub repo.
- Local checkout path.
- Vercel project for `2mentalica.vercel.app`.
- Vercel project for `mentalica.vercel.app`.
- Production vs preview branch mapping.
- Whether Mentalica uses Supabase.
- If Mentalica uses Supabase: project name/ref and env names only.
- Build/dev/test commands.
- Env names.
- Actual routes and user scenarios.
- Whether app title `Рейки Иггдрасиль` is intentional or stale branding.

## Recent user intent

- User asked to transfer everything currently in `2mentalica` to `mentalica` fully.
- User asked to register this mapping so future agents immediately understand that `2mentalica.vercel.app` is the draft variant of `mentalica.vercel.app`.
- User added Vercel and Supabase integrations and asked to find and record everything so agents no longer get lost.
- User corrected that Psitherapy is separate and must not be mixed with Mentalica.

## Safe next action

Before implementing any Mentalica changes, Codex should inspect repo-local docs and Vercel deploy mapping, then verify whether Mentalica has its own Supabase project. If the verified repo/hosting/backend differs from this file, update this STATE/LOG.
