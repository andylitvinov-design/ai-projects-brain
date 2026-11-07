# Agent Commander — State

**Evidence snapshot:** 2026-11-07; all PR/production status must be rechecked for the current HEAD.

## Confirmed source milestones at snapshot
- Standalone mobile shell PR [books#3864](https://github.com/andylitvinov-design/books/pull/3864): merged into control branch; no automatic claim of standalone LIVE.
- Task dictation and decomposition PR [books#3866](https://github.com/andylitvinov-design/books/pull/3866): merged into control branch; browser/device confirmation remains separate.
- Full PR task tree [books#3872](https://github.com/andylitvinov-design/books/pull/3872): open at snapshot.
- Skills Hub [books#3875](https://github.com/andylitvinov-design/books/pull/3875): open at snapshot.

## Current memory work
- Integrate read-only public AI Projects Brain directory/active registry into `ops/pr-monitor/memory.html`.
- Search by project aliases and repository; read one project folder on demand.
- Context snippets and direct GitHub source links are inserted only into an editable draft with explicit user action.
- Merge/CI/live of this change: **needs verification** until its separate PR and deployment are checked.

## Next actions
1. Coordinate non-overlapping merges with #3872/#3875 and resolve actual conflicts without resetting their features.
2. Run Node tests and exact-HEAD Core/Specialist/Guard, then release the **complete** prior Vercel deployment manifest plus validated overlays.
3. Verify real mobile 320/390/430 px, Brain source errors, task handoff and owner authorization boundary.
4. Keep project capsule synced with verified changes; do not auto-write private task content into a public repo.

## Unknowns
Standalone current deploy ID, canonical alias/branch binding, live iPhone behavior and status of newly opened PRs: **needs verification**.
