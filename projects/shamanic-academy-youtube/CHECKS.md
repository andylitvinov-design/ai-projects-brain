# CHECKS — shamanic-academy-youtube

## Local Checks

```bash
node scripts/sync-project-index.mjs
node scripts/validate-projects-brain.mjs
git diff --check
```

## Public Collection Checks

```bash
yt-dlp --flat-playlist --dump-json "https://www.youtube.com/@shamanic_academy/videos"
yt-dlp --flat-playlist --dump-json "https://www.youtube.com/@shamanic_academy/shorts"
curl -L "https://www.youtube.com/feeds/videos.xml?channel_id=UCjWq6NHZTQkUr3bC3WbXXcw"
```

## Manual Checks

- Open the channel URL and confirm the displayed name.
- Check whether YouTube currently exposes a streams tab.
- Review high-priority practice/course candidates before using them in a product.
