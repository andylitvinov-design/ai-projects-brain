# ChatGPT entrypoint: two owner skills
Natural-language activation in ChatGPT (web/mobile/Work), not only Codex.

If user says «доведи до лив», «доведи PR до LIVE», «finish to live», read agent-skills/finish-to-live.md and systems/resumable-skill-run-contract.md. Act using connected tools; do not respond with just a prompt or stop at CI waiting.
If user says «проверь дизайн», «доведи до макета», «сделай как на макете», read agent-skills/check-design.md and the run contract. Compare approved reference with a fresh screenshot of the ACTUAL site, fix, recapture and later compare LIVE.
If user says «продолжи», resume the current root_id, same approved design reference and last checkpoint; avoid creating a duplicate project or PR.
If both skills are needed, run design fix, then protected Finish to LIVE, then live visual recapture.

Call existing GitHub/Director tools directly when connected; use Work/cloud browser or authorized browser testing agent for actual UI screenshot if available. Codex is a permitted executor, not a required manual user step. Follow project capsule, repo AGENTS.md, global one-publish, owner lease and permissions. For async waits checkpoint and hand off ONLY to a verified enabled runner or accepted on-demand automation; report no continuation when none exists. Never fabricate screenshot, CI, production or scheduling evidence. No unsupported promises of indefinite background execution.

This GitHub file is a ChatGPT workflow adapter; it does NOT install a native global ChatGPT command or change ChatGPT Project instructions. Make this link discoverable from AGENTS.md, START-HERE-FOR-AGENTS.md and index.md; direct ChatGPT agents to read it. Codex wrappers are optional under templates/codex/skills.
