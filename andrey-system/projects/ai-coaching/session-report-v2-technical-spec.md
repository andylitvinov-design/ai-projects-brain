# AI Coaching Session Report v2 — Technical Specification

**Repository:** andylitvinov-design/books  
**Concept:** andylitvinov-design/ai-projects-brain → andrey-system/projects/ai-coaching/session-report-v2-concept.md  
**Version:** 2.0 · **Date:** 2026-11-09

## 0. Mission

Implement a secure, structured, client-confirmable report from an existing 20-minute coaching session and connect accepted actions to the existing My Coaching Plan. The deterministic recap must remain available if optional AI analysis fails.

The mandatory closeout output is: short outcome, main difficulty, desired result, decisions, three concrete action candidates, continuation recommendations, Personal Coaching Report and an option to add confirmed results to My Coaching Plan.

## 1. Verified baseline and constraints

Open PR #3980, titled “feat(coaching): add first 20-minute overload-to-plan GROW session”, changes:
- lib/personal-coaching/guided-session.js
- lib/personal-coaching/offline-intelligence.js
- supabase/migrations/20261108140500_hh_coaching_overload_session_v1.sql
- tests/coaching-overload-session.test.mjs
- package.json

It adds a localized GROW scheme, catalog questions and deterministic authored follow-ups. The PR description explicitly limits the feature to a structured self-coaching pilot, not a generative live AI coach; it adds no client-answer table, LLM/provider call or new storage. It was open when this spec was prepared. Verify the latest branch, PR status and current default branch before implementation.

### Hard constraints

1. Audit PR #3980 and current code before editing. Base changes on the actual up-to-date implementation.
2. Reuse existing authentication, consent, coaching catalog, session runner, private data access, storage, Client Cabinet and My Coaching Plan.
3. Inspect the current My Coaching Plan implementation and domain model before choosing persistence. Do not invent a second plan store.
4. Do not create a second client profile, session runner, report vault, authentication route or duplicate task manager.
5. Do not persist raw transcript by default. Use saved structured answers, client-approved recap and approved structured notes. If consented transcript storage already exists, access it through its authorized path without duplicating it.
6. Use the existing approved model gateway, if present. If none exists or it is not approved for this feature, ship deterministic reporting first; do not introduce a paid provider.
7. Keep RU/EN complete and preserve ES where supported.
8. Migrations are additive, idempotent, RLS-reviewed and deployed only through the existing production procedure.
9. No production migration/deployment is included in this specification task.

## 2. End-to-end journey

### Before the session
- Resolve the signed-in client through existing auth context; never trust a clientId from the browser.
- Load only the minimum My Coaching Plan context that the client permitted future sessions to use.
- Resolve coach persona, persona version, specialty, session scheme and scheme version.
- Capture any baseline self-ratings with exact measure key, question wording, range, value and timestamp. Null/skip is preserved.
- Explain report storage and obtain the existing consent. Report storage, transcript analysis, prior-session context and external sharing are separate consent scopes.

### During the session
- Existing session runner is the source of truth for question order and saved answers.
- Capture candidate insights/actions with source turn or answer references.
- Do not interrupt a live conversation with report UI.
- Session duration is an orientation, not a hard forced cutoff.
- Skipped questions remain skipped. The model must not fill them.

### Closing phase
1. Coach gives a concise spoken recap.
2. Client can correct or confirm it.
3. Confirm main difficulty and desired outcome.
4. Present one key insight; client accepts, edits or marks “not mine”.
5. Separate decisions from unresolved questions.
6. Present up to three action candidates, labeled Start / Build / Review. Client can edit, accept, defer or decline each.
7. If fewer than three actions are accepted, retain fewer. Do not manufacture commitments to fill slots.
8. Show recommendation for continuing work. A recommended session/specialist must include a reason and remain optional.
9. Ask whether accepted results should be added to My Coaching Plan.
10. Preview exact fields to be saved; record confirmation.
11. Save closeout first. Generate the detailed report asynchronously after the canonical closeout is persisted.

### After the session
- Show an immediate result screen from persisted closeout data.
- Full report status is pending/ready/failed; pending and failed states must survive reload.
- If AI/report generation fails, show deterministic recap and confirmed actions.
- Client can correct the report and transfer chosen actions to My Coaching Plan.
- A subsequent session uses prior context only with the relevant consent.

## 3. Canonical report schema

Use a versioned JSON document as the single source for mobile report, PDF and plan transfer. Validate at API and persistence boundaries with the repository's existing validation library (Zod if already used).

~~~ts
type EvidenceKind =
  | 'client_stated'
  | 'client_confirmed'
  | 'coach_observation'
  | 'hypothesis'
  | 'not_established';

type ConfirmState = 'draft' | 'accepted' | 'edited' | 'declined' | 'deferred';

type EvidenceRef = {
  sourceType: 'answer' | 'transcript_turn' | 'client_edit' | 'coach_note';
  sourceId: string;
};

type ReportItem<T> = {
  value: T;
  evidence: EvidenceKind;
  sourceRefs: EvidenceRef[];
  confirmation: ConfirmState;
};

type SelfRating = {
  measureKey: string;
  label: string;
  scaleMin: number;
  scaleMax: number;
  before: null | { value: number; capturedAt: string; source: 'client_self_report' };
  after: null | { value: number; capturedAt: string; source: 'client_self_report' };
  direction: 'higher_is_better' | 'lower_is_better' | 'neutral';
  comparable: boolean;
};

type CoachingAction = {
  id: string;
  title: string;
  description: string;
  role: 'start' | 'build' | 'review';
  dueAt: string | null;
  trigger: string | null;
  minimumDoneDefinition: string | null;
  likelyObstacle: string | null;
  fallback: string | null;
  status: 'proposed' | 'accepted' | 'in_progress' | 'done' | 'blocked' | 'declined';
  confirmation: ConfirmState;
  evidence: EvidenceRef[];
  planItemId?: string | null;
};

