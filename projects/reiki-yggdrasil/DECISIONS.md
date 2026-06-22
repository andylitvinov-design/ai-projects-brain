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

## Delivery workflow

- Keep the existing repo-local `/delivery` workflow as the release-owner process; do not replace it with a heavy repo-harness clone.
- Add only lightweight central-memory and verification-mode pointers to `/delivery`.
- Project-specific durable knowledge belongs in `ai-projects-brain/projects/reiki-yggdrasil/*`, not as duplicated long text inside `/delivery`.
- For private/auth-only profile, cabinet, DAO talisman, mandala editor, user media, or saved user state, use local dev / fixture / demo verification when owner live session is unavailable.
- Expected auth boundary is not `BLOCKED`; use `STATUS: SUCCESS_WITH_AUTH_LIMITATION` with safe public/login/protected-redirect/local/code proof when authenticated post-login live proof requires an owner session.

## Deployment

- Vercel live behavior must be verified after production-facing changes.
- Do not infer live behavior from local code only.
- Distinguish public live proof from authenticated live proof and local private-UI proof.

## Main formula

**Preserve RU-first public learning UI, route structure, Supabase safety, accepted layout, and current `/delivery` flow while making additive changes and honest verification claims.**
