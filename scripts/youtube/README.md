# YouTube Inventory Scripts

These scripts build a public YouTube video inventory for Reiki Yggdrasil.

## Secret source

The YouTube API key must not be committed.

Preferred local source:

- repo: `andylitvinov-design/codex-links`
- local wallet URL: `http://127.0.0.1:8789/secrets`
- alternative port: `http://127.0.0.1:8790/secrets`
- provider: `YouTube Data API`
- secret name: `YOUTUBE_API_KEY`
- default channel handle: `@shamanic_academy`
- default uploads playlist fallback: `UUjWq6NHZTQkUr3bC3WbXXcw`

The key is stored in macOS Keychain by the local wallet. Do not paste it into chat, GitHub files, README, PR text, logs, or frontend env.

## Run with env

```bash
# Export YOUTUBE_API_KEY from a secure shell first; do not paste the value into docs.
YOUTUBE_CHANNEL_HANDLE=@shamanic_academy node scripts/youtube/fetch-channel-videos.mjs
```

The default `@shamanic_academy` run uses the public uploads playlist fallback `UUjWq6NHZTQkUr3bC3WbXXcw` if `channels.list` is blocked by `quotaExceeded`.

For an explicit override:

```bash
YOUTUBE_UPLOADS_PLAYLIST_ID=UUjWq6NHZTQkUr3bC3WbXXcw node scripts/youtube/fetch-channel-videos.mjs
node scripts/youtube/fetch-channel-videos.mjs --uploads-playlist-id UUjWq6NHZTQkUr3bC3WbXXcw
```

## Run with local vault

If the local vault exposes `/api/secrets/read` for the `Reiki Yggdrasil` project secret:

```bash
YOUTUBE_SECRET_VAULT_URL=http://127.0.0.1:8790 node scripts/youtube/fetch-channel-videos.mjs
```

## Dry run

```bash
node scripts/youtube/fetch-channel-videos.mjs --dry-run
```

When the key is missing, the script keeps seed data and reports `apiKeyStatus: "missing"`.

## Quota and seed-only mode

If YouTube returns HTTP 403 `quotaExceeded` on `channels.list`, the script tries `playlistItems.list` with the known uploads playlist ID. If that call also returns `quotaExceeded`, it preserves the existing seed records and reports `apiFetchStatus: "quotaExceeded"` with no secret values.

After quota resets, rerun the same command. If the quota is still unavailable and only manual seed updates are needed:

```bash
node scripts/youtube/fetch-channel-videos.mjs --seed-only
```

Manual seed updates should edit `projects/reiki-yggdrasil/data/youtube-videos.json`, then run classification.

## Classification

```bash
node scripts/youtube/classify-youtube-videos.mjs
```

Dionysus-related videos are detected by keywords such as `Дионис`, `Dionysus`, `Вакх`, `сатиры`, `менады`, and `Музыка Диониса`.

## Output

- `projects/reiki-yggdrasil/data/youtube-videos.json`
- `projects/reiki-yggdrasil/data/youtube-courses.json`

Manual review is required before using the inventory in the production UI.
