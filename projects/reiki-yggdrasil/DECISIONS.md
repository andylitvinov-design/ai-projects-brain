# DECISIONS — reiki-yggdrasil

> Architecture decisions and guardrails for Reiki Yggdrasil.

## Canonical project

- Canonical repo: `andylitvinov-design/reiki-yggdrasil`.
- Live target: https://reiki-yggdrasil.vercel.app.

## UI / product decisions

- Preserve the existing home page unless explicitly asked.
- RU is the default interface language.
- Additive route/module changes are preferred.
- The accepted desktop structure includes a three-column layout; do not collapse it without explicit reason.

## Supabase

- Supabase auth/data/profile/admin behavior requires live env verification before claiming end-to-end completion.
- Document env variable names only, never values.

## Deployment

- Vercel live behavior must be verified after production-facing changes.
- Do not infer live behavior from local code only.

## Main formula

**Preserve RU-first public learning UI, route structure, Supabase safety, and accepted layout while making additive changes.**
