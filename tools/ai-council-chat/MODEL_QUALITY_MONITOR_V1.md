# AI Council — Model Quality Monitor v1

**Scope:** Browser-local monitoring for the existing AI Council Chat app. No new database, server API, secret, paid model, workflow, GitHub Actions schedule, or automatic cross-device synchronization.

## What is actually recorded

- Original questions, reviewer answers and syntheses already live in browser storage ai-council-chats-v1; the monitor reads these records. Deleting a conversation prunes its grades on refresh.
- New requests record confirmed dispatch, response latency, and a small verified OpenRouter receipt (provider/model and zero-cost status; no credentials or raw prompts in telemetry).
- Errors from strict-free queue halts before dispatch are not counted as failures of models which were never called. Historic failures without a dispatch receipt are not retroactively attributed.
- The monitor keeps grades and cadence only in browser storage ai-council-model-quality-v1. User-triggered CSV export excludes question and response texts.

## Grading and ranking

- Default: deterministic per-model success/attempt metrics, with NO evaluation API calls.
- Only after explicit consent to sharing public/non-sensitive question + response excerpts with another free OpenRouter model, "Evaluate 6 answers" makes ONE strict-free request for up to six ungraded responses. The judge receives anonymized model identities and never scores its own answers. No paid fallback.
- Five quality dimensions (0–10): relevance 25%, specificity 25%, completeness 20%, evidence honesty 20%, clarity 10%. Invalid, missing, duplicated JSON grades are rejected; no partial save.
- Conservative composite: 0.8 * (sum(quality) + 3*5)/(rated_count + 3) + 0.2 * 10 * (successful_calls + 1)/(attempted_calls + 2). Fewer than five graded answers are labeled as a small sample.
- CRITICAL: an LLM judge cannot verify facts, tests, CI, merges, live deployments, conversions or medical correctness; scores reflect perceived answer quality. Future Agent Commander telemetry should add independently verified task outcomes.

## Schedule and privacy

- Cadence: Manual (default), Daily, Weekly. Automatic checks only occur when the browser is open with a validated personal OpenRouter key, verified free model catalog, qualifying answers and consent. No independent overnight Vercel cron or locked-phone execution.
- One free judge request per due attempt, with no unbounded retries. Every request goes through existing strict-free validation and quota halts.
- Never enable this for confidential client, health or privileged material. Prompt injection in question/answer excerpts remains untrusted input.
- The monitor has no server sync, payment, account mutation, Telegram delivery or deployment functions.

## Later: fully autonomous server-side monitor

An unattended Agent Commander worker requires separately authorized owner-bound ingestion, encryption/retention policy, user consent, deduplication, cost gates and verification of the existing automation runner. Do not silently upload prior browser chats or provision a new paid cron. Server-side E2E needs owner-only RLS, deletion propagation and genuine authenticated provenance.

## Test and release

Run node --test tools/ai-council-chat/tests/model-quality.test.mjs alongside existing strict-free checks. Release also requires owner-browser real free-judge acceptance, responsive visual QA and Vercel exact-SHA verification. Mocked JSON tests do not prove actual provider availability.
