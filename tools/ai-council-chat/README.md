# AI Council Chat (free-model MVP)

A lightweight mobile-first multi-AI conversational reviewer that **does not use Codex**, external paid models, a database, or private API key in the repository.

## Open

Deploy the `tools/ai-council-chat` directory as a static site, e.g. Vercel with framework "Other" and root directory `tools/ai-council-chat`.

- Connect using the official OpenRouter OAuth PKCE sign-in (S256) or paste an API key from https://openrouter.ai/settings/keys.
- With **Remember this device** enabled (default for personal devices), the verified API key persists in this origin's browser `localStorage` (UNENCRYPTED), allowing reconnect on reload. Switch it off for shared devices to keep the key only in `sessionStorage`. The key is **never** committed, sent to our Vercel server, or stored in a database. In-app browsers and Safari can have separate localStorage contexts; always use the same browser/origin. It is sent directly over HTTPS to OpenRouter.
- Conversation transcripts are stored only in this browser's `localStorage` (no cross-device sync). Press '×' beside a conversation to delete it.
- Each question sends the same question/context to three different selected **free** models in parallel; a fourth request synthesizes successful responses. The app looks up the live `https://openrouter.ai/api/v1/models` list and requires each `model_id` to end with `:free` and to report `pricing.prompt = pricing.completion = 0`. It never silently upgrades to a paid model.
- A follow-up question creates another round in the same thread. Draft-TZ action produces a local, copyable planning draft; it does not publish GitHub tasks.
- One full round = up to **4** OpenRouter API calls. As of 2026-10-16, OpenRouter free usage is generally limited to 50 requests/day and 20/minute. Limits are provider/account-specific and can change. The on-screen count is a **local estimate**, not OpenRouter's authoritative quota.
- If model providers are unavailable, the app shows the actual request errors; there are no fake/generated sample responses.

## Privacy and important boundaries

- Requests go **directly from the browser to OpenRouter** via HTTPS, with a user-specific token only. You are responsible for your own account and key.
- Never paste private client/health records or other sensitive client data. Other providers receive your prompt.
- A URL in a prompt is context text, not browsing evidence. Reviewers must not claim they opened a URL.
- The first version is for individual use. Client-side BYOK API keys are not appropriate for shared team accounts or machines you don't control.
- If OpenRouter restricts browser CORS requests in a specific environment, a safe authenticated backend relay may be required later; never add an open public proxy.
- Hosting on the user's existing Vercel plan ordinarily needs no new subscription for a small static app, but the host's account-specific limits/billing still apply.
- Strict content security policy only permits calls to `https://openrouter.ai`.

## Known MVP limitations

No direct ChatGPT account integration; no automatic live-site screenshot/browser crawling; no API integration with GitHub; no use of Muse paid models; no cross-device chat synchronization. Independent UX/product/technical model roles are review lenses, not certified expertise.

## How to test manually

1. Open on desktop and iPhone 390px view; confirm no horizontal overflow.
2. Load free model list and verify only `:free` models in all selectors.
3. Connect a personal free OpenRouter key; submit one question.
4. Verify 3 independent statuses + one synthesis result, then ask a follow-up.
5. Force a 401 invalid key, 429 free quota, and offline mode; confirm errors are visible.
6. Create TZ, copy, export Markdown, delete a thread.
7. Disconnect; confirm API key no longer exists in sessionStorage.
8. Check keyboard Enter/Shift+Enter and RU/EN toggle.

Related architecture: https://github.com/andylitvinov-design/ai-projects-brain/issues/233

## 2026-10-16: Curated model selection and settings migration

Default reviewer roster: Nemotron 3.5 Super VL (UX), Dots3-Note Preview (independent product critique), Cohere North Mini Code (engineering), Nemotron 3 Super (synthesis). Selected for role fit, independent reviewer providers, benchmark/reliability trade-offs and free access. Not a claim that any individual model is best in all circumstances. Nemotron 3 Ultra free was excluded from automatic default because the provider's observed availability was unstable on this date. Model selection is stored separately in `ai-council-settings-v2`; existing manually customized choices are retained, and stale models are not silently swapped. If a model is no longer free/available, choose manually or press **Use recommended models**. First migration upgrades only the exact original default quartet. Verify new-free API prices before each request.

