import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PROJECTS_JSON = path.join(ROOT, 'projects.json');
const OUTPUT = path.join(ROOT, 'data', 'project-index.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function slugFor(project) {
  return project.name;
}

function hasNeedsVerification(value) {
  if (value === 'needs verification') return true;
  if (Array.isArray(value)) return value.some(hasNeedsVerification);
  if (value && typeof value === 'object') {
    return Object.values(value).some(hasNeedsVerification);
  }
  return false;
}

const database = readJson(PROJECTS_JSON);

if (!Array.isArray(database.projects)) {
  throw new Error('projects.json must contain a projects array');
}

const generatedAt = new Date().toISOString();

const index = {
  schema_version: 'project-index-v1',
  generated_at: generatedAt,
  source: 'projects.json',
  projects: database.projects.map((project) => {
    const slug = slugFor(project);
    const memory = project.memory || {};

    return {
      name: project.name,
      slug,
      purpose: project.purpose || 'needs verification',
      live_url: project.live_url || 'needs verification',
      repo_url: project.repo_url || 'needs verification',
      hosting: project.hosting || 'needs verification',
      status_summary: project.current_status || 'needs verification',
      memory_files: {
        project_md: memory.project_md || `projects/${slug}/PROJECT.md`,
        system_map:
          memory.system_map || `projects/${slug}/SYSTEM_MAP.md`,
        data_schema:
          memory.data_schema || `projects/${slug}/DATA_SCHEMA.md`,
        code_access:
          memory.code_access || `projects/${slug}/CODE_ACCESS.md`,
        data_samples:
          memory.data_samples || `projects/${slug}/DATA_SAMPLES.md`,
        debug_log: memory.debug_log || `projects/${slug}/DEBUG_LOG.md`,
        risks: memory.risks || `projects/${slug}/RISKS.md`,
        codex_brief:
          memory.codex_brief || `projects/${slug}/CODEX_BRIEF.md`,
        state_file: memory.state_file || 'needs verification',
        log_file: memory.log_file || 'needs verification',
      },
      verification_flags: {
        has_needs_verification: hasNeedsVerification(project),
        repo_mapping:
          project.repo_url && project.repo_url !== 'unknown'
            ? 'listed'
            : 'needs verification',
        live_mapping:
          project.live_url &&
          project.live_url !== 'unknown' &&
          project.live_url !== 'not applicable'
            ? 'listed'
            : 'needs verification',
        env_status: hasNeedsVerification(project.env_variables)
          ? 'needs verification'
          : 'names listed',
        deploy_status:
          project.hosting && project.hosting !== 'needs verification'
            ? 'listed'
            : 'needs verification',
      },
    };
  }),
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, `${JSON.stringify(index, null, 2)}\n`);

console.log(
  `project-index ok: ${index.projects.length} projects -> ${path.relative(ROOT, OUTPUT)}`,
);
