# Debug Log - psihotavr

## 2026-07-02 — Project memory validation gap

- Finding: `validate-projects-brain.mjs` failed because Psihotavr project memory
  was missing required memory files.
- Safe fix: add minimal project memory docs based on existing `PROJECT.md` and
  mark unverified runtime/data details as `needs verification`.
- Product code changed: no.

## 2026-07-02 — Canonical source verification

- Finding: Vercel project `psihotavr` exists in team `super10` as
  `prj_s0Ki9R2dHqVaFEjSM6Zzcms6fJ7M`.
- Production deployment `dpl_HAJrrmZomBEqZkfee4deorefMeF9` is `READY`, target
  `production`, source `git`, with aliases `psihotavr.vercel.app`,
  `psihotavr-super10.vercel.app`, and `psihotavr-git-main-super10.vercel.app`.
- Deployment metadata confirms GitHub repo `andylitvinov-design/psihotavr`, branch
  `main`, commit `415a2ab636a6123066c1d5b2270e83126d6dbe18`.
- Live fetch of https://psihotavr.vercel.app returned HTTP 200.
- Product code changed: no.

## Known Debug Themes

- Historical PRs were sometimes merged into non-main branches and did not reach
  production.
- `/mandalas` UI/default-state and localStorage behavior have had regressions.
- Catalog card classification can confuse service/article/collection items.
- Uploaded/updated service images and sorting need live/code verification.
- Auth/cabinet/order persistence work must stay blocked until backend/auth/RLS
  gates are proven.
- Vercel deployment metadata must be checked before production claims to confirm
  the current live commit.

## Debug Rules

- Capture exact route, viewport, clean/legacy storage state, and live/preview URL.
- For uploaded image bugs, verify selected file, upload action, save action,
  persisted source, and post-refresh visible card.
- For admin bugs, verify signed-in/admin state separately from public state.
- For deployment bugs, verify commit SHA/source branch and live URL behavior.
