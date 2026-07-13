# Morning Handoff Queue

Last updated: 2026-07-13T21:12:00+02:00 by Evening Architecture Review.

Purpose: compact queue consumed by Morning System Upgrade. Daily Improve and Evening Architecture Review write safe, deduplicated inputs here.

## Queue for next Morning System Upgrade

### Priority 1 — publication trace closure instrumentation

ID: `publication-trace-closure-instrumentation`

Critical gap: the dashboard publication SLO is still `3/4`. Canonical and mirror can match and a Netlify deploy can be identified, but the current public timestamp cannot be tied to the same publication attempt.

Safe change:

1. Add these fields to the publication trace or dashboard schema:
   - `publication_attempt_id`
   - `canonical_commit_sha`
   - `mirror_commit_sha`
   - `deploy_id`
   - `source_commit_sha`
   - `branch`
   - `public_last_updated`
   - `live_verified_at`
2. Fail validation when:
   - deploy timestamp predates canonical timestamp;
   - an automatic-publication claim has no source commit or branch;
   - public `last_updated` differs from canonical;
   - any of the four stages is missing but status is SUCCESS/LIVE.
3. Keep Netlify/provider mutation outside Morning Upgrade.
4. When the trace cannot close, produce one exact `/delivery /safe` ticket for the existing Netlify site `98712296-45be-4c0d-af99-d4ed19507e0e`. Do not create another site.
5. Add or refresh deterministic stale-deploy and missing-source fixtures only if current coverage does not already protect the exact field-level trace.

Expected metric effect:

- Publication Freshness: reproducible 4-stage evidence.
- False Success Rate: preserves zero critical false-success claims.
- Evidence Completeness: publication identity becomes inspectable.
- Verification Retry Rate: fewer repeated disconnected lookups.

Validation:

- schema-v5 dashboard validation;
- canonical/mirror identity;
- deploy-before-canonical rejection;
- missing-source automatic-deploy rejection;
- no-provider-mutation assertion;
- repository evidence runner and final-commit CI.

Evening verification question:

Can one `publication_attempt_id` prove canonical commit, mirror commit, deploy ID/source commit and public `last_updated` for the same attempt?

## Routed outside Morning Upgrade

### Existing Netlify publication mapping

- Existing site ID: `98712296-45be-4c0d-af99-d4ed19507e0e`.
- Current identified deploy: `6a5207d064f1feba62676b5e`.
- Deploy state: `ready`.
- Published: `2026-07-11T09:07:37.194Z`.
- Deploy source: API upload.
- Missing: branch, source commit and current public timestamp equality.
- Route: `/delivery /safe`.
- Status: `NEEDS_VERIFICATION`.

### Product/provider work

Continue using existing provider-readiness tickets for Psihotavr, Finance and other active projects. Do not convert those provider tasks into Morning harness implementation.

## Evidence from Evening

- Morning structural upgrades accepted: 3.
- Replay cases: 9.
- Prompt regressions: 10.
- Behavior fixtures: 9.
- Samples: 30.
- Final dashboard commit CI: insufficient evidence.
- Morning/Evening schedules: exactly 2/2 enabled, zero duplicate titles.
- Publication: 3/4, `NEEDS_VERIFICATION`.
