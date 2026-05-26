# Reiki Yggdrasil — STATE

## 2026-05-26 — YouTube inventory pipeline

Status: blocked on YouTube Data API quota.

A local YouTube inventory data layer was prepared in `ai-projects-brain` for `@shamanic_academy`.

Confirmed external secret storage:

- wallet repo: `andylitvinov-design/codex-links`
- wallet mode: local-only `127.0.0.1` Node server
- storage: macOS Keychain
- provider: `YouTube Data API`
- secret name: `YOUTUBE_API_KEY`
- default channel: `@shamanic_academy`

Current data files:

- `projects/reiki-yggdrasil/data/youtube-videos.schema.json`
- `projects/reiki-yggdrasil/data/youtube-videos.json`
- `projects/reiki-yggdrasil/data/youtube-courses.json`
- `projects/reiki-yggdrasil/docs/youtube-inventory.md`

Current scripts:

- `scripts/youtube/fetch-channel-videos.mjs`
- `scripts/youtube/classify-youtube-videos.mjs`

Seeded Dionysus references:

- `qipPFBpRNF8`
- `sH-LjZwgNOI`

## 2026-05-26 fetch attempt

- wallet status: configured; secret value was not printed or stored
- requested channel handle: `@shamanic_academy`
- public identity check: channel ID `UCjWq6NHZTQkUr3bC3WbXXcw`, title `Академия Древних Культур`
- uploads playlist ID: `UUjWq6NHZTQkUr3bC3WbXXcw` (derived from public channel ID; Data API did not return `contentDetails` because quota failed first)
- dry run result: YouTube Data API `channels.list` returned HTTP 403 `quotaExceeded`
- write run result: same HTTP 403 `quotaExceeded`; JSON remains seeded data only
- fetched video count: 0 from the Data API in this run
- Dionysus count after local classifier on seed data: 2

## Needs verification

- Re-run the fetch script after YouTube Data API quota is available.
- Confirm channel ID and full public upload count from `channels.list` and `playlistItems.list`.
- Confirm all Dionysus-related videos from the fetched public upload set.
- Confirm whether unlisted/private videos need manual export or OAuth.
- Integrate reviewed JSON into the Reiki Yggdrasil UI only after data review.

## Guardrails

- Do not store real `YOUTUBE_API_KEY` values in this repo.
- Do not add `VITE_YOUTUBE_API_KEY`.
- Do not change Reiki Yggdrasil routes, Supabase flows, Vercel routing, RU-default UI, or desktop three-column layout during data inventory work.
