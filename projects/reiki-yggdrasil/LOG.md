# Reiki Yggdrasil — LOG

## 2026-05-26 — Add YouTube inventory seed and local fetch pipeline

Status: in progress.

Added a project-memory YouTube inventory layer for Reiki Yggdrasil, focused first on `@shamanic_academy` and Dionysus-related videos.

Added:

- `projects/reiki-yggdrasil/data/youtube-videos.schema.json`
- `projects/reiki-yggdrasil/data/youtube-videos.json`
- `projects/reiki-yggdrasil/data/youtube-courses.json`
- `projects/reiki-yggdrasil/docs/youtube-inventory.md`
- `scripts/youtube/fetch-channel-videos.mjs`
- `scripts/youtube/classify-youtube-videos.mjs`
- `scripts/youtube/README.md`
- `projects/reiki-yggdrasil/STATE.md`

Seeded known videos:

- `qipPFBpRNF8`
- `sH-LjZwgNOI`

Secret handling:

- real `YOUTUBE_API_KEY` values are not stored here;
- the key is expected from local env or the `codex-links` local secret vault;
- `VITE_YOUTUBE_API_KEY` is not used.

Verification:

- full channel fetch needs local execution with the saved YouTube API key;
- full Dionysus classification needs verification;
- Reiki Yggdrasil UI was not changed.

## 2026-05-05 — Add English course content memory

Status: done.

Added structured English-language course/program memory based on user-provided legacy `.doc` material:

- `projects/reiki-yggdrasil/COURSE_CONTENT_EN.md`

Covered:

- English brand frame: `Temple Arts Academy`, `Holistic Therapies & Arts Studies`;
- three-level structure: Bachelor of Holistic Health, Magister Programs, Grand-Magister Studies;
- Bachelor/Foundation module map;
- Magister tracks: Temple Therapy, Northern/Runes, Western/Tarot & Kabbalah, Taoism/Chinese Heritage, American Shamanism, Slavic Shamanism, Sufism & Money Magic;
- English routing/content strategy for `/en` or locale-based UI;
- bilingual content model recommendation;
- translation/rewrite rules;
- legal/safety/content risks;
- needs verification list;
- Codex usage note for future EN site implementation.

Verification:

- GitHub file created directly on `main`.
- Documentation-only update; no app build checks required.

Risks / not verified:

- Current right to publish/rewrite English legacy text is not verified.
- Whether to publicly use `Bachelor`, `Magister`, `Grand-Magister`, `Instructor` is not verified.
- Current prices, duration, certification names, and issuing entity are not verified.
- Current app i18n/routing implementation in `reiki-yggdrasil` repo was not changed in this update.

## 2026-05-05 — Add course content memory

Status: done.

Added structured course-content memory based on user-provided legacy `.doc` materials:

- `projects/reiki-yggdrasil/COURSE_CONTENT.md`

Covered:

- base course 1–5 steps;
- Norse deity/archetype content;
- master/extended program tracks;
- legacy schedule/pricing signals;
- recommended website information architecture;
- public-copy rules and safety/legal/content risks;
- needs verification list;
- Codex usage note for future site updates.

Verification:

- GitHub file created directly on `main`.
- No code/build checks required: knowledge-base documentation-only update.

Risks / not verified:

- Current publication rights for legacy course texts are not verified.
- Current prices, certificate terms, teacher/legal entity, public/private module boundaries are not verified.
- Exact current content model in `reiki-yggdrasil` app repo not verified in this update.
