# /audit-ui reference mode

This file extends `systems/audit-ui.md` whenever one or more visual references are supplied.

It reuses the Visual Reference Engine defined in `systems/copy-ui.md`; do not create a second screenshot-comparison workflow.

## Trigger

Activate this mode when `/audit-ui` receives any of:

- reference screenshot;
- before/after screenshot;
- screen recording;
- target mockup/export;
- current page plus a separate visual reference.

If there is no reference, normal `/audit-ui` behavior is unchanged.

## Audit-only behavior

When `/audit-ui` is running in audit-only mode:

1. Record the reference viewport or closest safe inference.
2. Render the current target route/component at that viewport when browser tooling exists.
3. Capture the current implementation screenshot.
4. Compare it against the supplied reference using the Visual Reference Engine from `systems/copy-ui.md`.
5. Report mismatches by impact:
   - macro layout/geometry;
   - size/proportion;
   - spacing;
   - typography/wrapping;
   - image crop/position;
   - color/material;
   - borders/radii/shadows;
   - alignment;
   - interactive/motion states when evidenced.
6. Do not edit code.

A screenshot-only comparison cannot prove runtime behavior, persistence, auth, backend state, or unshown interactions. Mark those claims `NOT_TESTED`.

## Fix / polish behavior

When `/audit-ui` is running in Minimal fix, Polish pass, or Hardening pass:

1. Run the same comparison bundle.
2. Fix only significant mismatches that fit the normal `/audit-ui` minimal-safe-fix boundary.
3. Re-render and capture a new screenshot after fixes.
4. Compare again before completion.
5. Report remaining differences explicitly.

Do not claim parity from code inspection alone.

## Escalation to /copy-ui

Route the work to `/copy-ui` when one or more of these is true:

- the target screen does not yet exist;
- parity requires reconstructing substantial page structure;
- several major sections must be replaced rather than minimally corrected;
- a screen recording is the primary specification for building interactions;
- the user explicitly asks to reproduce/copy/clone the supplied reference.

`/audit-ui` must not silently expand a narrow UI audit into a large rebuild.

## Verification output

Add this evidence to the normal `/audit-ui` final report when reference mode is active:

```txt
Reference comparison:
- reference type:
- reference viewport:
- rendered viewport:
- screenshot captured: yes/no
- major mismatches before fix:
- major mismatches corrected:
- remaining differences:
- interaction/motion parity: verified / not supplied / not tested
- escalation to /copy-ui required: yes/no
```

If browser screenshot capture cannot run, state why and use `PARTIAL` for any claim that depends on visual parity verification.
