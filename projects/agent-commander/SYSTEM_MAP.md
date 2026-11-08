# Agent Commander — System Map

> 🧭 [Карта всей базы](../../index.md) · [Проектный диспетчер](../index.md) · [Быстрый старт Commander](START_HERE.md).  
> **Связанный контекст:** [PROJECT.md](PROJECT.md) · [OPERATIONS.md](OPERATIONS.md) · [TASK_CONTEXT.md](TASK_CONTEXT.md) · [CODEX_BRIEF.md](CODEX_BRIEF.md).

```text
AI Projects Brain (public GitHub docs)
  projects/portfolio-registry.json   projects/<slug>/{PROJECT,STATE,CHECKS,DECISIONS,...}.md
                    |
         HTTPS read-only, selected capsule
                    |
Agent Commander standalone Vercel site (source: books/ops/pr-monitor/)
  /memory.html + commander-memory.js
  /projects.html  /project-management-public.html  /agents.html  /pr-monitor.html
                    |
       editable executor prompt (bounded source excerpts + URLs)
                    |
 explicit user review / protected cross-origin handoff (no autosave)
                    |
Holistic House owner /admin/command-center (separate auth & write authority)
                    |
        trusted existing agents / GitHub PR workflow
```

- **Operational PR truth** is [GitHub PR/CI](https://github.com/andylitvinov-design/books/pulls) and deployment evidence, not a dated [STATE.md](STATE.md).
- **Project knowledge** is [AI Projects Brain](../../index.md) and [its existing projects](../index.md); see [DECISIONS.md](DECISIONS.md), do not build a second database.
- **Private task truth** is the protected owner command center; no GitHub public viewer write authority.
- Front-end document loading is bounded to known public paths and filenames, with no arbitrary URL fetch and no credentials.
- Standalone release is manual; see [CODEX_BRIEF.md](CODEX_BRIEF.md) and [CHECKS.md](CHECKS.md). GitHub branch ≠ production file manifest.
- Read failures (403/404/offline) are surfaced, not turned into fabricated completion or fake empty projects.

## Private business-brain bridge — partial integration (2026-11-08)

The existing private Supabase Holistic House schema `business_brain` and owner-protected Edge Function `business-brain-owner-v1` now provide portfolio records, strategic decisions, financial risks and an allowlisted `bundle` route combining private entries with cited public GitHub documents. [Protocol and proof](../../systems/business-brain-bridge.md).

**Boundary:** the standalone `/memory.html` still reads public GitHub only. Its `hh_seo_owner` cookie is NOT a Supabase JWT. No authorized browser token exchange, private UI rendering or full-manifest standalone Vercel deployment is yet proved. Treat this as deployed backend integration, **not** full Commander LIVE. Do not publish private API keys, reuse credentials cross-origin, or skip owner authentication.