type CoachingSessionReportV2 = {
  schemaVersion: '2.0';
  reportId: string;
  sessionId: string;
  locale: 'en' | 'ru' | 'es';
  createdAt: string;
  updatedAt: string;
  coach: { personaId: string; personaVersion: string; specialtyKey: string };
  sessionMeta: { durationSeconds: number | null; schemeKey: string; schemeVersion: string };
  consent: {
    reportStorage: boolean;
    priorContextUse: boolean;
    transcriptAnalysis: boolean;
  };
  request: ReportItem<string> | null;
  desiredOutcome: ReportItem<string> | null;
  keyContext: ReportItem<string>[];
  mainDifficulty: ReportItem<string> | null;
  maintainingPattern: ReportItem<{
    trigger: string;
    internalResponse: string;
    behavior: string;
    consequence: string;
  }> | null;
  hypotheses: ReportItem<string>[];
  keyInsight: ReportItem<string> | null;
  outcomes: {
    cognitive: ReportItem<string> | null;
    emotional: ReportItem<string> | null;
    behavioral: ReportItem<string> | null;
    resource: ReportItem<string> | null;
  };
  ratings: SelfRating[];
  decisions: ReportItem<string>[];
  unresolvedQuestions: ReportItem<string>[];
  actions: CoachingAction[];
  practices: Array<{
    resourceId: string;
    role: 'primary' | 'optional';
    rationale: string;
    confirmation: ConfirmState;
  }>;
  continuation: {
    recommendation: string | null;
    nextSessionFocus: string | null;
    suggestedSchemeKey: string | null;
    rationale: string | null;
  };
  safety: {
    routing: 'none' | 'human_support_recommended' | 'urgent_support';
    clientMessage: string | null;
  };
  clientReview: {
    status: 'pending' | 'confirmed' | 'corrected';
    reviewedAt: string | null;
  };
  provenance: {
    generatorVersion: string;
    promptVersion?: string;
    sourceMode: 'structured_answers' | 'approved_transcript' | 'hybrid';
  };
};
~~~

Schema constraints:
- Use stable semantic keys and localized display strings according to existing repo conventions.
- Client ownership must come from authenticated server context, never browser input.
- Source references are private and must not expose transcript text to the client by default.
- A hypothesis cannot become a decision or accepted action without explicit confirmation.
- Missing fields are null/empty and, where useful, marked “not discussed” or “not measured”.
- Avoid storing unnecessary quotes or duplicate transcript content.
- Keep the actual persisted schema consistent with existing database practices; this type is the target domain contract, not an instruction to add a duplicate table.

## 4. Persistence model and access policy

First inspect the current session storage and My Coaching Plan data model. The catalog tables under app_private introduced by PR #3980 are reference data; do not assume they store a client's completed session or report.

Preferred mapping:
- Reuse an existing private session/result record if compatible.
- Store owner, source session, report schema version, generation status, locale, timestamps, consent scope and canonical JSON.
- If there is no compatible entity, add one minimal private report entity through a reviewed additive migration. Do not duplicate existing data models.
- Store generation states: pending, ready, failed, needs_review.
- Corrections create a revision with actor, timestamp and changed fields. Do not silently mutate historical snapshots.
- Accepted plan actions should use existing My Coaching Plan entities. Only if no compatible entity exists, add the smallest private relation with owner, goal/area, report ID, session ID, action fields, status, confirmation, provenance and timestamps.

Idempotency/indexes:
- Unique report version by report ID + version.
- Unique plan import by accepted action ID + destination plan.
- Index client/report by owner + created time; plan actions by owner + area + status.
- Follow existing FK and client deletion/export semantics.

RLS:
- A client can read only their own reports.
- A client can update only permitted review, edits and confirmation fields.
- Server creates report only after verifying session ownership and consent.
- Coach persona is not a human staff identity and must not receive blanket client-table access.
- No public read policy.
- Test same-client access and cross-client rejection for every operation.
- Use existing secure service conventions; avoid new SECURITY DEFINER functions unless justified and reviewed.

## 5. Report generation pipeline

Build a staged orchestrator, not one giant LLM prompt.

### Stage A — Normalize
Inputs: session scheme/version, ordered Q&A, client-approved recap edits, ratings, persona/version, locale and consent flags. Normalize answer values, retain explicit skips and preserve stage order.

### Stage B — Evidence ledger
Create evidence items for client statements, explicit confirmations, observations, hypotheses and unresolved/not-asked topics. Every report fact must point to one or more source refs. No source ref means it cannot appear as a fact.

### Stage C — Choose profile
Select a report profile using session specialty and available evidence: stress/recovery, energy/burnout, anxiety, low mood, confidence, relationships, goals/motivation, work/business or generic GROW. The profile chooses emphasis and localized wording, not a different report schema.

### Stage D — Draft report
Prefer the client's language for request, goal, insight and decision. AI may compress/paraphrase and propose candidate mechanisms only when the approved existing model gateway is available and consented. Require evidence refs. Separate facts and hypotheses. Do not infer trauma, medical diagnosis, identity or hidden motives.

### Stage E — Propose actions
Generate no more than three action candidates:
- Start: smallest meaningful action.
- Build: repeat, prepare, communicate or remove one barrier.
- Review: observe/check/report back.

Each action needs a specific behavior, evidence reference, timing or trigger if known, and a minimum done definition. Ask the client if timing is unknown, or leave it null. Distinguish accepted commitment, edited commitment, optional idea, deferred and declined. A priority, date, resource, aspiration or rating is never an action by inference.

### Stage F — Validate
Validate schema, evidence coverage, consistency, comparability of ratings, action specificity, absence of unsupported claims, safety routing, localization and readability. Omit invalid fields or send them to client review; never fill gaps with guesses.

### Stage G — Client review
Show the recap and proposed actions. Record field-level client edits and acceptance. Freeze a report snapshot after review. Later corrections create a new revision with audit metadata.

### Stage H — Publish and connect
Save the canonical report, render the mobile page and optionally produce a PDF from that same JSON. Create plan items only for accepted actions following explicit client choice. Preserve source report/session links and idempotency.

## 6. Model gateway and prompting contract

Logical interfaces (adapt to actual existing service names):
- analyzeSessionForReport(input) → EvidenceLedger
- draftReport(ledger, profile, locale) → CoachingSessionReportDraft
- validateReport(draft, ledger) → ValidationResult
- reviseReport(draft, clientEdits) → CoachingSessionReportV2

Requirements:
- Use the existing approved provider/model gateway; no direct vendor SDK inside feature components.
- Strict structured JSON matching the schema.
- Each claim must cite source IDs; reject unsupported claims.
- Low-variance generation, bounded input and token budget.
- Record model ID and prompt version, never credentials.
- Treat transcript/answers as untrusted content, not system instructions.
- Timeout policy and at most one bounded retry; no retry loops or unexpected spend.
- No model call without consent and provider approval.
- Minimize payload: structured answers and selected excerpts preferred over the full transcript.
- Redact credentials, third-party personal data and unrelated sensitive content where possible.
- Private session data must not be used for model training absent separate explicit consent and product approval.

