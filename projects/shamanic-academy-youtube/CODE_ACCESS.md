# Code Access - shamanic-academy-youtube

## Canonical Repository

- repo: https://github.com/andylitvinov-design/ai-projects-brain
- folder: `projects/shamanic-academy-youtube/`

## Local Commands

Collection commands used on 2026-05-13:

```bash
yt-dlp --flat-playlist --dump-json "https://www.youtube.com/@shamanic_academy/videos" > /tmp/shamanic_academy_videos.jsonl
yt-dlp --flat-playlist --dump-json "https://www.youtube.com/@shamanic_academy/shorts" > /tmp/shamanic_academy_shorts.jsonl
yt-dlp --flat-playlist --dump-json "https://www.youtube.com/@shamanic_academy/streams" > /tmp/shamanic_academy_streams.jsonl
yt-dlp --skip-download --ignore-errors --dump-json "https://www.youtube.com/@shamanic_academy/videos" > /tmp/shamanic_academy_videos_full.jsonl
yt-dlp --skip-download --ignore-errors --dump-json "https://www.youtube.com/@shamanic_academy/shorts" > /tmp/shamanic_academy_shorts_full.jsonl
```

The local machine did not have `yt-dlp` installed globally, so it was installed into a temporary venv under `/tmp` for collection.

## Verification Commands

```bash
node scripts/sync-project-index.mjs
node scripts/validate-projects-brain.mjs
git diff --check
```

## Access Rules

- Do not use YouTube login, Studio, cookies, OAuth, or private exports.
- Do not store temp collection files in the repo unless intentionally sanitized.
