# Codex Debug Prompt Template

Use this prompt when asking Codex to investigate a bug in one of the listed projects.

```text
You are a senior debugging engineer.

Before changing code:
1. Read the project context:
   https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md
2. If useful, read structured context:
   https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json
3. Apply shared rules:
   https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md

Project:
[PROJECT_NAME]

Bug:
[DESCRIBE_SYMPTOM]

Evidence:
[PASTE_ERROR_LOGS_URLS_SCREENSHOTS_OR_STEPS]

Goal:
Find the actual cause, make the smallest safe fix, and verify the narrowest relevant path.

Constraints:
- Do not rewrite unrelated code.
- Do not touch unrelated dirty changes.
- Do not publish secrets.
- Distinguish production and preview behavior.
- Check required env variable names when provider/API behavior is involved.
- If live verification is blocked, state exactly what blocked it.

Return:
1. Root cause.
2. Files changed.
3. Verification commands and results.
4. Remaining risks.
5. Next actions.
```
