---
type: System
title: Automation Architecture
description: Compact pointer to expected ChatGPT-first scheduling and Codex automation boundaries.
resource: ../../projects/codex-automation/PROJECT.md
tags:
  - system
  - automations
  - scheduler
timestamp: 2026-06-30
status: pilot
canonical: ../../systems/agent-rules.md
---

# Automation Architecture

Use this concept for quick orientation only. Verify canonical docs before
creating, changing, or removing automations.

Canonical links:

- [codex-automation project memory](../../projects/codex-automation/PROJECT.md)
- [agent rules](../../systems/agent-rules.md)
- [Codex project workflow](../../systems/codex-project-workflow.md)

Expected ChatGPT automation architecture:

1. `Morning System Upgrade`
   - Daily 08:30 Europe/Sarajevo.
   - Memory Upgrade, Codex efficiency report, Ponytail Gate, and
     instruction-bloat check.
2. `PR Merge Sweep`
   - Daily 08:30 Europe/Sarajevo.
   - Open/recent PRs, safe merge, wrong-base merged PRs,
     `LOST_MERGED_WRONG_BASE`, and `REGRESSION_DEFAULT_STATE_NOT_VERIFIED`.
3. `Codex Delivery Loop`
   - Daily 12:00.
   - Unfinished delivery tasks, branches, CI, deploy/live blockers.
4. `Weekly Live Safe Sweep`
   - Monday 09:00 Europe/Sarajevo.
   - Weekly `/safe` across live/public projects.

ChatGPT Automations are the default scheduler. Do not create Codex-side
automation when a ChatGPT automation already covers the workflow. Codex-side
automation requires explicit reason, frequency, owner, stop condition, and
token-risk note.
