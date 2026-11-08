# Agent Commander — State

**Snapshot:** 2026-11-07 Toronto; GitHub PR states and Vercel responses rechecked in this task. Later runs must refresh them.

## Verified code and source
- `books#3864` standalone shell — merged.
- `books#3866` iPhone dictation and task decomposition — merged.
- `books#3872` complete PR task tree — merged.
- `books#3875` Skills Hub — merged.
- `books#3878` read-only Brain memory browser / task context — merged.
- `books#3914` Google owner SSO in control branch — merged.
- `books#3922` focused CSP GitHub Raw / compact memory documents — **open at this snapshot**, exact-head checks not yet confirmed.

## Observed deployment / issue
- Canonical independent project: `holistic-house-pr-monitor`, Vercel project ID `prj_qD9cWLfw4sVE0Da9nqDyZxHkqI3L`.
- At inspection, production READY deployment: `dpl_C9gf9u9rkg4M2vWWRyuYfpyDftwr`, bound to `holistic-house-pr-monitor.vercel.app`.
- The `/memory.html` HTML and `/commander-memory.js` returned HTTP 200. **This is NOT full functional LIVE proof.**
- **Confirmed browser blocker:** served CSP allowed `https://api.github.com` but not `https://raw.githubusercontent.com`, while JS reads raw Markdown. CSP fix must be built/deployed and the actual document fetch verified.
- Production currently may differ from later control-branch code (e.g., Google SSO). Preserve full last working deployment file manifest; never publish a partial source tree.

## Next actions
1. Verify #3922 exact HEAD, protected checks, review/lease and merge only when eligible.
2. Stage complete prior READY Vercel source manifest with verified narrow config/JS overlay; no extra paid services or new cron.
3. Check live CSP, memory search, `START_HERE.md`, source links, copy-to-task and 320/390/430 mobile.
4. If proof passes, append dated LIVE receipt to `LOG.md` / `STATE.md`; if not, document precise blocker and retain previous deployment ID for rollback.

## Ownership and privacy
- Public Brain is **read-only, non-secret** context.
- Protected task chat stores private executor history, leases and messages; do not replicate it in public Markdown.
- GitHub PR check runs, owner auth and Vercel production routes are independently verified for each change.
