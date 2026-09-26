# Books

## Purpose

Build a bilingual public book and knowledge library, including long-form book routes and a source-backed Homeopathy remedy catalog.

## Canonical identity

- repository: `andylitvinov-design/books`
- repository default branch: `codex/bootstrap-books`
- canonical public production source branch: `codex/public-book-library`
- canonical provider project: `codex-public-book-library` (`prj_4jAwcx6lrKyUKZ3R9vgC5xwwyC0b`)
- production URL: https://holistichouse.vercel.app
- legacy redirect alias: https://codex-public-book-library.vercel.app
- status: `ACTIVE_HOLISTIC_HOUSE_PUBLIC_PRODUCTION_PROTECTED_FLOW_PARTIAL`

## Current verified state — 2026-09-26

- PR #4 merged on 2026-09-05 and the aggregate public-library PR #2 merged on 2026-09-09.
- Vercel deployment `dpl_6kAh8pevJVHBYH8pgemsqx1YwUhL` is READY production from `codex/public-book-library` source `1b48b5560ef38399d48142665eb754466e0db279`.
- The canonical root is now Holistic House. `/books` returns HTTP 200 with bilingual canonical metadata; the former public-library alias redirects permanently to Holistic House.
- Root, `/ru/about`, `/ru/client` and Book 02 were independently verified in the Sep 25 closure. The public library remains part of the broader Holistic House surface.
- The protected consultation/client journey still requires an owner-issued private link or admin session. Public readiness must not be used as proof of protected workflow readiness.
- A second Vercel project `books` (`prj_f3P1jqfNPAv9lDizUn5ZYiEgjLis`, including `books-nu.vercel.app`) remains a noncanonical alias/legacy provider target.

## Identity and delivery risks

- The repository default branch and production source branch differ. Agents must target `codex/public-book-library` for public production unless this contract changes explicitly.
- The secondary Vercel project may drift and must not be promoted as a second product identity; the canonical project remains `codex-public-book-library` even though the canonical alias is Holistic House.
- PR #23 merged on 2026-09-20. Its preview acceptance used isolated preview-only storage; that does not prove production storage, owner authentication or real protected journeys.
- The content set includes medical/homeopathy material. Content provenance, medical-safety framing and publication approval require review before production.
- Production proof remains source- and route-specific; it does not validate every protected flow.
- Merged code and public route success cannot authorize signatures, private client links, payments, medical documents or production storage behavior without an owner-session journey.

## Next actions

1. Align repository/default-branch governance with the canonical production branch without unsafe history rewriting.
2. Verify the protected consultation/client journey through an authorized owner session and record source-specific evidence.
3. Continue independent provenance, medical-safety and exact-source verification for public content changes.

## Durable routing rule

Books/Holistic House is one meaningful cataloged project with a verified public production surface. It remains outside Brain Management's fixed ten-project operational overlay until that overlay is deliberately revised. The second Vercel project and old public-library URL are aliases, and protected readiness is tracked separately from public production.
