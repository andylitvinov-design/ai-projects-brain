# AI Council Chat (free-model MVP)

A lightweight mobile-first multi-AI conversational reviewer that **does not use Codex**, external paid models, a database, or private API key in the repository.

## Open

Deploy the `tools/ai-council-chat` directory as a static site, e.g. Vercel with framework "Other" and root directory `tools/ai-council-chat`.

- Connect using the official OpenRouter OAuth PKCE sign-in (S256) or paste an API key from https://openrouter.ai/settings/keys.
- With **Remember this device** explicitly enabled (off by default in a new browser; existing saved preferences are preserved), the verified API key persists in this origin's browser `localStorage` (UNENCRYPTED), allowing reconnect on reload. Switch it off for shared devices to keep the key only in `sessionStorage`. The key is **never** committed, sent to our Vercel server, or stored in a database. In-app browsers and Safari can have separate localStorage contexts; always use the same browser/origin. It is sent directly over HTTPS to OpenRouter.
- Conversation transcripts are stored only in this browser's `localStorage` (no cross-device sync). Press '×' beside a conversation to delete it.
- Each question sends the same question/context to three different selected **free** models sequentially; a fourth request synthesizes successful responses. The app looks up the live `https://openrouter.ai/api/v1/models` list and requires each `model_id` to end with `:free` and to report strictly numeric zero for every pricing field, including prompt and completion. It never silently upgrades to a paid model.
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
- Content security policy permits the same-origin public audit route, OpenRouter and the preserved Google/Mistral key-access endpoints. Strict-free Council generation never dispatches to the direct providers.

## Known MVP limitations

No direct ChatGPT account integration; no automatic authenticated browser journeys; public HTML crawling and explicitly run screenshot capture are supported; no API integration with GitHub; no use of Muse paid models; no cross-device chat synchronization. Independent UX/product/technical model roles are review lenses, not certified expertise.

## How to test manually

1. Open on desktop and iPhone 390px view; confirm no horizontal overflow.
2. Load the model list and verify only validated `:free` options are enabled; direct provider options remain disabled.
3. Connect a personal free OpenRouter key; submit one question.
4. Verify 3 independent statuses + one synthesis result, then ask a follow-up.
5. Force a 401 invalid key, 429 free quota, and offline mode; confirm errors are visible.
6. Create TZ, copy, export Markdown, delete a thread.
7. Disconnect; confirm API key no longer exists in sessionStorage.
8. Check keyboard Enter/Shift+Enter and RU/EN toggle.

Related architecture: https://github.com/andylitvinov-design/ai-projects-brain/issues/233

## 2026-10-16: Curated model selection and settings migration

Earlier reviewer roster (superseded by the stronger composition below): Nemotron 3.5 Super VL (UX), Dots3-Note Preview (independent product critique), Cohere North Mini Code (engineering), Nemotron 3 Super (synthesis). Selected for role fit, independent reviewer providers, benchmark/reliability trade-offs and free access. Not a claim that any individual model is best in all circumstances. Nemotron 3 Ultra free was excluded from automatic default because the provider's observed availability was unstable on this date. Model selection is stored separately in `ai-council-settings-v2`; existing manually customized choices are retained, and stale models are not silently swapped. If a model is no longer free/available, choose manually or press **Use recommended models**. First migration upgrades only the exact original default quartet. Verify new-free API prices before each request.

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
- Real **Gemini 3.8 Flash** through Google AI Studio. The official **Free Tier** API price is zero if the user's Google AI project is on the Free tier and has no paid billing. Existing key setup/attestation controls are preserved, but the direct model option is disabled in strict-free Council mode because account attestation does not establish zero billing.
- Real **Mistral Small 4** through Mistral Studio **Free mode / Experiment** plan with paid usage (PAYG) disabled. Its existing setup UI is preserved, but generation is blocked in strict-free Council mode until zero-cost account operation can be programmatically established. Access varies by account. The app checks authorization/model access, not the account's billing configuration.
- Meta **Muse Wonder / Muse Spark Open** are **not** enabled, because the API endpoints on OpenRouter are priced above $0. No automatic paid fallback. Muse cannot be used on the strict zero-extra-cost route here.

**Billing and privacy caveat:** the app cannot determine whether a provider account's billing is enabled. Account attestation alone is insufficient: a billed project could incur charges. Strict-free Council therefore blocks both direct providers before calling their generation adapters, regardless of saved key or attestation. Direct options remain visible but disabled; a saved direct choice must be changed manually to a validated OpenRouter model. For the stricter API-verifiable route, stay on named `:free` OpenRouter models; those requests use zero-price caps and response-cost checks, but this still cannot independently audit or reverse provider billing. Provider keys are transmitted directly from browser to Google's or Mistral's HTTPS API, never to our server; they are saved in sessionStorage, or in browser localStorage only when Remember this device is turned on (unencrypted!). Do not submit client health records or other sensitive documents; free-tier providers may use requests for model improvement under their own policies.

