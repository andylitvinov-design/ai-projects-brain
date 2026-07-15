import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDailyIntelligence, updateDashboardObject } from '../scripts/update-daily-intelligence.mjs';

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
