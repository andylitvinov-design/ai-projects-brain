# CHECKS — reiki-yggdrasil

> Verification guide for Reiki Yggdrasil site/course platform.

## Agent Entry

Use this project for: Reiki Yggdrasil, masters, profile, public catalog, admin, Supabase, course/site UI.

## Local checks

Canonical repo: `andylitvinov-design/reiki-yggdrasil`.

Recommended checks when available:

- `npm test`
- `npm run build`
- lint/typecheck if present
- targeted checks for changed pages/components

If command is absent, report `needs verification`.

## Live checks

Live URL:

- https://reiki-yggdrasil.vercel.app

Verify when relevant:

- home page loads;
- `/profile` route;
- `/masters` route;
- `/profile/admin` route;
- route rewrite behavior;
- desktop three-column layout if layout touched.

## Supabase checks

When auth/data/profile/admin behavior is touched:

- verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured in target environment without exposing values;
- verify auth/profile flow if possible;
- verify seeded/public masters data if in scope;
- verify RLS assumptions before claiming secure end-to-end behavior.

## Do not

- Do not break the existing home page.
- Do not change RU default without explicit request.
- Do not collapse accepted three-column desktop layout without reason.
- Do not expose Supabase credentials.
- Do not claim live auth works without verification.

## Report format

Return:

- changed files;
- local checks;
- live checks;
- Supabase checks if relevant;
- UI/layout risks;
- needs verification.
