# YouTube Inventory Scripts

Use these scripts from the `ai-projects-brain` repo root.

The YouTube API key is read from the local Codex Links Secret Vault over `http://127.0.0.1:8790/api/secrets/read`. Do not paste the key into this repo, logs, chat, `.env`, or frontend bundles.

Start the wallet first:

```bash
cd /Users/andriilitvinov/projects/MYPROJECTS/codex-links
npm run secrets:youtube
```

Verify non-secret status:

```bash
cd /Users/andriilitvinov/projects/MYPROJECTS/codex-links
npm run secrets:youtube:status
```

Fetch public uploads from configured channels:

```bash
cd /Users/andriilitvinov/projects/MYPROJECTS/ai-projects-brain
node scripts/youtube/fetch-channel-videos.mjs
```

Classify existing records without fetching:

```bash
node scripts/youtube/classify-youtube-videos.mjs --write
```

One `YOUTUBE_API_KEY` supports multiple channels. Add channels to `projects/reiki-yggdrasil/data/youtube-courses.json`; do not create one key per channel.