Deterministic fallback:
- Build an honest short report from explicit saved answers and client-confirmed edits.
- Omit mechanism analysis and unverified interpretation.
- Mark absent information not discussed/not measured.
- Keep only actions the client explicitly chose.
- Provider outage must never lose or block the saved session.

## 7. UX requirements

### 7.1 Immediate closeout screen
Mobile-first, one column:
- header: “Your session result”, date and duration;
- outcome summary (2–3 sentences);
- main difficulty;
- desired outcome;
- key insight with confirm/edit/not mine;
- decisions and unresolved questions;
- up to three action cards, each edit/accept/defer/decline;
- continuation recommendation and why;
- primary CTA: “Add accepted actions to My Coaching Plan”;
- secondary CTA: “Open full Coaching Report”.

Keep the main result and actions visible; use collapsible details for longer explanations. Do not present an overly long wall of text.

### 7.2 Full report
- Title, date, session direction, coach persona and objective.
- Outcome and next action above the fold.
- Separate headings: “What you said”, “What we explored”, “What remains a possibility”.
- Before/after values only when comparable; charts require equivalent text labels.
- Actions show status, timing/trigger, fallback and plan link.
- Visible client confirmation and revision status.
- Responsive font size and spacing for iPhone Safari.

### 7.3 My Coaching Plan
- Preserve existing life-area structure and report catalog in the existing section.
- Each imported action includes source report/session provenance.
- Unassigned actions wait for the client to choose a life area.
- New reports propose an update; they do not overwrite an existing goal.
- Recommendations for another specialist/session type are optional and explain the reason.
- Report history remains available next to plan, not in a second cabinet.

### 7.4 PDF
- On-demand rendering from canonical JSON; never regenerate report text separately.
- Same information as web report.
- Include locale, date, session type and report revision.
- Exclude internal prompts, reasoning trace and QA notes.
- PDF generation failure must not block report availability.

## 8. API/application service contracts

Adapt these logical operations to existing routing conventions; do not create duplicate endpoints if equivalents exist.

- POST /api/coaching/sessions/:sessionId/report/draft
  - verifies owner, session state and report-storage consent;
  - idempotently creates pending report;
  - returns report ID and state.
- GET /api/coaching/reports/:reportId
  - owner-authorized read.
- PATCH /api/coaching/reports/:reportId/review
  - accepts edits and field-level decisions;
  - rejects edits to immutable provenance.
- POST /api/coaching/reports/:reportId/plan-items
  - accepts selected confirmed action IDs and client-selected area/goal;
  - verifies ownership and confirmation;
  - uses idempotency key.
- GET /api/coaching/reports/:reportId/pdf
  - private PDF download from saved canonical content.
- GET /api/coaching/plan/context
  - minimum prior context only when allowed by consent.

All operations validate at the server boundary, use existing authentication helpers, rate-limit generation, prevent IDOR, and ignore browser-supplied ownership values.

## 9. State machine and recovery

~~~text
SESSION_ACTIVE
  -> CLOSEOUT_DRAFT
  -> CLIENT_REVIEW
  -> REPORT_PENDING
  -> REPORT_READY
  -> PLAN_LINKED (optional)

REPORT_PENDING -> REPORT_FAILED -> DETERMINISTIC_FALLBACK -> REPORT_READY
CLIENT_REVIEW -> CLIENT_CORRECTED -> REPORT_READY (new revision)
Any stage with safety trigger -> HUMAN_SUPPORT_RECOMMENDED / URGENT_SUPPORT
~~~

All states survive reload. A failed optional model call is not a failed session. Repeated requests must not create duplicate report versions or duplicate plan tasks.

## 10. Security, privacy and safety

- Authenticate each report operation and verify session/report ownership on the server.
- Test cross-client denial for reports, PDFs, revisions and plan imports.
- Do not log raw transcript or report content in analytics, public URLs or error messages.
- Use existing managed encryption and private storage; do not introduce another key system.
- Private signed URLs must be short-lived.
- Consent scopes and timestamps are separate: report storage, transcript analysis, prior-session context and sharing.
- Follow existing export, correction and deletion policies.
- Never expose hidden chain-of-thought. Client sees useful conclusions and evidence labels, not internal reasoning.
- Coaching is not diagnosis or therapy. For self-harm/suicidal intent, imminent danger, abuse or acute crisis, stop ordinary goal coaching and use the existing safety/human-support pathway. Do not continue with productivity tasks.
- For serious anxiety or low mood, recommend qualified human support without labeling or diagnosing the client.
- No guarantees or cure claims.

## 11. Localization and accessibility

- RU and EN complete for every title, section, control, error, status, confirmation and PDF label.
- Preserve ES parity where the existing catalog supports ES.
- Store semantic keys independent of localized labels.
- Follow existing message-language switching behavior without losing session state.
- Mobile Safari: large touch targets, focus visibility, reduced-motion, wrapping, no horizontal overflow.
- Charts have textual equivalents and do not rely on color alone.

## 12. Tests

### Unit
- Every report fact requires source refs.
- Hypothesis cannot become fact/decision/action without client confirmation.
- GROW priority answer is not an action.
- Chosen date is not an action.
- Before/after requires matching measure key and scale.
- Missing baseline displays “not measured”.
- Fewer than three confirmed actions remain fewer than three.
- Edit retains provenance and revision trail.
- Deterministic fallback works.
- All locales have complete labels and statuses.

### Integration
- Closeout persists and resumes after reload.
- Report generation requires consent.
- Cross-client reads/writes are rejected.
- Client can edit/accept/decline actions.
- Only accepted actions transfer to plan.
- Idempotency prevents duplicate plan items.
- New reports never overwrite existing goals.
- Links between session, report and plan work.
- AI timeout does not lose session.
- Safety trigger blocks ordinary recommendations.

### E2E
- Guest and signed-in flows as supported by current application.
- GROW overload 20-minute flow.
- Other available session profiles.
- RU/EN/ES.
- iPhone Safari: finish → confirm recap → open report → add action to plan → reopen from cabinet.
- PDF matches web content.
- Cross-account access attempt is denied.

### Release gates
- Existing coaching regression tests and npm run test:coaching:release remain green.
- Lint, typecheck, build, full CI and relevant browser E2E pass.
- Migration diff and RLS review complete.
- Apply migration only through approved deployment.
- Verify real production flow, not only mocks.
- No new paid service/provider without separate approval.

## 13. Delivery plan

