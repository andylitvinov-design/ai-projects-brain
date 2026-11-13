# Skill: Доведи до LIVE (Finish to LIVE)
Aliases: доведи до лив; доведи PR до LIVE; finish to live; /finish-to-live.
Scope: ChatGPT-first, Codex-compatible; combines existing /delivery plus PR Recovery.
Related: systems/delivery-loop-completion-program.md; systems/pr-one-publish-standard.md; systems/resumable-skill-run-contract.md.

## Goal
One exact user task and existing PR must reach independently VERIFIED functional production. A PR created/merged, auto-merge armed, CI queued, preview READY or Vercel READY is NEVER the result.

## First action from ChatGPT
1. Resolve project/root/PR from user message, conversation, Agent Director task and current GitHub. Do not ask for information already discoverable.
2. Read current project capsule, exact source/base/head, required CI, owner/source lease, production branch, deploy route, safety policy and repo AGENTS.md.
3. Use connected ChatGPT GitHub/tools to actually inspect, repair and verify; delegate to existing protected Codex/Director worker when warranted. Do not merely write a prompt.
4. Reuse current PR and root_id. Do not create a duplicate PR or parallel writer.

## Re-entrant repair cycles
DISCOVER -> DIAGNOSE -> REPAIR -> TEST -> PUBLISH -> OBSERVE_CI -> PROTECTED_MERGE -> OBSERVE_LIVE -> LIVE_VERIFIED.

- DISCOVER: check existing PR, latest HEAD, all comments/leases, branch protection, exact required checks and production target on EVERY cycle.
- DIAGNOSE: classify real code/test/TS/build failure, CI routing, semantic conflict, GitHub capacity, permissions/review, deployment, or LIVE functional failure. Prove original failing job/log and exact SHA before editing. A red aggregate check alone is insufficient.
- REPAIR: if an actual new defect is evidenced and source lease is free, prepare minimal causal patch plus regression, preserving existing working behavior. Reconcile conflicts semantically, not ours/theirs by guess.
- TEST: run focused tests/build/lint/type/security available in repo. Report tests that are unavailable; never substitute mocks for real browser/E2E proof.
- PUBLISH: obey GLOBAL_PR_ONE_PUBLISH_V1, with staged coherent files before ONE remote publish. No per-file branch moves, no empty commit, no speculative rerun, no new charged CI/preview/service.
- OBSERVE_CI: use current exact-HEAD Core/Specialist/Guard. If new confirmed failure: checkpoint and iterate DIAGNOSE on next safe ownership window. If queued/running: WAIT_CI (nonterminal), do not rewrite HEAD or stop the overarching task.
- PROTECTED_MERGE: honor review, security, branch guards and authorized native auto-merge owner; NEVER disable checks or circumvent owner approvals. An armed merge is not a merge.
- OBSERVE_LIVE: correlate deployment/production alias with actual source SHA/ancestry and perform task-specific functional smoke in real production. A 200 page or READY alone does not prove the requested behavior.
- LIVE failure: reopen/reuse the existing root and continue independent repair/check/deploy cycles; no new unrelated PR.
- CLOSE only at LIVE_VERIFIED after all original acceptance criteria pass; record evidence and run existing /learn-pass.

## Multiple ChatGPT sessions
Execute several evidence-driven cycles within the same accessible ChatGPT run. At asynchronous wait persist a checkpoint: root_id, PR URL, exact HEAD, failure cause, check IDs, owner lease, next triggering event, next action, production proof still missing. Follow systems/resumable-skill-run-contract.md.
For Holistic House, reuse only the verified existing :10 triage, :40 repair, :30 protected merge and :00 LIVE acceptance chain if this root is actually registered and owned there. Do not spawn competing hourly jobs. For other roots use an authenticated Director queue or an explicitly accepted task-specific ChatGPT automation when available. If neither was accepted, say NO_CONTINUATION; do NOT claim work will happen after this message.
No arbitrary cap on TOTAL iterations, but no repeated no-op attempts, bypasses, unbounded spend or speculative fixes. Human approval/security/privacy/payment/secrets/platform lock can force a precise WAIT_EXTERNAL or BLOCKED_BY_OWNER state; these remain unresolved, not success.

## Required report
root_id, repository+PR, current HEAD, what caused repair, tests+CI run URLs, cycle count, lease, merged SHA+time, production alias+deployed SHA, feature-specific LIVE smoke, cost impact, next trigger+owner, status. Allowed: IN_PROGRESS, WAIT_CI, WAIT_MERGE, WAIT_DEPLOY, WAIT_EXTERNAL, BLOCKED_BY_OWNER, BLOCKED_BY_PLATFORM, NO_CONTINUATION, LIVE_VERIFIED. Never label a nonterminal state "done".
