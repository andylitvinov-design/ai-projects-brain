#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_INPUT = 'projects/codex-automation/strategic-source-observations.json';
const DEFAULT_OUTPUT = 'projects/codex-automation/strategic-evidence.json';
const EVIDENCE_STATES = new Set(['PROVEN', 'NEEDS_VERIFICATION', 'BLOCKED', 'RESOLVED', 'SUPERSEDED']);
const SOURCE_STATES = new Set([
  'merged_verified',
  'workflow_success',
  'live_verified',
  'observed_outcome',
  'owner_confirmed',
  'blocked',
  'needs_verification',
]);

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function assertObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
}

function assertString(value, label) {
  if (!value || typeof value !== 'string') throw new Error(`${label} is required`);
}

function assertTimestamp(value, label) {
  if (!value || !Number.isFinite(Date.parse(value))) throw new Error(`${label} must be a valid timestamp`);
}

function assertScore(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error(`${label} must be a number from 0 to 100`);
  }
}

function assertHttpsUrl(value, label) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid URL`);
  }
  if (parsed.protocol !== 'https:') throw new Error(`${label} must use https`);
  return parsed;
}

function assertGitHubPullRequest(parsed, label) {
  if (parsed.hostname !== 'github.com' || !/^\/[^/]+\/[^/]+\/pull\/\d+\/?$/.test(parsed.pathname)) {
    throw new Error(`${label} must point to a GitHub pull request`);
  }
}

function assertGitHubWorkflowRun(parsed, label) {
  if (parsed.hostname !== 'github.com' || !/^\/[^/]+\/[^/]+\/actions\/runs\/\d+\/?$/.test(parsed.pathname)) {
    throw new Error(`${label} must point to a GitHub Actions run`);
  }
}

function assertCommitSha(value, label) {
  if (typeof value !== 'string' || !/^[0-9a-f]{40}$/i.test(value)) {
    throw new Error(`${label} must be a 40-character commit SHA`);
  }
}

function validateProof(observation, label) {
  assertObject(observation.proof, `${label}.proof`);
  const parsedSource = assertHttpsUrl(observation.source_url, `${label}.source_url`);

  if (observation.source_state === 'merged_verified') {
    assertGitHubPullRequest(parsedSource, `${label}.source_url`);
    if (observation.proof.merged !== true) throw new Error(`${label}.proof.merged must be true`);
    assertCommitSha(observation.source_ref, `${label}.source_ref`);
    return;
  }

  if (observation.source_state === 'workflow_success') {
    assertGitHubWorkflowRun(parsedSource, `${label}.source_url`);
    if (observation.proof.conclusion !== 'success') {
      throw new Error(`${label}.proof.conclusion must be success`);
    }
    if (!Number.isInteger(Number(observation.proof.run_id)) || Number(observation.proof.run_id) <= 0) {
      throw new Error(`${label}.proof.run_id must be a positive integer`);
    }
    assertCommitSha(observation.source_ref, `${label}.source_ref`);
    return;
  }

  if (observation.source_state === 'live_verified') {
    if (observation.requires_live_proof !== true) {
      throw new Error(`${label}.requires_live_proof must be true for live_verified evidence`);
    }
    const required = ['public_timestamp_match', 'source_commit_match', 'receipt_match', 'visible_surface_match'];
    for (const key of required) {
      if (observation.proof[key] !== true) throw new Error(`${label}.proof.${key} must be true`);
    }
    assertHttpsUrl(observation.proof.public_url, `${label}.proof.public_url`);
    assertString(observation.source_ref, `${label}.source_ref`);
    return;
  }

  if (observation.source_state === 'observed_outcome') {
    assertString(observation.proof.metric_name, `${label}.proof.metric_name`);
    if (!Object.hasOwn(observation.proof, 'observed_value')) {
      throw new Error(`${label}.proof.observed_value is required`);
    }
    assertString(observation.proof.unit, `${label}.proof.unit`);
    assertTimestamp(observation.proof.window_start, `${label}.proof.window_start`);
    assertTimestamp(observation.proof.window_end, `${label}.proof.window_end`);
    if (Date.parse(observation.proof.window_end) < Date.parse(observation.proof.window_start)) {
      throw new Error(`${label}.proof.window_end must not precede window_start`);
    }
    assertString(observation.source_ref, `${label}.source_ref`);
    return;
  }

  if (observation.source_state === 'owner_confirmed') {
    assertString(observation.proof.confirmation_ref, `${label}.proof.confirmation_ref`);
    assertTimestamp(observation.proof.confirmed_at, `${label}.proof.confirmed_at`);
    assertString(observation.source_ref, `${label}.source_ref`);
    return;
  }

  if (observation.source_state === 'blocked' || observation.source_state === 'needs_verification') {
    assertString(observation.proof.missing_proof, `${label}.proof.missing_proof`);
    assertString(observation.source_ref, `${label}.source_ref`);
  }
}

function validateObservation(observation, index) {
  const label = `observations[${index}]`;
  assertObject(observation, label);
  assertString(observation.id, `${label}.id`);
  if (!['project', 'system'].includes(observation.target_type)) {
    throw new Error(`${label}.target_type must be project or system`);
  }
  if (observation.target_type === 'project') assertString(observation.project_id, `${label}.project_id`);
  assertString(observation.rubric_id, `${label}.rubric_id`);
  assertScore(observation.proposed_score, `${label}.proposed_score`);
  if (!EVIDENCE_STATES.has(observation.evidence_state)) {
    throw new Error(`${label}.evidence_state is invalid`);
  }
  if (!SOURCE_STATES.has(observation.source_state)) throw new Error(`${label}.source_state is invalid`);
  assertTimestamp(observation.observed_at, `${label}.observed_at`);
  assertString(observation.summary, `${label}.summary`);
  validateProof(observation, label);
}

function evidenceEntryFromObservation(observation) {
  const entry = {
    id: observation.id,
    target_type: observation.target_type,
    rubric_id: observation.rubric_id,
    proposed_score: observation.proposed_score,
    evidence_state: observation.evidence_state,
    source_state: observation.source_state,
    requires_live_proof: Boolean(observation.requires_live_proof),
    source_url: observation.source_url,
    source_ref: observation.source_ref,
    observed_at: observation.observed_at,
    summary: observation.summary,
  };
  if (observation.target_type === 'project') entry.project_id = observation.project_id;
  for (const key of [
    'missing_conditions_remove',
    'missing_conditions_add',
    'next_quality_threshold',
    'goal_evidence_state',
  ]) {
    if (observation[key] !== undefined) entry[key] = observation[key];
  }
  return entry;
}

export function buildStrategicEvidence(observationDocument, existingLedger = null) {
  if (observationDocument?.schema_version !== 1) throw new Error('observations.schema_version must be 1');
  assertTimestamp(observationDocument.observed_at, 'observations.observed_at');
  if (!Array.isArray(observationDocument.observations)) {
    throw new Error('observations.observations must be an array');
  }

  const duplicateIds = observationDocument.observations
    .map((observation) => observation?.id)
    .filter((id, index, all) => id && all.indexOf(id) !== index);
  if (duplicateIds.length) throw new Error(`duplicate observation ids: ${[...new Set(duplicateIds)].join(', ')}`);

  const existingEntries = Array.isArray(existingLedger?.entries) ? existingLedger.entries : [];
  const entriesById = new Map(existingEntries.map((entry) => [entry.id, entry]));
  for (const [index, observation] of observationDocument.observations.entries()) {
    validateObservation(observation, index);
    entriesById.set(observation.id, evidenceEntryFromObservation(observation));
  }

  return {
    schema_version: 1,
    observed_at: observationDocument.observed_at,
    status: 'source_linked_verified_evidence',
    scoring_policy: existingLedger?.scoring_policy
      || 'Apply only dimension-level changes backed by immutable source references. Code-only evidence cannot satisfy a live-required condition.',
    entries: [...entriesById.values()].sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function atomicWrite(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, filePath);
}

function main() {
  const args = process.argv.slice(2);
  const inputFile = argValue(args, '--input', DEFAULT_INPUT);
  const outputFile = argValue(args, '--output', DEFAULT_OUTPUT);
  const observations = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const existing = fs.existsSync(outputFile) ? JSON.parse(fs.readFileSync(outputFile, 'utf8')) : null;
  const ledger = buildStrategicEvidence(observations, existing);
  atomicWrite(outputFile, ledger);
  process.stdout.write(`${JSON.stringify({
    status: 'STRATEGIC_SOURCE_EVIDENCE_BUILT',
    observed_at: ledger.observed_at,
    observation_count: observations.observations.length,
    evidence_count: ledger.entries.length,
  })}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
