import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const REQUIRED_MEMORY_FILES = [
  'PROJECT.md',
  'SYSTEM_MAP.md',
  'DATA_SCHEMA.md',
  'CODE_ACCESS.md',
  'DATA_SAMPLES.md',
  'DEBUG_LOG.md',
  'RISKS.md',
  'CODEX_BRIEF.md',
];

const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  '.cache',
  'dist',
  'build',
]);

const SECRET_PATTERNS = [
  {
    name: 'OpenAI-style secret token',
    regex: /\bsk-[A-Za-z0-9_-]{16,}/,
  },
  { name: 'GitHub token', regex: /\bghp_[A-Za-z0-9_]{16,}/ },
  { name: 'Slack bot token', regex: /\bxoxb-[A-Za-z0-9-]{16,}/ },
  {
    name: 'private key material',
    regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  },
  {
    name: 'private_key assignment',
    regex: /\bprivate_key\s*[:=]\s*['"]?[^'"\s][^'"]{8,}/i,
  },
  {
    name: 'client_secret assignment',
    regex: /\bclient_secret\s*[:=]\s*['"]?[^'"\s][^'"]{8,}/i,
  },
  {
    name: 'API_KEY assignment',
    regex: /\b[A-Z0-9_]*API_KEY\s*=\s*['"]?[^'"\s][^'"]{8,}/,
  },
  { name: 'Bearer token', regex: /\bBearer\s+[A-Za-z0-9._~+/=-]{24,}/ },
];

function fail(message) {
  throw new Error(message);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function slugFor(project) {
  return project.name;
}

function walkFiles(dir, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, output);
      continue;
    }
    if (entry.isFile()) output.push(fullPath);
  }
  return output;
}

function isTextFile(filePath) {
  return /\.(cjs|js|json|md|mjs|txt|yaml|yml)$/i.test(filePath);
}

function validateNoSecrets() {
  const files = walkFiles(ROOT).filter(isTextFile);

  for (const filePath of files) {
    const relative = path.relative(ROOT, filePath);
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const pattern of SECRET_PATTERNS) {
        if (pattern.regex.test(line)) {
          fail(
            `Possible secret value in ${relative}:${index + 1} (${pattern.name})`,
          );
        }
      }
    });
  }
}

const projectsPath = path.join(ROOT, 'projects.json');
const indexPath = path.join(ROOT, 'data', 'project-index.json');

const database = readJson(projectsPath);
if (!Array.isArray(database.projects)) {
  fail('projects.json must contain a projects array');
}

for (const project of database.projects) {
  if (!project.name) fail('Every project must have a name');

  const slug = slugFor(project);
  const projectDir = path.join(ROOT, 'projects', slug);

  if (
    !fs.existsSync(projectDir) ||
    !fs.statSync(projectDir).isDirectory()
  ) {
    fail(`Missing project folder: projects/${slug}/`);
  }

  for (const fileName of REQUIRED_MEMORY_FILES) {
    const requiredPath = path.join(projectDir, fileName);
    if (!fs.existsSync(requiredPath)) {
      fail(
        `Missing required memory file: projects/${slug}/${fileName}`,
      );
    }
  }

  if (!project.memory || typeof project.memory !== 'object') {
    fail(`Missing memory object for project: ${slug}`);
  }

  const requiredMemoryKeys = {
    project_md: `projects/${slug}/PROJECT.md`,
    system_map: `projects/${slug}/SYSTEM_MAP.md`,
    data_schema: `projects/${slug}/DATA_SCHEMA.md`,
    code_access: `projects/${slug}/CODE_ACCESS.md`,
    data_samples: `projects/${slug}/DATA_SAMPLES.md`,
    debug_log: `projects/${slug}/DEBUG_LOG.md`,
    risks: `projects/${slug}/RISKS.md`,
    codex_brief: `projects/${slug}/CODEX_BRIEF.md`,
  };

  for (const [key, expected] of Object.entries(requiredMemoryKeys)) {
    if (project.memory[key] !== expected) {
      fail(`Invalid memory.${key} for ${slug}: expected ${expected}`);
    }
  }
}

if (!fs.existsSync(indexPath)) {
  fail('Missing data/project-index.json');
}

const index = readJson(indexPath);
if (!Array.isArray(index.projects)) {
  fail('data/project-index.json must contain a projects array');
}

if (index.projects.length !== database.projects.length) {
  fail(
    'data/project-index.json project count does not match projects.json',
  );
}

validateNoSecrets();

console.log(`validation ok: ${database.projects.length} projects`);
