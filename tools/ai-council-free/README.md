# AI Council Free: mobile static app

One responsive HTML file, no runtime dependencies or backend. Existing app: https://ai-council-free-super10.vercel.app . This prepared change is not deployed.

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