**P0 — reliable recap and continuity**
1. Audit PR #3980 status, current session persistence, existing report archive and My Coaching Plan model.
2. Freeze validated schema and evidence ledger.
3. Implement deterministic recap and client confirmation from existing saved answers.
4. Persist reports privately with RLS/versioning, reusing current data structures where possible.
5. Import accepted actions into My Coaching Plan idempotently.
6. Add truthfulness, ownership and duplicate-action regression tests.

**P1 — report quality**
7. Add optional generation through the approved shared model gateway.
8. Add evidence validator and deterministic fallback.
9. Add profiles for stress, recovery, anxiety, low mood, confidence, relationships, goals and work/business.
10. Match one relevant practice/resource from the existing approved library.

**P2 — progress**
11. Add multi-session timeline and comparable measure charts.
12. Add client feedback, correction and review reminders.
13. Add PDF export from canonical JSON.
14. Prepare the next session from consented plan context.

Each phase is a reviewable PR. Keep the work on the existing coaching application.

## 14. Acceptance criteria

Feature is accepted when:
- Every completed session can show a short recap even when AI is unavailable.
- The recap covers all required closeout elements from the concept.
- Full report is grounded in saved session evidence.
- Client statements, coach observations and hypotheses are clearly separated.
- No unsupported clinical/psychological conclusions appear as facts.
- Before/after is honest and based only on comparable client ratings.
- Action candidates are editable and require client confirmation.
- The report does not fabricate three commitments.
- Only accepted actions can enter My Coaching Plan.
- Existing plan data is not overwritten.
- Client can reopen report in My Coaching Plan / Client Cabinet.
- Future sessions access only consented context.
- Report, revisions, PDF and plan links are private and ownership-checked.
- RU/EN/ES and mobile Safari pass.
- Existing GROW regression suite passes.
- No duplicate application, client store, payment or unapproved provider is introduced.

## 15. Handoff instruction

Begin with an audit of PR #3980 and the actual current branch. This is a report and plan-continuity layer, not a rewrite of the GROW runner. Coordinate merge dependencies if #3980 is still open. Do not claim LIVE until migrations, protected CI, production deployment and a real client-side end-to-end flow are verified.


---

# 16. Expanded information architecture and My Coaching Plan implementation

This implementation section incorporates the 2026-11-09 reference screenshots and the verified existing application foundation.

## 16.1 Current verified application assets to reuse

On branch `codex/public-book-library`, the following assets exist:
- `app_private.personal_coaching_sessions`: owner-scoped encrypted account payload, revision-protected, accessed through `hh_app_backend`; current migration uses one row per account.
- `lib/personal-coaching/session-pdf.js`: browser-only, multi-page A4 PDF built from the exact saved questions/answers and client-confirmed action plan; no AI/provider or server PDF upload.
- `components/coaching-action-plan.jsx`: editable action-plan component with goal, obstacle, chosen action, timing and optional self-rated confidence. Existing copy correctly states it is not an AI diagnosis.
- `components/app/personal-coaching.jsx`, `lib/personal-coaching/guided-session.js`, `lib/personal-coaching/offline-intelligence.js`: existing session experience/catalog and deterministic contextual follow-ups.
- `components/client-cabinet.jsx`, `components/client-cabinet-entry.tsx`, `components/client-session-cabinet-entry.jsx`: existing cabinet/document/session entry surfaces and private report/document history.
- `docs/coaching/SESSION_PDF_REPORT_2026-10-24.md`: established PDF privacy, date, history, guest-vs-account and mobile acceptance contract.
- `docs/coaching/CLIENT_MEMORY_CARE_JOURNEY_V4_20261106.md`: privacy-first memory principles. It is a separate memory capability and is not to be repurposed automatically as Life Plan storage.

Important distinction: the current personal-session payload and PDF preserve source answers. They are not the proposed ten-section analytical report, a longitudinal Life Plan, or a specialist routing system. Do not replace or break the existing PDF contract.

## 16.2 First mandatory audit before implementation

Inspect current production branch and exact source before modifying:
1. PR #3980 actual merge/open status and current head.
2. Current session payload serializer, encryption, optimistic revision behavior, size/retention limits and session-history read path.
3. Existing client cabinet navigation, My Profile/ProfileDomains and report/session catalog.
4. Current profile domain data model and whether it already stores life-domain values.
5. Existing private memory/goal/task structures, consent and RLS. Determine whether any structure is suitable for Life Plan and whether it can be reused without overloading sensitive-memory storage.
6. Existing practitioner directory, service catalog, consultation report and file attachment models, to avoid another specialist registry or report archive.
7. Existing APIs and tests for PDF, account deletion/export, report corrections and private document permissions.

Produce an inventory matrix: component/path, current behavior, privacy model, reusable as-is / extend / not suitable, missing behavior, test coverage. Do not claim that My Coaching Plan is implemented merely because the cabinet, personal session history or a PDF exists.

## 16.3 Data architecture — source of truth and storage choice

Use the following domain separation:
- **Session source**: existing encrypted personal coaching session record, preserving exact answered questions and historical scheme version.
- **Report snapshot**: versioned canonical report, linked to session ID and derived from source answers + client confirmations. Prefer a dedicated private report row or an existing compatible private report entity if one exists.
- **Life Plan**: structured current-state data organized by the eight domain keys; separate from session history and report snapshots.
- **Goals/actions/check-ins**: structured entities linked to a plan domain and source report, not hidden inside a growing opaque session blob.
- **Specialist Journey/handoff**: ordered recommendations and recipient-scoped permission records.
- **Attachments**: reuse existing private document/file storage, linked by ID and owner; do not copy files into report JSON.

Do not automatically place the whole report archive or Life Plan into the current one-row-per-account `personal_coaching_sessions.payload_ciphertext`. Its 120,000-character constraint and revision model are designed for private session payload, not an unbounded event history or multi-entity task store. Keep session source answers in place; only extend the payload if backward-compatible and small. Reuse existing normalized private tables where appropriate. If no compatible Life Plan/report entities exist, design a minimal additive schema after the audit; do not create a duplicate system in parallel.

### Logical domain schema (adapt names to actual existing database conventions)

