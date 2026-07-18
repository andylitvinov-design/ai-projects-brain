# Morning Task Sweep Memory

Purpose: preserve evidence-backed unresolved delivery chains across recurring sweeps. Recheck unresolved items before discovering new work. Do not store secrets, private provider payloads, or unverified local-only claims.

## 2026-07-16

Status: `TASK_SWEEP_RESUMED`

### Source coverage

- GitHub remote branches, pull requests, commits and PR workflow evidence: inspected.
- Netlify project/deploy state for `brain-management`: inspected.
- Public Slack evidence: no matching recent Codex messages were available in accessible public channels.
- CODEX_LOCAL filesystem: not inspected; no synced local-computer source was available, so no direct-local claims were made.

### Reconciled chains

| Priority | Project | Chain | Proven state | Next check |
| --- | --- | --- | --- | --- |
| P0 | brain-management | schema-v6 dashboard publication | PR #40 merged to `main`; Netlify current production deploy `6a57d4312022acd85d9f4dd5` is READY and titled with merge commit `50a6eed4939fdd0b320baa62041bda21cdf12b1f`; repository mirror is schema 6 with `last_updated=2026-07-15T20:23:05+02:00` | Reconfirm public JSON and rendered shell from a non-cached live fetch; do not mark LIVE from provider state alone. |
| P1 | torontotantra | old Business Mysteries asset draft | PR #9 closed as superseded by merged PRs #18-#22 | No further action unless a missing asset is demonstrated on production. |
| P1 | report | workbook shell visual refinement | PR #57 remains draft, head `6f9e1ef0e968693228506c343ab61d925aec2b8a`; local demo checks are reported, but no GitHub workflow run or authenticated production proof exists | Rebase/CI/authenticated preview verification before ready or merge. |
| P1 | codex-links | stacked OpenClaw approval-loop PRs #157-#159 | Remote branches and accessible draft PRs exist; #158 and #159 are stacked on feature branches, and production dispatch/live smokes are not proven | Reconcile against current `main`; salvage only current safe hunks. Do not merge the stack wholesale. |

### Automatic resolution

- Closed `andylitvinov-design/torontotantra#9` with an explicit superseded-by chain, avoiding duplicate delivery from a stale base.

### Evidence rule

Use the ladder `request -> task/session -> local change -> remote branch -> accessible PR -> checks -> merge -> deploy -> public/live proof`. A READY provider deploy without a fresh public-content read remains `NEEDS_VERIFICATION`, not LIVE.

## 2026-07-17

Status: `TASK_SWEEP_NEEDS_VERIFICATION`

### Source coverage

- GitHub remote pull requests, commits, repository files and delivery contracts: inspected.
- Netlify project and current production deploy for `brain-management`: inspected.
- Public Slack search for `Codex` messages after 2026-07-16 returned no results.
- Public dashboard alias was checked through the available web reader, but its result conflicted with the current GitHub mirror and Netlify receipt deploy.
- CODEX_LOCAL filesystem: not inspected; no synced local-computer source was available, so no direct-local branch, worktree or session claims were made.

### Reconciled chains

| Priority | Project | Chain | Proven state | Next check |
| --- | --- | --- | --- | --- |
| P0 | brain-management | snapshot-bound dashboard publication receipt | PR #41 merged into `main`; companion ai-projects-brain PR #125 merged; canonical and mirror share blob `76052a966ea9a7b090884c4ffdb646d2c93395c1`, schema 6 and `last_updated=2026-07-16T20:12:00+02:00`; Netlify production deploy `6a591f8a053680a80a82a7af` is READY and titled `system-health-dashboard publication-receipt e691da7e5c61db8c69ab11fdd23c42b0a4bc601c` | Obtain one independent uncached read proving that the public JSON timestamp and publication receipt match the current snapshot/content deploy. Until then, do not mark LIVE. |
| P1 | report | workbook shell visual refinement | PR #57 closed without merge as `CLOSED_STALE_SOURCE_ONLY`; branch was 99 commits behind and only locally verified in demo mode | No action unless the current workbook is re-audited from fresh `main` and the visual direction is still required. |
| P1 | codex-links | stacked approval-loop PRs #157-#159 | All three stale stacked drafts closed without merge as source-only references; no stale branch was retargeted or merged wholesale | Keep the fresh-main salvage plan as optional backlog; create one new PR only when this capability becomes a current priority. |

### Fresh discovery

- No open pull request updated during the inspected last-24-hour window was returned by the organization-wide GitHub search.
- No remote branch without an accessible PR was proven in the inspected unresolved chains.

### Automatic resolutions observed

