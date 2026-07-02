# Debug Log - psitherapy

## 2026-07-02 — Project memory validation gap

- Finding: `validate-projects-brain.mjs` required full project memory files for
  Psitherapy, but only `PROJECT.md` existed.
- Safe fix: add minimal memory docs with repo/source details marked as `needs
  verification`.
- Product code changed: no.

## Known Debug Themes

- Canonical repo mapping is not confirmed.
- Live-only UX checks cannot prove source code or deploy branch.
- Health, psychotherapy, and homeopathy wording needs careful safety framing.

## Debug Rules

- Resolve repo/deploy source before code changes.
- Until then, use public live UX/content audit only.
- Do not ask for or store private client/health data.
