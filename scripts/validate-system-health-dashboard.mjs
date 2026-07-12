#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AXIS_IDS = ['product_delivery', 'system_improvement', 'business_growth'];
const VALUE_FIELDS = ['today', 'yesterday', 'change'];
const NON_OUTCOME_TERMS = ['issue', 'prompt', 'plan', 'docs', 'documentation'];

function isUnknown(value) {
  return typeof value === 'string' && value.trim().toLowerCase() === 'unknown';
}
function isNumberOrUnknown(value) {
  return typeof value === 'number' && Number.isFinite(value) || isUnknown(value);
}

function creditedNonOutcome(value) {
  const text = String(value ?? '').toLowerCase();
  if (/\b(not counted|not credited|does not count|не засчит)/.test(text)) return null;
  const verb = /(counted|credited|raised|increase[ds]?|improve[ds]?|progress|contribut(?:e|ed|es)|засчит|повыс|улучш|прогресс)/;
  if (!verb.test(text)) return null;
  return NON_OUTCOME_TERMS.find((term) => new RegExp(`\\b${term}\\b`).test(text)) ?? null;
}

export function validateDashboard(data, { mirror } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['dashboard must be a JSON object'];
  if (data.schema_version !== 4) errors.push(`schema_version must be 4, received ${data.schema_version ?? 'missing'}`);

  if (!Array.isArray(data.metrics) || data.metrics.length !== 10) {
    errors.push(`expected 10 core metrics, received ${Array.isArray(data.metrics) ? data.metrics.length : 'missing'}`);
  }
  if (!Array.isArray(data.operational_indicators) || data.operational_indicators.length !== 7) {
    errors.push(`expected 7 operational indicators, received ${Array.isArray(data.operational_indicators) ? data.operational_indicators.length : 'missing'}`);
  }

  const model = data.momentum_model;
  if (!model || typeof model !== 'object') {
    errors.push('missing momentum_model');
    return errors;
  }
  if (model.formula !== '(product_delivery + system_improvement + business_growth) / 3') {
    errors.push('momentum formula must be (product_delivery + system_improvement + business_growth) / 3');
  }

  const dimensions = Array.isArray(model.dimensions) ? model.dimensions : [];
  const byId = new Map(dimensions.map((dimension) => [dimension?.id, dimension]));
  for (const axis of AXIS_IDS) {
    const dimension = byId.get(axis);
    if (!dimension) {
      errors.push(`missing momentum dimension: ${axis}`);
      continue;
    }
    for (const field of VALUE_FIELDS) {
      if (!isNumberOrUnknown(dimension[field])) {
        errors.push(`${axis} ${field} must be a number or marked unknown`);
      }
    }
    for (const field of ['confidence', 'evidence', 'what_improves_it']) {
      if (typeof dimension[field] !== 'string' || dimension[field].trim() === '') {
        errors.push(`${axis} requires ${field}`);
      }
    }
    if (axis !== 'system_improvement') {
      for (const field of ['evidence', 'what_improves_it']) {
        const term = creditedNonOutcome(dimension[field]);
        if (term) errors.push(`${axis} credits non-outcome work: ${term}`);
      }
    }
  }

  for (const field of ['today', 'yesterday']) {
    const values = AXIS_IDS.map((axis) => byId.get(axis)?.[field]);
    const compositeField = `${field}_score`;
    const composite = model[compositeField];
    if (!values.every(isNumberOrUnknown)) continue;
    if (values.some(isUnknown)) {
      if (!isUnknown(composite)) errors.push(`${compositeField} must be marked unknown when an axis is unknown`);
      continue;
    }
    const mean = Math.round(values.reduce((sum, value) => sum + value, 0) / AXIS_IDS.length);
    if (composite !== mean) {
      errors.push(`${compositeField} ${composite} does not equal the three-axis mean ${mean}`);
    }
    if (composite === byId.get('system_improvement')?.[field] && composite !== mean) {
      errors.push('System Improvement cannot be used as the whole Momentum score');
    }
  }

  const publication = data.publication_evidence;
  if (!publication || typeof publication !== 'object') {
    errors.push('missing publication_evidence');
  } else {
    const successClaimed = publication.publication_status === 'LIVE' || publication.success_allowed === true;
    if (successClaimed) {
      for (const stage of ['canonical_updated', 'mirror_synced', 'deploy_identified', 'live_verified']) {
        if (publication.stages?.[stage]?.status !== 'verified') {
          errors.push(`public success requires verified stage: ${stage}`);
        }
      }
    }
    if (mirror && publication.canonical_snapshot_timestamp !== mirror.last_updated) {
      errors.push(`canonical and mirror timestamps differ: ${publication.canonical_snapshot_timestamp} != ${mirror.last_updated}`);
    }
  }
  return errors;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function main() {
  const args = process.argv.slice(2);
  const file = args.includes('--file')
    ? args[args.indexOf('--file') + 1]
    : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../projects/codex-automation/system-health-dashboard.json');
  const mirrorFile = args.includes('--mirror') ? args[args.indexOf('--mirror') + 1] : null;
  const [data, mirror] = await Promise.all([readJson(file), mirrorFile ? readJson(mirrorFile) : Promise.resolve(null)]);
  const errors = validateDashboard(data, { mirror });
  if (errors.length) throw new Error(errors.join('\n'));
  process.stdout.write(`Validated schema v4 dashboard: ${path.resolve(file)}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
