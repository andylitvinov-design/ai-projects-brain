# OKF-Compatible Knowledge Layer

`knowledge/` is a minimal OKF-compatible pilot for compact agent navigation.
It gives agents a first-hop map of project and system concepts before they
open the full brain.

Canonical source of truth remains:

- `projects.md`
- `projects.json`
- `projects/<slug>/PROJECT.md`
- `systems/*.md`

Agents may read `knowledge/index.md` for quick orientation, then must verify
the canonical files before making project, workflow, deploy, or production
decisions.

## Rules

- Keep `knowledge/` short and link-heavy.
- Use concept files for navigation, not full project records.
- Do not migrate all project memory into `knowledge/`.
- Do not duplicate `projects.md`, `projects.json`, project passports, or
  system docs.
- Do not add external OKF tooling, Google Cloud integration, or dependencies
  without explicit approval.
- Treat broken or uncertain concept links as `needs verification`.
- Treat `index.md` and `log.md` as reserved navigation/change-log files, not
  concept records.

OKF compatibility here means Markdown files, frontmatter with a non-empty
`type` for concept files, and normal Markdown links as relationships.
