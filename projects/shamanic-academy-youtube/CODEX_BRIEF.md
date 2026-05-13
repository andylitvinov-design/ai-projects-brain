# Codex Brief - shamanic-academy-youtube

## Before Starting

- Read `PROJECT.md`.
- Read `VIDEO_INDEX.md` and `videos.json` for the full catalog.
- Read `MEDITATIONS.md` for practice candidates.
- Read `HIGHLIGHTS.md` for reuse priorities.
- Read `DATA_SCHEMA.md` before changing fields.

## Rules

- Public YouTube data only.
- No secrets, cookies, OAuth, YouTube Studio, or login-only data.
- Preserve `video_id` and public `url` fields.
- Mark missing or uncertain metadata as `needs verification`.
- Keep classification changes explainable and reversible.

## Project-Specific Checks

- Validate JSON after editing `videos.json`.
- Run `node scripts/sync-project-index.mjs` if `projects.json` changes.
- Run `node scripts/validate-projects-brain.mjs`.

## Standard Response Required From Codex

1. What was found
2. What changed
3. Changed files
4. Verification commands
5. Risks
6. Needs verification
