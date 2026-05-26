#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const DEFAULT_VIDEOS_PATH = "projects/reiki-yggdrasil/data/youtube-videos.json";
const DEFAULT_COURSES_PATH = "projects/reiki-yggdrasil/data/youtube-courses.json";

function parseArgs(argv = process.argv.slice(2)) {
  const args = {
    videosPath: DEFAULT_VIDEOS_PATH,
    coursesPath: DEFAULT_COURSES_PATH,
    write: false
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--videos") {
      args.videosPath = argv[index + 1] || args.videosPath;
      index += 1;
    } else if (value === "--courses") {
      args.coursesPath = argv[index + 1] || args.coursesPath;
      index += 1;
    } else if (value === "--write") {
      args.write = true;
    }
  }
  return args;
}

function includesKeyword(video, keywords = []) {
  const haystack = `${video.title || ""}\n${video.description || ""}`.toLocaleLowerCase("ru");
  return keywords.some((keyword) => haystack.includes(String(keyword).toLocaleLowerCase("ru")));
}

function classifyVideo(video, courses) {
  const next = { ...video, detectedTopics: Array.isArray(video.detectedTopics) ? [...video.detectedTopics] : [] };
  for (const course of courses) {
    if (!includesKeyword(next, course.keywords || [])) continue;
    if (!next.detectedTopics.includes(course.detectedTopic)) next.detectedTopics.push(course.detectedTopic);
    next.courseSlug = course.slug;
    next.courseTitle = course.title;
    if (next.manualReviewStatus !== "confirmed") {
      next.manualReviewStatus = course.manualReviewDefault || "needs verification";
    }
  }
  return next;
}

async function loadJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function main() {
  const args = parseArgs();
  const [videos, config] = await Promise.all([
    loadJson(args.videosPath),
    loadJson(args.coursesPath)
  ]);
  const classified = videos.map((video) => classifyVideo(video, config.courses || []));
  const dionysusCount = classified.filter((video) => video.detectedTopics.includes("Дионис")).length;

  if (args.write) {
    await writeFile(args.videosPath, `${JSON.stringify(classified, null, 2)}\n`);
  }

  console.log(JSON.stringify({
    ok: true,
    videos: classified.length,
    dionysusVideos: dionysusCount,
    wrote: args.write
  }, null, 2));
}

export {
  classifyVideo,
  includesKeyword,
  parseArgs
};

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  await main();
}
