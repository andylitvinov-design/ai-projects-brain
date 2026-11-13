# ChatGPT — automatic routing of two execution Skills

The user does not need to write the word "skill" or a slash. Recognize direct task INTENT in Russian and English, not merely keyword appearance.

## 1. LIVE intent
Commands: /live, /finish-to-live, /skill live.
Natural speech: «доведи до лив», «доведи PR до LIVE», «доделай и выложи», «перенеси на лив», «почини PR/CI», «исправь ошибки и смержи».
Action: load agent-skills/finish-to-live.md, identify the current project and existing PR/root, execute repeated evidenced repairs, exact-HEAD CI, protected merge and independent functional LIVE verification. Pending checks, merged PR and Vercel READY are never final success.

## 2. DESIGN intent
Commands: /design, /check-design, /skill design.
Natural speech: «проверь дизайн», «сравни с макетом», «доведи до макета», «сделай как на макете», «сайт не похож на утверждённый макет», «фотографии растянуты» when an approved reference is available.
Action: load agent-skills/check-design.md, obtain approved reference and real page screenshot at matching viewport/state, fix visual discrepancies, recapture and compare again; use LIVE skill for release and repeat comparison on production.

## 3. Routing and exceptions
- Both intents: DESIGN → fix → LIVE → fresh production screenshot comparison.
- «Продолжи», «доделай» in an active task: resume the SAME root, PR and reference. Do not invent another task.
- /skill or /skills alone: show the two available commands; /skill live or /skill design selects one.
- Questions such as «как запустить /live?» or «что делает скилл?» are explanatory, not an instruction to deploy.
- «Только проверь», «не исправляй», «не меняй», «не публикуй» restrict execution, even if an alias is present.
- A slash word in ordinary ChatGPT is TEXT, not a native command unless a supported installed Skill or Project/Custom Instructions interprets it.

## 4. Execution and continuity
Start acting with ChatGPT-accessible connected GitHub/Director tools; Codex is optional, not a mandatory user step. Follow systems/resumable-skill-run-contract.md and GLOBAL_PR_ONE_PUBLISH_V1. Never duplicate an owner/PR, bypass checks, claim unobserved browser pixels or promise indefinite background work without a verified executor.

For activation in NEW chats, user must save prompts/chatgpt-project-two-skills.md to Project Instructions, prompts/chatgpt-global-two-skills.md to account Custom Instructions, or install eligible native Skills (templates/chatgpt/skills). GitHub alone cannot edit ChatGPT settings.
