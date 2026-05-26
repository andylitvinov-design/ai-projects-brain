# Reiki Yggdrasil — STATE

- current task: prepare YouTube inventory memory for `@shamanic_academy`
- status: prepared with seed records; live API fetch needs `YOUTUBE_API_KEY` configured in the local Codex Links Secret Vault
- site boundary: no Reiki Yggdrasil UI, route, Supabase, Vercel, RU-default, or desktop layout changes were made

## 2026-05-26 YouTube Inventory Preparation

- secure key source: local Codex Links Secret Vault / macOS Keychain, secret name `YOUTUBE_API_KEY`
- wallet command: `cd /Users/andriilitvinov/projects/MYPROJECTS/codex-links && npm run secrets:youtube`
- wallet URL: `http://127.0.0.1:8790/secrets`
- status endpoint: `http://127.0.0.1:8790/api/secrets/status`, metadata only
- initial channel: `@shamanic_academy`, related project `reiki-yggdrasil`
- initial seed videos: `qipPFBpRNF8`, `sH-LjZwgNOI`
- next action: after wallet status reports `youtube_api_key_status: configured`, run `node scripts/youtube/fetch-channel-videos.mjs` from `ai-projects-brain`
