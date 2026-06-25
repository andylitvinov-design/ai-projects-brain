# Mentalica LOG

## 2026-06-25 — Added draft → production transfer protocol

- User asked to remember the scheme for future requests like `перенести данные с черновой на чистовой`.
- Added `projects/mentalica/DRAFT_TO_PRODUCTION_PROTOCOL.md`.
- Protocol defines:
  - trigger phrases;
  - project mapping `main/2mentalica` → `production/mentalica`;
  - default meaning of `перенести данные` as code/UI/files/docs/tests/Supabase migration files through PR;
  - explicit exclusion of raw Supabase rows, auth users, Storage files, and env values unless a separate database plan is requested;
  - GitHub PR workflow and post-merge verification checklist;
  - final report format.
- Recorded current transfer event:
  - PR `https://github.com/andylitvinov-design/reiki-yggdrasil/pull/455`
  - merge commit `b8c312ee6d69c258e42755df0794fdd565061c1d`
  - CI success before merge.

## 2026-06-25 — Mapped Mentalica to Reiki Yggdrasil

- User clarified: `Mentalica` is the domain for project `Reiki Yggdrasil`.
- User clarified: `2Mentalica` is the draft/working variant for the same Reiki Yggdrasil domain flow.
- Updated Mentalica memory to route all Mentalica/2Mentalica tasks to canonical repo `https://github.com/andylitvinov-design/reiki-yggdrasil`.
- Updated Mentalica memory to use `projects/reiki-yggdrasil/PROJECT.md` as the main project passport.
- Recorded known URLs:
  - canonical Reiki Yggdrasil live: `https://reiki-yggdrasil.vercel.app`
  - draft Mentalica URL: `https://2mentalica.vercel.app`
  - target Mentalica URL: `https://mentalica.vercel.app`
- Kept Vercel domain/project alias mapping as `needs verification` until checked from Vercel project settings or `.vercel/project.json`.

## 2026-06-25 — Clarified Psitherapy separation

- User clarified: `Psitherapy` is a separate project.
- User clarified: `Mentalica` / `2Mentalica` is another project, later refined as a domain mapping for Reiki Yggdrasil.
- Updated Mentalica memory to forbid mixing Psitherapy backend/repo/env/routes/UI assumptions into Mentalica.
- Marked Supabase project `psitherapy` / ref `juzezltvilqozvmuxrvu` as **not Mentalica/Reiki Yggdrasil backend**.

## 2026-06-25 — Initial registration

- Added Mentalica project memory.
- Registered `https://2mentalica.vercel.app` as the draft/current working variant for `https://mentalica.vercel.app`.
- Live check found both URLs reachable and returning title `Рейки Иггдрасиль`.
- Initial repo/deploy-source remained `needs verification`; later user clarified Mentalica maps to Reiki Yggdrasil.
