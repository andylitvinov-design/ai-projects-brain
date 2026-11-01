# AI Council Free: mobile static app

One responsive HTML file, no runtime dependencies or backend. Existing app: https://ai-council-free-super10.vercel.app . At 2026-10-16 19:53 UTC the public team alias serves guard build `dpl_N6nSc9MoGX73eCpppjS7SoSyc7md` (Vercel target `staging`), HTML SHA256 `1ffc69976a86d5398ebeb769c51e77832fa3821e2769ef0d7652238c27262890`. The staging creation unexpectedly moved that alias. The short alias https://ai-council-free.vercel.app still serves older `dpl_G8UqzcxLVZp6kKU2HZ6LPGiMeFiP`, SHA256 `ef8e4d1366a54da4b323189e3a4c2b43cc7d5e95ca723056c38f98713d41ebd5`. Actual HTTP bytes verified both mappings. The later manual-only export fix is prepared but not yet deployed; do not infer publication from a commit or staging label.

## Workflow

1. The owner creates/enters their own OpenRouter key directly in the browser. Never send a key in chat. Memory-only by default; existing optional sessionStorage toggle remains explicit. No analytics or server key storage.
2. Load the public live model catalog, explicitly select two or three verified free models, enter only public/non-sensitive question and context.
3. Choose a verified free synthesis model or **Без сводки**. When available, Gemma 4 is initially offered for the existing two-answers-plus-summary workflow. The displayed estimate includes synthesis. Explicit Off survives catalog refresh.
4. Read the provider retention/training disclosure and confirm this exact question, context, selected recipients and optional synthesis. Edits clear consent. Selected models receive the same question independently.
5. Real answers or errors are attributed. An enabled synthesis uses successful answers only. Existing answers can be summarized later with one explicit request and renewed consent.
6. Personal Muse stays manual: copy question, ask in Muse, paste its actual answer. A local-only Muse card/export needs no API call; synthesis requires at least two available answers and new consent. Different questions are never silently combined.
7. Copy/download the Markdown report. No automatic publication, browsing of supplied URLs, or ChatGPT/Muse account integration.

## Cost and failure guards

- Every inference refreshes https://openrouter.ai/api/v1/models without cache. Exact `:free` ID required. Prompt and completion prices must be known zero. Every supplied known additional price must also be zero; unknown fields, missing required prices and overrides reject. Missing optional irrelevant prices do not exclude catalog entries.
- Single selected model per request; `provider.allow_fallbacks=false`; `provider.max_price` prompt/completion/request/image all zero. No tools, plugins, alternate-model list, retries or paid fallback.
- Max 3 concurrent calls, 20 calls per rolling minute, 50 per page lifetime; max 1800 output tokens. These local counters are NOT account quota remaining. Refresh/new tabs cannot bypass account enforcement, but reset local counters.
- HTTP or embedded 401/402/403/429, missing/unknown/nonzero usage cost, or unexpected returned model identity stop future requests and abort active requests best-effort. Already dispatched calls cannot be recalled. Ordinary provider outages show individual errors.
- Successful responses require explicit zero `usage.cost` and an exact response `model` match. Some providers may return an alias without `:free`; those responses are intentionally rejected. Authenticated response compatibility and CORS remain unverified, not assumed working.
- Credential strings are redacted from outputs/exports; this is defense-in-depth, not a guarantee to remove all personal data. Never submit patient/client, medical, financial, identity or other private data. Free providers may retain/train on submitted data.

OpenRouter account-wide free limits were documented as generally 20 requests/minute and 50/day on 2026-10-16; failed calls may count and availability changes. No unlimited-use promise. Sources: https://openrouter.ai/docs/guides/routing/provider-selection , https://openrouter.ai/pricing , https://openrouter.ai/api/v1/models .

## Verification

Node 22+; no install/build step or model calls:

    node --test tools/ai-council-free/tests/*.test.mjs

Tests run the shipped inline guard and actual UI event handlers against mocked HTTP/DOM. The public catalog fixture is a read-only snapshot from 2026-10-16; it includes 15 accepted free entries. Tests cover paid/unknown/unavailable models, zero caps, quota/auth stops, exact identity/cost, concurrency/session limits, partial answers, consent, manual Muse, summary Off/re-enable, storage failure and export redaction. They are not mobile Safari layout tests or authenticated end-to-end proof.

Serve `tools/ai-council-free/` as a static directory. For local inspection only:

    python3 -m http.server 8080 --bind 127.0.0.1 --directory tools/ai-council-free

Existing Vercel project: `prj_EvFvW1xtTwGbXv5HCljFV9FsYf0r` / `ai-council-free`. Existing deployment source files are `src/index.html` and `src/README.md`; preserve the existing static deployment configuration. PR235's automatic `ai-council-chat` preview belongs to another project and does not verify this app. Preview review is required before production promotion. No credentials needed for mock tests or static preview checks.


## Proposed PR-only browser checks

`browser-tests/` contains test-only official Playwright tooling pinned to 1.63.0. The app still has no runtime dependencies. Chromium and WebKit each run at widths 320, 390 and 1280; this is responsive engine coverage, not physical iPhone Safari proof. Every external browser request is intercepted: the catalog is synthetic, Authorization and inference requests fail the test, and only localhost GETs can reach a network server. No credentials are entered. The synthetic catalog response explicitly allows the localhost origin through its CORS header; this does not verify live OpenRouter CORS. Checks cover real ancestor visibility, manual Markdown download, escaped markup, consent changes, catalog filtering, zero call count and horizontal overflow. Screenshots/trace are synthetic test artifacts only.

Workflow `.github/workflows/ai-council-free-browser.yml` is PR-only/path-filtered, read-only permissions, one worker, no retries, 10-minute job bound, 3-day artifacts and no deployment. Repository API verified `private:false`, `visibility:public` on 2026-10-16 20:00 UTC. Standard GitHub-hosted runners are free for public repositories (https://docs.github.com/en/billing/concepts/product-billing/github-actions). The workflow uses standard `ubuntu-24.04` and skips if the repository is private. No larger runners, paid service, billing setting, repository variable or credential is required. No workflow run or six-viewport pass is claimed yet.

Official setup: https://playwright.dev/docs/ci . From `tools/ai-council-free/browser-tests`, use `npm ci --ignore-scripts`, `npx --no-install playwright install --with-deps chromium webkit`, then `npm test`. Existing offline checks remain `node --test tools/ai-council-free/tests/*.test.mjs` from repository root. Browser tooling installation is development-only.

Local browser installation attempt (2026-10-16 20:00 UTC): official Playwright 1.63.0 requested Chromium from cdn.playwright.dev into `/tmp`; the download was 0 MiB/corrupt (ZIP end-of-directory signature missing). Its automatic retries were interrupted. No alternative mirror or security bypass was attempted, and no six-viewport browser pass is claimed. Test discovery succeeds; the proposed public-repository CI is the remaining engine-validation route.
