# System Map - shamanic-academy-youtube

## 1. Inputs

- Public YouTube channel tabs: `/videos`, `/shorts`, `/streams`.
- Public YouTube RSS feed for recent entries and identity check.
- Public YouTube HTML for channel URL/name/id verification.

## 2. Processing

1. Fetch flat public video lists with yt-dlp.
2. Fetch per-video public metadata where available.
3. Merge flat-list and full metadata by `video_id`.
4. Classify category, course/series, priority, and reuse rationale using title/description rules.
5. Store machine-readable JSON and Markdown views.

## 3. Storage

- `videos.json` is the structured local source.
- `VIDEO_INDEX.md`, `MEDITATIONS.md`, and `HIGHLIGHTS.md` are agent/human views.

## 4. Outputs

- Full video table.
- Meditation/practice grouped index.
- High/medium/low priority highlights.

## 5. Runtime / Deploy

- No runtime service.
- Published as raw text through the public GitHub repository after merge.

## 6. Boundaries

- Public data only.
- No login-only YouTube Studio fields.
- No cookies, OAuth tokens, API keys, or private account data.
