# Active Agent Memory

This file contains only high-value rules that are safe to load before `/delivery`, `/audit`, `/save`, `/memory`, `/memory-review`, `/learn-pass`, `/upgrade`, or memory-instruction work in the brain repo.

Hard cap: 30–50 active rules. If this file grows beyond the cap, run `/memory-review` before adding more.

Do not store weak candidates, long evidence, or one-time project tweaks here.

---

## 2026-06-28 — Run memory as a compact lifecycle

Type: rule  
Memory type: procedural  
Scope: global / agent-memory  
Priority: high  
Status: active  

User signal:
> The brain repo should maintain repo-local agent memory and installable memory rules for active projects.

Evidence:
- Canonical specs: `agent-skills/save.md`, `agent-skills/learn-pass.md`, `agent-skills/memory-review.md`, `agent-skills/upgrade.md`
- Boot router: `AGENTS.md`

Lesson:
Agent memory is a compact instruction system, not a transcript. Use `/save` for user-directed durable rules, `/learn-pass` for candidate lessons and metrics, `/memory-review` for merge/replace/archive, and `/upgrade` for safe harness improvements. Always upsert instead of appending duplicates.

Apply when:
- Running `/delivery`, `/audit`, `/save`, `/memory`, `/memory-review`, `/learn-pass`, or `/upgrade`
- Editing `agent-memory/` files
- Updating memory-related command/skill instructions or project templates

Check:
- Every active rule has `Apply when`, `Check`, and `Failure if ignored`.
- Similar or conflicting memory items are merged, narrowed, replaced, or archived instead of duplicated.
- Weak or single-signal lessons go to `candidates.md`, not `active.md`.
- Harness changes are recorded in `harness-proposals.md` and validated through `harness-regression-tests.md` before broad promotion.
- `archive.md`, `candidates.md`, `metrics.md`, `harness-proposals.md`, and `harness-regression-tests.md` are not loaded by default.

Failure if ignored:
- Memory can become noisy, causing agents to miss important rules or repeat known mistakes.

Avoid:
- Duplicate rules with different wording
- Contradictory active rules
- One-time project tweaks in active memory
- Promoting weak candidates without evidence
- Applying broad harness changes without validation

Last applied:
- 2026-06-30 — Memory Upgrade automation pass

Related files/components:
- `agent-memory/index.md`
- `agent-memory/candidates.md`
- `agent-memory/metrics.md`
- `agent-memory/harness-proposals.md`
- `agent-memory/harness-regression-tests.md`
- `agent-skills/save-runtime.md`
- `agent-skills/learn-pass.md`
- `agent-skills/memory-review.md`
- `agent-skills/upgrade.md`

---

## 2026-11-08 — Proactive, privacy-safe capture of business decisions from conversation

Type: rule  
Memory type: procedural  
Scope: global / project memory / voice and text conversations  
Priority: high  
Status: active  

User signal:
> Owner approved proactive proposals to preserve meaningful project decisions from voice/text conversations.

Evidence:
- Owner decision on 2026-11-08; canonical routing: `agent-memory/topics/memory-system.md`.

Lesson:
During an available live conversation transcript, notice meaningful ideas, explicit decisions, tasks, constraints and repeated corrections. At a natural milestone, briefly propose a grouped save to the existing project's canonical files. Separate proposed from approved; do not write whole conversations or private content to the public GitHub Brain. A proactive suggestion is not permission for an unreviewed public write. An explicit authorized `/save` or “сохрани” may proceed through the existing review/write flow.

Apply when:
- A user approves or revises a project direction, product rule, important task, or cross-project workflow.
- A strong repeated correction implies a durable rule; in voice conversations, rely only on transcript text actually available.

Check:
- One project_key and one canonical file destination are identified for each item.
- Proposal/decision status and privacy are checked before write.
- A successful GitHub write is confirmed by file/PR evidence; otherwise say not saved.
- No new database, automatic recording, public transcript dump or unsupervised branch-to-main merge is created.

Failure if ignored:
- Decisions are lost, proposals become false commitments, or sensitive chat content enters a public repository.

Avoid:
- Interrupting every message to offer saving.
- Treating an unconfirmed idea as approved or proposing background transcription without an authorized capability.

Last applied:
- never

Related files/components:
- `agent-memory/topics/memory-system.md`
- `agent-skills/save.md`
- `projects/<project_key>/DECISIONS.md` and `STATE.md`

