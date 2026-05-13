# Debug Log - shamanic-academy-youtube

## 2026-05-13 - Initial public collection

### What was checked

- Public HTML for https://www.youtube.com/@shamanic_academy.
- Public RSS feed for `UCjWq6NHZTQkUr3bC3WbXXcw`.
- yt-dlp flat playlist for `/videos`, `/shorts`, and `/streams`.
- yt-dlp per-video public metadata for `/videos` and `/shorts`.

### Findings

- Channel name: Академия Древних Культур.
- Channel id: `UCjWq6NHZTQkUr3bC3WbXXcw`.
- Flat playlist counts: 94 videos, 11 shorts.
- Streams tab: unavailable; yt-dlp returned `This channel does not have a streams tab`.
- Per-video metadata: 102/105 entries.
- Flat-list-only video ids: `KNtBougn3gw`, `qM_nFUkYJ1k`, `evnLT_622X8`.

### Tool notes

- Global `yt-dlp` was not installed.
- `python3 -m pip install --user yt-dlp` failed because the Python environment is externally managed.
- Temporary venv install under `/tmp/shamanic-ytdlp-venv` succeeded.
- yt-dlp emitted warnings about no supported JavaScript runtime; extraction still produced the public flat list and most per-video metadata.
