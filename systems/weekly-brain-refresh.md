# Weekly Brain Refresh

## Purpose

Run one evidence-backed weekly maintenance cycle for `ai-projects-brain` covering:

1. project catalog completeness and freshness;
2. AI-system governance memory;
3. human and machine search indexes.

This is maintenance of canonical memory, not a broad rewrite.

## Schedule

- Weekly, Saturday morning.
- Timezone: Europe/Paris.
- Preferred scheduler: ChatGPT Automations.

## Inputs

Use available evidence from:

- GitHub repositories accessible to the user;
- recent commits, PRs, issues, branches, and repository metadata;
- `projects/index.md`, `projects.md`, `projects.json`, and `data/project-index.json`;
- project capsules under `projects/<slug>/`;
- governance files under `governance/`;
- current ChatGPT automation list and recent outputs when accessible;
- task-sweep, PR-sweep, upgrade, and improvement reports when accessible.

Do not infer private runtime state, deployment secrets, or inaccessible scheduler state.

## Phase A — Project catalog reconciliation

1. Inventory accessible repositories and compare them with all project indexes.
2. Classify each repository/project as active, maintained, experimental, archived, deprecated, backup, or `needs verification`.
3. Add missing meaningful projects; do not add every trivial backup as an active project.
4. Verify canonical repo, default branch, live URL, project type, aliases, and status where evidence exists.
5. Check active project capsules for `PROJECT.md`, `CODEX_BRIEF.md`, current state, system map, checks, risks, and decisions as appropriate.
6. Identify stale or contradictory records and update the canonical source instead of duplicating facts.
7. Keep `CODEX_BRIEF.md` short and navigational.

## Phase B — AI-system governance refresh

Update:

- `governance/CURRENT.md` with current confirmed system state;
- `governance/GOALS.md` with active priorities, owners/next actions, and success conditions;
- `governance/AUTOMATIONS.md` with actual scheduler, cadence, purpose, overlap, health, persistence, and stop conditions;
- `governance/EFFICIENCY.md` with available weekly metrics and trends;
- `governance/WEEKLY-LEARNINGS.md` with failures, root causes, recurring patterns, fixes, open risks, and reusable rules.

Separate facts from recommendations. A documented automation is not assumed active unless scheduler evidence exists.

## Phase C — Search and navigation index refresh

1. Update `INDEX.md` only when routes or canonical sources changed.
2. Reconcile `projects/index.md`, `projects.json`, `projects.md`, and `data/project-index.json`.
3. Check aliases for project names, repos, live URLs, and common user wording.
4. Detect duplicate project identities and old canonical targets.
5. Check links and referenced paths.
6. Keep indexes concise: index entries route to canonical memory; they do not copy full state.
7. Improve searchability by adding missing aliases, project keys, categories, and status fields where the schema supports them.

## Efficiency and safety budget

- Start from indexes; do not recursively read every repository.
- Use repository metadata and search before opening full files.
- Expand only for missing or contradictory evidence.
- Do not change product code, secrets, deployments, financial records, or live data.
- Documentation/index repairs may be committed and proposed in a PR.
- Avoid unrelated formatting churn.

## Required output

Produce a compact weekly report containing:

- catalog additions, removals, status changes, and unresolved gaps;
- governance updates and top system risks;
- automation health and overlaps;
- efficiency trend highlights;
- index/search improvements;
- files changed and checks run;
- items marked `needs verification`;
- next three highest-value actions.

If repository changes are made, create a focused branch and PR. Do not merge automatically unless the user has explicitly authorized automatic merge for this weekly process.
