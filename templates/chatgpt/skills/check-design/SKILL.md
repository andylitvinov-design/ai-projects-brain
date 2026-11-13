---
name: check-design
description: "Use for /design, /skill design, проверь дизайн, сравни с макетом, доведи до макета, сделай как на макете, or actual visible differences against approved screenshot."
---
# Check Design (ChatGPT-first, Work-capable)

Outcome = real production UI compared with the latest APPROVED mockup at the same viewport/state after iterative source fixes. A text review or matching preview alone is not completion. Use Work cloud browser when available for real screenshots; ordinary Chat must not invent browser evidence.

1. Recover approved reference from authorized current/prior task and target live route, exact viewport CSS dimensions, DPR, locale, session/theme/state, current repo/component, existing PR and source lease. Do not substitute a new mockup. Canonical spec: https://github.com/andylitvinov-design/ai-projects-brain/blob/main/agent-skills/check-design.md
2. Render actual UI in a real browser, capture BEFORE screenshot, stabilize fonts/images/animations, inspect console and network. Compare against SAME reference: P0 hidden/missing controls; P1 geometry/crop/hierarchy; P2 font/spacing/color; P3 optical details. No invented visual score.
3. Fix targeted markup/CSS/assets without hiding functionality or modifying unrelated product semantics. Rebuild, capture fresh AFTER, compare again, repeat as actual mismatch evidence requires.
4. For Holistic House check reference viewport plus 320/390/430 px and Safari/WebKit when the affected voice/video component needs it; distinguish browser simulation from real Safari.
5. Invoke Finish to LIVE using SAME root/PR, respect one-publish/CI/protection, then recapture actual production and compare again. Preview match is not LIVE parity.
6. Checkpoint reference_id and private location, screenshots, discrepancy ledger, PR/HEAD, owner/lease, next event. In Work multi-session execution requires an accepted task; without browser/reference or continuation report WAIT_BROWSER/BLOCKED/NO_CONTINUATION.
7. VISUAL_LIVE_VERIFIED only with real LIVE screenshot comparison, no unresolved P0/P1 and documented remaining small differences, production SHA/URL, and verified primary interactions. Do not promise physically identical pixels on different devices.

Questions about /design are explanatory. Respect audit-only/no-change/no-publish requests.
