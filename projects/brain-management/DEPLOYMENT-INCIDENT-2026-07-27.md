# Brain Management deployment incident — 2026-07-27

## Lasting state change

The canonical web URL continued to serve a static dashboard shell with HTTP 200, but the canonical control-plane API `/api/data` returned HTTP 404. The production deployment therefore was not `LIVE_VERIFIED` even though the Vercel deployment was READY.

## Root cause

- The guarded GitHub production workflow received an empty `VERCEL_TOKEN` from the protected `brain-management-mobile-production` environment and stopped before deployment.
- A direct connector deployment published static assets without packaging the repository serverless API functions.
- A source-attributable recovery preview was built from exact artifact SHA `33f14cf8d6165215f180900db4ef43ee15b123af`; after one safe repair it became READY, but `/api/data` still returned HTTP 404 because generated functions were not included.

## Durable verification lesson

A Brain Management deployment is invalid when the root page is HTTP 200 but any canonical control-plane endpoint is missing. Before alias promotion or `LIVE_VERIFIED`, verify at minimum:

- `/api/data` returns HTTP 200 and 24 metrics;
- `/api/needs-attention` returns structured data;
- `/api/trends` returns structured data;
- the deployment contains serverless functions, not only static assets;
- the deployment source is bound to canonical `main` or an exact source artifact.

## Recovery requirement

Restore the protected GitHub environment secret named `VERCEL_TOKEN` without recording its value in durable memory, rerun the exact-main production workflow, and verify web/mobile APIs and UI before restoring publication freshness.

## Evidence

- production: https://brain-management.vercel.app
- failing API: https://brain-management.vercel.app/api/data
- source artifact workflow: https://github.com/andylitvinov-design/brain-management/actions/runs/30248182320
- failed production workflow: https://github.com/andylitvinov-design/brain-management/actions/runs/30248182340
- release request: https://github.com/andylitvinov-design/brain-management/pull/116
