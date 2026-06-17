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

- verify required public env names are configured in target environment without exposing values;
- verify auth/profile flow if possible;
- verify seeded/public masters data if in scope;
- verify RLS assumptions before claiming secure end-to-end behavior.

## Private cabinet / mandala verification

Some Reiki Yggdrasil features are inside private Google/Supabase-authenticated profile areas and cannot be fully verified on production live without the owner session.

For private cabinet, profile, DAO talisman, mandala editor, user media, or saved user-specific state:

- do not ask the owner for live sign-in/session details;
- do not claim authenticated live proof unless actually verified;
- use local dev verification by default when live auth is unavailable;
- create safe local fixture/demo state when required;
- verify exact UI behavior locally with screenshot, DOM check, test, or manual browser evidence;
- mark authenticated live proof as `NOT VERIFIED` if the only missing part is owner session;
- public deployment/live route may still be checked separately.

For DAO/mandala tasks, check these items when relevant:

- client photo is not squeezed into a line;
- background off really removes unwanted fill/circle;
- background size/field sliders affect the expected target;
- show/hide toggles work for center, mini-mandalas, inner background, and outer background;
- selected DAO style still renders the intended layout;
- DAO layout remains stable;
- square/circle layout changes do not leave stale circular backgrounds.

## Do not

- Do not break the existing home page.
- Do not change RU default without explicit request.
- Do not collapse accepted three-column desktop layout without reason.
- Do not expose Supabase values.
- Do not claim live auth works without verification.

## Report format

Return:

- changed files;
- local checks;
- live checks;
- verification mode: public live, preview, local auth simulation, or owner-required;
- Supabase checks if relevant;
- UI/layout risks;
- needs verification.