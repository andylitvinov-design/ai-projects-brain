# Holistic House — AI Council daily evidence and actionable specs

**Canonical place:** this directory inside `andylitvinov-design/ai-projects-brain`.

**Daily schedule:** 09:00 **America/Toronto**. One daily ChatGPT task generates a source-grounded technical specification, independently checks public sources, and writes these versioned files when the GitHub integration is writable:

- `YYYY-MM-DD-audit.md` — detailed technical backlog, traceable sources, uncertainties, P0/P1/P2 and acceptance tests. Clearly differentiate evidence from assumptions, and list pages not checked.
- `YYYY-MM-DD-chatgpt-prompt.md` — short copyable instructions for ChatGPT to execute the *approved* work.
- `LATEST.md` — stable link to the newest available spec, with the verification date.
- `evidence/YYYY-MM-DD.json` — a compact structured snapshot of checked public pages (if the separate scheduled evidence collection succeeds).

**Caution:** Google Gemini, Mistral and OpenRouter tokens stored in someone's iPhone browser cannot be used by GitHub Actions or a separate ChatGPT scheduled task. Therefore the 09:00 task is **not automatically a three-model council** until credentials are explicitly stored in a secure GitHub Actions secret or another approved service. Do not claim otherwise. It must fall back transparently to ChatGPT-only verified review, not pretend independent model replies.

**Report quality contract:** every proposed change must contain exact page URL, observed fact vs hypothesis, expected visitor impact, precise implementation location/change, objective pass/fail check, priority and remaining unknowns. Keep unique dissent; do not invent business prices, medical claims, conversions or code paths. Never publish Holistic House changes without a separate verified request.

**Cost:** no paid model upgrades. Free GitHub Actions usage, OpenRouter/Gemini/Mistral account limits and the current Vercel account limits apply.

See [the current index](LATEST.md) or [short ChatGPT handoff](CHATGPT-REQUEST.md).
