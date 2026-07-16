import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDailyIntelligence, buildStrategicGoals, updateDashboardObject } from '../scripts/update-daily-intelligence.mjs';

function dashboard(overrides = {}) {
  return {
    schema_version: 6,
    metric_model: 'adaptive_portfolio_project_goal_v1',
    last_updated: '2026-07-15T07:00:00+02:00',
    metric_schema: ['id','name','type','value','previous_value','unit','period','source','confidence','lifecycle','next_action'],
    metrics: [
      ['provider_readiness','Provider Readiness','state','unknown','unknown','state','daily','provider gate','high','active','Collect current live proof.'],
      ['registry_health','Registry Health','count',10,9,'projects','daily','portfolio registry','high','active','Keep mappings synchronized.'],
      ['old_rule','Old Rule','state','active','active','state','daily','rule registry','medium','superseded','Use replacement rule.'],
    ],
    publication_evidence: { publication_status: 'STALE', success_allowed: false },
    unrelated: { keep: true },
    ...overrides,
  };
}

function strategicGoals(progress = 60) {
  const rubric = [
    { id: 'a', name: 'A', weight: 25, yesterday_score: 40, today_score: progress },
    { id: 'b', name: 'B', weight: 25, yesterday_score: 40, today_score: progress },
    { id: 'c', name: 'C', weight: 25, yesterday_score: 40, today_score: progress },
    { id: 'd', name: 'D', weight: 25, yesterday_score: 40, today_score: progress },
  ];
  return {
    observed_at: '2026-07-16T07:00:00+02:00',
    project_goals: [{
      project_id: 'alpha',
      big_goal: 'Maximum-quality Alpha.',
      rubric,
      progress_yesterday: 40,
      progress_today: progress,
      daily_delta: progress - 40,
      evidence_state: 'PROVEN',
      missing_conditions: [],
      next_quality_threshold: 'Next threshold.',
    }],
    system_intelligence_goal: {
      goal_id: 'system',
      big_goal: 'Maximum-quality system.',
      rubric,
      progress_yesterday: 40,
      progress_today: progress,
      daily_delta: progress - 40,
      evidence_state: 'PROVEN',
      missing_conditions: [],
      next_quality_threshold: 'Next threshold.',
    },
  };
}

test('creates first snapshot without inventing an aggregate score', () => {
  const result = buildDailyIntelligence(dashboard(), { observedAt: '2026-07-15' });
  assert.equal(result.summary.score_now, 'unknown');
  assert.equal(result.indicators.length, 3);
  assert.equal(result.indicators[0].delta_label, 'NEW');
  assert.equal(result.history.length, 1);
});

test('rolls today into yesterday and classifies resolved, changed, unchanged and superseded', () => {
  const first = updateDashboardObject(dashboard(), { observedAt: '2026-07-15' });
  const next = dashboard({
    last_updated: '2026-07-16T07:00:00+02:00',
    daily_intelligence: first.daily_intelligence,
    metrics: [
      ['provider_readiness','Provider Readiness','state','ready','unknown','state','daily','provider gate','high','active','Keep live proof fresh.'],
      ['registry_health','Registry Health','count',10,10,'projects','daily','portfolio registry','high','active','Keep mappings synchronized.'],
      ['old_rule','Old Rule','state','active','active','state','daily','rule registry','medium','superseded','Use replacement rule.'],
    ],
  });
  const result = buildDailyIntelligence(next, { observedAt: '2026-07-16' });
  const byId = Object.fromEntries(result.indicators.map((item) => [item.id, item]));
  assert.equal(byId.provider_readiness.yesterday, 'unknown');
  assert.equal(byId.provider_readiness.delta_label, 'RESOLVED');
  assert.equal(byId.registry_health.delta_label, 'UNCHANGED');
  assert.equal(byId.old_rule.delta_label, 'SUPERSEDED');
  assert.equal(result.history.length, 2);
});

test('trims history to latest 30 unique dates', () => {
  const history = Array.from({ length: 35 }, (_, index) => ({ date: `2026-06-${String(index + 1).padStart(2, '0')}` }));
  const result = buildDailyIntelligence(dashboard({ daily_intelligence: { indicators: [], history } }), { observedAt: '2026-07-15' });
  assert.equal(result.history.length, 30);
  assert.equal(result.history.at(-1).date, '2026-07-15');
});

test('preserves unrelated fields and publication state', () => {
  const source = dashboard();
  const updated = updateDashboardObject(source, { observedAt: '2026-07-15' });
  assert.deepEqual(updated.unrelated, { keep: true });
  assert.deepEqual(updated.publication_evidence, source.publication_evidence);
  assert.notEqual(updated, source);
});

test('accepts explicit material changes but rejects invalid labels', () => {
  const result = buildDailyIntelligence(dashboard(), {
    observedAt: '2026-07-15',
    explicitChanges: [
      { id: 'auth', name: 'Auth proof', delta_label: 'CHANGED', consequence: 'New login evidence.' },
      { id: 'bad', name: 'Bad label', delta_label: 'DONE', consequence: 'Must be ignored.' },
    ],
  });
  assert.ok(result.changes.some((item) => item.id === 'auth'));
  assert.ok(!result.changes.some((item) => item.id === 'bad'));
});

test('persists project and system Big Goals with bounded strategic history', () => {
  const first = updateDashboardObject(dashboard(), {
    observedAt: '2026-07-16',
    strategicGoals: strategicGoals(60),
  });
  assert.equal(first.daily_intelligence.project_goals[0].progress_today, 60);
  assert.equal(first.daily_intelligence.system_intelligence_goal.progress_today, 60);
  assert.equal(first.daily_intelligence.strategic_history.length, 1);

  const secondGoals = strategicGoals(70);
  secondGoals.observed_at = '2026-07-17T07:00:00+02:00';
  const second = updateDashboardObject(dashboard({ daily_intelligence: first.daily_intelligence }), {
    observedAt: '2026-07-17',
    strategicGoals: secondGoals,
  });
  assert.equal(second.daily_intelligence.project_goals[0].progress_yesterday, 60);
  assert.equal(second.daily_intelligence.project_goals[0].daily_delta, 10);
  assert.equal(second.daily_intelligence.system_intelligence_goal.progress_yesterday, 60);
  assert.equal(second.daily_intelligence.strategic_history.length, 2);
});

test('preserves strategic goals when a metric-only snapshot is generated', () => {
  const strategic = buildStrategicGoals({}, strategicGoals(60));
  const result = buildDailyIntelligence(dashboard({
    daily_intelligence: {
      indicators: [],
      history: [],
      ...strategic,
    },
  }), { observedAt: '2026-07-17' });
  assert.equal(result.project_goals[0].project_id, 'alpha');
  assert.equal(result.system_intelligence_goal.goal_id, 'system');
});

test('rejects strategic rubrics whose weights do not sum to 100', () => {
  const input = strategicGoals(60);
  input.project_goals[0].rubric[0].weight = 20;
  assert.throws(
    () => buildStrategicGoals({}, input),
    /weights must sum to 100/,
  );
});
