# Agent Commander — Current State

> 🧭 [Карта всей базы](../../index.md) · [Проектный диспетчер](../index.md) · [Быстрый старт Commander](START_HERE.md).  
> **Связанный контекст:** [PROJECT.md](PROJECT.md) · [CHECKS.md](CHECKS.md) · [RISKS.md](RISKS.md) · [LOG.md](LOG.md) (архив).

**Verification snapshot:** 2026-11-07 Toronto. This is dated evidence, not a live state API.

## GitHub source milestones
- Standalone shell / dictation / PR task tree / Skills Hub / project memory merged: `books#3864`, `#3866`, `#3872`, `#3875`, `#3878`.
- Google owner SSO source: `books#3914`, merged. Server/browser auth functionality still requires its own protected tests.
- Brain CSP and compact capsule loader fix: [books#3922](https://github.com/andylitvinov-design/books/pull/3922), **merged**; merge SHA `0d63fcb88d26eac7be3d7392faa7085aeba42aee`.
- Durable project-memory handbook: [ai-projects-brain#268](https://github.com/andylitvinov-design/ai-projects-brain/pull/268), **merged**.

## Verified Vercel release (HTTP/source evidence)
- Independent project `holistic-house-pr-monitor` (`prj_qD9cWLfw4sVE0Da9nqDyZxHkqI3L`), canonical origin https://holistic-house-pr-monitor.vercel.app.
- **Production deployment:** `dpl_G2oUzRNBeAaMhAzCxyTtz3ChwD7r` returned `READY` and listed the canonical alias.
- **Rollback baseline:** `dpl_C9gf9u9rkg4M2vWWRyuYfpyDftwr`; source comparison: 132 old vs 132 new files, **exactly two changed**: `commander-memory.js` and `vercel.json`; no deleted/added files. Previous serverless API routes preserved in manifest.
- Canonical `/memory.html`, `/commander-memory.js`, `/commander-memory-page.js`, `/commander-memory.css`, `/task-editor.html`, `/pr-monitor.html`, `/skills.html`, `/chats.html`, `/automations.html` returned HTTP 200.
- **Served CSP verified:** `connect-src` explicitly allows `https://api.github.com` and `https://raw.githubusercontent.com`, while retaining existing Google SSO origins and `default-src 'none'`.
- Public `START_HERE.md`, `TASK_CONTEXT.md` and `OPERATIONS.md` retrieved from `ai-projects-brain/main`; deployed JS lists those allowlisted filenames.

## Unverified / next

Follow [release checks](CHECKS.md) and [stop conditions](RISKS.md); record dated outcomes in [LOG.md](LOG.md), not in a parallel state database.
- **Physical iPhone Safari / real browser JavaScript flow** (GitHub Raw CORS fetch, select project, preview, copy, append to task, protected owner handoff) was not executed from this session. Do not mark *end-to-end functional LIVE* as proven from HTTP 200 alone.
- Run 320/390/430 mobile smoke; ensure live project search populates; no browser console CSP/CORS errors. Check free model and protected auth independently.
- Any new code change must go through exact-HEAD checks and separate READY/alias/user-flow proof. Do not auto-write private task history to the public memory repo.

## Safety
Public project memory is read-only and contains no client/private data, tokens or cookies. GitHub real PR/CI and actual Vercel runtime beat dated summaries in this file.
