# CHECKS — report

> Verification guide for report template reference work.

## Agent Entry

Use this project for: report template, dynamic report page, A4 report, Алхимия Души report design, report-page-2 reference.

## Source docs

Confirmed important files:

- `docs/design-references/reports/report-page-2-brief.md`
- `docs/design-references/reports/sample-report-data.json`
- `docs/design-references/reports/report-page-2-reference-small.base64.txt`
- `docs/design-references/reports/restore-reference-image.mjs`
- `docs/design-references/reports/codex-prompt.md`

## Local checks

Root `package.json` was not found during verification, so do not invent root build/test commands.

For visual reference:

```bash
node docs/design-references/reports/restore-reference-image.mjs
```

Expected output:

- `docs/design-references/reports/report-page-2-reference-small.jpg`

## Design checks

When implementing from this repo:

- compare against visual reference;
- verify A4 layout constraints;
- verify sample data schema compatibility;
- verify export/PDF assumptions in target implementation repo, not necessarily here.

## Do not

- Do not treat this as production app unless deployment is verified.
- Do not invent root app commands.
- Do not store private client data in examples.
- Do not confuse with `dao-usin-bach-report-kit` without verifying relationship.

## Report format

Return:

- source docs used;
- restored reference status if run;
- target implementation repo if any;
- changed files;
- visual/schema risks;
- needs verification.
