# YouTube Inventory

Status: prepared, API fetch needs `YOUTUBE_API_KEY` in the local Codex Links Secret Vault.

## Secure Key Flow

1. Start the wallet:

   ```bash
   cd /Users/andriilitvinov/projects/MYPROJECTS/codex-links
   npm run secrets:youtube
   ```

2. Open `http://127.0.0.1:8790/secrets`.
3. choose provider: YouTube Data API
4. paste key into Secret value
5. click Save
6. check: http://127.0.0.1:8790/api/secrets/status
7. expected: youtube_api_key_status should be configured

Never store the actual key in `ai-projects-brain`, `reiki-yggdrasil`, chat, logs, `.env`, or frontend variables. Do not add `VITE_YOUTUBE_API_KEY`.

## Inventory Pipeline

The fetch script uses YouTube Data API v3:

1. Resolve channel by handle `@shamanic_academy` through `channels.list` with `forHandle`.
2. Read `contentDetails.relatedPlaylists.uploads`.
3. Fetch uploaded public videos through `playlistItems.list` with pagination.
4. Enrich records through `videos.list`.
5. Normalize records into `projects/reiki-yggdrasil/data/youtube-videos.json`.
6. Classify Dionysus-related videos by title or description keywords.

Command:

```bash
cd /Users/andriilitvinov/projects/MYPROJECTS/ai-projects-brain
node scripts/youtube/fetch-channel-videos.mjs
```

If the key is missing, the script exits with `needs verification` and preserves the seed records.

## Initial Seeds

- `qipPFBpRNF8` from `https://www.youtube.com/watch?v=qipPFBpRNF8`
- `sH-LjZwgNOI` from `https://youtu.be/sH-LjZwgNOI?si=x2cIkhrKQ9mzLRHd`

The seeds are intentionally marked `needs verification` until the API fetch confirms title, description, channel, visibility, and course mapping.

## Dionysus Classification

If a fetched title or description contains a Dionysus keyword, the normalized record gets:

- `detectedTopics`: includes `Дионис`
- `courseSlug`: `misterii-dionisa`
- `courseTitle`: `Мистерии Диониса`
- `manualReviewStatus`: `needs verification`, unless manually confirmed later

## Reiki Site Boundary

This inventory updates project memory only. It does not modify the Reiki Yggdrasil site UI, routes, Supabase auth/data flows, Vercel routing, RU-default interface, or desktop three-column layout.