```ts
type LifeDomainKey =
  | 'body_health'
  | 'emotional_wellbeing'
  | 'relationships'
  | 'career_business'
  | 'finance'
  | 'personal_growth'
  | 'lifestyle'
  | 'meaning_purpose';

type PlanDomain = {
  id: string;
  key: LifeDomainKey;
  titleKey: string;
  currentState: ClientOwnedText | null;
  desiredState: ClientOwnedText | null;
  status: 'not_started' | 'active' | 'paused' | 'completed';
  priority: number | null;
  updatedAt: string;
};

type ClientGoal = {
  id: string;
  domainId: string;
  title: string;
  description: string | null;
  targetState: string | null;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  targetDate: string | null;
  sourceReportId: string | null;
  clientConfirmedAt: string | null;
};

type ClientAction = {
  id: string;
  goalId: string;
  title: string;
  details: string | null;
  role: 'start' | 'reduce_friction' | 'review';
  dueAt: string | null;
  trigger: string | null;
  minimumDoneDefinition: string | null;
  obstacle: string | null;
  fallback: string | null;
  status: 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'blocked' | 'deferred' | 'declined';
  sourceReportId: string | null;
  clientConfirmedAt: string | null;
  completedAt: string | null;
};

type PlanCheckIn = {
  id: string;
  domainId: string;
  goalId: string | null;
  indicatorKey: string;
  questionLabel: string;
  scaleMin: number;
  scaleMax: number;
  value: number | string;
  note: string | null;
  recordedAt: string;
  sourceReportId: string | null;
};

type SpecialistRoute = {
  id: string;
  status: 'proposed' | 'client_approved' | 'active' | 'completed' | 'paused' | 'declined';
  steps: Array<{
    order: number;
    specialtyKey: string;
    outcome: string;
    rationale: string;
    status: 'proposed' | 'approved' | 'booked' | 'completed' | 'skipped';
  }>;
};
```

`ClientOwnedText` is text written by the client or explicitly confirmed by them; keep provenance and revision metadata. This schema is logical only. Map to actual existing entities before writing migrations.

### Initial domain seed

Show eight standard domains, but do not create eight fake populated assessments. Domains begin empty/unrated until the client creates content or answers a relevant optional self-check-in. Do not calculate an overall score from missing fields.

## 16.4 Report model and exact ten-section rendering

Use the ten canonical sections defined in the concept:
1. Session Overview
2. Initial Situation
3. Desired Outcome
4. Key Discoveries
5. Main Obstacles
6. Strengths & Resources
7. New Perspective
8. Decisions
9. Action Plan
10. Follow-up

Each section maps to typed data and evidence references. The renderer omits unsupported sections or uses a neutral “not explored in this session” label when section presence is important to explain. Do not generate padding. First viewport displays overview, outcome, key insight and first accepted/proposed action.

The older closeout fields map as follows:
- short result → Overview / outcome;
- main difficulty → Main Obstacles;
- desired result → Desired Outcome;
- decisions → Decisions;
- three actions → Action Plan;
- continued-work advice → Follow-up / Specialist Journey;
- report → full ten-section record;
- add to My Coaching Plan → explicit plan-update review.

The old PDF remains a source-answer export. The new report can provide its own optional PDF, generated from the canonical report snapshot, without changing the old download.

## 16.5 My Coaching Plan cabinet UX

### Navigation
Add one My Coaching Plan entry in the existing authenticated client profile/cabinet. Use existing account identity and access route. Inside use three tabs/areas:
- **Life Plan** (default)
- **Coaching Reports**
- **Specialist Journey**

Do not duplicate top-level cabinet or sign-in. Use current localization and accessible mobile components.

### Empty state
When the client has no coaching or consultation reports:
- welcoming explanation of the service;
- CTA to start a first coaching session;
- optional browse/select session/coach;
- no blank charts, zero-valued life scores, or fabricated plan entries.

### Life Plan dashboard
Mobile order:
1. current focus and next agreed action;
2. compact Life Wheel/domain overview (only rated/populated areas);
3. optional habit summary (only client-selected habits);
4. activity trend with selectable 7/30/90-day interval (only actual logged actions/check-ins);
5. eight life-domain cards.

Desktop may show a domain list plus dashboard panels side by side. Avoid a wide table on mobile.

### Eight life-domain cards
- Body & Health
- Emotional Wellbeing
- Relationships
- Career & Business
- Finance
- Personal Growth
- Lifestyle
- Meaning & Purpose

Each domain detail page/panel contains:
- current state;
- desired state;
- goals;
- obstacles;
- active actions;
- completed actions;
- history of changes/check-ins;
- linked reports and attachments;
- specialist recommendations related to this domain;
- next review date.

Allow each field to be edited by the client. Domain and goal content is not required and can remain empty. Do not classify sensitive health data as ordinary memory; apply existing sensitive-data consent and private access rules.

### Coaching Reports archive
Filter by source (AI Coach / human specialist), life domain, date and report type. Each card includes date, source/persona/specialist, topic, key result, related domain tags, status and Open. Detail view has the ten-section report, related source session and linked plan items. Show old source-answer PDFs as legacy/session exports, not as analytical reports.

### Specialist Journey
Show recommended specialist sequence as cards/steps: specialist type, problem/domain, expected deliverable, rationale, status and linked report/goal. Client can approve, change order, skip or decline. No automatic booking, payment, data transfer or message is created by approval of the recommendation alone.

## 16.6 Multi-domain analysis and specialist routing

At report creation, generate candidate domain tags only from explicit client statements and client confirmation. A case can involve several domains; store:
- primary domain (client selected or confirmed);
- secondary related domains;
- confidence/evidence source for suggestions;
- whether the client confirmed the mapping.

Then propose a small route. Example:
- Energy Coach → practical recovery/resource plan in Body & Health;
- Career Coach → professional direction/priorities in Career & Business;
- Relationship Coach → communication/boundaries plan in Relationships.

Rules:
- Never make the first coach solve all domains if the scope exceeds the coach's competence.
- Prioritize the client's stated immediate need and avoid over-routing.
- Explain why each specialist may help and what the client should receive.
- A route can consist of one specialist or no specialist recommendation.
- Recommendations are not a clinical referral and do not imply diagnosis.
- Prefer existing coaching catalog and actual published specialist profiles; never invent a provider or availability.
- Do not imply a specialist is booked until the real booking flow confirms it.

## 16.7 Consent-bound specialist handoff

Implement a context-packet preview. Default fields:
- client-selected domain and goal;
- specific question for recipient;
- relevant current/desired state;
- only client-approved report conclusions/excerpts;
- accepted actions and their current status;
- selected files/attachments;
- source dates and data freshness.

Before any data is shared, client must select the recipient and review the exact packet. Permission is scoped by recipient, purpose and fields; log grantedAt, consent version and revocation. No blanket “all my history” handoff. The recipient receives no raw transcripts, unrelated reports, or unrelated sensitive notes. Reuse existing verified practitioner/CRM request flow if present, but do not equate a recommended route with a lead, booking, paid consultation or consent to share. If the specialist is an AI persona, follow AI-processing consent separately and don't give it human practitioner privileges.

