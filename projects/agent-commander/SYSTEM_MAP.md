# Agent Commander — System Map

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

- **Operational PR truth** is GitHub PR/CI/deploy evidence, not a dated Brain `STATE.md`.
- **Project knowledge** is AI Projects Brain; do not duplicate project content into a second browser database.
- **Private task truth** is the protected owner command center; no GitHub public viewer write authority.
- Front-end document loading is bounded to known public paths and filenames, with no arbitrary URL fetch and no credentials.
- Standalone release is manual; the GitHub branch is not itself the production file manifest.
- Read failures (403/404/offline) are surfaced, not turned into fabricated completion or fake empty projects.
