# Agent Commander — Project Passport

- **project_key:** `agent-commander`
- **type:** infra
- **Purpose:** mobile agent command center: tasks, PR monitoring, project memory and controlled handoffs.
- **Canonical code repo:** https://github.com/andylitvinov-design/books
- **Control/source branch:** `codex/bootstrap-books`, directory `ops/pr-monitor/`.
- **Standalone public address:** https://holistic-house-pr-monitor.vercel.app — functional LIVE / current deployment SHA **needs verification**.
- **Private owner editor:** https://holistichouse.vercel.app/admin/command-center — separate protected owner authority.
- **Knowledge source:** https://github.com/andylitvinov-design/ai-projects-brain/tree/main/projects
- **Safety:** public UI reads project facts and prepares prompts; it cannot create private tasks, merge PRs, dispatch agents, or store credentials.
- **Status (7 November 2026):** source exists; exact production deployment and new memory integration **needs verification**.

## What we are building
1. One mobile shell: briefing, tasks, agents, projects, and an always-visible five-action bottom dock.
2. Task intake: text/voice, editing and structured executor prompt with measurable acceptance criteria.
3. GitHub PR → checks → merge → deployment → functional LIVE monitoring with evidence.
4. Project memory browser that reads only the selected public capsule from AI Projects Brain, inserts source-linked context, and never treats memory as executable instruction.
5. Future stage: trusted owner-only task execution and auditable write-back, only after separate authorization, verification and release.

## Agent Entry
Trigger words: Agent Commander, командир агентов, PR Monitor, управление агентами, командный центр, PR очередь.

Read in order: `STATE.md` → `PROJECT.md` → `SYSTEM_MAP.md` → `DECISIONS.md` → `CHECKS.md` → `CODEX_BRIEF.md`.
Use `books/AGENTS.md` and the global `systems/pr-one-publish-standard.md` before any PR.
Never confuse code merged to control branch with a completed manual Vercel release.
