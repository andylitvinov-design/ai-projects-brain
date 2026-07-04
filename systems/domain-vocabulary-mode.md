# Domain Vocabulary Mode

Last updated: 2026-07-04

Purpose: prevent agents from damaging project meaning by using generic labels when a project already has precise domain terms.

## Rule

Before changing copy, taxonomy, categories, service names, ledger terminology, ritual/archetype wording, finance fields, or admin labels, read the project source of truth and reuse its vocabulary.

## Read first

- `projects/<slug>/PROJECT.md`
- `projects/<slug>/SYSTEM_MAP.md`
- `projects/<slug>/DATA_SCHEMA.md`
- `projects/<slug>/CODEX_BRIEF.md`
- relevant repo files, routes, seed data, or issue body

## Applies especially to

- Finance / ezohata ledger account, provider, balance, and reconciliation terms;
- Psihotavr catalog, mandalas, Big Arcana, Sefirot, services, cabinet, admin flows;
- Reiki Yggdrasil DAO/talisman/profile/admin terms;
- Psitherapy/homeopathy wording where medical-safety framing matters;
- prompt modes such as `/improve`, `/upgrade`, `/save`, `/memory`, and `/handoff`.

## Failure condition

If the agent cannot identify the project's canonical term, it must mark the wording `needs verification` and avoid bulk renames or taxonomy changes.
