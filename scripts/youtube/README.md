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

The key is stored in macOS Keychain by the local wallet. Do not paste it into chat, GitHub files, README, PR text, logs, or frontend env.

## Run with env

```bash
YOUTUBE_API_KEY=... YOUTUBE_CHANNEL_HANDLE=@shamanic_academy node scripts/youtube/fetch-channel-videos.mjs
```

## Run with local vault

If the local vault exposes `/api/secrets/read` for the `YouTube Data API` provider:

```bash
YOUTUBE_SECRET_VAULT_URL=http://127.0.0.1:8790 node scripts/youtube/fetch-channel-videos.mjs
```

## Dry run

```bash
node scripts/youtube/fetch-channel-videos.mjs --dry-run
```

When the key is missing, the script keeps seed data and reports `apiKeyStatus: "missing"`.

## Classification

```bash
node scripts/youtube/classify-youtube-videos.mjs
```

Dionysus-related videos are detected by keywords such as `Дионис`, `Dionysus`, `Вакх`, `сатиры`, `менады`, and `Музыка Диониса`.

## Output

- `projects/reiki-yggdrasil/data/youtube-videos.json`
- `projects/reiki-yggdrasil/data/youtube-courses.json`

Manual review is required before using the inventory in the production UI.
