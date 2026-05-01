# Risks - Agent-Auditor

## Critical Risks

- Do not bypass Google OAuth.
- Do not request or store secrets.
- Do not mutate data during audit.

## Audit Accuracy Risks

- Do not rely only on visual screenshots.
- Do not claim live provider sync if only code path exists.
- Do not confuse production finance repo with old/deprecated repo.
- Do not treat missing endpoint access as proof that data is correct.

## Handling Rules

- Use project memory and safe snapshots first.
- Ask for sanitized user-provided snapshots when endpoint access is
  unavailable.
- Keep unknowns as needs verification.
- Separate confirmed evidence from root-cause hypotheses.
