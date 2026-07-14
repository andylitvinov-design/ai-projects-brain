import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePublicationContract } from '../scripts/validate-dashboard-publication-contract.mjs';

const canonicalTimestamp = '2026-07-14T07:30:00+02:00';
const shaA = 'a'.repeat(40);
const shaB = 'b'.repeat(40);

function stage(status, overrides = {}) {
  return {
    status,
    timestamp: status === 'verified' || status === 'stale' ? canonicalTimestamp : null,
    checked_url_or_path: 'evidence/path',
    evidence_type: 'test',
    evidence_reference: 'deterministic fixture',
    confidence: 'high',
    ...(status === 'verified' || status === 'stale' ? {} : { failure_reason: 'evidence missing' }),
    ...overrides,
  };
}

function fixture() {
  const publicationAttemptId = 'morning-2026-07-14T07-30-00+02-00';
  const tracePath = 'projects/codex-automation/system-health-dashboard-publication-trace.json';
  const dashboard = {
    last_updated: canonicalTimestamp,
    publication_evidence: {
      publication_attempt_id: publicationAttemptId,
      trace_path: tracePath,
      publication_status: 'STALE',
      success_allowed: false,
      stages: {
        canonical_updated: { status: 'verified' },
        mirror_synced: { status: 'verified' },
        deploy_identified: { status: 'stale' },
        live_verified: { status: 'needs_verification' },
      },
    },
  };
  const trace = {
    schema_version: 1,
    trace_path: tracePath,
    publication_attempt_id: publicationAttemptId,
    canonical_snapshot_timestamp: canonicalTimestamp,
    publication_status: 'STALE',
    success_allowed: false,
    stages: {
      canonical_updated: stage('verified', { commit_sha: shaA, blob_sha: shaB }),
      mirror_synced: stage('verified', { commit_sha: shaB, blob_sha: shaB }),
      deploy_identified: stage('stale', {
        timestamp: '2026-07-11T09:07:37.194Z',
        deploy_id: '6a5207d064f1feba62676b5e',
        source_commit_sha: null,
        branch: null,
        failure_reason: 'deploy predates canonical snapshot',
      }),
      live_verified: stage('needs_verification'),
    },
  };
  return { dashboard, trace };
}

test('accepts a stale publication trace without claiming LIVE', () => {
  const { dashboard, trace } = fixture();
  assert.deepEqual(validatePublicationContract(dashboard, trace), []);
});

test('rejects a missing publication attempt id', () => {
  const { dashboard, trace } = fixture();
  trace.publication_attempt_id = '';
  assert.match(validatePublicationContract(dashboard, trace).join('\n'), /publication_attempt_id is required/);
});

test('rejects an old deploy marked verified', () => {
  const { dashboard, trace } = fixture();
  dashboard.publication_evidence.stages.deploy_identified.status = 'verified';
  trace.stages.deploy_identified.status = 'verified';
  assert.match(validatePublicationContract(dashboard, trace).join('\n'), /older than the canonical snapshot must be marked stale/);
});

test('rejects LIVE without source branch and commit', () => {
  const { dashboard, trace } = fixture();
  dashboard.publication_evidence.publication_status = 'LIVE';
  dashboard.publication_evidence.success_allowed = true;
  trace.publication_status = 'LIVE';
  trace.success_allowed = true;
  for (const name of ['deploy_identified', 'live_verified']) {
    dashboard.publication_evidence.stages[name].status = 'verified';
    trace.stages[name] = stage('verified', trace.stages[name]);
  }
  trace.stages.deploy_identified.timestamp = '2026-07-14T06:00:00Z';
  trace.stages.live_verified.public_last_updated = canonicalTimestamp;
  trace.stages.live_verified.live_verified_at = '2026-07-14T06:01:00Z';
  const errors = validatePublicationContract(dashboard, trace).join('\n');
  assert.match(errors, /source_commit_sha is required/);
  assert.match(errors, /branch is required/);
});

test('rejects LIVE when public timestamp differs from canonical', () => {
  const { dashboard, trace } = fixture();
  dashboard.publication_evidence.publication_status = 'LIVE';
  dashboard.publication_evidence.success_allowed = true;
  trace.publication_status = 'LIVE';
  trace.success_allowed = true;
  dashboard.publication_evidence.stages.deploy_identified.status = 'verified';
  dashboard.publication_evidence.stages.live_verified.status = 'verified';
  trace.stages.deploy_identified = stage('verified', {
    deploy_id: 'deploy-current', source_commit_sha: shaA, branch: 'main', timestamp: '2026-07-14T06:00:00Z',
  });
  trace.stages.live_verified = stage('verified', {
    public_last_updated: '2026-07-14T07:29:00+02:00', live_verified_at: '2026-07-14T06:01:00Z',
  });
  assert.match(validatePublicationContract(dashboard, trace).join('\n'), /public_last_updated equal to canonical_snapshot_timestamp/);
});

test('accepts a fully source-mapped LIVE publication', () => {
  const { dashboard, trace } = fixture();
  dashboard.publication_evidence.publication_status = 'LIVE';
  dashboard.publication_evidence.success_allowed = true;
  trace.publication_status = 'LIVE';
  trace.success_allowed = true;
  dashboard.publication_evidence.stages.deploy_identified.status = 'verified';
  dashboard.publication_evidence.stages.live_verified.status = 'verified';
  trace.stages.deploy_identified = stage('verified', {
    deploy_id: 'deploy-current', source_commit_sha: shaA, branch: 'main', timestamp: '2026-07-14T06:00:00Z',
  });
  trace.stages.live_verified = stage('verified', {
    public_last_updated: canonicalTimestamp, live_verified_at: '2026-07-14T06:01:00Z',
  });
  assert.deepEqual(validatePublicationContract(dashboard, trace), []);
});
