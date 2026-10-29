"""Local, deterministic screenshot comparison. No model/cloud processing."""
from __future__ import annotations

import hashlib
import json
import os
import uuid
from pathlib import Path
from typing import Any

from .policy import PolicyError
from .runner import MAX_ARTIFACT_BYTES, default_runs_dir, now, _write_atomic

MAX_INPUT_BYTES = 25 * 1024 * 1024
MAX_PIXELS = 20_000_000


def _safe_png(path_value: str) -> Path:
    if not isinstance(path_value, str) or not path_value or "\x00" in path_value:
        raise PolicyError("IMAGE_INVALID")
    p = Path(path_value).expanduser()
    if p.is_symlink() or not p.is_file() or p.suffix.lower() != ".png":
        raise PolicyError("IMAGE_INVALID")
    if p.stat().st_size <= 0 or p.stat().st_size > MAX_INPUT_BYTES:
        raise PolicyError("IMAGE_INVALID")
    return p


def compare_images(reference: str, actual: str, *, tolerance: int = 12, runs_dir: Path | None = None) -> dict[str, Any]:
    """Compare two owner-selected local PNG screenshots, without uploading them.

    Comparison is a diagnostic signal, NOT acceptance of subjective design.
    Image data and side-by-side files are private local artifacts.
    """
    if type(tolerance) is not int or not 0 <= tolerance <= 80:
        raise PolicyError("INPUT_INVALID")
    ref_path, actual_path = _safe_png(reference), _safe_png(actual)
    try:
        from PIL import Image, ImageChops, ImageStat
    except ImportError as exc:
        raise PolicyError("PILLOW_NOT_INSTALLED") from exc
    Image.MAX_IMAGE_PIXELS = MAX_PIXELS
    try:
        with Image.open(ref_path) as ri, Image.open(actual_path) as ai:
            if ri.format != "PNG" or ai.format != "PNG" or ri.size != ai.size:
                raise PolicyError("IMAGE_MISMATCH")
            if ri.width * ri.height > MAX_PIXELS:
                raise PolicyError("IMAGE_TOO_LARGE")
            ref, act = ri.convert("RGB"), ai.convert("RGB")
    except Image.DecompressionBombError as exc:
        raise PolicyError("IMAGE_TOO_LARGE") from exc
    except (OSError, ValueError) as exc:
        raise PolicyError("IMAGE_INVALID") from exc
    diff = ImageChops.difference(ref, act)
    gray = diff.convert("L")
    mask = gray.point(lambda v: 255 if v > tolerance else 0)
    hist = mask.histogram()
    count = ref.width * ref.height
    ratio = round((count - hist[0]) / count, 6)
    avg_delta = round(sum(ImageStat.Stat(diff).mean) / 3.0, 3)
    out_dir = (runs_dir or default_runs_dir()) / "visual" / uuid.uuid4().hex
    out_dir.mkdir(parents=True, mode=0o700, exist_ok=False)
    os.chmod(out_dir, 0o700)
    overlay = Image.blend(ref, act, 0.5)
    comparison = Image.new("RGB", (ref.width * 2, ref.height))
    comparison.paste(ref, (0, 0))
    comparison.paste(act, (ref.width, 0))
    paths = {"diff": out_dir / "diff.png", "overlay": out_dir / "overlay.png", "side_by_side": out_dir / "side_by_side.png"}
    try:
        diff.save(paths["diff"])
        overlay.save(paths["overlay"])
        comparison.save(paths["side_by_side"])
        for p in paths.values():
            os.chmod(p, 0o600)
        if sum(p.stat().st_size for p in paths.values()) > MAX_ARTIFACT_BYTES:
            raise PolicyError("STORAGE_LIMIT")
    except Exception:
        for p in paths.values():
            p.unlink(missing_ok=True)  # only own newly-created artifacts
        out_dir.rmdir()
        raise
    output: dict[str, Any] = {
        "state": "COMPARISON_COMPLETE", "created_at": now(), "width": ref.width, "height": ref.height,
        "tolerance": tolerance, "changed_pixel_ratio": ratio,
        "mean_absolute_rgb_delta": avg_delta, "subjective_design_review_required": True,
        "reference_sha256": hashlib.sha256(ref_path.read_bytes()).hexdigest(),
        "actual_sha256": hashlib.sha256(actual_path.read_bytes()).hexdigest(),
        "local_artifacts": {k: str(v) for k, v in paths.items()},
        "note": "Local visual diagnostic only; no user approval or browser E2E inferred.",
    }
    _write_atomic(out_dir / "report.json", output)
    return output
