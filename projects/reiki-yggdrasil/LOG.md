# Reiki Yggdrasil — LOG

## 2026-06-17 — Add lightweight delivery memory and private verification guidance

Status: done.

Updated central project memory to support the existing `/delivery` workflow without replacing it.

Added / clarified:

- current focus in `STATE.md` for delivery/private UI verification;
- private cabinet / mandala verification rules in `CHECKS.md`;
- delivery workflow decision in `DECISIONS.md`;
- guidance that private/auth-only profile, cabinet, DAO talisman, mandala editor, user media, and saved user state should be verified locally when owner live session is unavailable;
- guidance that authenticated live proof must remain `NOT VERIFIED` unless actually verified.

Verification:

- Documentation-only central memory update.
- No app code, env, secrets, Supabase settings, or deployment settings changed.

Risks / not verified:

- Live private cabinet/auth flow was not tested in this memory update.
- Repo-local `/delivery` still needs its small central-memory pointer added in the working code repo.

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

## 2026-05-26 — Verify wallet read path and hit YouTube quota blocker

Status: blocked on external API quota.

Updated the fetch script to read `YOUTUBE_API_KEY` from the local `codex-links` vault registry entry for `Reiki Yggdrasil` and to report missing/failed key reads without printing secret values.

Run results:

- wallet status: configured;
- dry run: YouTube Data API returned HTTP 403 `quotaExceeded` at `channels.list`;
- write run: same HTTP 403 `quotaExceeded`, so fetched video count stayed 0;
- classifier run: 2 seeded Dionysus videos remain marked `needs verification`;
- Reiki Yggdrasil UI was not changed.

## 2026-05-26 — Add uploads playlist fallback for quota blocker

Status: blocked on external API quota; infrastructure updated.

Updated the YouTube fetch pipeline so `channels.list` quota failure no longer stops the script before trying the known uploads playlist.

Added:

- `YOUTUBE_UPLOADS_PLAYLIST_ID`
- `--uploads-playlist-id`
- default fallback uploads playlist for `@shamanic_academy`: `UUjWq6NHZTQkUr3bC3WbXXcw`
- `--seed-only` mode for manual seed maintenance while API quota is unavailable
- `apiFetchStatus: "quotaExceeded"` reporting when the Data API remains quota-blocked

Notes:

- uploads playlist ID is derived from public channel ID `UCjWq6NHZTQkUr3bC3WbXXcw` and still needs Data API confirmation after quota reset;
- existing seed records remain the source of truth while quota is blocked;
- next action is to rerun after quota reset or with another API key/project that has available quota;
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