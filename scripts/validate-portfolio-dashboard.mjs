#!/usr/bin/env node
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const sectors = ["execution","product_value","business_growth","standards","reliability","learning"];
const lifecycleStates = new Set(["candidate","active","watch","needs_revision","superseded","retired"]);
const assessmentStatuses = new Set(["PASS","WATCH","FAIL","BLOCKED","NOT_TESTED"]);

function parseMarkdown(markdown) {
  const match = (pattern, label) => {
    const value = markdown.match(pattern)?.[1];
    return value ?? `__MISSING_${label}__`;
  };
  return {
    metric_model: match(/\*\*Metric model:\*\*\s*`([^`]+)`/, "METRIC_MODEL"),
    last_updated: match(/\*\*Last updated:\*\*\s*`([^`]+)`/, "LAST_UPDATED"),
    result: match(/\*\*(?:Morning|Evening) result:\*\*\s*`([^`]+)`/, "RESULT"),
    public_state: match(/\*\*Public publication state:\*\*\s*`([^`]+)`/, "PUBLIC_STATE")
  };
}

export function validatePortfolioDashboard(dashboard, registry, markdown) {
  const errors = [];

  if (dashboard.schema_version !== 6) errors.push("dashboard schema_version must be 6");
  if (dashboard.metric_model !== "adaptive_portfolio_project_goal_v1") errors.push("dashboard metric_model must be adaptive_portfolio_project_goal_v1");
  if (!Array.isArray(dashboard.goal_pyramid) || dashboard.goal_pyramid.length !== 3) errors.push("exactly three goals required");

  const registryIds = registry.projects.map((p) => p.project_id).sort();
  const healthIds = dashboard.project_health.map((p) => p.project_id).sort();
  if (JSON.stringify(registryIds) !== JSON.stringify(healthIds)) errors.push("registry/project-health IDs differ");
  if (dashboard.portfolio_health?.active_projects !== registryIds.length) errors.push("portfolio active_projects must equal registry size");

  const blockedProjects = dashboard.project_health.filter((project) => project.status === "BLOCKED" || Object.values(project.sectors || {}).includes("BLOCKED")).length;
  if (dashboard.portfolio_health?.blocked_projects !== blockedProjects) errors.push("portfolio blocked_projects must equal projects blocked by status or sector guardrail");

  const observedIds = dashboard.portfolio_health?.observed_project_ids;
  if (!Array.isArray(observedIds)) {
    errors.push("portfolio observed_project_ids required");
  } else {
    if (dashboard.portfolio_health?.observed_projects !== observedIds.length) errors.push("portfolio observed_projects must equal observed_project_ids length");
    for (const id of observedIds) if (!registryIds.includes(id)) errors.push(`observed project missing from registry: ${id}`);
  }

  for (const project of dashboard.project_health) {
    for (const sector of sectors) {
      if (!project.sectors || !(sector in project.sectors)) errors.push(`${project.project_id}: missing ${sector}`);
    }
    if (!project.observation_basis) errors.push(`${project.project_id}: missing observation_basis`);
  }

  if (!Array.isArray(dashboard.agent_assessments)) {
    errors.push("agent_assessments must be an array");
  } else {
    const requiredAssessmentFields = [
      "project_id","agent","sector","observed_at","status","applicable_checks","passed_checks",
      "finding_count","critical_finding_count","evidence_refs","summary","recommended_action","confidence"
    ];
    for (const [index, assessment] of dashboard.agent_assessments.entries()) {
      for (const field of requiredAssessmentFields) {
        if (!(field in assessment)) errors.push(`agent_assessments[${index}] missing ${field}`);
      }
      if (!assessmentStatuses.has(assessment.status)) errors.push(`agent_assessments[${index}] invalid status`);
      if (!registryIds.includes(assessment.project_id)) errors.push(`agent_assessments[${index}] unknown project`);
      if (assessment.status !== "NOT_TESTED") {
        if (!Number.isInteger(assessment.applicable_checks) || !Number.isInteger(assessment.passed_checks)) {
          errors.push(`agent_assessments[${index}] tested assessment requires integer check counts`);
        } else if (assessment.passed_checks > assessment.applicable_checks) {
          errors.push(`agent_assessments[${index}] passed_checks exceeds applicable_checks`);
        }
      }
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
  if (publication.canonical_snapshot_timestamp !== dashboard.last_updated) errors.push("publication canonical timestamp must equal dashboard last_updated");
  if (publication.publication_status === "LIVE") {
    const stages = publication.stages;
    if (!publication.success_allowed || Object.values(stages).some((stage) => stage.status !== "verified")) errors.push("LIVE requires 4/4 verified stages");
    if (stages.live_verified?.timestamp !== dashboard.last_updated) errors.push("LIVE requires public timestamp equal to dashboard last_updated");
  }

  const markdownMeta = parseMarkdown(markdown);
  if (markdownMeta.metric_model !== dashboard.metric_model) errors.push("Markdown metric model differs from JSON");
  if (markdownMeta.last_updated !== dashboard.last_updated) errors.push("Markdown last_updated differs from JSON");
  if (markdownMeta.result !== dashboard.main_upgrade?.status) errors.push("Markdown run result differs from JSON main_upgrade status");
  if (markdownMeta.public_state !== publication.publication_status) errors.push("Markdown public publication state differs from JSON");

  return errors;
}

function main() {
  const dashboardPath = process.argv[2] || "projects/codex-automation/system-health-dashboard.json";
  const registryPath = process.argv[3] || "projects/portfolio-registry.json";
  const markdownPath = process.argv[4] || "projects/codex-automation/system-health-dashboard.md";
  const dashboard = JSON.parse(fs.readFileSync(dashboardPath, "utf8"));
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const markdown = fs.readFileSync(markdownPath, "utf8");
  const errors = validatePortfolioDashboard(dashboard, registry, markdown);

  if (errors.length) {
    console.error(JSON.stringify({status:"FAIL",errors},null,2));
    process.exit(1);
  }

  console.log(JSON.stringify({
    status:"PASS",
    projects:registry.projects.length,
    sector_records:registry.projects.length * sectors.length,
    goals:dashboard.goal_pyramid.length,
    metrics:dashboard.metrics.length,
    agent_assessments:dashboard.agent_assessments.length,
    snapshot_consistency_checks:4
  }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
