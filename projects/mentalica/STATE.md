# Mentalica STATE

Last updated: 2026-06-25

## Current understanding

- `https://2mentalica.vercel.app` is the draft/current working variant for Mentalica.
- `https://mentalica.vercel.app` is the target/production-facing Mentalica URL.
- Both URLs were reachable on 2026-06-25 and returned the app title `Рейки Иггдрасиль`.
- Exact repo, Vercel project names, deployment source branches, env names, and build settings are still `needs verification`.

## Default working assumption

When the user says `Mentalica`, `mentalica`, or asks to move/copy/sync from `2mentalica`, treat `2mentalica.vercel.app` as the baseline to compare against `mentalica.vercel.app`.

## Needs verification

- Canonical GitHub repo.
- Whether `/Users/andriilitvinov/projects/MYPROJECTS/reports` is the canonical local checkout.
- Vercel project for `2mentalica.vercel.app`.
- Vercel project for `mentalica.vercel.app`.
- Production vs preview branch mapping.
- Build/dev/test commands.
- Env names.
- Actual routes and user scenarios.
- Whether app title `Рейки Иггдрасиль` is intentional or stale branding.

## Recent user intent

- User asked to transfer everything currently in `2mentalica` to `mentalica` fully.
- User asked to register this mapping so future agents immediately understand that `2mentalica.vercel.app` is the draft variant of `mentalica.vercel.app`.

## Safe next action

Before implementing any Mentalica changes, Codex should inspect repo-local docs and Vercel deploy mapping, then update this STATE/LOG if the verified repo or hosting differs from this file.
