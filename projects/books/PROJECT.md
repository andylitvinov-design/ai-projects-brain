# Books

## Purpose

Build a bilingual public book and knowledge library, including long-form book routes and a source-backed Homeopathy remedy catalog.

## Canonical identity

- repository: `andylitvinov-design/books`
- repository default branch: `codex/bootstrap-books`
- canonical public production source branch: `codex/public-book-library`
- canonical provider project: `codex-public-book-library` (`prj_4jAwcx6lrKyUKZ3R9vgC5xwwyC0b`)
- production URL: https://codex-public-book-library.vercel.app
- status: `ACTIVE_PUBLIC_LIBRARY_PARTIAL`

## Current verified state — 2026-09-12

- PR #4 merged on 2026-09-05 and the aggregate public-library PR #2 merged on 2026-09-09.
- Vercel deployment `dpl_DcXToCS1q6sexm4oUUDez42vdx9V` is a READY production deployment from `codex/public-book-library` source `2f665ca2...`.
- The canonical root and `/books/alchemy-homeopathy-remedies` returned HTTP 200 on 2026-09-12; the public remedy route renders the bilingual catalog.
- Private prescription work exists on a separate capability path. Its storage-backed persistence remains fail-closed because the canonical provider has no verified storage resource/credentials; public-library readiness must not be used as proof of private-module readiness.
- A second Vercel project `books` (`prj_f3P1jqfNPAv9lDizUn5ZYiEgjLis`, including `books-nu.vercel.app`) remains a noncanonical alias/legacy provider target.

## Identity and delivery risks

- The repository default branch and production source branch differ. Agents must target `codex/public-book-library` for public production unless this contract changes explicitly.
- The secondary Vercel project may drift and must not be promoted as a second product identity.
- Private prescription stateful flows remain `BLOCKED_BY_PROVIDER_STORAGE`; do not infer secret/resource configuration from a successful preview or static public route.
- The content set includes medical/homeopathy material. Content provenance, medical-safety framing and publication approval require review before production.
- Production proof remains source- and route-specific; it does not validate every protected flow.

## Next actions

1. Align repository/default-branch governance with the canonical production branch without unsafe history rewriting.
2. Provision and verify the required provider storage only through an authorized owner flow, then test private prescription persistence end to end.
3. Continue independent provenance, medical-safety and exact-source verification for public content changes.

## Durable routing rule

Books is one meaningful cataloged project with a verified public production surface. It remains outside Brain Management's fixed ten-project operational overlay until that overlay is deliberately revised. The second Vercel project is a noncanonical alias, and private prescription readiness is tracked separately from the public library.
