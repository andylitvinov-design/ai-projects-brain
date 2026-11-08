# Agent Commander — Checks

## Source tests
```bash
node --test ops/pr-monitor/tests/commander-memory.test.mjs ops/pr-monitor/tests/commander-shell.test.mjs
```
Execute from `books` repository root on the actual candidate HEAD. Broader required CI still applies.

## Manual mobile checks
- /memory.html on iPhone widths 320, 390, 430: list, search, project selection, file preview, clipboard and "add to task".
- Unknown slug / 404 capsule / GitHub rate-limit / offline: explicit error; no fictitious state.
- Open "Создать", type task, select memory, analyze, explicitly append Brain context, copy/transfer to protected editor.
- Verify source links, no script/html injection and no private data; edits after fetch must not be silently overwritten.
- Existing public routes and fixed dock still work. Voice dictation and Skills Hub (if merged) must not regress.
- Verify independent owner auth, GitHub current SHA/CI/merge, protected Vercel deployment manifest and functional LIVE.
- **Never** treat `MERGED`, Vercel `READY`, or this file as proof of production behavior.


## Memory CSP / functional LIVE regression (2026-11-07)

- Confirm deployed `/memory.html`, `/commander-memory.js`, `/commander-memory-page.js` return 200 from **canonical** alias.
- Check live `Content-Security-Policy` `connect-src` allows exact `https://raw.githubusercontent.com` *and* `https://api.github.com`; retain Google SSO origins when currently required.
- Open one real project and assert `START_HERE.md` and `PROJECT.md` bodies load, with source links and nonempty context bundle. 200 HTML alone is NOT success.
- Verify GitHub API/read failure shows a message, without exposing tokens/credentials; forbidden path traversal rejected.
- Verify selected memory adds bounded references to the editable task draft without changing existing task text or auto-dispatching.
- Node focus `node --test ops/pr-monitor/tests/commander-memory.test.mjs ops/pr-monitor/tests/commander-shell.test.mjs` on the exact candidate; preserve stricter CI.

## Release receipt · 2026-11-07 Toronto

- GitHub source [#3922](https://github.com/andylitvinov-design/books/pull/3922) merged, and memory docs [#268](https://github.com/andylitvinov-design/ai-projects-brain/pull/268) merged.
- Vercel production `dpl_G2oUzRNBeAaMhAzCxyTtz3ChwD7r`: READY, canonical alias set. Baseline for rollback: `dpl_C9gf9u9rkg4M2vWWRyuYfpyDftwr`.
- Confirmed 132/132 source paths preserved (only `vercel.json` and `commander-memory.js` differ), 200 for memory assets and main public routes, CSP allows api.github.com/raw.githubusercontent.com and preserves Google SSO hosts.
- Public Brain `START_HERE.md`, `TASK_CONTEXT.md` and `OPERATIONS.md` retrieved at `main`.
- **NOT YET VERIFIED:** real interactive Safari content fetch, selecting a project, inserting into prompt, accessibility/mobile, authenticated editor authorization. Do not label that flow end-to-end passed.
