#!/usr/bin/env python3
"""
Normalize the three samurai turn frames into aligned turntable plates.

Per frame:
  1. Detect subject bbox by luminance threshold (>70), requiring ~25 lit
     pixels per row/column so haze/halos don't extend the box.
  2. Rescale so every figure is the same pixel height (TARGET_H).
  3. Paste onto a shared 760x1330 canvas with a common foot baseline,
     horizontally centred on the figure's own centre -> he pivots in place.
  4. Build alpha from luminance  clip((lum-16)/30), slight dilate, ~2px blur.
  5. Fade the bottom 120px to transparent.
  6. Save WebP q88 -> public/samurai/samurai-{front,left,right}.webp
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "samurai-src"
OUT = ROOT / "public" / "samurai"

CANVAS_W, CANVAS_H = 760, 1330
CANVAS_CX = CANVAS_W / 2.0   # 380  — pivot axis
TARGET_H = 1180             # figure pixel height (all frames identical)
FOOT_Y = 1260               # common foot baseline (rows below this fade out)
LIT_THRESH = 70             # luminance > this counts as "lit"
MIN_LIT = 25                # ignore rows/cols with fewer lit px (haze/halo)
ALPHA_LO, ALPHA_SPAN = 16, 30   # clip((lum-16)/30)
DILATE = 3                  # MaxFilter kernel (1px dilate)
BLUR = 2.0                  # gaussian blur radius
FADE_PX = 120               # bottom fade to transparent
Q = 88                      # webp quality

FRAMES = [
    ("frame-front.png", "samurai-front.webp"),
    ("frame-left.png", "samurai-left.webp"),
    ("frame-right.png", "samurai-right.webp"),
]


def luminance(rgb: np.ndarray) -> np.ndarray:
    return (0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2])


def subject_bbox(rgb: np.ndarray):
    lum = luminance(rgb)
    lit = lum > LIT_THRESH
    row_count = lit.sum(axis=1)
    col_count = lit.sum(axis=0)
    rows = np.where(row_count >= MIN_LIT)[0]
    cols = np.where(col_count >= MIN_LIT)[0]
    top, bottom = int(rows.min()), int(rows.max())
    left, right = int(cols.min()), int(cols.max())
    return top, bottom, left, right


def fade_alpha(alpha: np.ndarray) -> np.ndarray:
    """Fade the bottom FADE_PX rows to transparent (common across frames)."""
    h = alpha.shape[0]
    fade_start = h - FADE_PX
    ys = np.arange(h)
    factor = np.where(ys < fade_start, 1.0, np.clip((h - 1 - ys) / (FADE_PX - 1), 0, 1))
    return (alpha * factor[:, None]).astype(np.uint8)


def build(src_name: str, out_name: str) -> dict:
    img = Image.open(SRC / src_name).convert("RGB")
    rgb = np.asarray(img)
    H0, W0 = rgb.shape[:2]

    top, bottom, left, right = subject_bbox(rgb)
    fig_h = bottom - top + 1
    fig_cx = (left + right) / 2.0
    scale = TARGET_H / fig_h

    # Rescale the whole frame so the figure is exactly TARGET_H tall.
    new_w = max(1, int(round(W0 * scale)))
    new_h = max(1, int(round(H0 * scale)))
    resized = np.asarray(img.resize((new_w, new_h), Image.LANCZOS))

    # Place on the shared canvas: foot baseline at FOOT_Y, pivot on fig_cx.
    off_y = int(round(FOOT_Y - bottom * scale))
    off_x = int(round(CANVAS_CX - fig_cx * scale))

    canvas_rgb = np.zeros((CANVAS_H, CANVAS_W, 3), dtype=np.uint8)
    # Clip-aware blit of resized into canvas.
    x0, y0 = max(0, off_x), max(0, off_y)
    x1, y1 = min(CANVAS_W, off_x + new_w), min(CANVAS_H, off_y + new_h)
    sx0, sy0 = x0 - off_x, y0 - off_y
    sx1, sy1 = sx0 + (x1 - x0), sy0 + (y1 - y0)
    canvas_rgb[y0:y1, x0:x1] = resized[sy0:sy1, sx0:sx1]

    # Alpha from luminance of the placed figure, then dilate + blur.
    lum = luminance(canvas_rgb.astype(np.float32))
    alpha = np.clip((lum - ALPHA_LO) / ALPHA_SPAN, 0.0, 1.0)
    alpha_img = Image.fromarray((alpha * 255).astype(np.uint8), "L")
    alpha_img = alpha_img.filter(ImageFilter.MaxFilter(DILATE))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(BLUR))
    alpha = fade_alpha(np.asarray(alpha_img))

    rgba = np.dstack([canvas_rgb, alpha])
    out_path = OUT / out_name
    Image.fromarray(rgba, "RGBA").save(out_path, "WEBP", quality=Q, method=6)

    # Diagnostics for an objective consistency check.
    a = alpha
    lit_rows = np.where(a.max(axis=1) > 12)[0]
    lit_cols = np.where(a.max(axis=0) > 12)[0]
    top_a = int(lit_rows.min()) if lit_rows.size else -1
    bot_a = int(lit_rows.max()) if lit_rows.size else -1
    lc = int(lit_cols.min()) if lit_cols.size else -1
    rc = int(lit_cols.max()) if lit_cols.size else -1
    return {
        "src": src_name,
        "out": out_name,
        "src_size": (W0, H0),
        "bbox": (top, bottom, left, right),
        "fig_h": fig_h,
        "scale": round(scale, 4),
        "offset": (off_x, off_y),
        "fig_height_out": bot_a - top_a,
        "foot_row_out": bot_a,
        "alpha_cx_out": (lc + rc) / 2.0,
        "kb": out_path.stat().st_size / 1024.0,
        "opaque_px%": round(float((a > 200).mean()) * 100, 2),
    }


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for src, out in FRAMES:
        d = build(src, out)
        rows.append(d)
        print(d)
    print("\n--- consistency check ---")
    foots = {r["out"]: r["foot_row_out"] for r in rows}
    cxs = {r["out"]: r["alpha_cx_out"] for r in rows}
    hs = {r["out"]: r["fig_height_out"] for r in rows}
    print("foot rows   :", foots, "  (should be equal)")
    print("alpha cx    :", cxs, "  (should all be ~380.0 -> pivots in place)")
    print("fig heights :", hs, "  (should be equal)")


if __name__ == "__main__":
    sys.exit(main())
