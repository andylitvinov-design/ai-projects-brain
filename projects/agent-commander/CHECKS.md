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
