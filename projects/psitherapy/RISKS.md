# Risks - psitherapy

## Critical Risks

- Editing the wrong repository.
- Claiming implementation without confirmed source/deploy mapping.
- Making unsafe medical, psychotherapy, or homeopathy claims.
- Confusing Psitherapy with Psihotavr, Reiki Yggdrasil, or other therapy-related
  projects.

## Data Risks

- Client/health/contact data may be sensitive if forms exist.
- Forms, storage, CMS, or provider integrations are not confirmed.
- Do not store private user data or env values.

## Deploy Risks

- Vercel project is known, but source branch/commit is not confirmed.
- Live UX can be audited, but code/deploy fixes are blocked until repo mapping is
  verified.

## Security Risks

- Env names and values are unknown.
- Do not expose private form submissions, emails, tokens, or account details.

## Agent/Codex Risks

- Starting code changes before repo mapping is proven.
- Treating live-site observations as source-code proof.
- Overstating health outcomes in copy recommendations.

## Do Not Do

- Do not edit product code until canonical repo is confirmed.
- Do not make medical guarantees.
- Do not store secrets, env values, or private client data.
