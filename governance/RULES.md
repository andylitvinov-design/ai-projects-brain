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

### `delivery.live_verification_requires_behavior_and_api`

- **State:** `active`
- **Rule:** A delivery may enter `LIVE_VERIFIED` only after the intended production behavior is independently verified. Merge, CI success, a READY deployment, HTTP 200 on the root page, or a screenshot alone are insufficient. Every API, route, asset, or user flow required by the delivered behavior must also work in production.
- **Canonical source:** `systems/live-upgrade-delivery-contract.md`, sections “Canonical terminal states”, “Recovery loop”, and “Proof rules”.
- **Current usage evidence:**
  - the delivery contract explicitly separates technical proof from user proof and requires the intended production route or operation to work;
  - Evening Delivery Closure rejected a Brain Management success claim when the root page returned HTTP 200 but `/api/data` returned HTTP 404;
  - the recovery path kept the chain out of `LIVE_VERIFIED` until `/`, `/api/data`, `/api/needs-attention`, `/api/trends`, and Strategic Priorities all returned HTTP 200 from the canonical production project;
  - current Brain Management production verification checks both the rendered dashboard and its required serverless APIs.
- **Activated:** `2026-07-28`
- **Owner:** `Evening Delivery Closure` enforces terminal verification; `Daily Dashboard Update` maintains publication checks; `Weekly Brain Refresh` reconciles durable validity.
- **Regression condition:** mark `needs_revision` if any automation records `LIVE_VERIFIED` while a required production API, route, asset, clean-session behavior, or observable operation is missing, stale, unmapped to the delivered source, or unverified.
- **Retirement condition:** mark `superseded` only when a stronger canonical proof contract replaces this rule and all delivery/closure automations adopt the replacement.

### `delivery.direct_deploy_source_parity`

- **State:** `active`
- **Rule:** A direct or artifact-based production deployment may not advance beyond `MERGED_WAITING_DEPLOY` unless it is generated from the current canonical production branch using a repository-owned manifest or build output, bound to the source commit SHA, complete for every required runtime route, API, asset and configuration file, and independently verified after deployment.
- **Canonical source:** `systems/live-upgrade-delivery-contract.md`, section “Direct-deploy source parity gate”.
- **Current usage evidence:**
  - the canonical delivery contract requires repository-owned manifest/build output, source-SHA binding, runtime/API/asset completeness, production parity inspection and independent behavior verification for direct deployments;
  - on 2026-07-28, Evening Delivery Closure rejected a Brain Management deployment where the root returned HTTP 200 but `/api/data` returned HTTP 404;
  - the same closure recorded two incomplete intermediate publications and reached `LIVE_VERIFIED` only after publishing one exact-source Vercel Build Output API artifact containing the PWA shell, assets and operational APIs together;
  - PR #180 merged the durable direct-deploy parity gate into canonical `ai-projects-brain/main` after current-state reconciliation and green validation.
- **Activated:** `2026-07-29`
- **Owner:** `PR Delivery Sweep` verifies source/branch/merge evidence; `Daily Dashboard Update` maintains repository-owned publication manifests and source-to-deploy records; `Evening Delivery Closure` enforces production parity before terminal closure; `Weekly Brain Refresh` reconciles durable validity.
- **Regression condition:** mark `needs_revision` if any direct deployment is recorded as `LIVE_VERIFIED` while its source SHA, repository-owned manifest/build output, required runtime/API/asset files, deployed source parity, or post-deploy intended behavior is missing, stale, incomplete, or unverified.
- **Retirement condition:** mark `superseded` only when all canonical production projects use automatic source-bound deployments with an equivalent or stronger enforced parity contract.

## Candidate rules

The remaining operational guardrails stay candidates until each has current usage evidence, a stable identifier, and regression or retirement criteria. Activating a rule solely to improve a score is forbidden.
