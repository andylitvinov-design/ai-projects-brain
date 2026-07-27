# Governance Rule Lifecycle

This file is the durable lifecycle registry for reusable AI-system rules. Daily execution receipts remain in `brain-management`; only stable rules and their lifecycle evidence belong here.

## Lifecycle states

- `candidate` — proposed, but current use is not yet proven.
- `active` — demonstrably enforced in current workflows with evidence and a regression condition.
- `needs_revision` — still relevant, but evidence or wording is no longer sufficient.
- `superseded` — replaced by a newer rule and excluded from the active-rule denominator.

## Active rules

### `management.single_implementation_owner`

- **State:** `active`
- **Rule:** One implementation chain or metric action has one implementation owner at a time. Carryover ownership persists until a terminal state or explicit reassignment.
- **Canonical source:** `systems/management-control-plane-contract.md`, sections “Exclusive ownership” and “Anti-duplication gates”.
- **Current usage evidence:**
  - the 2026-07-26 Morning Task Sweep preserved `provider-live-readiness-ezohata-finance` under `Morning System Upgrade` and `rule-lifecycle-activate-first-rule` under `Daily Dashboard Update`;
  - PR Delivery Sweep consumed only the handoff chain assigned to it and ignored the two non-delivery chains;
  - the current Brain Management `automation_assignments` record exposes one implementation owner for each owned metric action.
- **Activated:** `2026-07-26`
- **Owner:** `Daily Dashboard Update` maintains operational evidence; `Weekly Brain Refresh` reconciles durable validity.
- **Regression condition:** mark `needs_revision` if two enabled automations simultaneously own the same implementation chain or metric action without an explicit reassignment record.
- **Retirement condition:** mark `superseded` only when a newer ownership contract replaces the single-owner model and all enabled management automations adopt it.

## Candidate rules

The remaining operational guardrails stay candidates until each has current usage evidence, a stable identifier, and regression or retirement criteria. Activating a rule solely to improve a score is forbidden.
