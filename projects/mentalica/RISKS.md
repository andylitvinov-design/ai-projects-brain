# Mentalica RISKS

## Primary risks

1. **Wrong project mapping** — `mentalica` and `2mentalica` may be separate Vercel projects, aliases, previews, or branches. Verify before changes.
2. **Wrong repo** — no installed GitHub repo named `mentalica` was found during initial registration. Verify local repo and remote.
3. **Brand/title mismatch** — both live URLs returned title `Рейки Иггдрасиль` on 2026-06-25. Confirm whether this is expected or stale app metadata.
4. **Production vs preview confusion** — do not deploy to production or replace aliases without confirming target.
5. **Env loss** — do not copy or print env values. Compare env names only.
6. **UX regression** — do not alter report/AI-analysis/mobile navigation behavior unless the task asks for it.
7. **Cross-project contamination** — do not import patterns from Reiki Yggdrasil, Artefacts, EzoHata, or Codex Links without inspecting Mentalica repo.

## Required mitigation

- Branch -> PR workflow.
- Read repo-local docs first.
- Verify Vercel project(s), branches, domains, aliases, and env names.
- Compare `2mentalica.vercel.app` vs `mentalica.vercel.app` before and after changes.
- Keep `2mentalica` online until `mentalica` is confirmed working.
