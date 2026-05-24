# Live Status First Rule

For every production UI, API, provider, balance, analytics, or deploy question, the assistant must read the live status endpoint itself before trusting screenshots, local logs, Codex reports, PR state, or deploy messages.

For Ezohata Ledger the source of truth is the live `/api/status` response on the production URL.

The assistant must report commit SHA, branch/ref, repo slug, deployment URL, deployment environment, metadata source, and whether the live commit matches the build commit.

If live status does not match the intended repo, ref, or SHA, classify the issue first as deploy/source-of-truth mismatch. Do not patch business logic until the live source mismatch is resolved.

Every production-debug response must either say that live status was checked and include the live commit/ref/repo/deployment, or explicitly say it could not be checked and mark source-of-truth as needs verification.