**Verification limitations:** Direct generation is deliberately unavailable in strict-free Council mode. Preserved key checks establish access only and cannot unlock billing verification. Adapter tests use synthetic responses, not live provider credentials, inference or account-tier proof. No request for new credentials or paid setup is part of this repair.

## 2026-10-16: Scoped reliability repair

- OpenRouter free-only requests now require strictly parsed zero prices in every catalog pricing field, including request/image/cache costs if present. Empty, null, boolean, malformed, negative or nonzero values are blocked. The catalog is refreshed before dispatch. Preferred models and manual selections are preserved; this does not hardcode new model IDs.
- Every OpenRouter completion sends provider `max_price` caps of zero for prompt, completion, request and image, with provider fallbacks disabled. Returned model identity must match the requested model or its current catalog canonical identity/aliases. The total `usage.cost` must explicitly be zero; unexpected BYOK or nonzero reported upstream costs are rejected. Missing usage fails closed. This verification cannot undo a provider charge or provide an independent billing guarantee.
- All Council requests pass through one sequential queue; direct providers are rejected before any generation dispatch, while OpenRouter reviews still receive independent prompts. A 401/402/403/429 or failed model/cost verification stops the entire queue, including later specification requests. No alternate model is tried. To resume, explicitly check the connection; a 429 also requires the Retry-After interval (at least one minute) to expire. A stopped round's queued calls cannot resume after rechecking. This safety trade-off can make a round take longer than parallel inference.
- Direct Gemini/Mistral adapters and setup controls are preserved, but strict-free Council rejects their generation before dispatch. Their disabled model options are not assigned synthetic zero prices or accepted by the OpenRouter validator. Account attestation or successful key lookup cannot unlock this route. There is no current programmatic account-billing proof, so direct inference remains unavailable. Adapter hardening separately protects consent/key-replacement races and safely parses reported metadata without asserting identity or zero-cost proof; its unit calls are mocked only. Existing Remember preferences are preserved; a new browser defaults to session-only keys. No live direct inference or account billing verification was performed.
- Mobile screenshot capture uses a real 390x844 Playwright viewport; desktop uses 1440x900, both at DPR 1. Schema 2 records measured JPEG dimensions, viewport, route/status and SHA-256 of persisted bytes. Successful captures use content-addressed filenames so older audits keep their original images. Legacy captures are explicitly unverified. A source claim alone is insufficient. Push-triggered screenshot capture is artifact-only. Review validated images and provenance before publishing them; no automatic main commit is permitted.
- Screenshot selection prioritizes a homepage and a services page before any limit. Vision request payloads include both desktop and mobile images, individually labeled by page and provenance. Non-vision models receive text and an explicit indication that no images were sent. Full public HTML metadata/excerpts, failures, screenshot provenance and prepared/dispatched/accepted image-input status are kept in browser-local history and Markdown export.
- Export remains available after aggregate failure; a specification can still use successful individual reviews. Recent context is allocated newest-first, and successful reviews remain context when synthesis failed.
- Edits made while a specification is generating are never overwritten, including edit-and-revert and empty text. A conflicting AI result is saved separately as a read-only proposal with an explicit replacement action. Switching or reopening the editor does not silently apply a delayed result.

Verification commands:
- `for f in tools/ai-council-chat/*.js tools/ai-council-chat/*.mjs tools/ai-council-chat/api/*.js tools/ai-council-chat/tests/*.mjs; do node --check "$f"; done`
- `node --test tools/ai-council-chat/tests/*.test.mjs`
- Hosted Playwright: `node tests/browser-smoke.mjs` from the app directory. All OpenRouter traffic and audit responses are mocked; no inference or real credentials. This produces UI test screenshots, not genuine website evidence.
- Genuine public-site screenshot capture: `node capture-screenshots.mjs` in the existing hosted workflow. It makes no inference calls and fails if any planned capture cannot be verified. Real browser evidence is pending until that workflow succeeds and its generated files are reviewed/published.

Live OAuth, a real OpenRouter response, clipboard/share on a physical iPhone and logged-in website journeys remain separate owner-side acceptance checks. No client records are accessed.

OpenRouter sources checked on 2026-10-16:
- https://openrouter.ai/docs/guides/routing/provider-selection#max-price
- https://openrouter.ai/docs/cookbook/administration/usage-accounting
- https://openrouter.ai/docs/api/api-reference/models/get-models
- https://openrouter.ai/api/v1/models

Direct-provider scope sources checked during rebase:
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/billing
- https://ai.google.dev/api/models
- https://ai.google.dev/api/generate-content
- https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key
- https://docs.mistral.ai/admin/billing-usage/subscriptions
