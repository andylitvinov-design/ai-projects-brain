import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { buildStrategicEvidence } from '../scripts/build-strategic-source-evidence.mjs';

function mergedObservation(overrides = {}) {
  return {
    id: 'example-merged-pr',
    target_type: 'project',
    project_id: 'ai-projects-brain',
    rubric_id: 'automation',
    proposed_score: 90,
    evidence_state: 'PROVEN',
    source_state: 'merged_verified',
    requires_live_proof: false,
    source_url: 'https://github.com/andylitvinov-design/ai-projects-brain/pull/134',
    source_ref: 'f3695bfe3686b7553c25e13114a5b89b00444199',
    observed_at: '2026-07-17T18:44:26Z',
    summary: 'A merged and verified strategic change.',
    proof: { merged: true },
    ...overrides,
  };
}

function documentWith(observations) {
  return {
    schema_version: 1,
    observed_at: '2026-07-18T06:59:46+02:00',
    observations,
  };
}

test('builds deterministic evidence and strips proof payloads', () => {
  const existing = {
    schema_version: 1,
    observed_at: '2026-07-17T00:00:00Z',
    status: 'source_linked_verified_evidence',
    scoring_policy: 'existing policy',
    entries: [{ id: 'older-entry', summary: 'preserved' }],
  };
  const result = buildStrategicEvidence(documentWith([mergedObservation()]), existing);
  assert.equal(result.observed_at, '2026-07-18T06:59:46+02:00');
  assert.equal(result.entries.length, 2);
  assert.deepEqual(result.entries.map((entry) => entry.id), ['example-merged-pr', 'older-entry']);
  assert.equal(Object.hasOwn(result.entries[0], 'proof'), false);
  assert.equal(result.entries[0].project_id, 'ai-projects-brain');
});

test('rejects merged evidence without merged proof', () => {
  assert.throws(
    () => buildStrategicEvidence(documentWith([mergedObservation({ proof: { merged: false } })])),
    /proof\.merged must be true/,
  );
});

test('rejects live evidence unless every exact-publication proof matches', () => {
  const live = mergedObservation({
    id: 'live-proof',
    source_state: 'live_verified',
    requires_live_proof: true,
    source_url: 'https://example.netlify.app/system-health-dashboard.json',
    source_ref: 'deploy-123',
    proof: {
      public_timestamp_match: true,
      source_commit_match: true,
      receipt_match: false,
      visible_surface_match: true,
      public_url: 'https://example.netlify.app/',
    },
  });
  assert.throws(() => buildStrategicEvidence(documentWith([live])), /proof\.receipt_match must be true/);
});

test('requires a complete measurement window for observed outcomes', () => {
  const outcome = mergedObservation({
    id: 'observed-kpi',
    rubric_id: 'outcomes',
    source_state: 'observed_outcome',
    requires_live_proof: true,
    source_url: 'https://example.netlify.app/metrics/registration.json',
    source_ref: 'registration-2026-07-17',
    proof: {
      metric_name: 'confirmed_registrations',
      observed_value: 3,
      unit: 'registrations',
      window_start: '2026-07-17T00:00:00Z',
    },
  });
  assert.throws(() => buildStrategicEvidence(documentWith([outcome])), /proof\.window_end must be a valid timestamp/);
});

test('rejects duplicate observation IDs', () => {
  assert.throws(
    () => buildStrategicEvidence(documentWith([mergedObservation(), mergedObservation()])),
    /duplicate observation ids/,
  );
});

test('canonical source observation document passes proof validation before or after preparation', () => {
  const observations = JSON.parse(fs.readFileSync(
    'projects/codex-automation/strategic-source-observations.json',
    'utf8',
  ));
  const existing = JSON.parse(fs.readFileSync(
    'projects/codex-automation/strategic-evidence.json',
    'utf8',
  ));
  const result = buildStrategicEvidence(observations, existing);
  const expectedIds = new Set([
    ...existing.entries.map((entry) => entry.id),
    ...observations.observations.map((observation) => observation.id),
  ]);
  assert.equal(result.entries.length, expectedIds.size);
  assert.deepEqual(new Set(result.entries.map((entry) => entry.id)), expectedIds);
});