Security trade-off: persistence means keeping a bearer token in localStorage, readable by same-origin scripts and potentially by anyone with access to an unlocked device/browser profile. This is explicitly opt-in/opt-out and documented in the settings UI; not appropriate for shared/public devices. Browser storage isn't shared between ChatGPT's in-app browser and regular Safari. For higher security in a future version, consider passphrase-encrypted persistent storage or backend-managed HttpOnly sessions.

## 2026-10-16: Evidence-first review quality v2

User feedback: original reviews and especially the fourth synthesizer were vague and too short.

Root causes verified in source: global `max_tokens:1100` cap on all four models, unconstrained short output, 54-page evidence dump shared across all reviewers, and synthesis instructions to summarize only 3–5 general ideas. These design limitations—not just model choice—were suppressing concrete findings.

V2 changes:
- Added `quality.js`: deterministic, versioned reviewer + synthesizer contracts. Each reviewer must support its own 4–6 findings with actual URL, observed evidence vs hypothesis, audience impact, exact fix, priority, acceptance test; don't invent defects if evidence is thin.
- Each reviewer receives a role-specific **shortlisted evidence bundle** instead of undifferentiated 54-page wall of text. Technical model receives route/SEO matrix; design gets page copy and selected screenshots; product sees services/Academy/offer excerpts.
- Increased maximum response budgets to **3000 tokens/reviewer**, **4900 tokens/synthesizer** for site audits (previous 1100 for all); regular chat to 2700/4300. This is still **four free-model calls**, same number of requests, but larger output can be slower or hit provider token caps.
- Synthesizer is instructed NOT to delete minority findings; produce 6–12 distinct route-specific issues where evidence warrants, each with acceptance tests, and do not replace detailed issues with vague slogans.
- Audit displays a **deterministic HTML evidence appendix** grouped by flags with actual fetched URLs and candidate fixes, independent of model prose. These are HTML-heuristic findings, not guaranteed browser bugs. A visible specificity indicator counts URL references and verification markers.
- Preserves original reviewer outputs in local browser history/export and explicitly marks untested logged-in journeys and click behavior.
- Does not silently change user's selected models or use paid fallbacks.
- No model calls have been made with a real OpenRouter key from this environment. Live user acceptance is still required to validate quality.

Regression smoke performed on 2026-10-16: `quality.js`, `app.js`, `audit.js` parsed successfully. In-memory synthetic evidence verified scoped prompts, checked-URL appendix, and weak/strong specificity scoring. Public deployed HTML / quality.js returned 200 when last checked.

## 2026-10-16: Specification editor v2 — fix copy and substance

Previous `Create TZ` behavior was **not actually AI-generated**: a local `makeSpec()` simply concatenated question + fourth model's synthesis + generic acceptance checks; it had no dedicated copy/export action for the resulting document.

Now `spec.js` opens a dedicated editable Markdown editor and, on explicit user request, sends **one additional request to the selected free synthesis model** with full individual successful reviewer answers, original synthesis, site-audit coverage, and deterministic HTML evidence appendix. It requests a precise implementation backlog with page URLs, observed vs hypothesis status, visitor impact, step-by-step changes, reviewer provenance, priorities, acceptance tests and implementation order; it flags weak/truncated outputs rather than silently declaring them sufficient.

