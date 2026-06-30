---
type: System
title: Codex Efficiency
description: Compact pointer to the Codex context, tool, and minimum-change efficiency rules.
resource: ../../systems/codex-token-efficiency.md
tags:
  - system
  - codex
  - token-efficiency
timestamp: 2026-06-30
status: pilot
canonical: ../../systems/codex-token-efficiency.md
---

# Codex Efficiency

Use this concept for quick orientation only. Verify canonical workflow docs
before changing Codex behavior.

Canonical links:

- [Codex token efficiency](../../systems/codex-token-efficiency.md)
- [Codex project workflow](../../systems/codex-project-workflow.md)
- [agent rules](../../systems/agent-rules.md)

Core navigation rules:

- Read the smallest useful context first.
- Prefer `CODEX_BRIEF.md` or `STATE.md` over a long `README.md` when
  available.
- Do not do a full repo scan unless exact files cannot be found.

## Ponytail Gate / Lazy Senior Check

Before proposing or writing code:

1. Is this change actually needed?
2. Is it already implemented in the repo?
3. Does stdlib solve it?
4. Does browser/platform/framework solve it natively?
5. Does an installed dependency already solve it?
6. Can it be config/HTML/CSS/one-line?
7. Only then write the minimum safe code.

Safety exception: Do not remove validation, auth, security, accessibility,
data-loss protection, tests, logging, or production verification just to reduce
code.
