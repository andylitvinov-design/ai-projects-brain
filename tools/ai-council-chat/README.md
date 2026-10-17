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
