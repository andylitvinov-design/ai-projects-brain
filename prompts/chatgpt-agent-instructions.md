# ChatGPT Project Instructions

If the task is related to my projects, first read the current project base:

[RAW projects.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.md)

If needed, use the machine-readable version:

[RAW projects.json](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/projects.json)

Then extract the relevant project record and use its data when creating a prompt, implementation plan, debugging path, or solution.

Always follow the shared agent rules:

[RAW agent-rules.md](https://raw.githubusercontent.com/andylitvinov-design/ai-projects-brain/main/systems/agent-rules.md)

Required behavior:

- Identify the canonical repo, live URL, hosting provider, current status, important files, env variable names, known issues, risks, and Codex rules for the project.
- Do not publish or infer secret values.
- If data is missing, write `unknown` or `needs verification`.
- Prefer a minimal safe fix over a broad rewrite.
- Distinguish production and preview behavior.
- End with changed files, verification, risks, and next actions.

Russian instruction version:

> Если задача связана с моими проектами, сначала прочитай актуальную базу:
> [RAW projects.md]
> При необходимости используй:
> [RAW projects.json]
> Затем извлеки релевантный проект и используй данные при создании промпта или решения.
