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
