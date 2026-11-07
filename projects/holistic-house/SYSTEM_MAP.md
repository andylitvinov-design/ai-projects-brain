# Holistic House — System Map

- Public website: `https://holistichouse.vercel.app` and source under `andylitvinov-design/books` (exact current build SHA needs verification).
- Control-plane PR flow: `codex/bootstrap-books` (must honor book repo `AGENTS.md`), production source: `codex/public-book-library` where applicable.
- Public product areas: tests, services, academy, library, events, video studio.
- Protected product areas: client cabinet, personal reports, payment and user accounts; do not expose internal data to public project memory.
- Separate operations: Agent Commander / PR Monitor `ops/pr-monitor/`, with protected owner editor, independent deployment and public AI Projects Brain reference.
- Exact component paths, storage collections, provider names/secrets and current production deploy mapping: **needs verification** from source and trusted runtime.
