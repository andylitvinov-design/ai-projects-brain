#!/usr/bin/env node
import fs from "node:fs";

const dashboardPath = process.argv[2] || "projects/codex-automation/system-health-dashboard.json";
const registryPath = process.argv[3] || "projects/portfolio-registry.json";
const dashboard = JSON.parse(fs.readFileSync(dashboardPath, "utf8"));
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const errors = [];
const sectors = ["execution","product_value","business_growth","standards","reliability","learning"];
const lifecycleStates = new Set(["candidate","active","watch","needs_revision","superseded","retired"]);

if (dashboard.schema_version !== 6) errors.push("dashboard schema_version must be 6");
if (!Array.isArray(dashboard.goal_pyramid) || dashboard.goal_pyramid.length !== 3) errors.push("exactly three goals required");

const registryIds = registry.projects.map((p) => p.project_id).sort();
const healthIds = dashboard.project_health.map((p) => p.project_id).sort();
if (JSON.stringify(registryIds) !== JSON.stringify(healthIds)) errors.push("registry/project-health IDs differ");
for (const project of dashboard.project_health) {
  for (const sector of sectors) {
    if (!project.sectors || !(sector in project.sectors)) errors.push(`${project.project_id}: missing ${sector}`);
  }
}

const fieldIndex = Object.fromEntries(dashboard.metric_schema.map((field, index) => [field, index]));
const requiredFields = ["id","type","value","numerator","denominator","unit","period","source","goal","sector","lifecycle"];
for (const field of requiredFields) if (!(field in fieldIndex)) errors.push(`metric_schema missing ${field}`);
const metrics = dashboard.metrics.map((row) => Object.fromEntries(dashboard.metric_schema.map((field, index) => [field, row[index]])));
const metricIds = metrics.map((metric) => metric.id);
const assigned = dashboard.goal_pyramid.flatMap((goal) => goal.sectors.flatMap((sector) => sector.metric_ids));
if (assigned.length !== new Set(assigned).size) errors.push("duplicate goal metric assignment");
if (JSON.stringify([...assigned].sort()) !== JSON.stringify([...metricIds].sort())) errors.push("goal assignments must cover every metric exactly once");

for (const metric of metrics) {
  if (!lifecycleStates.has(metric.lifecycle)) errors.push(`${metric.id}: invalid lifecycle`);
  if (!metric.goal || !metric.sector || !metric.source || !metric.period || !metric.unit) errors.push(`${metric.id}: incomplete evidence contract`);
  if (["count","ratio","duration","currency"].includes(metric.type)) {
    if (metric.numerator === null || metric.denominator === null) errors.push(`${metric.id}: numeric metric missing numerator/denominator`);
  }
}
const publication = dashboard.publication_evidence;
if (publication.publication_status === "LIVE") {
  const stages = publication.stages;
  if (!publication.success_allowed || Object.values(stages).some((stage) => stage.status !== "verified")) errors.push("LIVE requires 4/4 verified stages");
}
if (errors.length) {
  console.error(JSON.stringify({status:"FAIL",errors},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"PASS",
  projects:registryIds.length,
  sector_records:registryIds.length * sectors.length,
  goals:dashboard.goal_pyramid.length,
  metrics:metricIds.length,
  duplicate_metric_assignments:assigned.length - new Set(assigned).size
}));
