# Debug Log - psihotavr

## 2026-07-02 — Project memory validation gap

- Finding: `validate-projects-brain.mjs` failed because Psihotavr project memory
  was missing required memory files.
- Safe fix: add minimal project memory docs based on existing `PROJECT.md` and
  mark unverified runtime/data details as `needs verification`.
- Product code changed: no.

## Known Debug Themes

- Historical PRs were sometimes merged into non-main branches and did not reach
  production.
- `/mandalas` UI/default-state and localStorage behavior have had regressions.
- Catalog card classification can confuse service/article/collection items.
- Uploaded/updated service images and sorting need live/code verification.
- Auth/cabinet/order persistence work must stay blocked until backend/auth/RLS
  gates are proven.
- Vercel deploy source must be verified before production claims.

## Debug Rules

- Capture exact route, viewport, clean/legacy storage state, and live/preview URL.
- For uploaded image bugs, verify selected file, upload action, save action,
  persisted source, and post-refresh visible card.
- For admin bugs, verify signed-in/admin state separately from public state.
- For deployment bugs, verify commit SHA/source branch and live URL behavior.
