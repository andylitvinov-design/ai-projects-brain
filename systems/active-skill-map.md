# Active Skill Map

Last updated: 2026-07-03

Purpose: one source of truth for which agent commands are visible to Andrey, which mechanisms are secondary/internal, and which scheduled loops own recurring work.

Use this file before adding, renaming, or advertising a skill/mode. Do not create a new top-level skill when the behavior can be integrated into an existing command plus an internal guardrail.

## 1. User-facing commands

These are the commands that may be advertised as primary tools.

| Command | Role | Boundary |
| --- | --- | --- |
| `/planner` | Turn unclear, risky, or abstract work into a concise delivery prompt or issue-backed plan. | Planning only; Codex execution happens through `/delivery`. |
| `/delivery` | Execute a scoped implementation task with context, checks, PR/merge/deploy/live proof when allowed. | Product changes require source-of-truth and verification. |
| `/audit` | Verify a specific code/data/site/PR/production area and apply safe deterministic fixes only. | No broad redesign or risky mutation. |
| `/audit-ui` | Verify and minimally fix UI structure, polish, responsive states, and browser-visible regressions. | Must include browser/live proof when a URL/dev server exists. |
| `/audit-fin` | Verify finance/ledger invariants, defaulting to the last 30 days. | No blind source-data/provider mutation. |
| `/improve` | Read-only strategic improvement discovery and prioritization. | Finds what to improve; does not execute. |
| `/safe` | Safety, secrets, auth, API-cost, user-visible reliability, rollback, and runtime-error checks. | Prefer minimal safe fixes and explicit blockers. |
| `/handoff` | Transfer current operational state to the next agent/session. | Continuation state, not durable memory. |
| `/upgrade` | Update the agent harness/brain/prompts/rules from proven lessons. | System/harness changes only unless routed to `/delivery`. |
| `/save` | Save a durable reusable rule, lesson, or product decision. | Upsert durable memory; not a task handoff and not read-only lookup. |

## 2. Secondary tools and implicit modes

These may be used by agents but should not be presented as equal top-level strategy modes.

| Tool/mode | Role | Visibility |
| --- | --- | --- |
| `/context-scout` | Read-only context bundle before planner/delivery/audit/improve. | Usually implicit. |
| `Memory Read` / `/memory` | Read existing memory/rules. | Secondary read-only lookup; do not use as durable save. |
| `Playwright Verification` | Browser proof for UI/forms/routes/auth/uploads/responsive behavior. | Verification tool inside delivery/audit-ui/safe. |
| `/critic` | Pre-execution critique and improved execution prompt. | Optional support mode. |
| `Grill Me` | Clarify requirements before implementation. | Optional support mode. |
| `Superpowers` | Discipline: context -> plan -> minimal change -> verification. | Internal execution style. |
| `Recent Research` | Fresh public research when data may have changed. | Support mode for time-sensitive facts. |
| `Skill Creator` | Package a repeated workflow into a reusable skill. | Use sparingly; prefer updating this map first. |

## 3. Internal guardrails

These are not user-facing commands. They are checks that should be embedded into the commands above.

- false-success detector: do not claim success without matching proof.
- live-proof gate: production or UI fixes require browser/live/API evidence when the target exists.
- dodelay recovery: if a task is unfinished, produce exact next action instead of pretending completion.
- red-capable feedback loop: repeated failures become a root-cause rule, regression test, or ticket.
- to-delivery ticketing: risky/product/provider/data work becomes an agent-ready issue or handoff.
- domain vocabulary mode: use the project's exact terms before changing copy/data/taxonomy.
- suggested-skills contract: propose new skills only after proving repeated cross-project value.
- prompt regression tests: add compact regressions for repeated prompt/harness failures when available.

## 4. Scheduled loops

| Loop | Role | Must not duplicate |
| --- | --- | --- |
| Daily Improve Sweep | Read-only strategic opportunity discovery. | `/delivery`, PR merge, live safe sweep. |
| Morning System Upgrade | Safe harness/docs/memory/prompt implementation from proven inputs. | Broad discovery, product-code work. |
| Evening Architecture Review | Problem analysis; choose one structural issue and write tomorrow's handoff. | Daily Improve discovery, Morning implementation, PR merge. |
| PR Merge Sweep | Merge/recover safe ready PRs. | Product design, broad audits. |
| Codex Delivery Loop | Find unfinished delivery work and exact recovery tasks. | Daily Improve discovery. |
| Weekly Live Safe Sweep | Live safety/security/UX sweep. | Daily feature delivery. |

## 5. Key distinctions

### `/improve` vs `/upgrade`

```txt
/improve = discover and prioritize what should improve.
/upgrade = update the agent system so future work improves.
```

Keep them separate. `/improve` may produce issues/prompts. `/upgrade` may update brain/docs/harness and convert product/risky work into `/delivery`, `/audit-ui`, `/audit-fin`, or `/safe` tickets.

### `/save` vs `/memory` vs `/handoff`

```txt
/save    = durable reusable rule or lesson.
/memory  = read-only lookup of existing memory.
/handoff = current operational state for continuation.
```

Do not use `/handoff` as long-term memory. Do not use `/memory` as a primary visible mode. Do not use `/save` for one-time task notes.

## 6. Change rule

Before adding any new top-level command, answer:

1. Which existing user-facing command cannot contain this behavior?
2. Is the need repeated across projects, not just one task?
3. Is there a checkable boundary and source file?
4. Can it be an internal guardrail instead?
5. Does adding it reduce confusion rather than create another synonym?

If answers are weak, update an existing command or guardrail instead of creating a new skill.
