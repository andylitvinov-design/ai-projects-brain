# Skill: Проверь дизайн (Check Design / Visual Parity)
Aliases: проверь дизайн; доведи до макета; сделай как на макете; /check-design.
Scope: ChatGPT-first, Codex-compatible; implementation-first visual audit + copy-ui + Finish to LIVE.
Related: systems/copy-ui.md; systems/audit-ui.md; systems/playwright-verification-mode.md; systems/resumable-skill-run-contract.md.

## Goal
Compare a REAL page with the user's APPROVED mockup and iterate real corrections until published LIVE meets the same design at a comparable viewport/state. By default "проверь дизайн" means compare AND fix, not only offer critique. Do not redesign the approved mockup.

## Inputs and source-of-truth
Resolve reference image/Figma/recording from current chat or authenticated Director task; target URL/route; screen width/height, DPR, browser, theme, locale, session/auth, UI state. Preserve approved baseline and reference_id between sessions. Never put private images/user data in public GitHub. If no accessible approved reference exists, request precisely that missing reference; no invented target.
A screenshot proves visuals, not that clicking/saving/auth works.

## Real visual iteration
1. Read project capsule, current repo/route/component, shared styles, assets and current overlapping PR/lease. Inspect existing systems/copy-ui.md.
2. Open current page in a REAL browser (prefer the same browser/viewport), capture BEFORE screenshot. If browser access is missing, label visual comparison NOT_TESTED; route to an actually connected Work/browser executor rather than guessing from code.
3. Normalize viewport, fonts, screenshot timing, animation/dynamic masks. Compare the exact approved reference to actual screenshot. Record discrepancy ledger by section, P0 missing/hide/overlap, P1 major geometry/photo crop, P2 text/spacing/color, P3 optical detail. State measured evidence; don't invent an image score.
4. Fix the smallest causal CSS/markup/assets in current project, not a new demo. Preserve existing responsive behavior and required interactions.
5. Run available focused source checks, browser console/network and relevant interactions. Take FRESH AFTER screenshot and compare against the same baseline. If mismatch remains: correct -> render -> recapture -> compare again.
6. For Holistic House verify reference viewport and 320/390/430 CSS px, plus iPhone Safari/WebKit when voice/video/overflow affected; test locale variants and persisted UI state when relevant.
7. Once preview matches, invoke Skill Finish to LIVE for PR/CI/merge/production, then independently capture LIVE_RECAPTURE screenshot at the target production alias and compare again to baseline. If live mismatches preview, repeat under the same root.

## Completion gate
VISUAL_LIVE_VERIFIED only when the production screenshot is compared with approved reference at matched conditions, no unresolved P0/P1 differences, remaining visible deviations documented or accepted, primary interactions work and production SHA/URL is confirmed. "Exact pixels" across different platforms/fonts are not a guarantee; use comparable screenshots and explicitly state tolerance/limitations. A matching preview alone is not done.

## Multiple sessions
Maintain reference_id, private reference location, viewport/state, BEFORE/AFTER/LIVE screenshot refs, discrepancy ledger, current PR/head, last iteration, owner lease, next trigger. Use systems/resumable-skill-run-contract.md. Continue screenshot -> patch -> compare loops across genuine sessions via the existing Director runner or accepted task-specific ChatGPT automation. Never promise invisible background work without a real runner. No arbitrary total iteration cutoff; each further patch requires a verified mismatch, not churn.
Missing licensed asset, inaccessible reference, protected auth, unavailable browser or unsafe changes are explicit WAIT_EXTERNAL/BLOCKED or NO_CONTINUATION, not visual success.

## Report
Reference+viewport, LIVE route and browser/state, screenshot evidence BEFORE/AFTER/LIVE, P0-P3 ledger and remaining mismatches, PR/head/CI/merge/deploy, tests/interactions, owner+next cycle. Status: IN_PROGRESS, WAIT_BROWSER, WAIT_CI, WAIT_DEPLOY, WAIT_EXTERNAL, BLOCKED, NO_CONTINUATION, VISUAL_LIVE_VERIFIED.