## 16.8 Four session reflection indicators

The reference proposes four 0–10 client self-ratings:
- clarity;
- confidence in the next step;
- readiness to act;
- perceived control over the situation.

Ask at session start and close only when suitable for the session. Same wording, same scale, same locale semantics. Each answer is self-report, not clinical measurement. Add an optional “prefer not to rate”. Report values and differences in plain language, but don't label every numerical increase as success or infer mental-health improvement.

For long-term trends, compare only the same indicator key/scale over time. Use neutral charts and labels: date, value, count, window. Show gaps explicitly. No global life-quality score by default.

## 16.9 Data lineage and immutability

Required links:
- session → report snapshot;
- report → source session;
- report → client-approved plan update;
- goal → domain;
- action → goal and source report;
- check-in → domain/goal and source report;
- specialist route step → domain/goal/report;
- handoff packet → source records + recipient + scoped consent;
- attachment → report/domain owner.

Report corrections create explicit revisions; do not rewrite prior versions silently. Current Life Plan values remain editable and retain history events. Re-importing the same action must be idempotent.

## 16.10 Existing PDF and privacy constraints

Preserve `lib/personal-coaching/session-pdf.js` contract:
- on-device, browser-only PDF from exact source questions/answers and client-confirmed plan;
- no network transfer of PDF bytes;
- correct historical scheme/date;
- RU/EN/ES;
- guest-tab-only vs account-persisted disclosure.

The new analytical Coaching Report is a separate structured document. If PDF export is added, render only from the saved canonical report JSON. Do not upload generated PDF to a server merely to produce a download.

Reconcile My Coaching Plan with the existing privacy-first client-memory rules. Long-term memory opt-in, sensitive-data opt-in, prior-context opt-in, transcript-processing opt-in and specialist-sharing opt-in are distinct. No inference or automatic extraction of sensitive personal facts into memory.

## 16.11 Delivery plan (updated)

### P0 — audit and common contracts
1. Audit PR #3980, current production/base branch, existing personal session payload and current cabinet.
2. Inventory report/PDF/session/profile/memory/practitioner schemas and RLS. Identify whether My Coaching Plan already exists in source or only as product concept.
3. Define ten-section report schema, evidence ledger, eight domain keys, goal/action/check-in types, specialist route and consent scope.
4. Build migration-free adapters first to prove compatibility with current session history and cabinet.
5. Preserve source-answer PDF and implement deterministic client-confirmable closeout.

### P1 — report and Life Plan MVP
6. Persist a versioned private report using existing compatible secure storage; add migration only if audit proves no suitable entity exists.
7. Implement My Coaching Plan navigation, empty state and three core areas.
8. Implement Life Plan with eight domain cards and editable client-owned current/desired state, goals, obstacles and actions.
9. Implement Coaching Reports archive with AI/human source distinction, legacy import adapter and report detail.
10. Connect accepted actions and report updates to plan using explicit confirmation and idempotency.
11. Implement four optional before/after self-ratings and honest progress displays.

### P2 — specialist pathway
12. Map reports/confirmed goals to one or more life domains.
13. Implement specialist recommendations using existing catalog and actual specialist profiles.
14. Implement route approval, reordering, skip/decline and per-recipient context packet preview.
15. Add scoped specialist sharing only after RLS, identity, consent and recipient tests.

### P3 — longitudinal dashboard
16. Life Wheel from client-rated domain values only.
17. Opt-in habit tracker and real activity timeline (7/30/90 days).
18. Follow-up/check-in prompts only after separate reminder consent and existing notifications approval.
19. Optional report PDF from canonical JSON, keeping old source-answer PDF unchanged.

No stage can claim LIVE from code-only tests. The exact production SHA, migrations, RLS, account isolation and real iPhone Safari acceptance must be verified.

## 16.12 Acceptance criteria (expanded)

- All ten report sections render in order where supported.
- Closeout includes every required summary field and the client can correct it.
- Action plan contains concrete, editable steps and never fabricates commitments.
- Four self-ratings are client-entered and comparisons only use matched measures.
- Existing encrypted session history and source-answer PDF remain intact.
- My Coaching Plan is a single entry in the existing cabinet.
- Empty state leads to first coaching session.
- Three internal areas exist: Life Plan, Coaching Reports, Specialist Journey.
- Eight life domains are present, independently editable and may remain empty.
- Each domain supports current/desired state, goals, obstacles, active/completed actions, history and linked reports.
- Report archive includes AI coach reports, human practitioner reports, approved attachments, recommendations and next appointment/follow-up date when real.
- Reports from human specialists and AI coaches are visibly distinguished.
- Multi-domain routing recommends suitable next specialist(s) with reasons and deliverables; no forced package/booking.
- Specialists only receive the exact client-approved context packet; no automatic full-history access.
- Life Wheel, habits and activity trends never invent values or activity.
- Legacy session PDF stays an answer export; new report is a separate canonical report.
- RLS, IDOR, consent revocation, export/delete and cross-account tests pass.
- RU/EN/ES, mobile Safari, keyboard/screen-reader usability and PDF history pass.
- No duplicate account, cabinet, report vault, client memory store or task manager is created.


---

# 17. Verified implementation baseline — do not overstate existing functionality

This audit addendum is based on source inspected on branch codex/public-book-library on 2026-11-09. Recheck exact production HEAD and merge state before implementation.

## 17.1 Existing components and their actual scope

| Path / data source | Current source-level behavior | Reuse decision |
|---|---|---|
| app_private.personal_coaching_sessions | One row per account; owner-scoped encrypted payload; revision protection | Keep session source; do not turn it into an unbounded report/plan store |
| lib/app/personal-coaching.js | Server-side session lifecycle; current session + bounded history (MAX_HISTORY=8); action plan is one object with one actionText | Extend only session closeout compatibility; create normalized entities only after audit |
| components/app/personal-coaching.jsx | Current self-guided private session UI, source answers, recap, history and PDF download | Extend final closeout and link to new report; preserve old session history |
| components/coaching-action-plan.jsx | One editable action, goal, obstacle, when and optional confidence | Preserve for old sessions; new Action Plan needs up to three role-based action records |
| lib/personal-coaching/session-pdf.js | Browser-only source-answer PDF; no server upload/provider | Keep unchanged as Session Answers PDF; add a distinct report renderer from canonical report JSON |
| components/app/my-progress.jsx / lib/app/my-progress.mjs | Activity timeline/projection from existing sources; deliberately does not expose private notes or infer growth | Add navigation/link only; do not make it the Life Plan persistence layer |
| components/app/profile-domains.jsx | Four diagnostic/profile categories (Psychology, Homeopathy, Wu Xing, Hypnotherapy) and authorized reports | Keep as existing profile area; do not map the eight Life Plan domains onto these four categories |
| components/app/client-memory-workspace.jsx and client-memory data | Explicitly consented client memory records, separate sensitive-data/sharing settings | Respect it, but do not repurpose it as report storage or task manager |
| components/client-cabinet.jsx | Legacy shared-document cabinet with private document list and separate navigation | Reuse authorized document sources through an adapter; canonical Life Plan remains in authenticated /[locale]/app |
| docs/coaching/SESSION_PDF_REPORT_2026-10-24.md | Established guest-vs-account persistence, date, PDF and mobile contract | Preserve as compatibility requirement |

