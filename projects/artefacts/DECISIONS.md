# DECISIONS — artefacts

> Architecture decisions and guardrails for Artefacts.

## Canonical project

- Repo: `andylitvinov-design/artefacts`.
- Live URL and hosting are `needs verification`.

## Boundary

- Treat as a separate artefact marketplace/site project.
- Do not import assumptions from finance, codex-links, or reiki-yggdrasil without checking this repo.

## Verification first

Before implementation:

- verify repo-local instructions;
- verify framework/build system;
- verify hosting and live URL;
- verify whether payments, forms, or product data are in scope.

## Content/product safety

- Do not add private client data.
- Do not add payment/provider secrets.
- Do not claim checkout/payment/contact flows work without live verification.

## Main formula

**Artefacts must be treated as its own product boundary. Verify repo, hosting, and data/payment assumptions before applying patterns from other projects.**
