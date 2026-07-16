#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const STAGES = ['canonical_updated', 'mirror_synced', 'deploy_identified', 'live_verified'];
const STATUSES = new Set(['verified', 'needs_verification', 'blocked', 'unknown', 'stale']);
const TRACE_SCHEMA_VERSIONS = new Set([1, 2]);
const DEFAULT_TRACE_PATH = 'projects/codex-automation/system-health-dashboard-publication-trace.json';
const SHA40 = /^[0-9a-f]{40}$/i;

function nonEmpty(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function validDate(value) {
  return nonEmpty(value) && Number.isFinite(Date.parse(value));
}

function stageErrors(stageName, stage) {
  const errors = [];
  const prefix = `trace.${stageName}`;
  if (!stage || typeof stage !== 'object' || Array.isArray(stage)) return [`${prefix} is required`];
  if (!STATUSES.has(stage.status)) errors.push(`${prefix}.status is invalid`);
  for (const field of ['checked_url_or_path', 'evidence_type', 'evidence_reference', 'confidence']) {
    if (!nonEmpty(stage[field])) errors.push(`${prefix}.${field} is required`);
  }
  if (stage.status === 'verified' || stage.status === 'stale') {
    if (!validDate(stage.timestamp)) errors.push(`${prefix}.timestamp must be a valid timestamp for ${stage.status}`);
  } else if (!nonEmpty(stage.failure_reason)) {
    errors.push(`${prefix}.failure_reason is required when status is ${stage.status ?? 'missing'}`);
  }
  return errors;
}

function validStageTransition(stageName, dashboardStatus, traceStatus) {
  return stageName === 'mirror_synced'
    && ['needs_update', 'needs_verification'].includes(dashboardStatus)
    && traceStatus === 'verified';
}

export function validatePublicationContract(dashboard, trace) {
  const errors = [];
  if (!dashboard || typeof dashboard !== 'object' || Array.isArray(dashboard)) return ['dashboard must be an object'];
  if (!trace || typeof trace !== 'object' || Array.isArray(trace)) return ['publication trace must be an object'];

  if (!TRACE_SCHEMA_VERSIONS.has(trace.schema_version)) {
    errors.push(`trace.schema_version must be 1 or 2, received ${trace.schema_version ?? 'missing'}`);
  }
  if (!nonEmpty(trace.publication_attempt_id)) errors.push('trace.publication_attempt_id is required');
  if (trace.publication_attempt_id !== dashboard.publication_evidence?.publication_attempt_id) {
    errors.push('trace publication_attempt_id must match dashboard publication_evidence');
  }
  if (!validDate(trace.canonical_snapshot_timestamp)) errors.push('trace.canonical_snapshot_timestamp must be a valid timestamp');
  if (trace.canonical_snapshot_timestamp !== dashboard.last_updated) {
    errors.push('trace canonical_snapshot_timestamp must equal dashboard.last_updated');
  }
  const dashboardTracePath = dashboard.publication_evidence?.trace_path ?? DEFAULT_TRACE_PATH;
  if (dashboardTracePath !== trace.trace_path) {
    errors.push('dashboard publication trace_path must match trace.trace_path');
  }

  for (const stageName of STAGES) {
    errors.push(...stageErrors(stageName, trace.stages?.[stageName]));
    const dashboardStatus = dashboard.publication_evidence?.stages?.[stageName]?.status;
    const traceStatus = trace.stages?.[stageName]?.status;
    if (dashboardStatus !== traceStatus && !validStageTransition(stageName, dashboardStatus, traceStatus)) {
      errors.push(`${stageName} status must match dashboard summary`);
    }
  }

  const canonical = trace.stages?.canonical_updated;
  if (canonical?.status === 'verified') {
    if (!SHA40.test(canonical.commit_sha ?? '')) errors.push('canonical_updated.commit_sha must be a 40-character SHA');
    if (!SHA40.test(canonical.blob_sha ?? '')) errors.push('canonical_updated.blob_sha must be a 40-character SHA');
  }

  const mirror = trace.stages?.mirror_synced;
  if (mirror?.status === 'verified') {
    if (!SHA40.test(mirror.commit_sha ?? '')) errors.push('mirror_synced.commit_sha must be a 40-character SHA');
    if (!SHA40.test(mirror.blob_sha ?? '')) errors.push('mirror_synced.blob_sha must be a 40-character SHA');
    if (canonical?.status === 'verified' && mirror.blob_sha !== canonical.blob_sha) {
      errors.push('canonical and mirror blob_sha must be identical');
    }
  }

  const deploy = trace.stages?.deploy_identified;
  if (deploy?.status === 'verified' || deploy?.status === 'stale') {
    if (!nonEmpty(deploy.deploy_id)) errors.push('deploy_identified.deploy_id is required');
    if (validDate(deploy.timestamp) && validDate(trace.canonical_snapshot_timestamp)) {
      const olderThanCanonical = Date.parse(deploy.timestamp) < Date.parse(trace.canonical_snapshot_timestamp);
      if (olderThanCanonical && deploy.status !== 'stale') {
        errors.push('a deploy older than the canonical snapshot must be marked stale');
      }
    }
  }

  const live = trace.stages?.live_verified;
  const allVerified = STAGES.every((stageName) => trace.stages?.[stageName]?.status === 'verified');
  const liveClaimed = trace.publication_status === 'LIVE' || trace.success_allowed === true;
  if (liveClaimed && !allVerified) errors.push('LIVE publication requires all four stages verified');
  if (trace.success_allowed !== (trace.publication_status === 'LIVE' && allVerified)) {
    errors.push('success_allowed must be true only for a fully verified LIVE publication');
  }
  if (liveClaimed) {
    for (const [field, value] of [
      ['deploy_identified.source_commit_sha', deploy?.source_commit_sha],
      ['deploy_identified.branch', deploy?.branch],
      ['live_verified.public_last_updated', live?.public_last_updated],
      ['live_verified.live_verified_at', live?.live_verified_at],
    ]) {
      if (!nonEmpty(value)) errors.push(`${field} is required for LIVE publication`);
    }
    if (!SHA40.test(deploy?.source_commit_sha ?? '')) errors.push('deploy_identified.source_commit_sha must be a 40-character SHA for LIVE publication');
    if (live?.public_last_updated !== trace.canonical_snapshot_timestamp) {
      errors.push('LIVE publication requires public_last_updated equal to canonical_snapshot_timestamp');
    }
    if (!validDate(live?.live_verified_at)) errors.push('live_verified.live_verified_at must be a valid timestamp for LIVE publication');
  }

  if (trace.publication_status !== dashboard.publication_evidence?.publication_status) {
    errors.push('trace publication_status must match dashboard publication_evidence');
  }
  if (trace.success_allowed !== dashboard.publication_evidence?.success_allowed) {
    errors.push('trace success_allowed must match dashboard publication_evidence');
  }
  return errors;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const dashboardFile = args.includes('--file')
    ? path.resolve(args[args.indexOf('--file') + 1])
    : path.join(root, 'projects/codex-automation/system-health-dashboard.json');
  const dashboard = await readJson(dashboardFile);
  const traceFile = args.includes('--trace')
    ? path.resolve(args[args.indexOf('--trace') + 1])
    : path.join(root, dashboard.publication_evidence?.trace_path ?? DEFAULT_TRACE_PATH);
  const trace = await readJson(traceFile);
  const errors = validatePublicationContract(dashboard, trace);
  if (errors.length) throw new Error(errors.join('\n'));
  process.stdout.write(`Validated publication attempt ${trace.publication_attempt_id}: ${trace.publication_status}\n`);
  for (const stageName of STAGES) process.stdout.write(`${stageName}=${trace.stages[stageName].status}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
