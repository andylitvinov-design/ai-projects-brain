# Reiki Yggdrasil — STATE

## 2026-05-26 — YouTube inventory pipeline

Status: in progress.

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

## Needs verification

- Run the fetch script locally with the saved wallet/API key.
- Confirm channel ID and full video count.
- Confirm all Dionysus-related videos.
- Confirm whether unlisted/private videos need manual export or OAuth.
- Integrate reviewed JSON into the Reiki Yggdrasil UI only after data review.

## Guardrails

- Do not store real `YOUTUBE_API_KEY` values in this repo.
- Do not add `VITE_YOUTUBE_API_KEY`.
- Do not change Reiki Yggdrasil routes, Supabase flows, Vercel routing, RU-default UI, or desktop three-column layout during data inventory work.
