# Improve Mode

Callable trigger: `/improve`

`/improve` is read-only strategic audit, portfolio vision, and planning mode. It finds high-leverage growth or quality opportunities and converts them into delivery-ready prompts, GitHub issues, or Morning System Upgrade handoffs.

`/improve` is not execution. It must not edit product code, merge, deploy, install dependencies, mutate data, change provider configuration, or touch secrets/env values.

## Command Forms

```text
/improve <project>
/improve page <url-or-route>
/improve branch
/improve quick
/improve reconcile
/improve portfolio
```

## When To Use

Use `/improve` for:

- cross-project strategic development planning;
- growth opportunities, funnels, onboarding, pricing, offers, retention, and analytics;
- broad technical debt and architecture opportunity scans;
- missing or weak tests/checks;
- recurring regressions;
- UX, security, performance, auth, provider-sync, and verification risks;
- token/context waste and repeated agent loops;
- old improvement plans or issues that need reconciliation with current state.

Do not use `/improve` for tiny one-line fixes. Send clear small fixes directly to `/delivery`, or use `/planner` first when the task is unclear.

## Required Context

Start with `/context-scout` from `systems/context-scout-mode.md`, then read the smallest useful project memory and repo context:

- `systems/active-skill-map.md` before changing or describing command boundaries;
- `systems/provider-live-readiness-gate.md` when live/provider readiness matters;
- `projects.md` and `projects.json` when repo/live mapping matters;
- `systems/agent-rules.md` and `systems/codex-project-workflow.md`;
- target `projects/<slug>/PROJECT.md`;
- `CODEX_BRIEF.md`, `DEBUG_LOG.md`, `RISKS.md`, `STATE.md`, and `LOG.md` when relevant;
- `projects/codex-automation/delivery-outcome-ledger.md` and `prompt-regression-tests.json` when reading repeated failures;
- exact repo files, routes, issues, PRs, or live URLs needed for the requested command form.

Mark stale, unavailable, inferred, or unverified facts as `needs verification`. Never use deprecated repos as production source unless project memory explicitly confirms that relationship.

## Core Role: Strategic Vision, Not Only Bug Triage

Daily Improve must not collapse into only checking errors. Errors, provider gaps, false success, user pain, blocked PRs, and trends are input signals. The output is a strategic development plan:

```txt
where each active project should grow next
why it matters
what the leverage is
what exact prompt should start the next run
```

If an urgent blocker exists, rank it first, but still keep a portfolio view across active projects.

## Command Details

### `/improve <project>`

Broad project improvement scan. Look for:

- technical debt;
- weak verification;
- missing tests;
- performance, security, UX, auth, and provider risks;
- recurring bugs;
- product growth, offers, funnels, onboarding, content, conversion, pricing, retention, and analytics;
- architecture simplification;
- token/context waste.

### `/improve portfolio`

Cross-project strategic sweep. For every confirmed active project with enough evidence, produce a compact strategic card:

```txt
Project / repo / live, or needs verification
Current strategic read
Evidence, trend, or repeated pain
Growth or quality thesis
Top 1-3 opportunities
Highest-leverage next action
Suggested route: /delivery, /safe, /audit-ui, /audit-fin, /planner, or /upgrade
Ready prompt with outcome, source of truth, constraints, verification, and final evidence
Needs verification
```

If no strong strategic change is recommended for a project, say what evidence was checked and why no prompt is worth running today.

### `/improve page <url-or-route>`

Focused improvement ideas for a problematic page or route. Return:

- page/route;
- current observed problem, or `needs verification`;
- exact components/files/search strategy;
- 3-7 improvement ideas;
- top 1-3 recommended delivery tasks.

### `/improve branch`

Audit current branch changes only. Check:

- branch-specific risks;
- missing tests;
- accidental scope creep;
- changed files needing verification;
- readiness for PR/merge.

### `/improve quick`

Top findings only. Keep it short and avoid broad repo scans unless the user explicitly asks for a portfolio view.

### `/improve reconcile`

Review old improvement plans/issues against current repo state. Mark each item:

- fixed;
- still relevant;
- stale/superseded;
- blocked;
- needs verification.

## Output Per Finding

Each proposed improvement must include:

- project/repo/live URL;
- reason/evidence;
- exact files/areas or search strategy;
- why it matters;
- growth or quality thesis;
- minimal safe fix idea;
- tests/checks;
- risks;
- out-of-scope;
- stop condition;
- whether it should become a GitHub issue, `/delivery` prompt, `/audit-ui`, `/audit-fin`, `/safe`, `/planner`, `/upgrade`, or remain `needs verification`.

## Routing Boundaries