Source-level availability is not equivalent to protected production deployment, completed database migration, full E2E, or user acceptance. No feature should be labeled LIVE from these files alone.

## 17.2 Canonical navigation choice

Implement My Coaching Plan inside the existing authenticated /[locale]/app workspace, linked from existing profile/cabinet navigation. Reuse account auth, locale, layout, mobile dock, privacy helpers and route conventions.

Do not add a second cabinet at /client/[selector], do not create a second profile, and do not confuse current My Progress with the new Life Plan. My Progress is a read-only activity projection; it can provide a link into the plan. The four-category ProfileDomains UI remains a separate diagnostic/profile feature.

Recommended route contract (adapt to current catch-all route conventions after code audit):
- /[locale]/app/coaching-plan — Life Plan landing/default view.
- /[locale]/app/coaching-plan/reports — Coaching Reports archive.
- /[locale]/app/coaching-plan/journey — Specialist Journey.
- /[locale]/app/coaching-plan/domains/[domainKey] — one life domain.

These are logical route names. If the workspace uses an internal page key rather than standalone Next routes, follow that convention and keep deep links stable.

## 17.3 Domain ownership and storage model

Use separate bounded concepts; avoid a single ever-growing JSON blob:
- existing session encrypted payload = session source and source-answer history;
- report snapshot = immutable/versioned session or consultation deliverable;
- Life Plan domain = current editable user-owned state for one of eight domains;
- goal = target state within a domain;
- action = a client-confirmed behavior linked to a goal and source report;
- check-in = a client self-report against a specific indicator and scale;
- plan event = audit/history of a material plan update;
- specialist route = proposed/approved ordered work sequence;
- handoff packet/consent = exact, recipient-limited context that may be shared.

A normalized schema is preferred for report/goal/action/check-in/event queries and RLS. JSONB may hold versioned report content, but ownership, lifecycle state, source IDs, indexes and plan entities should remain queryable. Use encryption for sensitive narrative fields according to current application crypto conventions. Do not expose ciphertext or sensitive details through broad activity feeds.

Candidate logical entities (names must be reconciled with existing schema before migration):
- coaching_session_reports: owner, session source, report type/source, version, status, locale, structured report JSON, review metadata and timestamps.
- coaching_plan_domains: owner, domain key, current/desired state, priority, status and revisions.
- coaching_plan_goals: owner, domain ID, goal fields, target/status and provenance.
- coaching_plan_actions: owner, goal ID, action role, behavior/timing/trigger/done definition/obstacle/fallback/status, accepted/complete timestamps and source report/session.
- coaching_plan_checkins: owner, domain/goal, indicator key, exact question/scale/value/date/source.
- coaching_plan_events: append-only state changes for goals/domains/actions and report import.
- coaching_specialist_routes + route steps: ordered recommendations and client decisions.
- coaching_context_shares: recipient-bound consent and exact shared context reference/manifest.

These are candidate logical names only, not authorization to create duplicate tables. First inspect existing development-goal/report entities. The verified migration history includes 20261017165000_hh_reports_development_goals.sql; inspect its tables and API before proposing any new goals/actions. Reuse those if they correctly support the Life Plan lifecycle. If a new table is required, provide a migration mapping and a no-duplicate proof.

## 17.4 Report-source adapters

The Coaching Reports archive aggregates authorized source records; it does not copy them all into one raw table by default. Add source adapters:
- ai_coach_session → canonical report snapshot linked to session ID;
- human_consultation → existing consultation report/document with specialist and consultation IDs;
- legacy_session_export → existing source-answer PDF metadata and session record, visibly marked as legacy/source export;
- attachment → existing private file/document ID and access rules;
- recommendation → existing practitioner recommendation record;
- follow_up → real confirmed next appointment or agreed self-review date.

Each archive card preserves source origin, owner authorization, date, specialist/persona, type, domain link, availability state and original open/download route. Do not say appointment booked from a recommendation or request. Use actual source data; unavailable report is not an empty archive.

## 17.5 Life Plan data contract

Use stable domain keys:
body_health, emotional_wellbeing, relationships, career_business, finance, personal_growth, lifestyle, meaning_purpose.

At domain level store client-owned current state, desired state, priority, status and optional next review. At goal level store title, target, rationale, status, target date and confirmation. Actions store the exact role-based schema from section 16. Each field carries provenance and revision.

Do not make all eight domain records look like completed diagnostics. The UI may render eight empty domain cards as navigation, but there is no rating or progress value until the client supplies it.

A life-domain indicator can be text, count, date or a client-selected 0–10 scale. Every numeric indicator records exact question text/key, scale bounds, direction, timestamp and source. Never average unlike scales into a single score.

## 17.6 Three-action plan implementation detail

The previous action component stores a single action. New report action cards support up to three separate rows with roles:
1. start — one concrete first step;
2. reduce_friction — one action that removes/delegates/postpones/simplifies an obstacle;
3. review — a client-agreed check of what happened and what was learned.

For each row collect title/behavior, due time or trigger (nullable if not stated), minimum definition of done, obstacle (optional), fallback (optional), status, client acceptance/edit/decline timestamp, source reference and Life Plan domain/goal link chosen or confirmed by client.

The client can accept 0, 1, 2 or 3. An empty role remains absent; do not create fake default actions. If the client confirms more than three valuable commitments, group them into a plan goal and keep only the three highest-priority near-term actions in the immediate report, with additional actions available in the plan only if specifically confirmed.

## 17.7 Specialist route and minimal-context handoff contract

Use the existing published coaching/specialist catalog. A route recommendation references an actual existing specialist profile or coaching scheme. No invented practitioner names, schedules, rates or availability.

