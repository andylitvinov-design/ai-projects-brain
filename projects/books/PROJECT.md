# Books

## Purpose

Build a bilingual public book and knowledge library, including long-form book routes and a source-backed Homeopathy remedy catalog.

## Canonical identity

- repository: `andylitvinov-design/books`
- observed default branch: `codex/bootstrap-books`
- current large integration PR: [books #4](https://github.com/andylitvinov-design/books/pull/4)
- production URL: `needs verification`
- status: `ACTIVE_DEVELOPMENT_PREPRODUCTION`

## Current verified state — 2026-09-05

- PR #4 proposes a bilingual Homeopathy library on `codex/issue-3-library-integration` against stacked base `codex/public-book-library`.
- The PR contains 444 changed files, 32,554 additions and 576 deletions; its body reports 32 passing tests plus lint and build, but the current GitHub inventory exposes no hosted checks or reviews and classifies it as nonmergeable/conflicted.
- Two connected Vercel projects exist: `books` (`prj_f3P1jqfNPAv9lDizUn5ZYiEgjLis`) and `codex-public-book-library` (`prj_4jAwcx6lrKyUKZ3R9vgC5xwwyC0b`). Both report preview deployments with `target=null` and `live=false`.
- Domain aliases exist for both provider projects, but no canonical production mapping or source-to-live parity has been proven.

## Identity and delivery risks

- The stacked noncanonical branch topology makes `main` or another production branch `needs verification`.
- The two Vercel projects create provider ownership ambiguity; neither is promoted here as canonical.
- The content set includes medical/homeopathy material. Content provenance, medical-safety framing and publication approval require review before production.
- A READY preview is not production evidence.

## Next actions

1. Decide and record the canonical production branch and one canonical Vercel project.
2. Rebase or retarget the large stacked PR only after preserving its parent dependency and resolving conflicts.
3. Require hosted checks, content/provenance review and exact-source production verification before `LIVE_VERIFIED`.

## Durable routing rule

Books is a meaningful cataloged development project, but it remains outside the ten-project production overlay until one canonical branch/provider/live mapping is proven. The two Vercel projects are aliases/duplicates, not separate products.
