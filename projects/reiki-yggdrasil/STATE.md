# Reiki Yggdrasil — STATE

## Current focus — delivery and private UI verification

Current active context:

- The working app is now also used through newer live targets such as `https://2mentalica.vercel.app` / `https://mentalica.vercel.app` in repo-local delivery rules; central memory still lists the legacy Reiki Yggdrasil URL and live mappings need periodic verification.
- Recent work has focused on `/delivery`, profile/private cabinet, OpenAI wallet/settings, DAO talisman / mandala layouts, saved photos/backgrounds, and show/hide controls.
- Private cabinet, profile, DAO talisman, mandala editor, user media, and saved user state may require Google/Supabase owner session on live.
- Do not claim authenticated live proof for those areas unless actually verified. Use local dev / fixture / demo verification when owner session is unavailable.

Current verification mode guidance:

- Public pages: verify deployed live route when production-facing changes are made.
- Private/auth-only UI: verify locally with safe fixture/demo state and mark authenticated live proof as `NOT VERIFIED` when owner session is required.
- DAO/mandala UI: include visual or DOM proof for photo shape, background removal, slider behavior, show/hide toggles, and layout stability.

Next actions:

- Keep repo-local `/delivery` as the release-owner workflow; do not replace it with a heavy harness.
- Add only lightweight central-memory and private-auth verification pointers to `/delivery`.
- Update CHECKS/DECISIONS/RISKS when new durable verification knowledge appears.

## 2026-05-26 — YouTube inventory pipeline

Status: blocked on YouTube Data API quota; fallback uploads playlist support is implemented.

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

## 2026-05-26 fallback update

- script now accepts `YOUTUBE_UPLOADS_PLAYLIST_ID` and `--uploads-playlist-id`
- default `@shamanic_academy` fallback uploads playlist: `UUjWq6NHZTQkUr3bC3WbXXcw`
- fallback playlist ID is derived from public channel ID `UCjWq6NHZTQkUr3bC3WbXXcw`; it still needs YouTube Data API confirmation after quota reset
- if `channels.list` returns `quotaExceeded`, the script tries `playlistItems.list` with the fallback playlist ID
- if `playlistItems.list` also returns `quotaExceeded`, seed records are preserved and output reports `apiFetchStatus: "quotaExceeded"`
- `--seed-only` keeps existing/manual seed records without making a YouTube API request
- no Reiki Yggdrasil UI files were changed

## Needs verification

- Re-run the fetch script after YouTube Data API quota is available, or use another API key/project with available quota.
- Confirm channel ID and full public upload count from `channels.list` and `playlistItems.list`.
- Confirm all Dionysus-related videos from the fetched public upload set.
- Confirm whether unlisted/private videos need manual export or OAuth.
- Integrate reviewed JSON into the Reiki Yggdrasil UI only after data review.

## Guardrails

- Do not store real `YOUTUBE_API_KEY` values in this repo.
- Do not add `VITE_YOUTUBE_API_KEY`.
- Do not change Reiki Yggdrasil routes, Supabase flows, Vercel routing, RU-default UI, or desktop three-column layout during data inventory work.