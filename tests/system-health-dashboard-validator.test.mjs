import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { validateDashboard } from '../scripts/validate-system-health-dashboard.mjs';

function dashboard(overrides = {}) {
  const dimensions = [
    { id: 'product_delivery', metric: 'Product Delivery', today: 45, yesterday: 45, change: 0, confidence: 'medium', evidence: 'A live-verified product workflow shipped.', what_improves_it: 'Ship and live-verify a product outcome.' },
    { id: 'system_improvement', metric: 'System Improvement', today: 88, yesterday: 84, change: 4, confidence: 'high', evidence: 'Validation and observability improved.', what_improves_it: 'Validate another system upgrade.' },
    { id: 'business_growth', metric: 'Business Growth', today: 35, yesterday: 39, change: -4, confidence: 'low', evidence: 'A measured conversion outcome was recorded.', what_improves_it: 'Ship and measure a funnel improvement.' },
  ];

  return {
    schema_version: 4,
    last_updated: '2026-07-12T22:55:00+03:00',
    metrics: Array.from({ length: 10 }, (_, index) => ({ id: `metric-${index}` })),
    operational_indicators: Array.from({ length: 7 }, (_, index) => ({ id: `indicator-${index}` })),
    momentum_model: {
      formula: '(product_delivery + system_improvement + business_growth) / 3',
      today_score: 56,
      yesterday_score: 56,
      dimensions,
    },
    overall: { score_now: '69/100 estimated' },
    aggregate: { reported_score: 69 },
    publication_evidence: {
      publication_status: 'NEEDS_VERIFICATION',
      success_allowed: false,
      canonical_snapshot_timestamp: '2026-07-12T22:55:00+03:00',
      stages: {
        canonical_updated: { status: 'verified' },
        mirror_synced: { status: 'verified' },
        deploy_identified: { status: 'verified' },
        live_verified: { status: 'needs_verification' },
      },
    },
    ...overrides,
  };
}

test('accepts schema v4 with three independent momentum dimensions', () => {
  assert.deepEqual(validateDashboard(dashboard()), []);
});

test('rejects a missing momentum dimension', () => {
  const value = dashboard();
  value.momentum_model.dimensions.pop();
  assert.match(validateDashboard(value).join('\n'), /missing momentum dimension: business_growth/);
});

test('rejects a nonnumeric dimension value unless it is marked unknown', () => {
  const value = dashboard();
  value.momentum_model.dimensions[0].today = 'forty-five';
  assert.match(validateDashboard(value).join('\n'), /product_delivery today must be a number or marked unknown/);
});

test('accepts an explicitly unknown dimension value', () => {
  const value = dashboard();
  value.momentum_model.dimensions[0].today = 'unknown';
  value.momentum_model.today_score = 'unknown';
  assert.deepEqual(validateDashboard(value), []);
});

test('rejects a composite that is not the three-axis mean', () => {
  const value = dashboard();
  value.momentum_model.today_score = 88;
  const errors = validateDashboard(value).join('\n');
  assert.match(errors, /today_score 88 does not equal the three-axis mean 56/);
  assert.match(errors, /System Improvement cannot be used as the whole Momentum score/);
});

test('rejects issue, prompt, plan, or docs credited as product or business progress', () => {
  const value = dashboard();
  value.momentum_model.dimensions[0].evidence = 'Issue #33 progress raised Product Delivery.';
  value.momentum_model.dimensions[2].what_improves_it = 'Write docs to increase Business Growth.';
  const errors = validateDashboard(value).join('\n');
  assert.match(errors, /product_delivery credits non-outcome work: issue/);
  assert.match(errors, /business_growth credits non-outcome work: docs/);
});

test('CLI validates the canonical dashboard when invoked without arguments', () => {
  const script = fileURLToPath(new URL('../scripts/validate-system-health-dashboard.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [script], { cwd: path.dirname(path.dirname(script)), encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});