- Controls: **Copy full text**, **Download Markdown**, **Share** (native device share sheet where supported), **Select all text** (for browsers that deny clipboard), **Rebuild specification**.
- Inline editing is persisted to the same browser-local conversation; reopening an existing v2 document does not incur another model call. Regeneration is explicit; the previous document is retained if the call fails.
- Copy uses native Clipboard API and falls back to selecting the textarea + `document.execCommand('copy')`. No account sync, GitHub publish, or server-side storage of user conversation.
- Source appendix of observed HTML flags and URLs is appended deterministically so important evidence cannot be lost in model synthesis.
- Old generic TZ documents are preserved and upgraded on next Create TZ action; the new model requires a personal OpenRouter connection and an available free model, consuming **one** free request.
- Regression tests: `node --test tools/ai-council-chat/tests/spec.test.mjs`. GitHub Actions workflow `AI Council specification tests` verified success on 2026-10-16. A live end-to-end user-owned OpenRouter model call has not been performed in this ChatGPT session.

## 2026-10-16: More powerful model composition without automatic billing

**Live OpenRouter API inventory inspected on 2026-10-16:** its named free endpoints include Google **Gemma 4**, NVIDIA **Nemotron 3 Ultra**, Poolside **Laguna S 2.1**, Cohere North Mini Code, Dots3 Note, and others. The free endpoint inventory does **not** include Gemini, Meta Muse or Mistral under :free IDs. Do not imply Gemma = Gemini or swap to paid endpoints.

**New recommended OpenRouter FREE preset (explicit Apply recommended button for existing users):**
1. UX/visual: `nvidia/nemotron-3.5-super-vl:free`
2. Product strategy/copy: `google/gemma-4-31b-it:free`
3. Coding reviewer: `poolside/laguna-s-2.1:free` (temporary provider listing; scheduled expiry 2026-10-31, so users must switch later)
4. Detailed synthesizer: `nvidia/nemotron-3-ultra-550b-a55b:free` (reasoning is powerful but availability/latency may be worse than Nemotron 3 Super)

This choice is an evidence-based *candidate*, not a validated objective best benchmark. No human-reviewed A/B testing of these four against the previous roster is yet available. Prior manual choices continue to be stored and cannot be overridden without using **Apply recommended models**.

**Optional direct providers, separate from OpenRouter**:
- Real **Gemini 3.8 Flash** through Google AI Studio. The official **Free Tier** API price is zero if the user's Google AI project is on the Free tier and has no paid billing. The user must create/paste their own Google API key, affirm the free account, and explicitly select Gemini from a model dropdown.
- Real **Mistral Small 4** through Mistral Studio **Experiment/free** plan. The user must confirm their plan is free, supply its own key and explicitly choose the model. Access varies by account. The app checks authorization/model access, not the account's billing configuration.
- Meta **Muse Wonder / Muse Spark Open** are **not** enabled, because the API endpoints on OpenRouter are priced above $0. No automatic paid fallback. Muse cannot be used on the strict zero-extra-cost route here.

**Billing and privacy caveat:** the app cannot determine whether a provider account's billing is enabled. It only gates direct access on the user's explicit free-plan attestation; a user with a billed project could still incur provider charges. To eliminate that risk entirely, stay on named `:free` OpenRouter models. Provider keys are transmitted directly from browser to Google's or Mistral's HTTPS API, never to our server; they are saved in sessionStorage, or in browser localStorage only when Remember this device is turned on (unencrypted!). Do not submit client health records or other sensitive documents; free-tier providers may use requests for model improvement under their own policies.

**Verification limitations:** Direct Google/Mistral browser authorization and content generation cannot be end-to-end tested without the user's provider keys. Cross-origin request restrictions may apply; any CORS/401/429 error is displayed, without fabricated results or paid fallback. Synthetic provider fetch tests and Vercel deployment availability should be checked separately.

## 2026-10-16: Holistic House visual identity

