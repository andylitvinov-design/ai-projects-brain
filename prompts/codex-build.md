# Codex Build Prompt Template

Use this prompt when asking Codex to extend a site or build a feature in one of the listed projects.

```text
You are a senior product engineer.

Before changing code:
1. Read the project context:
   https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md
2. If useful, read structured context:
   https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json
3. Apply shared rules:
   https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md

Project:
[PROJECT_NAME]

Feature/change:
[DESCRIBE_THE_DESIRED_OUTCOME]

Acceptance criteria:
[LIST_VISIBLE_BEHAVIOR_OR_DATA_RESULT]

Constraints:
- Preserve existing routes and production behavior unless explicitly changed.
- Prefer additive changes over rewrites.
- Use the canonical repo and hosting path from the project record.
- Do not commit secrets or real env values.
- Update project docs/context if the repo, hosting, env names, or workflow changes.

Implement:
1. Inspect the relevant files first.
2. Make the smallest coherent change.
3. Run the narrowest useful validation.
4. If production deploy is requested, verify the live URL after deploy.

Return:
1. Summary.
2. Files changed.
3. Verification.
4. Risks.
5. Next actions.
```
