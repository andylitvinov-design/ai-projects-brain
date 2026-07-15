import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeNotApplicableMetrics } from '../scripts/normalize-dashboard-not-applicable.mjs';
import { validatePortfolioDashboard } from '../scripts/validate-portfolio-dashboard.mjs';

const metricSchema = [
  'id','name','type','value','numerator','denominator','unit','period','source','confidence',
  'status','previous_value','change','target_or_slo','interpretation','next_action','goal','sector','lifecycle',
];

function row(values) {
  return metricSchema.map((field) => values[field] ?? null);
}

function fixture({ numerator = 0, denominator = 0 } = {}) {
  const dashboard = {
    schema_version: 6,
    metric_model: 'adaptive_portfolio_project_goal_v1',
    last_updated: '2026-07-15T20:23:05+02:00',
    portfolio_health: { active_projects: 1 },
    project_health: [{
      project_id: 'brain-management',
      sectors: {
        execution: 'PASS', product_value: 'WATCH', business_growth: 'NOT_APPLICABLE',
        standards: 'WATCH', reliability: 'PASS', learning: 'PASS',
      },
    }],
    agent_assessments: [],
    metric_schema: metricSchema,
    metrics: [row({
      id: 'rollback_readiness_ratio',
      name: 'Rollback Readiness Ratio',
      type: 'ratio',
      value: 'not_applicable',
      numerator,
      denominator,
      unit: '%/count',
      period: 'run',
      source: 'no applicable live change',
      confidence: 'high',
      status: 'NOT_APPLICABLE',
      previous_value: 'not_applicable',
      change: 'same',
      target_or_slo: 'ready/live changes',
      interpretation: 'No applicable sample.',
      next_action: 'Record rollback on next live change.',
      goal: 'business_growth_professional_value',
      sector: 'professional_delivery_live_reliability',
      lifecycle: 'active',
    })],
    goal_pyramid: [
      { id: 'efficiency_system_intelligence', sectors: [] },
      { id: 'business_growth_professional_value', sectors: [{ id: 'professional_delivery_live_reliability', metric_ids: ['rollback_readiness_ratio'] }] },
      { id: 'continuous_self_development', sectors: [] },
    ],
    publication_evidence: {
      canonical_snapshot_timestamp: '2026-07-15T20:23:05+02:00',
      publication_status: 'STALE',
      success_allowed: false,
      stages: {},
    },
    main_upgrade: { status: 'APPLIED_UPGRADE' },
  };
  const registry = { projects: [{ project_id: 'brain-management' }] };
  const markdown = `**Metric model:** \`adaptive_portfolio_project_goal_v1\`\n**Last updated:** \`2026-07-15T20:23:05+02:00\`\n**Evening result:** \`APPLIED_UPGRADE\`\n**Public publication state:** \`STALE\``;
  return { dashboard, registry, markdown };
}

test('normalizes numeric NOT_APPLICABLE evidence from zero to null', () => {
  const { dashboard } = fixture();
  const result = normalizeNotApplicableMetrics(dashboard);
  const normalized = Object.fromEntries(metricSchema.map((field, index) => [field, result.dashboard.metrics[0][index]]));
  assert.equal(normalized.value, 'not_applicable');
  assert.equal(normalized.status, 'NOT_APPLICABLE');
  assert.equal(normalized.numerator, null);
  assert.equal(normalized.denominator, null);
  assert.match(normalized.interpretation, /not zero/);
  assert.equal(result.changed, 2);
});

test('rejects zero evidence fields for numeric NOT_APPLICABLE metrics', () => {
  const { dashboard, registry, markdown } = fixture();
  assert.match(validatePortfolioDashboard(dashboard, registry, markdown).join('\n'), /must use null numerator\/denominator/);
});

test('accepts normalized numeric NOT_APPLICABLE metrics', () => {
  const { dashboard, registry, markdown } = fixture();
  const result = normalizeNotApplicableMetrics(dashboard);
  assert.deepEqual(validatePortfolioDashboard(result.dashboard, registry, markdown), []);
});
