#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const knowledgeDir = path.join(root, "knowledge");
const reserved = new Set(["index.md", "log.md"]);
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function checkFrontmatter(file, text) {
  if (reserved.has(path.basename(file))) return;
  if (!text.startsWith("---\n")) {
    errors.push(`${path.relative(root, file)}: missing frontmatter`);
    return;
  }

  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    errors.push(`${path.relative(root, file)}: unterminated frontmatter`);
    return;
  }

  const frontmatter = text.slice(4, end);
  const typeLine = frontmatter
    .split(/\r?\n/)
    .find((line) => /^type:\s*\S/.test(line));
  if (!typeLine) {
    errors.push(`${path.relative(root, file)}: missing non-empty type`);
  }
}

function isExternalLink(target) {
  return /^(https?:|mailto:|tel:)/.test(target) || target.startsWith("#");
}

function checkLinks(file, text) {
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const rawTarget = match[1].trim();
    if (!rawTarget || isExternalLink(rawTarget)) continue;
    const withoutTitle = rawTarget.split(/\s+["'][^"']*["']$/)[0];
    const withoutFragment = withoutTitle.split("#")[0];
    if (!withoutFragment || isExternalLink(withoutFragment)) continue;
    const targetPath = path.resolve(path.dirname(file), decodeURI(withoutFragment));
    if (!fs.existsSync(targetPath)) {
      errors.push(
        `${path.relative(root, file)}: missing local link target ${rawTarget}`,
      );
    }
  }
}

if (!fs.existsSync(knowledgeDir)) {
  errors.push("knowledge/: missing directory");
} else {
  const files = walk(knowledgeDir);
  if (files.length === 0) errors.push("knowledge/: no markdown files found");
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    checkFrontmatter(file, text);
    checkLinks(file, text);
  }
}

if (errors.length) {
  console.error("Knowledge OKF check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Knowledge OKF check passed.");
