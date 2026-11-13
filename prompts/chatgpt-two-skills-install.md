# ChatGPT Skills — фактическая активация

Two canonical workflows:
- https://github.com/andylitvinov-design/ai-projects-brain/blob/main/agent-skills/finish-to-live.md
- https://github.com/andylitvinov-design/ai-projects-brain/blob/main/agent-skills/check-design.md

## Multi-cycle execution from ChatGPT
Use ChatGPT **Work** when a long cloud task must continue after the user leaves. In Work, send "/live <PR or task>" to perform several causal repair -> exact-HEAD CI -> protected merge -> LIVE verification cycles. Work may pause for sign-in, approvals or tool restrictions. For "/design <page and approved reference>" use real browser screenshot comparisons, fix and recapture, then Finish to LIVE and recapture production. See prompts/chatgpt-work-two-skills.md.

Ordinary Chat can use connected tools in its current turn; writing a GitHub file, a Custom Instruction or a plain-text slash alias does not schedule continuation. The Holistic House existing :10/:40/:30/:00 PR automation should be reused only for eligible registered root tasks, with no second source writer.

## One-time ChatGPT entrypoints
- Account: Settings > Personalization > Custom Instructions; on mobile Settings > Customize ChatGPT. Paste prompts/chatgpt-global-two-skills.md (provided separately as a ready text file).
- Project: Project settings > Instructions, paste prompts/chatgpt-project-two-skills.md.
- Native Skills: Plugins > Skills > Create > Upload from computer, if available. Official OpenAI documentation as of Nov 2026 limits ChatGPT native Skills to eligible Business, Enterprise, Healthcare and Edu workspaces; do not assume a personal plan can install. A user must finish any required installation/permissions in the UI.

The user may write /live, /design, /skill live, /skill design, or natural Russian phrases. These are text aliases interpreted by instructions until a native Skill is actually installed. /skill alone means help.

Current ChatGPT connector tools do NOT expose account Custom Instructions, Project Instructions or native Skill installation. The repository cannot silently change them. Never promise global installation without checking the account.

Official docs: https://help.openai.com/en/articles/20001066-skills-in-chatgpt/ ; https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt ; https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
