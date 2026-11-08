# Proactive conversation capture — destinations and safety

**Owner decision:** 2026-11-08. **Status:** proposed-by-default, reviewed write-back only.  
**Canonical public brain:** `andylitvinov-design/ai-projects-brain`. **No second database or scheduled transcription worker.**

## Purpose

Make important business ideas, decisions, next actions, and reusable lessons discoverable after text, voice, or video chats. Use only the text/transcript actually available to the assistant; this rule does **not** grant access to the full video/audio stream, past missing transcripts, other conversations, or continuous background listening.

## Two boundaries, not two competing project brains

1. **Public durable knowledge:** sanitized, owner-approved project facts, decisions, constraints and operating rules go to the **existing** Brain folders. No raw transcript, medical/client data, customer messages, payments, secrets, unreleased commercial negotiations or other private material. Public = visible to anyone.
2. **Private working context:** original dialogue remains in the chat in which it happened. Protected tasks and their detailed discussions belong only in the **existing authenticated Commander task chat/editor**, when authorized and accessible. That system is not assumed to be a durable transcript archive. Full transcript backup would require a separately verified private destination and explicit owner authorization; do not create a private repository or claim sync is enabled by this rule.

## Routing table — always reuse the canonical project capsule

| Captured object | Canonical destination | Status |
| --- | --- | --- |
| Approved product/business/architecture decision | `projects/<project_key>/DECISIONS.md` | `approved`, date and trade-off |
| Important idea or hypothesis not yet decided | `projects/<project_key>/STATE.md` under proposals/ideas, if appropriate | `proposed`, not a commitment |
| Next actions, priorities and blockers | `projects/<project_key>/STATE.md`; authorized executable task in protected Commander | `todo / in_progress / blocked` |
| Verified milestone or notable change | `projects/<project_key>/LOG.md` plus `STATE.md` if current state changed | `verified` with date and evidence |
| Reusable cross-project operating rule or repeated correction | `agent-memory/active.md` or the relevant topic; use [`/save`](../../agent-skills/save.md) to upsert | `active` or `candidate` |
| Raw dialogue, private notes, customer data | Existing private chat or authorized private task system only | **Never** write to public Brain |

If the project cannot be identified confidently, ask one targeted question or keep the summary in the current conversation; never silently choose a repository. If a project capsule lacks a file, create it through the normal reviewed GitHub workflow when appropriate, instead of inventing a parallel index.

## Proactive workflow

1. Listen for **durable signals**: “решили”, “делаем”, “всегда”, “добавим”, important rejected options, changed business assumptions, concrete follow-up commitments, or repeated mistakes. Ignore ordinary chatter and transient experiments.
2. At a natural break, offer a **brief grouped recap**, for example: “У нас два решения по Holistic House и одна идея. Предлагаю сохранить?” Avoid interrupting after every sentence; one question at a time.
3. Label each proposed entry `idea / proposed / approved / task / verified` and include `date`, `project_key`, concise meaning, `source/context`, `next_action`, and `needs verification` where appropriate. Never silently elevate an idea to an approved decision.
4. Run privacy screening before any public write. Redact or skip sensitive material, even if the original conversation has more detail. Do not place transcript quotes or private links in public issues, PR descriptions, or commit messages.
5. For explicit “сохрани”, “/save”, or approval of the specific proposal, apply existing **upsert** logic: inspect canonical files, merge duplicates, prepare a safe branch/PR, and follow [GLOBAL_PR_ONE_PUBLISH_V1](../../systems/pr-one-publish-standard.md). Do not auto-merge to `main` without the required authorization.
6. Verify the exact GitHub file/commit/PR or protected task receipt before saying “saved”. If access is unavailable, say “prepared for saving”, not “saved”.
7. During future project work, load the relevant capsule first. If it has a later contradictory owner decision, reconcile rather than blindly reuse the earlier one.

## Activation and limitations

- This is a **behavior rule for agents that actually read it**, not a background recorder or an always-running integration.
- Default is **proactive suggestion**; reviewed writes remain required. The user can explicitly request a save at any time.
- No new hosting, transcription service, GitHub Action, token, paid provider, or scheduled task is authorized.
- Existing Commander [decisions](../../projects/agent-commander/DECISIONS.md) and [task context contract](../../projects/agent-commander/TASK_CONTEXT.md) retain their higher safety/authorization boundary.
