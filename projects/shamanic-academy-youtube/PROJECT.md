# shamanic-academy-youtube

## 1. Purpose

Public knowledge base for videos, meditations, shorts, practices, course-like lessons, and reusable highlights from the YouTube channel Академия Древних Культур (@shamanic_academy).

## 2. Agent Entry

Use this project when the user mentions:

- @shamanic_academy;
- Академия Древних Культур;
- Shamanic Academy YouTube;
- база видео / медитаций / практик с YouTube;
- source material for Reiki Yggdrasil, Artefacts, courses, meditations, or lead magnets from this channel.

Read order:

1. `PROJECT.md`
2. `VIDEO_INDEX.md`
3. `MEDITATIONS.md`
4. `HIGHLIGHTS.md`
5. `DATA_SCHEMA.md`
6. `videos.json` when structured lookup is needed
7. `STATE.md` and `LOG.md` for collection status

## 3. Public Source URLs

- channel: https://www.youtube.com/@shamanic_academy
- videos tab: https://www.youtube.com/@shamanic_academy/videos
- shorts tab: https://www.youtube.com/@shamanic_academy/shorts
- streams tab: https://www.youtube.com/@shamanic_academy/streams
- RSS feed: https://www.youtube.com/feeds/videos.xml?channel_id=UCjWq6NHZTQkUr3bC3WbXXcw

## 4. Repositories

- canonical repo: https://github.com/andylitvinov-design/ai-projects-brain
- project memory folder: `projects/shamanic-academy-youtube/`
- source channel repo: not applicable

## 5. Hosting / Deploy

- provider: GitHub raw text via `ai-projects-brain`
- live app: not applicable
- deployment: not applicable

## 6. Current Status

- Public channel name verified as Академия Древних Культур.
- Public channel id verified as `UCjWq6NHZTQkUr3bC3WbXXcw`.
- Collected 105 public channel-tab entries on 2026-05-13: 94 videos and 11 shorts.
- Streams tab is unavailable through public channel tab.
- Per-video public metadata was collected for 102 entries; 3 entries remain flat-list only and need verification.

## 7. Important Files

- `projects/shamanic-academy-youtube/VIDEO_INDEX.md`
- `projects/shamanic-academy-youtube/MEDITATIONS.md`
- `projects/shamanic-academy-youtube/HIGHLIGHTS.md`
- `projects/shamanic-academy-youtube/videos.json`
- `projects/shamanic-academy-youtube/DATA_SCHEMA.md`
- `projects/shamanic-academy-youtube/STATE.md`
- `projects/shamanic-academy-youtube/LOG.md`

## 8. Environment Variable Names

- none

## 9. Known Issues

- YouTube RSS returns only recent entries and is not a full archive.
- Some videos are listed in the public channel tab but per-video metadata returned `This video is not available` through yt-dlp.
- Classification is rule-based and needs manual editorial review before use in products.
- Public descriptions/tags are incomplete for entries where YouTube did not expose metadata.

## 10. Next Actions

1. Manually review high-priority meditations/practices before mapping them into Reiki Yggdrasil or Artefacts.
2. Refresh public metadata if YouTube tab/RSS availability changes.
3. Add transcript summaries only if collected from public pages without login or private APIs.
4. Split course-ready clusters into future project-specific content plans.

## 11. Risks

- Treating rule-based classification as author-approved taxonomy.
- Using unavailable/private/deleted videos as if they are confirmed public assets.
- Accidentally adding cookies, OAuth tokens, Studio data, or private account exports.
- Overwriting editorial intent when converting YouTube titles into course modules.

## 12. Rules for Codex

- Use public channel data only.
- Do not store secrets, cookies, OAuth tokens, YouTube Studio data, or login-only data.
- Keep all unverified metadata marked as `needs verification`.
- Preserve `videos.json` as the machine-readable source for the Markdown indexes.

## 13. Verification Status

- channel name: verified from public HTML and RSS
- channel id: verified from public HTML/channel URL and RSS entry metadata
- full public tab list: verified by yt-dlp flat playlist on 2026-05-13
- streams tab: not available; needs verification if channel later adds streams
- descriptions/tags for all videos: partial; needs verification
- classification: derived; needs editorial verification