- Reconciled the closure of stale `report#57` and `codex-links#157-#159`, preventing unsafe direct merges and removing them from the active delivery queue.
- Confirmed that the dashboard publication workflow now validates the snapshot, deploys exact content, verifies public timestamp and UI assets, creates a separate snapshot-bound receipt, deploys it, and verifies receipt-to-content-deploy identity.

### Remaining blocker

The only P0/P1 chain requiring further proof is the public dashboard alias. GitHub canonical/mirror identity and a READY snapshot-bound Netlify receipt deploy are proven, but the independent public reader returned conflicting stale content. Classify this as `TASK_SWEEP_NEEDS_VERIFICATION`, not LIVE and not provider failure, until an uncached public read resolves the conflict.

### Evidence rule

Use the ladder `request -> task/session -> local change -> remote branch -> accessible PR -> checks -> merge -> deploy -> public/live proof`. A merged receipt implementation and READY provider deploy are insufficient when independent public-content evidence conflicts.

## 2026-07-18

Status: `TASK_SWEEP_NEEDS_VERIFICATION`

### Source coverage

- GitHub organization-wide pull requests updated after 2026-07-17 04:46 UTC, remote refs, commit comparisons, checks and delivery contracts: inspected.
- Netlify current production deploy for `brain-management`: inspected.
- Public dashboard JSON/page: independently inspected and confirmed stale relative to the repository snapshot.
- Public Slack search for `Codex` messages after 2026-07-17 returned no results.
- CODEX_LOCAL filesystem: not inspected; no synced local-computer source was available, so no direct-local branch, worktree or session claims were made.

### Reconciled chains

| Priority | Project | Chain | Proven state | Next check |
| --- | --- | --- | --- | --- |
| P0 | brain-management | exact 20:42 dashboard publication | Canonical and mirror share blob `e38bb1ad306a7f18d0a88c26983636185191fcf9`, schema 6 and `last_updated=2026-07-17T20:42:00+02:00`; public alias still serves the older schema-1 snapshot; Netlify current production deploy remains `6a59bc16f349e3e190a47208`, which predates the 20:42 snapshot; PR #43 and companion ai-projects-brain PR #134 merged the receipt-aware watchdog | Let the GitHub-native watchdog dispatch the sole canonical publisher, then require matching public timestamp, UI hooks and immutable receipt before LIVE. |
| P1 | codex-links | Prompt Router and independent Code Copilot reviewer | PR #163 is an accessible open draft on `codex/prompt-router-verifier` at `85b2156b6d3282010a6943fbfe35f1683086606c`; branch is 34 commits ahead / 77 behind current `main`; no GitHub Actions run exists for the current head; production and live Codex/Claude smokes remain unproven | Preserve as source material and salvage onto fresh `main`; do not merge or rebase the 34-commit branch wholesale. |
| P1 | ezohata | secure Google OAuth owner cabinet | PR #41 is an accessible open draft on `codex/google-oauth-owner` at `f01f7ce3ee345821d4d5385a897fa1f7497757a4`; branch is 2 commits ahead / 0 behind; GitHub Verify and Vercel preview are green | Keep `PROVIDER_BLOCKED` until production Supabase Google provider activation and a real owner/non-owner live auth matrix are proven. |
| P1 | finance | Monobank warning and refresh-all stale drafts | PR #530 closed without merge as stale source requiring fresh-main salvage; PR #531 closed without merge as `SUPERSEDED_BY_MAIN` | No merge/rebase. Reopen only through a fresh branch if the narrow Monobank warning remains a current priority. |

### Automatic resolutions

- Added an evidence-backed `FRESH_MAIN_SALVAGE_REQUIRED` reconciliation to `codex-links#163`, including exact remote branch, head SHA, divergence and missing live checks.
- Added an evidence-backed `PROVIDER_BLOCKED` reconciliation to `ezohata#41`, preserving the green code/preview evidence while withholding merge and production-complete claims.
- Reconciled Finance PR #530/#531 closures and removed the superseded refresh-all chain from the active queue.
- Confirmed that every active remote branch identified in this run already has an accessible GitHub PR; no PR auto-creation gap was proven.

### Remaining blockers

- Dashboard exact snapshot is not publicly current; the watchdog/publisher recovery chain must complete and produce a matching immutable receipt.
- `codex-links#163` requires fresh-main salvage and current CI/live bridge evidence.
- `ezohata#41` requires genuine owner/provider action before merge.

### Evidence rule

Use the ladder `request -> task/session -> local change -> remote branch -> accessible PR -> checks -> merge -> deploy -> public/live proof`. A matching repository blob, green preview or READY old deploy is not LIVE proof for a newer snapshot.