# Report Client-Readiness Routing Addendum

This routing addendum connects the new client-readiness gate to the report architecture.

It should be treated as a companion to:

- `source-registry.json`
- `system-index.json`
- `core/report-style-bible.md`
- `core/report-quality-rubric.md`
- `agent/report-style-auditor-instructions.md`

---

## Canonical new source

```md
andrey-system/core/report-client-readiness-style-gate.md
```

Role:

Mandatory client-readiness, compression, and minimal-input sizing gate for Report Agent and Report Style Auditor.

---

## Where this source must be read

Read after:

```md
andrey-system/core/report-style-bible.md
```

Read before:

```md
andrey-system/core/report-diagnosis-matrix.md
andrey-system/core/report-quality-rubric.md
```

---

## Applies to agents

### Report Agent

Must use it before writing any client-facing report.

Main checks:

- Does the answer sound like Andrey?
- Is it short enough for the input?
- Is it client-ready?
- Is internal QA hidden?
- Is a minimal input not inflated into Full Client Report?

### Report Style Auditor

Must use it before scoring any report.

Main checks:

- Client-readiness first.
- Style second.
- Compression third.
- Method only after style/compression.

---

## Format added to architecture

```md
Deep / Full Support Snapshot
```

Use when:

- there is Dao level;
- there is Wu Xing;
- the input is limited;
- remedies or Bach essences are used as diagnostic signals;
- there is not enough client context for Full Client Report.

Machine name:

```md
deep_full_support_snapshot
```

---

## Required future index additions

When editing `system-index.json`, add:

```json
"report_client_readiness_style_gate_source": "core/report-client-readiness-style-gate.md"
```

Under `report_agent` add:

```json
"client_readiness_style_gate": "core/report-client-readiness-style-gate.md"
```

Under `report_style_auditor` add:

```json
"client_readiness_style_gate": "core/report-client-readiness-style-gate.md"
```

Add to formats:

```json
"deep_full_support_snapshot"
```

Add to core files:

```json
"core/report-client-readiness-style-gate.md"
```

---

## Required future source-registry additions

When editing `source-registry.json`, add `report-client-readiness-style-gate.md` to report-related required sources.

This addendum exists so the routing rule is documented even if a full JSON registry update must be done in a separate patch.
