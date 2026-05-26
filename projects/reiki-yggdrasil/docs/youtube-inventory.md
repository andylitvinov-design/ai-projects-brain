# Reiki Yggdrasil — YouTube Inventory

Status: seed + local fetch pipeline prepared; full API fetch is blocked by YouTube Data API quota.

## Purpose

Collect public YouTube video metadata for the Reiki Yggdrasil learning UI and project memory, starting with the channel `@shamanic_academy` and the Dionysus course/materials.

## Current channel config

```json
{
  "slug": "shamanic-academy",
  "handle": "@shamanic_academy",
  "channelId": "UCjWq6NHZTQkUr3bC3WbXXcw",
  "title": "Академия Древних Культур",
  "uploadsPlaylistId": "UUjWq6NHZTQkUr3bC3WbXXcw",
  "relatedProject": "reiki-yggdrasil",
  "enabled": true,
  "notes": "Uploads playlist ID is derived from the public channel ID and still needs Data API confirmation."
}
```

## Secret storage

The YouTube API key is stored outside this repository.

Confirmed local wallet:

- repo: `andylitvinov-design/codex-links`
- local path: `/Users/andriilitvinov/projects/MYPROJECTS/codex-links`
- local URL: `http://127.0.0.1:8789/secrets`
- alternative port: `http://127.0.0.1:8790/secrets`
- provider: `YouTube Data API`
- key name: `YOUTUBE_API_KEY`
- default handle metadata: `YOUTUBE_CHANNEL_HANDLE=@shamanic_academy`
- fallback uploads playlist metadata: `YOUTUBE_UPLOADS_PLAYLIST_ID=UUjWq6NHZTQkUr3bC3WbXXcw`
- storage: macOS Keychain through local-only `127.0.0.1` Node server

Never commit or print real key values. Do not add `VITE_YOUTUBE_API_KEY`.

## Files

- `projects/reiki-yggdrasil/data/youtube-videos.schema.json`
- `projects/reiki-yggdrasil/data/youtube-videos.json`
- `projects/reiki-yggdrasil/data/youtube-courses.json`
- `scripts/youtube/fetch-channel-videos.mjs`
- `scripts/youtube/classify-youtube-videos.mjs`

## Fetch workflow

With env:

```bash
# Export YOUTUBE_API_KEY from a secure shell first; do not paste the value into docs.
YOUTUBE_CHANNEL_HANDLE=@shamanic_academy node scripts/youtube/fetch-channel-videos.mjs
```

With explicit fallback uploads playlist:

```bash
YOUTUBE_UPLOADS_PLAYLIST_ID=UUjWq6NHZTQkUr3bC3WbXXcw node scripts/youtube/fetch-channel-videos.mjs
node scripts/youtube/fetch-channel-videos.mjs --uploads-playlist-id UUjWq6NHZTQkUr3bC3WbXXcw
```

With local vault URL:

```bash
YOUTUBE_SECRET_VAULT_URL=http://127.0.0.1:8790 node scripts/youtube/fetch-channel-videos.mjs
```

Dry run:

```bash
node scripts/youtube/fetch-channel-videos.mjs --dry-run
```

Seed-only mode when API quota is fully unavailable:

```bash
node scripts/youtube/fetch-channel-videos.mjs --seed-only
```

## YouTube API method

1. `channels.list` with `forHandle` resolves `@shamanic_academy`.
2. `contentDetails.relatedPlaylists.uploads` gives the uploads playlist.
3. `playlistItems.list` fetches public uploaded videos with pagination.
4. Records are normalized into the project memory JSON files.

If `channels.list` returns HTTP 403 `quotaExceeded`, the script falls back to the known uploads playlist ID `UUjWq6NHZTQkUr3bC3WbXXcw` and tries `playlistItems.list`. This ID is derived from the public channel ID by replacing the leading `UC` with `UU`; it is useful as an operational fallback but still needs API confirmation once quota is available.

If `playlistItems.list` also returns `quotaExceeded`, the script exits without failing the PR workflow, preserves seed records, and reports `apiFetchStatus: "quotaExceeded"`. Rerun after quota reset or with an alternative API key/project that has available YouTube Data API quota.

## Dionysus classification

A video is linked to `misterii-dionisa` when title or description contains:

- `Дионис`
- `Dionysus`
- `Мистерии Диониса`
- `Мистерии Греции. Дионис`
- `Вакх`
- `Bacchus`
- `вакханалии`
- `сатиры`
- `менады`
- `Сатиры и менады`
- `Музыка Диониса`
- `Любовь и друзья`

## Known seed records

- `https://www.youtube.com/watch?v=qipPFBpRNF8`
- `https://www.youtube.com/watch?v=sH-LjZwgNOI`

Full public channel fetch still needs execution in the local environment with the saved key.

## Not covered

- private videos
- unlisted videos not discoverable through public channel uploads
- YouTube Studio analytics
- OAuth-only owner data
- Reiki Yggdrasil UI integration
