import test from 'node:test';
import assert from 'node:assert/strict';
import { applyStrategicEvidence } from '../scripts/apply-strategic-evidence.mjs';

function rubric() {
  return [
    { id: 'product', weight: 25, yesterday_score: 80, today_score: 80 },
    { id: 'publication', weight: 25, yesterday_score: 80, today_score: 80 },
    { id: 'evidence', weight: 25, yesterday_score: 80, today_score: 80 },
    { id: 'outcomes', weight: 25, yesterday_score: 40, today_score: 40 },
  ];
}

function scorecard() {
  return {
    schema_version: 1,
    observed_at: '2026-07-16T06:58:20+02:00',
    project_goals: [{
      project_id: 'alpha',
      rubric: rubric(),
      progress_yesterday: 70,
      progress_today: 70,
      daily_delta: 0,
      missing_conditions: ['Exact publication proof'],
      next_quality_threshold: 'Prove publication.',
      evidence_state: 'NEEDS_VERIFICATION',
    }],
    system_intelligence_goal: {
      goal_id: 'system',
      rubric: rubric(),
      progress_yesterday: 70,
      progress_today: 70,
      daily_delta: 0,
      missing_conditions: ['Automatic evidence ingestion'],
      next_quality_threshold: 'Automate evidence.',
      evidence_state: 'PROVEN',
    },
  };
}

function evidence() {
  return {
    schema_version: 1,
    observed_at: '2026-07-17T07:03:49+02:00',
    status: 'source_linked_verified_evidence',
    entries: [
      {
        id: 'alpha-publication-1', target_type: 'project', project_id: 'alpha', rubric_id: 'publication',
        proposed_score: 90, evidence_state: 'PROVEN', source_state: 'merged_verified', requires_live_proof: false,
        source_url: 'https://github.com/example/alpha/pull/1', source_ref: 'a'.repeat(40),
        observed_at: '2026-07-16T18:00:00Z', summary: 'Receipt architecture merged with tests.',
        missing_conditions_remove: ['Exact publication proof'],
      },
      {
        id: 'system-evidence-1', target_type: 'system', rubric_id: 'evidence',
        proposed_score: 85, evidence_state: 'PROVEN', source_state: 'workflow_success', requires_live_proof: false,
        source_url: 'https://github.com/example/alpha/actions/runs/1', source_ref: 'run-1',
        observed_at: '2026-07-16T18:05:00Z', summary: 'Evidence validation workflow completed successfully.',
      },
    ],
  };
}

test('applies source-linked evidence dimension by dimension and recomputes weighted progress', () => {
  const result = applyStrategicEvidence(scorecard(), evidence());
  const project = result.scorecard.project_goals[0];
  assert.equal(project.rubric.find((item) => item.id === 'publication').today_score, 90);
  assert.equal(project.progress_yesterday, 70);
  assert.equal(project.progress_today, 72.5);
  assert.equal(project.daily_delta, 2.5);
  assert.deepEqual(project.missing_conditions, []);
  assert.equal(result.scorecard.system_intelligence_goal.progress_today, 71.3);
  assert.equal(result.scorecard.observed_at, '2026-07-17T07:03:49+02:00');
  assert.deepEqual(result.scorecard.evidence_ingestion.applied_evidence_ids, ['alpha-publication-1', 'system-evidence-1']);
});

test('is idempotent for already applied evidence ids', () => {
  const first = applyStrategicEvidence(scorecard(), evidence());
  const second = applyStrategicEvidence(first.scorecard, evidence());
  assert.equal(second.results.every((item) => item.status === 'ALREADY_APPLIED'), true);
  assert.deepEqual(second.scorecard.project_goals, first.scorecard.project_goals);
  assert.deepEqual(second.scorecard.system_intelligence_goal, first.scorecard.system_intelligence_goal);
});

test('rejects score increases without PROVEN evidence', () => {
  const candidate = evidence();
  candidate.entries[0].evidence_state = 'NEEDS_VERIFICATION';
  assert.throws(() => applyStrategicEvidence(scorecard(), candidate), /requires PROVEN/);
});

test('rejects code-only evidence for a live-required increase', () => {
  const candidate = evidence();
  candidate.entries[0].requires_live_proof = true;
  assert.throws(() => applyStrategicEvidence(scorecard(), candidate), /live-required dimension/);
});

test('enforces source-state score ceilings and unique evidence ids', () => {
  const overCeiling = evidence();
  overCeiling.entries[0].proposed_score = 95;
  assert.throws(() => applyStrategicEvidence(scorecard(), overCeiling), /exceeds merged_verified ceiling/);

  const duplicate = evidence();
  duplicate.entries[1].id = duplicate.entries[0].id;
  assert.throws(() => applyStrategicEvidence(scorecard(), duplicate), /duplicate evidence ids/);
});

test('preserves the original previous-day baseline across multiple evidence batches on the same day', () => {
  const previousDay = { date: '2026-07-16', projects: { alpha: 70 }, system_intelligence: 70 };
  const firstLedger = evidence();
  firstLedger.entries = [firstLedger.entries[0]];
  const first = applyStrategicEvidence(scorecard(), firstLedger, { previousDay });

  const secondLedger = {
    schema_version: 1,
    observed_at: '2026-07-17T07:03:49+02:00',
    status: 'source_linked_verified_evidence',
    entries: [{
      id: 'alpha-evidence-2', target_type: 'project', project_id: 'alpha', rubric_id: 'evidence',
      proposed_score: 90, evidence_state: 'PROVEN', source_state: 'merged_verified', requires_live_proof: false,
      source_url: 'https://github.com/example/alpha/pull/2', source_ref: 'b'.repeat(40),
      observed_at: '2026-07-17T05:00:00Z', summary: 'Second verified evidence batch.',
    }],
  };
  const second = applyStrategicEvidence(first.scorecard, secondLedger, { previousDay });
  const project = second.scorecard.project_goals[0];
  assert.equal(project.progress_yesterday, 70);
  assert.equal(project.progress_today, 75);
  assert.equal(project.daily_delta, 5);
  assert.deepEqual(second.scorecard.evidence_ingestion.daily_baseline, {
    date: '2026-07-16', source: 'dashboard.daily_intelligence.strategic_history',
  });
});
