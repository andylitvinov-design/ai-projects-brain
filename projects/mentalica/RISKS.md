# Mentalica RISKS

## Primary risks

1. **Confusing Mentalica with a separate repo** — user clarified Mentalica is the domain/deployment name for Reiki Yggdrasil, not a separate default repo.
2. **Confusing Mentalica with Psitherapy** — user explicitly clarified Psitherapy is a separate project. Do not use Psitherapy Supabase, repo, env names, UI assumptions, or routes for Mentalica/Reiki Yggdrasil.
3. **Wrong Vercel domain mapping** — `reiki-yggdrasil.vercel.app`, `2mentalica.vercel.app`, and `mentalica.vercel.app` may be aliases, separate Vercel projects, previews, or branches. Verify before changes.
4. **Wrong Supabase backend** — Supabase project `psitherapy` / ref `juzezltvilqozvmuxrvu` is not Mentalica/Reiki Yggdrasil. Use Reiki Yggdrasil env names only and verify actual Vercel env mapping.
5. **Production vs preview confusion** — do not deploy to production or replace aliases without confirming target.
6. **Env loss** — do not copy or print env values. Compare env names only.
7. **Reiki Yggdrasil regression** — preserve `/`, `/profile`, `/masters`, `/profile/admin`, RU-default UI, Supabase auth/data flows, Vercel rewrites, and accepted desktop three-column layout.
8. **Cross-project contamination** — do not import patterns from Psitherapy, Artefacts, EzoHata, or Codex Links without inspecting Reiki Yggdrasil repo.

## Required mitigation

- Branch -> PR workflow in `andylitvinov-design/reiki-yggdrasil`.
- Read `projects/reiki-yggdrasil/PROJECT.md` and repo-local docs first.
- Verify Vercel project(s), branches, domains, aliases, and env names for all three URLs.
- Compare `2mentalica.vercel.app` vs `mentalica.vercel.app` before and after changes.
- Keep `2mentalica` online until `mentalica` is confirmed working.
