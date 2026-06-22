# Data Schema - shamanic-academy-youtube

## 1. Main Data Entities

- YouTube channel: public channel identity and collection metadata.
- Video entry: public video/short metadata and classification.
- Classification: derived category, series/course, priority, and reuse notes.

## 2. Canonical Fields

| field | meaning | source | required | notes |
|---|---|---|---|---|
| title | Public YouTube title | yt-dlp / RSS | yes | Title-only fallback for unavailable per-video metadata. |
| url | Public watch URL | yt-dlp / YouTube | yes | No private Studio links. |
| video_id | YouTube video id | yt-dlp / RSS | yes | Stable public id. |
| type | video / short / stream / unknown | channel tab source | yes | Streams tab was unavailable. |
| duration | Runtime if exposed | yt-dlp public metadata | no | `needs verification` when unavailable. |
| published_at | Upload date if exposed | yt-dlp public metadata / RSS | no | `needs verification` when unavailable. |
| description_excerpt | Short public description excerpt | yt-dlp / RSS | no | Missing descriptions are marked. |
| tags_keywords | Public tags where exposed or derived keywords | yt-dlp / classifier | no | Derived tags are not official YouTube tags. |
| category | meditation / practice / ritual / course lesson / lecture / short / announcement / other | derived | yes | Rule-based classification. |
| course_or_series | Named course/series bucket | derived | yes | `unknown` when not matched. |
| priority | high / medium / low | derived | yes | High marks reusable/course/practice assets. |
| why_interesting | Reuse rationale | derived | yes | For project planning. |
| notes | Collection/classification notes | derived | yes | Public-data only. |
| source_verified | yes / no | collection | yes | `yes` means per-video metadata collected; `no` means flat list only. |
| needs_verification | Remaining uncertainty | collection / derived | yes | Use before course publication. |

## 3. Data Contracts

Primary machine-readable file: `projects/shamanic-academy-youtube/videos.json`.

The JSON top level contains:

- `schema_version`
- `collection`
- `stats`
- `videos`

## 4. Storage

- Stored as public Markdown and JSON in `ai-projects-brain`.
- No cookies, OAuth tokens, API keys, Studio data, or private account data.

## 5. Derived Data

- `category`, `course_or_series`, `priority`, `why_interesting`, and derived `tags_keywords` are rule-based.
- Manual review is required before turning entries into public course modules, landing pages, or lead magnets.

## 6. Validation Rules

- Every video must have `title`, `url`, `video_id`, `type`, `category`, `course_or_series`, `priority`, `source_verified`, and `needs_verification`.
- Unknown or missing public metadata must be marked `needs verification`.
- Secret-like values must never be stored.

## 7. Migration Notes

- If YouTube changes channel tabs or metadata availability, refresh `videos.json` from public sources and keep old uncertainties in LOG.md.