- `/planner`: formulate a concrete task or execution prompt when the task is abstract, risky, or unclear.
- `/audit`: verify a specific code/data/site/PR/production area and apply only safe deterministic fixes.
- `/audit-fin`: finance/ledger audit, defaulting to the last 30 days, with balance/source-record invariants and no unsafe mutation.
- `/safe`: live/public safety, security, user-visible reliability, auth/payment/data-loss risk, and UX sweep.
- `/delivery`: execute implementation, checks, PR/merge/deploy proof when permitted.
- `/upgrade`: safe harness/docs/registry/memory/regression implementation from proven lessons.
- `/improve`: read-only strategic discovery, prioritization, and delivery-ready planning.

## Daily Improve Sweep

`Daily Improve Sweep` is read-only strategic planning. It must not duplicate `PR Merge Sweep`, `Weekly Live Safe Sweep`, `Codex Delivery Loop`, or `Morning System Upgrade`.

Required output:

```txt
1. Cross-project strategic summary
2. Evidence sources used / unavailable
3. Evening Review input and impact
4. Provider/live readiness gaps
5. Project strategic cards, one per active project checked
6. Ranked cross-project opportunity list
7. Ready prompts grouped by project
8. Active skill map impact
9. Morning handoff content
10. What was intentionally not executed
11. Single recommended action for Morning System Upgrade
```

### Strategic categories to cover

1. Reliability blockers: false success, live/provider gaps, finance/data/auth risks, wrong-base PRs, deploy/source ambiguity.
2. Product growth: stronger offers, funnels, onboarding, conversion, content, pricing, packaging, retention, analytics, and user workflows.
3. Architecture leverage: simpler data flow, better persistence, clearer boundaries, better admin tooling, reusable modules, less duplicated logic.
4. Agent/process leverage: better checks, handoffs, replay cases, prompt quality, project memory, and automation routing.

### Target: `ezohata-incoming-ledger` / finance

- Canonical production repo: `andylitvinov-design/finance`
- Vercel project/live: `ezohata-incoming-ledger`, https://ezohata-incoming-ledger.vercel.app
- Deprecated/old repo: `andylitvinov-design/ezohata-incoming-ledger` is reference only unless project memory explicitly says otherwise.

Focus on balance/ledger invariants, stale audit gaps, missing tests, rounding/currency risk, duplicated transaction logic, provider import fragility, reports/dashboard mismatches, Google Sheets/OAuth/provider sync assumptions, strategic reporting quality, and never mutating financial data blindly.

### Target: `psihotavr`

- Repo: `andylitvinov-design/psihotavr`
- Vercel project/live: `psihotavr`, https://psihotavr.vercel.app

Focus on live UX regressions, admin/content/card/catalog issues, Google auth/cabinet/admin flows, cart/Telegram request flow, AI video integration, offer taxonomy, default-state/localStorage mistakes, growth/conversion paths, and PRs merged into non-main branches that did not reach live.

### Target: `psitherapy` / `psihothetapy` / homeopathy site

- Vercel project confirmed: `psitherapy`
- Live confirmed: https://psitherapy.vercel.app
- Framework: Vite
- Canonical GitHub repo: `needs verification` until proven.

Search repo mapping through project memory, Vercel metadata/settings if accessible, installed GitHub repos, and variants: `psitherapy`, `psihotherapy`, `psihothetapy`, `homeopathy`, `homoeopathy`, `gomeopathy`, `psitrends`, and related aliases.

If repo remains missing, audit only public/live UX/content when accessible, mark repo mapping `needs verification`, and do not invent a GitHub repo. Do not make medical claims or unsafe health promises; flag wording that needs safer framing.

### Target: `reiki-yggdrasil`

- Repo: `andylitvinov-design/reiki-yggdrasil`
- Vercel project/live: `reiki-yggdrasil`, https://reiki-yggdrasil.vercel.app

Focus on route/auth/profile/admin risks, Supabase data-flow gaps, layout regressions, missing verification, accepted UX constraints, admin moderation flow, product packaging, onboarding, and growth paths.

## Ponytail Gate

Before proposing implementation, check:

1. Is this change actually needed?
2. Is it already implemented in the repo?
3. Does stdlib solve it?
4. Does browser/platform/framework solve it natively?
5. Does an installed dependency already solve it?
6. Can it be config/HTML/CSS/one-line?
7. Only then propose the minimum safe code.

Safety exception: do not remove validation, auth, security, accessibility, data-loss protection, tests, logging, or production verification just to reduce code.

## Minimal Safe Fix Constraints

- Markdown-only when updating this workflow.
- No dependency install.
- No product code changes.
- No Vercel/Supabase config changes.
- No Google/third-party tool integration.
- No new Codex-side automations.
- No secrets/env values.
- Do not duplicate long explanations across project files.

## Verification

Run available markdown, lint, link, or index checks if present. If no markdown check command exists, state `no markdown check command found`.

Also verify:

- `/improve` is clearly different from `/planner`, `/audit`, `/audit-fin`, `/safe`, `/delivery`, and `/upgrade`;
- Daily Improve produces strategic project prompts, not only bug findings;
- active project memory received only compact pointers;
- `psitherapy` repo remains `needs verification` unless proven;
- no product code, dependencies, deploy, merge, provider config, automations, or secrets changed.
