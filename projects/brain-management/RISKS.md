# Risks - brain-management

## Critical Risks

- Reporting stale data.
- Mixing sibling repos into the management boundary.
- Skipping the fixed morning report sequence.

## Data Risks

- Unknown or stale data must stay marked as needs
  verification.
- Data contracts need verification before schema changes.

- A health endpoint must not validate an empty fallback as if it were a real
  canonical snapshot when its upstream data dependency fails closed. On
  `2026-09-03`, `/api/data` returned HTTP 503 for a 22.4h source while
  `/api/control-plane-health` returned HTTP 200 and reported schema, metric,
  project and priority failures against zero input. Health publication must
  identify the upstream dependency failure explicitly, preserve the last
  source-backed health evidence separately, and never reinterpret missing
  input as source corruption or a fresh control-plane result.
## Freshness Cadence Risks

- A terminal freshness limit shorter than the effective publication interval
  creates a guaranteed daily fail-closed window. This was independently
  observed after the 2026-08-18 source refresh: the persisted source from
  `2026-08-18T11:36:38.020Z` was valid at Evening Closure, then all five
  canonical APIs returned HTTP 503 at `2026-08-19T10:30Z` with source age
  `22.9h` against the unchanged `18h` terminal limit.
- Do not treat another one-shot refresh or another date-specific chain as
  prevention. Reuse the existing freshness chain and require one routine
  publication owner with a maximum verified interval safely below the
  terminal limit. The current Daily Dashboard Update and Brain Data
  Freshness Watch scheduler state must be reconciled before claiming the
  cadence gap is closed.
- Closure proof for a cadence repair must include both an immediate
  same-source re-read and a re-read after the previous failure window, while
  preserving exact source SHA, dependency-closed manifest, formulas, and
  frozen UI. Repeated emergency refreshes receive no numeric metric credit.
- A scheduler interval is not publication-cadence proof. On 2026-08-19 the
  implementation worker was changed from daily to `07:30`/`19:30`
  America/Toronto and the evening run completed a separate Trends task, but
  did not refresh the shared operational snapshot. At `2026-08-20T10:30Z`,
  four of five canonical APIs again failed closed on a `22.9h` source while
  `/api/trends` served a separate newer source. Closure therefore requires
  evidence that every claimed cadence cycle publishes one coherent canonical
  operational source—not merely that a worker ran or deployed unrelated code.

## Operational Handoff Continuity Risks

- A missing dated management handoff is `PIPELINE_INCOMPLETE`, not evidence
  that the stage found no work or reached a terminal state. The scheduled
  Morning Task Sweep has no canonical handoff for `2026-09-06` or
  `2026-09-07`; the last valid artifact before recovery is
  `history/handoffs/2026-09-05-morning-task-sweep.json`.
- Recovery must preserve chain IDs and owners from the last valid handoff,
  reconcile every intervening PR Delivery, strategic-priority, Evening
  Closure, terminal-receipt, and live-source artifact, then write one current
  handoff that explicitly records the continuity gap. Do not fabricate missed
  receipts, reset carryover ownership, or create date-specific duplicate
  chains.

## Runtime Data Activation Risks

- The runtime-data architecture merged in Brain Management PRs #597–#599 is not live merely because its code reached `main`. Until the existing Vercel project has `BRAIN_RUNTIME_GITHUB_TOKEN` configured with fine-grained, read-only Contents access to `andylitvinov-design/brain-management`, the guarded operator must remain fail-closed.
- Never persist the token value in a repository, handoff, log excerpt, or durable-memory receipt. Store only the variable name and the minimum access contract.
- Activation proof requires one operator run that changes the runtime source without creating a Vercel deployment, a canonical API re-read of that source, explicit stale/missing-auth failure behavior, and evidence that the application deployment stayed unchanged. A merge receipt or a routine data-only redeploy is insufficient.
- Constrained Vercel deployment storage is part of the operating constraint: operational data refreshes must use the runtime-data path after activation and must not consume application deployments.
- A product or pilot PR must not replace the runtime-data wrappers, restore bundled operational JSON, or weaken the storage-safe Vercel configuration. PR #602 demonstrated this regression while its complete Mobile Release Bundle was red on `OPERATIONAL_SOURCE_MANIFEST_FORBIDDEN`; focused pilot tests cannot substitute for that gate.
- If runtime separation has regressed, credential activation alone is insufficient. Reapply the tested architecture on current `main`, reconcile every operational-source timestamp, pass the complete release gate, use at most one material deployment, and then prove subsequent refreshes without deployments.

## Deploy Risks

- Cloudflare Pages
- Deploy source and branch need verification before
  production work.
- GitHub Actions may fail before the first repository step and expose
  `steps=null` with unavailable `BlobNotFound` logs. Repeated pre-step
  failures are an external CI-reachability blocker, not evidence that the
  branch code is invalid or safe to merge. Preserve the exact head SHA,
  avoid duplicate recovery PRs, and hand the existing PR to PR Delivery
  Sweep until required checks can run or a repository-policy-approved
  deterministic replacement is available.
- A red full release gate with failures spanning source/schema drift, retired
  workflow fixtures, missing test dependencies, stale snapshots, and obsolete
  assertions is a multi-owner migration, not one bounded repair. Read the
  complete uploaded failure artifact before editing, separate source-owned
  fixes from harness/dependency fixes, and stop automatic merge when the
  candidate patch expands beyond one focused owner or cannot rerun the whole
  gate. A tail-truncated failure list is not deterministic validation.

## Security Risks

- Environment variables are names only. Values must never be
  stored.
- Private repo and provider data may be sensitive.

## Agent/Codex Risks

- Morning report publish/API verification can fail on
  codex-links.pages.dev DNS/network reachability.
- Agents sometimes verify dashboard JSON from the wrong root
  path.

## Do Not Do

- Do not publish secrets.
- Do not add real environment variable values.
- Do not invent repo, hosting, live URL, or data-flow
  mappings.
- Do not change production without explicit instruction.
