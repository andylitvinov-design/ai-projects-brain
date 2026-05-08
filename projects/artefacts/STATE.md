# STATE — artefacts

> Current working state for the Artefacts marketplace/site project.

## Status

- Project status: active / cloud-ready MVP, needs live verification.
- Canonical repo: `andylitvinov-design/artefacts`.
- Production URL: needs verification.
- Hosting/deploy source: needs verification.
- Environment status: needs verification. Do not store real env values here.

## Current focus

1. Verify canonical live URL and hosting project mapping.
2. Keep the marketplace MVP easy to resume from GitHub/Codex/browser workflow.
3. Preserve RU-first artefact marketplace concept: catalog, artefact pages, masters, diagnostics, seller/admin flows.
4. Distinguish mock/runtime persistence from production backend/auth/storage/payment flows.

## Agent entry

Use this project when the user mentions:

- artefacts / артефакты;
- artefact marketplace;
- physical artefacts catalog;
- masters / seller cabinet / admin moderation;
- diagnostics or strength scale `0–10` for artefacts.

Read order:

1. `STATE.md`
2. `PROJECT.md`
3. `CHECKS.md`
4. `DECISIONS.md`
5. repo-local `README.md`
6. repo-local `package.json`
7. repo-local `AGENTS.md` if present

## Known facts

- Canonical project memory file: `projects/artefacts/PROJECT.md`.
- Verification guide: `projects/artefacts/CHECKS.md`.
- Decision guardrails: `projects/artefacts/DECISIONS.md`.
- Repo is private and active per current project memory.
- Code search indexing is not guaranteed; inspect repo files directly when search is insufficient.

## Needs verification

- Exact production URL.
- Vercel/hosting project name.
- Deploy source and production branch mapping.
- Preview deploy flow.
- Environment variable names/completeness.
- Whether real auth, storage, checkout, payment, upload, and order flows are implemented or only planned.

## Safe next actions

1. Inspect `andylitvinov-design/artefacts` repo-local `README.md`, `package.json`, and `AGENTS.md` if present.
2. Verify hosting/deploy mapping before making production claims.
3. When changing code, run only commands confirmed in repo-local scripts, especially build/lint/smoke checks when available.
4. Update this file after live URL or deploy source is confirmed.

## Guardrails

- Do not change secrets/env values.
- Do not store real tokens, keys, client secrets, refresh tokens, cookies, or private credentials.
- Do not claim production marketplace/payment/auth/storage flows work without verification.
- Do not import assumptions from finance, codex-links, or reiki-yggdrasil without inspecting this repo.

## Last memory update

- 2026-05-08: Added missing `STATE.md` so the project capsule read order is valid and agents have a current state entry point.