Each route item has life domain(s), client-stated issue/question, intended deliverable, reason the specialist is relevant, scope boundary, sequence order when justified, and status: proposed, accepted, skipped, declined, consultation requested, booked or completed.

Only a client-approved route can progress. Consultation request, confirmed booking, payment, report sharing and message delivery remain separate state transitions.

Handoff packet contains exact recipient identity, purpose, client-selected domain/goal, relevant current/desired state, selected client-approved report conclusions, accepted actions/status, selected attachments, omitted-field list, consent version/scope/time and revocation state. Require preview and explicit confirmation. Recipient reads through server-side authorization, not a public link or client-provided ID. Revocation blocks future reads; explain that already downloaded copies cannot be recalled.

## 17.8 End-of-session closeout UI state machine

~~~text
SESSION_ACTIVE
  -> RECAP_DRAFT
  -> CLIENT_CORRECTION
  -> ACTION_REVIEW
  -> PLAN_TRANSFER_PREVIEW
  -> CLIENT_SAVE_CHOICE
  -> SESSION_COMPLETED
  -> REPORT_PENDING / REPORT_READY / DETERMINISTIC_FALLBACK
  -> PLAN_LINKED (optional)
~~~

Closeout is recoverable after refresh. Client can confirm/edit report candidates, accept/edit/defer/decline each action, leave without adding anything to Life Plan, select domain/goal for accepted items and view the exact destination before transfer.

Do not require cabinet saving or Life Plan transfer as a condition for completing a session. If the client declines persistent storage, the current result remains available in-session subject to existing guest/private behavior.

## 17.9 Prior-session context and specialist continuity

Prior context is not the same as report retention. For a new session:
- default: use current session only;
- when the client enables prior-context use, show a short selection of relevant plan goals/actions;
- client chooses which domain/goal to bring in;
- specialist handoff is separately consented and recipient-scoped;
- AI-provider processing is a separate consent scope;
- sensitive memory, test answers, practitioner notes and unrelated domains are excluded by default.

Store approved context references and consent scope with the session version. Coach persona cannot widen access.

## 17.10 Updated phased implementation order

**G0 — Audit/ownership**
1. Confirm production branch/HEAD, PR #3980 state/lease and current CI.
2. Inspect 20261017165000_hh_reports_development_goals.sql and current development-goal APIs.
3. Inspect report source tables, practitioner consultation records, private document/file access, current profile workspace and route resolver.
4. Confirm whether any My Coaching Plan page/feature exists today. Distinguish source, deployed and E2E-verified status.
5. Inventory RLS, encryption, revision, retention, export and delete before migration.
6. Publish one reuse/extend/create matrix and baseline tests.

**G1 — Session closeout and report**
7. Preserve GROW and existing session/PDF contracts.
8. Add structured, client-editable closeout with ten report sections.
9. Generate deterministic report content from saved source answers + client-confirmed edits.
10. Add versioned private report persistence or map to proven-compatible existing report storage.
11. Add report archive adapter for existing AI sessions, human consultation reports, legacy session exports and attachments.
12. Verify signed-in/private and guest behavior, including opt-in and failure states.

**G2 — Life Plan MVP**
13. Implement the single My Coaching Plan entry in authenticated /[locale]/app.
14. Build Life Plan overview, empty state and eight domain cards.
15. Implement domain current/desired state, goals, obstacles, priorities and review.
16. Implement three-role actions with client acceptance/edit and statuses.
17. Link report → domain → goal → action/check-in with history events and idempotency.

**G3 — Change and progress**
18. Add four optional session self-ratings (clarity, confidence, readiness, perceived control) with exact repeated prompts.
19. Add domain-specific client indicators and timeline.
20. Add optional Life Wheel, user-selected habits and 7/30/90 day activity projection from real data only.
21. Preserve My Progress and profile diagnostic categories as separate views.

**G4 — Specialist Journey and privacy handoff**
22. Route multi-area goals using actual catalog/specialist profiles; client confirms domains and sequence.
23. Preview minimum handoff packet and explicitly grant recipient-specific access.
24. Test revocation, expired permission, recipient IDOR and no accidental report/attachment sharing.
25. Keep booking/payment/messaging separate from recommendation and consent.

**G5 — optional report enrichment and presentation**
26. Only if the existing approved gateway/consent exists, add optional evidence-grounded AI report drafting. Otherwise deterministic report only.
27. Add report PDF from canonical JSON without changing the source-answer PDF.
28. Add localized charts, report feedback and review workflow.
29. No new paid provider, external transcript transfer or automated reminders absent separate approval.

## 17.11 Test matrix additions

Unit:
- current single-action actionPlan remains backward-compatible;
- migration adapter does not delete/rewrite previous session history;
- session history cap does not truncate new report archive;
- report type/origin distinguishes AI, human, legacy export and attachment;
- eight domain cards do not imply populated/assessed values;
- My Progress and ProfileDomains are not used as Life Plan persistence;
- action import is idempotent and cannot overwrite an unrelated goal;
- domain/goal/action revisions retain source and actor;
- no unauthorized field enters specialist packet;
- revocation blocks future recipient access.

Integration:
- account A can read/update own plan/report;
- account B cannot read, mutate or infer account A resources;
- legacy human consultation reports appear only when client is authorized;
- guest cannot see account Life Plan after session completion without login/explicit save path;
- client can complete session without saving to Life Plan;
- report correction creates revision; historical report remains retrievable;
- report download uses same canonical JSON as web view.

E2E:
- empty My Coaching Plan → start GROW → finish → review report → accept one/two/three actions → select domains → save → reopen.
- populated Life Plan → new session → propose update → choose create/link/update → old goal history preserved.
- report archive filter AI vs human → open source → download authorized attachment.
- multi-domain case → approve/reorder/skip specialist suggestions → preview data → grant selected recipient → recipient sees only packet.
- withdraw handoff permission → future access denied.
- RU/EN/ES, iPhone Safari and cross-account negative tests.

## 17.12 Definition of done

The feature is complete only when:
- the ten-section report exists as a private, versioned record;
- old source-answer PDF and source session history remain intact;
- one My Coaching Plan is reachable inside the existing authenticated account workspace;
- Life Plan has eight independent domains with current/desired states, goals, obstacles, active/completed actions and history;
- Coaching Reports integrates authorized AI and human records plus legacy source exports/files;
- specialist route is optional and uses actual catalog entries;
- explicit client approval is required for plan updates and recipient-specific handoff;
- no duplicate storage/account/cabinet/task system was introduced;
- tests and live verification gates are evidenced.
