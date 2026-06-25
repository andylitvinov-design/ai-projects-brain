# Mentalica RISKS

## Primary risks

1. **Confusing Mentalica with Psitherapy** — user explicitly clarified that Psitherapy is a separate project and Mentalica/2Mentalica is another project. Do not use Psitherapy Supabase, repo, env names, UI assumptions, or routes for Mentalica unless later explicitly verified.
2. **Wrong project mapping** — `mentalica` and `2mentalica` may be separate Vercel projects, aliases, previews, or branches. Verify before changes.
3. **Wrong repo** — no installed GitHub repo named `mentalica` was found during initial registration. Verify local repo and remote.
4. **Wrong Supabase backend** — Supabase project `psitherapy` / ref `juzezltvilqozvmuxrvu` is not Mentalica. Mentalica Supabase is `needs verification`.
5. **Brand/title mismatch** — both live URLs returned title `Рейки Иггдрасиль` on 2026-06-25. Confirm whether this is expected or stale app metadata.
6. **Production vs preview confusion** — do not deploy to production or replace aliases without confirming target.
7. **Env loss** — do not copy or print env values. Compare env names only.
8. **UX regression** — do not alter Mentalica routes/user flows/mobile navigation unless the task asks for it and the repo is confirmed.
9. **Cross-project contamination** — do not import patterns from Psitherapy, Reiki Yggdrasil, Artefacts, EzoHata, or Codex Links without inspecting Mentalica repo.

## Required mitigation

- Branch -> PR workflow.
- Read repo-local docs first.
- Verify Vercel project(s), branches, domains, aliases, and env names.
- Verify whether Mentalica has its own Supabase project; do not infer from Psitherapy.
- Compare `2mentalica.vercel.app` vs `mentalica.vercel.app` before and after changes.
- Keep `2mentalica` online until `mentalica` is confirmed working.
