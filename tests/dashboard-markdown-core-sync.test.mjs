import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { syncDashboardMarkdownCore } from '../scripts/sync-dashboard-markdown-core.mjs';

const dashboard = JSON.parse(fs.readFileSync('projects/codex-automation/system-health-dashboard.json', 'utf8'));
const markdown = fs.readFileSync('projects/codex-automation/system-health-dashboard.md', 'utf8');

function coreOf(value) {
  return value.split(/\n\n<!-- (?:MORNING|EVENING)_UPGRADE:/)[0];
}

test('refreshes the mutable Markdown core from the exact dashboard JSON', () => {
  const result = syncDashboardMarkdownCore(markdown, dashboard);
  const core = coreOf(result);
  const stages = dashboard.publication_evidence.stages;

  assert.match(core, new RegExp(dashboard.last_updated.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(core, new RegExp(stages.deploy_identified.deploy_id));
  assert.match(core, new RegExp(`${dashboard.validation.passed_checks}/${dashboard.validation.executed_checks} PASS`));
  assert.match(core, new RegExp(dashboard.publication_evidence.publication_status));

  for (const item of dashboard.metric_impact) {
    assert.match(core, new RegExp(item.change.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.doesNotMatch(core, /6a5207d064f1feba62676b5e/);
  assert.doesNotMatch(core, /2026-07-15T07:51:30\+02:00/);
});

test('preserves immutable Morning and Evening history appendices', () => {
  const result = syncDashboardMarkdownCore(markdown, dashboard);
  const markersBefore = markdown.match(/<!-- (?:MORNING|EVENING)_UPGRADE:[^>]+-->/g) ?? [];
  const markersAfter = result.match(/<!-- (?:MORNING|EVENING)_UPGRADE:[^>]+-->/g) ?? [];

  assert.deepEqual(markersAfter, markersBefore);
  assert.match(result, /MORNING_UPGRADE:morning-2026-07-17-cycle-neutral-publication-evidence/);
  assert.match(result, /EVENING_UPGRADE:evening-architecture-2026-07-15-exact-snapshot-publisher/);
});

test('is idempotent for an unchanged dashboard snapshot', () => {
  const once = syncDashboardMarkdownCore(markdown, dashboard);
  const twice = syncDashboardMarkdownCore(once, dashboard);
  assert.equal(twice, once);
});