AI Council uses `house-theme.css` after the legacy `styles.css` to match the production Holistic House visual language: warm cream (#f8f4ec), parchment cards (#fffaf4), dark umber (#493d31), terracotta accent (#855139), serif editorial headings and discreet sand borders. The app has a coordinated lighthouse SVG app icon and PWA colors, rather than the previous blue/teal UI.

Scope: sidebar, header, welcome, site-audit input, example cards, question composer, three expert cards, fourth synthesis, evidence sections, model/connection settings and the editable specification dialog. Mobile styling includes single-column reviews, comfortable touch targets and safe-area padding; reduced-motion preferences are respected. The Holistic House wordmark links to the main site in a new tab.

**Important:** This is a presentation-only override. Preserve original element IDs, JS hooks, free-model rules, key-storage choice, user history and direct-provider logic when changing the UI. Avoid replacing/reimplementing `app.js`, `audit.js`, `spec.js`, or `external-providers.js` just to change the theme. For future design updates, edit `house-theme.css` and maintain the existing stylesheet load order.

Static integrity checks confirmed required DOM IDs, CSS brace balance, CSP, PWA JSON and local style source; Vercel preview returned HTTP 200 for the new HTML/CSS. These checks do not substitute for a browser screenshot inspection or a live real-key OpenRouter test.

## 2026-10-16: Optional DeepSeek through NVIDIA NIM free API trial

The current OpenRouter `/api/v1/models` inventory does **not** list a live DeepSeek `:free` model, though some historical model pages still say free. The official DeepSeek API is billed per token, so it is not suitable for the strict no-additional-spend default.

However, NVIDIA NIM currently offers a **free trial endpoint** for `deepseek-ai/deepseek-v4.1-flash` at https://build.nvidia.com/deepseek-ai/deepseek-v4.1-flash/playground, under NVIDIA API Trial Terms. This is limited trial availability, **NOT permanent free service or an OpenRouter free model**.

AI Council now has a dedicated opt-in DeepSeek field under Settings → additional providers:
1. User signs in to NVIDIA Build and obtains an API key for the trial endpoint without activating billing. Keep it private.
2. User pastes the key into NVIDIA/DeepSeek and confirms both free trial status **and explicit consent to send the key transiently through AI Council's Vercel relay**. A small 128-token trial request verifies the model. Key is in browser sessionStorage (or localStorage with Remember). **Vercel processes the key transiently per call, but does not persist or log it in application code.** This is a security trade-off disclosed before opt-in; do not use on shared machines.
3. If the challenge succeeds, a `nvidia-direct/deepseek-v4.1-flash:trial` choice appears in each reviewer/aggregator dropdown, without changing existing choices.
4. After explicit consent, calls go browser → same-origin `/api/nvidia-chat` → fixed `https://integrate.api.nvidia.com/v1/chat/completions`, always with model `deepseek-ai/deepseek-v4.1-flash`. No paid fallback. Without relay consent, DeepSeek is not activated. NVIDIA's hosted API is not browser CORS-compatible; the former direct-fetch implementation failed.
5. Recommended initial use: swap the technical reviewer temporarily from Mistral to DeepSeek; keep Gemini as the final synthesizer and Nemotron VL for UX; compare actual evidence-based results before making permanent choices.

NVIDIA trial capacity, terms, model availability, and browser CORS behavior may change. Official NVIDIA model docs: https://docs.api.nvidia.com/nim/reference/nvidia-deepseek-v4_1-flash and https://docs.api.nvidia.com/nim/re/reference/nvidia-deepseek-v4_1-flash-infer. Test this from the user's own device before stating that live requests work.

Free trial and no payment method should be verified **on the NVIDIA account**, not inferred from the UI. Never send private health/client records to third-party models.

### 2026-10-16: NVIDIA connection hotfix

Automated Chromium run [38998475549](https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/38998475549) proved direct NVIDIA fetch fails with `Failed to fetch` / browser CORS while Google and Mistral reach their API. Added a fixed-host/fixed-model JSON-only serverless relay (`api/nvidia-chat.js`), explicit second consent checkbox, origin allowlist, token-format/size/message restrictions, no caching/logging or provider key persistence, sanitized provider error reporting (401/403 = key/model permissions, 402 = trial or billing issue, 429 = rate limit). Fixed checkbox resetting after a failed consent attempt. Original browser-only key privacy promise is **not** valid for this opt-in DeepSeek connection; the user must decide whether to accept the new, clearly disclosed server-transit trade-off. Existing Gemini/Mistral/OpenRouter flows stay browser-direct.

Testing: `node --test tools/ai-council-chat/tests/direct-providers.test.mjs tools/ai-council-chat/tests/nvidia-relay.test.mjs` and corresponding GitHub Actions. Actual end-to-end NVIDIA authorization requires the user's own key and a free trial with permission to use this particular model. Public API readiness alone does not verify that user's credential. Trial mode may be revoked without warning.

## 2026-10-16/17: OpenRouter free quota 429 recovery

Customer screenshot showed free Gemma and Poolside 429 while UI displayed "7 · 50/day". **This local usage count is NOT account-wide OpenRouter quota**. OpenRouter's free account limit and individual provider load/rate limits can reject calls regardless of local browser count or other applications' usage (https://openrouter.ai/pricing).

Fix:
- Browser now labels only `Локально: N`, not `N / 50`; upstream 429 error details are kept (redacting any `sk-or-` tokens) and a 10-minute OpenRouter cool-off prevents immediate futile retries.
- `recovery.js` adds an actionable explanation after a failed review and a **persistent compact mobile alert above the composer** so the user does not need to scroll through three failed review cards.
- A **USER-CLICKED** model switch is offered only if BOTH user-approved direct Gemini and Mistral keys are confirmed. The reviewed panel becomes [Gemini, Mistral, Mistral, Gemini] (three specialized reviews from only **two distinct model families**, with Gemini synthesizer); no provider requests are sent during switching. Users explicitly click Retry Audit to rerun, leaving previous failed round intact. Backup of previous four model selections can be restored.
- If only one or neither direct key is connected, Settings is offered, not an automatic paid or incomplete fallback.
- Plain chats and site audits can now use the user-approved direct providers even without a connected OpenRouter key (previously blocked by the OpenRouter-only login gate).
- Direct Gemini and Mistral currently receive public site HTML/text for audits; screenshots are displayed but are **not** delivered as vision input via these direct adapters. Do not claim vision review.
- This does not bypass those providers' own free tier quotas; their billing/availability cannot be verified from the app.

Verification: GitHub Actions workflow `AI Council 429 Recovery` run https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/39000632899 completed SUCCESS. Production Vercel deployment READY; `/`, `/recovery.js`, `/house-theme.css` returned HTTP 200. An authenticated user-side free-tier review is still necessary to confirm successful provider responses.

## 2026-10-17: Mistral Free Tier 429 after switching from OpenRouter

User's iPhone screens showed TWO simultaneous `mistral-direct/mistral-small-2603:experiment` reviewer failures (`Rate limit exceeded`) and a STALE "OpenRouter 429" footer. The two role slots used the exact same Mistral model, so sending both independently duplicated API usage and could hit a request/concurrency limit. The failure is attributable to **Mistral**, not the earlier OpenRouter limit.

Implemented:
- `review-batch.js` coordinates reviewer calls, grouping identical model IDs per round. In the Gemini/Mistral/Mistral configuration, Mistral now receives **one** multi-role prompt, requiring clearly separated `<<<COUNCIL_ROLE_2>>>` and `<<<COUNCIL_ROLE_3>>>` sections. The UI marks both responses as a **shared model call**, not as two independent model providers. If the model cannot separate sections, the second card explicitly reports that no independent response was obtained. No hidden extra provider requests.
- Both `audit.js` and `app.js` use grouped calls. The aggregator receives "shared model call" provenance rather than double counting reviewer agreement.
- Every round records `synthesisModel` so 429 errors can be attributed to the actual provider whose model failed, even after model selection changes.
- `recovery.js` detects OpenRouter, Mistral, Gemini, NVIDIA, or mixed rate-limit failures by model ID. For Mistral 429, the footer and alert say **Mistral**, offer Settings, and **do not** offer the redundant "Switch to Gemini+Mistral" action or an immediate automatic retry.
- Direct Mistral API HTTP 429 now triggers a 5-minute browser-local protective cooldown with no automatic provider retry or paid fallback. The account's actual free-tier quota may reset MUCH later; the cooldown is not a quota-reset prediction.
- Counters explicitly say `OpenRouter локально: N`, not `N of N` for all providers; direct API calls are **not** included in that OpenRouter counter.
- Simplified oversized mobile error cards.
- No user settings or past individual reviews overwritten. Old rate-limit error messages remain in history for auditability.

CI: `AI Council 429 Recovery` run https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/39030396088 succeeded (11 tests, including single call for duplicate Mistral roles and honest attribution); updated direct provider `429` cooldown tests run https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/39030499619 succeeded.

IMPORTANT LIMIT: We cannot reset the user's Mistral free tier nor verify the actual quota without their provider account. A new real analysis may still fail until the provider restores quota. If only Gemini is available, user may explicitly assign Gemini to every role; grouped calls mean one model handles three perspectives plus a separate Gemini synthesis request, but this is **not independent multi-model review**. Never imply otherwise.

## 2026-10-17: Gemini "Load failed" + incomplete audit health fix

Real iPhone screenshot: both Mistral review roles showed `Rate limit exceeded`, synthesis showed `Load failed`, and the account still displayed the failed results after redeploy. This proves the user's **previous run was unsuccessful**. Browser-local history preserves old errors on purpose; deployment and unit test success do NOT imply a historical run was repaired.

**Root cause in implementation:** the fourth model was still asked to synthesize even if ONLY ONE independent reviewer had responded, wasting a separate API request and misleadingly presenting a multi-model summary. A rejected browser network fetch displayed the raw `Load failed` without saying which provider or why.

Updates:
- `review-health.js`: counts successful **distinct model IDs**, rather than number of role cards; considers 3 role sections from one model a single source. When fewer than two distinct models responded, chat and site-audit flows mark the result `partial` and skip the fourth model request entirely. Keep evidence and all source answers available for export in the old chat. Partial status is not a "completed audit".
- `app.js`: visibly labels archived incomplete runs and provides export/source-document actions. `audit.js` similarly retains deterministic HTML evidence, without Gemini synthesis if only Gemini replied.
- `spec.js`: accepts explicitly connected direct-provider aggregator keys (formerly required an OpenRouter key) and does NOT auto-generate an LLM spec from a single successful model; it opens a fully copyable editable source draft instead. Explicit manual model generation is still possible with truthful single-source label.
- `external-providers.js`: catches browser `Load failed`, `Failed to fetch`, and timeout, attributes them to Gemini/Mistral as network errors **not proof of an invalid API key**. Added an explicit Settings button `Проверить реальный ответ Gemini (1 запрос)` that attempts a tiny generation call and reports real success or a detailed error; this makes it easy to separate full-audit timeouts / mobile in-app browser network issues from inability to connect at all. It DOES consume one free-tier generation request only on user click.

Verification: HTTP 200 on live deployed root, `review-health.js`, `spec.js`, `external-providers.js` and Vercel production READY. GitHub Actions `AI Council specification tests` run https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/39031132656 passed after fixing module reference; `AI Council 429 Recovery` related tests https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/39031115893 passed; direct-provider tests https://github.com/andylitvinov-design/ai-projects-brain/actions/runs/39031061310 passed. User's live Gemini/Mistral account quotas and browser behavior still UNVERIFIED. Test actual Gemini in the same iPhone webview, then start a **new** audit after quota recovery rather than judging unchanged past errors.

## 2026-10-17: Modern Holistic House redesign (supersedes 2026-10-16 visual edition)

User feedback: the initial cream-only AI Council design looked dated and unlike the **new** Holistic House website. Verified design tokens and actual CSS in production source `andylitvinov-design/books@codex/public-book-library`, `app/holistic-house-home.css`: warm ivory `#fbf7ef`, sand photo hero `#f6eddf`, editorial Georgia/Iowan headings, restrained lines, clean near-white cards, and burgundy primary CTAs `#742c42`. The older dark-umber/lighthouse theme is no longer the active design.

Redesigned `house-theme.css` as one modern override following `styles.css`, without stacking additional theme files. The landing screen now has a true **photo-led split hero** referencing the existing public Holistic House botanical photograph `/images/holistic-house/hero-olive-incense.webp` (direct static image, no new image optimisation). The photo origin is explicitly allowed in the HTML CSP; a warm gradient still works as a fallback. Simplified brand mark: geometric H monogram instead of lighthouse. Prominent, shorter audit form; horizontal example prompt chips; minimal compact connection strip; readable expert cards, distinct burgundy synthesis, two-column settings model grid, and better mobile layout and safe-area controls.

RU/EN editorial copy is kept in `app.js` and `audit.js`, not hardcoded into elements that are overwritten on language switch. No model endpoint, quota, storage, provider consent, script IDs, export, or response-generating logic was altered. `model-grid` is presentation-only. Photo is decorative and never submitted to an AI model.

Verification: 16 static source-integrity checks passed (including required IDs, language coverage, CSS structure, scripts, model wiring, CSP, mobile and PWA); preview returned 200 for HTML, JS, CSS, icon and manifest; live public botanical photo returned HTTP 200. A real device screenshot review and authenticated model test were **not** performed and must not be reported as done.

## 2026-10-19: Telegram delivery of Gemini, Mistral and manual Muse replies

Two **separate, opt-in** delivery paths are implemented in the existing `ai-council-chat` app.

### A. Native Telegram sharing, no server configuration

- Every actually successful reviewer response (including direct Gemini and direct Mistral **only if the owner has connected those providers**) gets **↗ Telegram** with real model attribution. Errors/unavailable models are never presented as genuine answers.
- A full Markdown report includes the original question, all independently returned answers, explicitly pasted personal Muse response, the actual synthesis (where available), and the saved specification.
- **Personal Muse** stays a manual import because access to the owner's external personal Muse chat API is unverified. Import persists with that AI Council round in browser-local history. Existing model synthesis is *not* retroactively updated.
- On supported phones, native device sharing sends a Markdown file through the OS share sheet. The user chooses **Telegram**, recipient and confirms sending. Desktop short-text fallback opens `https://t.me/share/url`; long content is not silently truncated, and the user must export/attach Markdown if native file sharing is unavailable.
- Native share opening does **not** prove the recipient got/read the message.

### B. Owner-authorized Bot API delivery (strictly OFF until Vercel setup)

On the **existing** AI Council Chat Vercel project, configure the following **server-side environment variables** only after approving the release and securely preparing credentials:

| Variable | Purpose |
|---|---|
| `COUNCIL_TELEGRAM_ACCESS_KEY` | Independent random high-entropy owner access key (minimum 32 characters), **not the bot token**; never commit or paste into GitHub/ChatGPT |
| `COUNCIL_TELEGRAM_ENABLED` | Must be exactly `true` to permit sends; unset/false denies requests |
| `TELEGRAM_BOT_TOKEN` | Secret Bot API token for the owner's bot from @BotFather |
| `TELEGRAM_CHAT_ID` | Private owner chat ID **fixed server side**; caller cannot select recipient |

Steps: open Telegram chat with the bot and send `/start`; configure only the authorized project's Vercel environment via its protected settings. On the deployed AI Council site, open **Settings → Telegram · мой личный бот**, enter the **independent access key** (kept *only in current tab memory*), then use **Проверить подключение (без отправки)**. That only verifies authentication + configured environment, not actual Bot API acceptance. Press **Отправить ботом в мой чат** in a completed AI Council round for the first actual test. Only an HTTP success from Telegram Bot API is treated as *accepted*, not recipient read/delivery.

Optionally, check **Автоматически отправлять новые публичные ответы** in the same settings. This sends *newly completed rounds* to the configured chat **only while the AI Council browser tab is working**, with all actual model answers + synthesis as a single Markdown attachment; a subsequently manually added Muse reply is sent as an explicitly manual follow-up. No uncontrolled auto-retries on failures; the user may retry explicitly. Old rounds are not automatically replayed. An error never becomes an invented model answer.

The API route `api/telegram-deliver.js` enforces exact known origins, a constant-time owner access-key check, opt-in env, payload limit, strict one-recipient routing, timeout and failure-safe status. It never accepts client-supplied chat IDs and does not expose bot secrets or client records. It is not a generic anonymous Telegram relay. No new database or billing service required.

**Privacy:** Only public/non-sensitive material may be submitted. Never send client names, health records, identity documents, passwords or secrets to the AI providers *or* Telegram. Basic token-shape redaction is a backup, not a guarantee. The access key is distinct from any Gemini, Mistral or Telegram key.

**Separate existing daily Gemini audit:** `.github/workflows/daily-gemini-telegram.yml` / Issue #242 uses **GitHub Actions secrets and opt-in `GEMINI_TELEGRAM_ENABLED=true`**, not Vercel variables. The schedule can work with the user's phone/Mac off **only after these Github settings are configured and real delivery is verified**. It does not currently schedule a Mistral/Muse API audit. Personal Muse does not have verified background API access.

### Verification and rollout gates

- `node --check tools/ai-council-chat/telegram-share.js`
- `node --check tools/ai-council-chat/api/telegram-deliver.js`
- `node --test tools/ai-council-chat/tests/telegram-share.test.mjs tools/ai-council-chat/tests/telegram-deliver.test.mjs`
- Mock-only PR CI proves code path and security checks, **not** real Telegram acceptance, iPhone Safari share UI, live provider calls, Vercel env setup or production delivery.
- Follow normal branch/PR/review/merge + verified correct Vercel project, then one explicit owner test. No silent production deployment, account/billing or secret changes.

## 2026-10-26: GLM 5.3 Flash Free and DeepSeek V4.1 Flash Free via OpenCode (manual bridge)

OpenCode offers two free model identifiers: `opencode/glm-5.3-flash-free` and `opencode/deepseek-v4.1-flash-free`. The `-free` suffix matters. Its free inference is available **within OpenCode** and does not provide an unrestricted zero-cost API for third-party websites. The availability is temporary and may change. Official docs: https://opencode.ai/docs/models/ and https://opencode.ai/.

**How the bridge works:**

1. Type a public-only question in the AI Council composer and click **OpenCode Free · manual**. A browser-local discussion is created with no OpenRouter, Google, NVIDIA or OpenCode inference request.
2. Expand the OpenCode manual section in the discussion. Choose GLM 5.3 Flash Free or DeepSeek V4.1 Flash Free, copy the evidence-aware prompt and run it in the OpenCode application with the matching model selected.
3. Paste each **real** answer into its corresponding field and save. Responses are strictly marked `manual:opencode` and are **not** API-authenticated.
4. After both independent responses are saved, copy the prepared synthesis prompt, ask the selected OpenCode model to compare them, and paste its real synthesis. Existing automatic synthesis is not silently recomputed.
5. Existing Markdown export, Telegram report text and technical-specification source material include the manually imported and explicitly attributed answers.

**Safety / deployment:** This code performs no OpenCode API calls and asks for no OpenCode key, never uses paid fallbacks, never accesses client records, and retains data in the browser's existing conversation storage. Never paste clients' health information, private messages, account/payment data, secrets or tokens into externally hosted models. A manual paste does not establish the model identity or prove site testing. The public `super10/ai-council-free` Vercel project is separate from the GitHub source; merging the PR alone is not proof that the site was redeployed.

Offline CI: `node --check tools/ai-council-chat/opencode-manual.js` and `node --test tools/ai-council-chat/tests/opencode-manual.test.mjs`. User-side OpenCode account, 375px phone UI, real response imports and separate Vercel production deployment must be verified independently.
