# DECISIONS — report

> Architecture decisions and guardrails for report template reference work.

## Project nature

- This repo is a design reference and implementation brief for a dynamic report page template.
- It is not confirmed as a production app.

## Source of truth

Use README-listed files as source of truth:

- design brief;
- sample data schema;
- base64 visual reference;
- restore script;
- Codex prompt.

## Visual fidelity

- Preserve A4 report layout intent.
- Use the restored visual reference when visual precision matters.
- Do not change sample schema without noting downstream impact.

## Boundaries

- Do not store private client data.
- Do not infer deployment or root build commands.
- Relationship with `dao-usin-bach-report-kit` must be verified before cross-repo changes.
- Expected private cabinet/login auth boundary is not `BLOCKED`; use `STATUS: SUCCESS_WITH_AUTH_LIMITATION` with safe public/login/protected-redirect/local/code proof.

## Main formula

**Treat `report` as a reference/brief repo unless a deployment target is explicitly verified.**
