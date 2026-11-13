# Durable run contract — two ChatGPT-first skills
Canonical docs: agent-skills/finish-to-live.md and agent-skills/check-design.md.

## Hard constraint
A ChatGPT response does not continue itself after the turn. A skill instruction or GitHub PR alone does not create a worker. Multi-cycle work across sessions requires a VERIFIED existing Agent Director worker, enabled PR pipeline or an actually created authorized task-specific ChatGPT automation. No indefinite promises.

## Persistence: HH_RESUMABLE_SKILL_RUN_V1
Use an existing authenticated Director task/lease/queue; when permissible, public-only root issue/PR comment. NEVER put user screenshots, personal/medical/client data or secrets in public GitHub.
Fields: schema, skill, root_id, original_request_ref, project_key, repo, pr_number, branch, base_sha, head_sha, lease_owner, last_observed_at, cycle, run_status, evidence_urls, cause, last_verified_fact, next_trigger, next_action, next_owner, idempotency_key, deployment_id, production_alias, deployment_sha, acceptance.
Design extras: reference_id, reference_private_location, reference_viewport, reference_state, before_preview_live_screenshot_refs, discrepancy_ledger. Preserve same baseline across cycles. Checkpoint on every major transition; fresh-read all current state before resuming.

## State machines
LIVE: NEW -> DIAGNOSE -> REPAIR -> TEST -> WAIT_CI -> WAIT_MERGE -> WAIT_DEPLOY -> LIVE_CHECK -> LIVE_VERIFIED. On new CI/production failure return to DIAGNOSE; on a real external dependency WAIT_EXTERNAL, BLOCKED_BY_OWNER or BLOCKED_BY_PLATFORM (never success).
DESIGN: NEW -> BASELINE_CAPTURED -> DIFF_FOUND -> PATCH -> RECAPTURE -> DIFF_FOUND ... -> WAIT_DEPLOY -> LIVE_RECAPTURE -> VISUAL_LIVE_VERIFIED.
CI queued/running prohibits speculative HEAD writes. Only current rightful lease owner may write. Every retry must be causally justified and use existing protected release policy.

## Continuation selection
(a) Multiple synchronous cycles in current ChatGPT run when possible.
(b) Holistic House: use existing :10/:40/:30/:00 flow ONLY when task is correctly registered in its root queue and workers are enabled; no duplicate autoschedules or second writer.
(c) Reuse a verified existing Director background task for other work.
(d) If one does not exist and the user explicitly authorized multi-session work, create a narrowly-scoped on-demand automation if capacity/tools support it; inspect tool success before claiming continuation. Stop/disable it after terminal verification. A scheduled recheck is at most hourly and must not force CI reruns.
(e) If no runner is available, persist a resumable checkpoint if possible and report NO_CONTINUATION with exact capability gap; do not pretend the agent keeps working.

## Evidence
LIVE_VERIFIED: exact merged/deployed SHA/ancestry + functional smoke at canonical production.
VISUAL_LIVE_VERIFIED: above + screenshot diff against approved reference from actual production.
Anything less is nonterminal. Always distinguish tool access, waiting for event and owner-only approval. No new paid services, bypasses, destructive steps or duplicate PRs.
