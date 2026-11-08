# Agent Commander — Operating Map

**Snapshot:** 2026-11-07 Toronto, verify all current deployment/PR details before action.

## UX surfaces in the standalone PR Monitor

- `/`: mobile briefing and priorities.
- `/project-management-public.html`: projects, stages, subtasks and read-only PR references.
- `/projects.html`: project index / overview.
- `/memory.html`: AI Projects Brain folder search and per-project source-linked document viewer.
- `/task-editor.html`: same-origin draft review; authenticated owner actions require the existing session.
- `/agents.html`, `/skills.html`, `/chats.html`, `/automations.html`: agents, skill catalog, chats and automations. Confirm each route's currently deployed content before asserting behavior.
- `/pr-monitor.html`: PR → CI → merge instrumentation. Fixed five-action mobile dock must remain intact.

## Lifecycle

1. **Intake:** owner adds text/voice, identifies project, context and success criteria.
2. **Plan:** structured task with parent/children, one responsible executor, allowed tools/skills and explicit owner review.
3. **Dispatch:** only trusted owner-authorized endpoint launches execution; anonymous public page cannot mutate jobs, PRs or secrets.
4. **Progress:** task-specific chat stores reports and follow-up directions, linked to same task identity; never start duplicate overlapping writer leases.
5. **Source changes:** obey [GLOBAL_PR_ONE_PUBLISH_V1](../../systems/pr-one-publish-standard.md), local `books/AGENTS.md`, active leases, tests/CI/review, single coherent HEAD; hold on unknown cost/CI/security.
6. **Delivery:** independent verification of `code → CI → merge → Vercel deployment → user-visible LIVE`; UI must never equate `MERGED` or `READY` to success.
7. **Learning:** summarize stable fixes as owner-reviewed, dated `DECISIONS.md`, `CHECKS.md` or `LOG.md` updates. This public folder is **not** a replacement for protected task chat history.

## Agent/provider policy

- Reuse the current owner-approved Agent Commander executor list and existing authenticated backend; models and free quota change over time.
- If OpenRouter's verified `:free` model is unavailable, report fallback/HOLD honestly; never silently choose a billable model or add a new API key.
- A skill is a curated procedure, not permission to execute arbitrary external code.
- One executor/PR writer for each verified root at a time; monitor/analyst may be read-only.
- Automated scheduler may inspect statuses, but new cron or billable hosting is not authorized by this memory document.

## Sources of operational truth

GitHub current PR/HEAD/check runs, signed worker receipts and live deployment IDs beat this static text. Existing records: `books#3128` (tower inventory), `books#1419` (root ownership), current PR Automation Canonical V1 in `books/docs/operations`. Reuse these rather than building parallel ledgers.
