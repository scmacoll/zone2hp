#!/usr/bin/env python3
"""Convert the client's brand PDFs into web-ready SVGs.

Usage (from the repo root, needs poppler: `brew install poppler`):

    python3 brand/build-logos.py

Reads `brand/*.pdf`, writes `src/assets/brand/*.svg`. Three normalisations on top
of pdftocairo's output:

  1. viewBox cropped to the ink bounding box. The source PDFs are page-sized with
     the artwork floating in the middle, so the raw conversion is mostly empty
     space. The box is measured exactly from a greyscale render.
  2. every fill rewritten to currentColor, so one file serves the dark hero and
     the light pages.
  3. glyph ids namespaced per variant, so two logos can be inlined on the same
     page without colliding, and unreferenced glyph defs dropped.
"""

import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand"
OUT = ROOT / "src" / "assets" / "brand"

DPI = 200
INK_THRESHOLD = 250  # 0..255; anything darker than this counts as artwork

NAMES = ["icon", "logotype", "logotype_hp", "logotype_icon", "logotype_icon_hp"]


def pgm_ink_bbox(path: Path) -> tuple[int, int, int, int, int, int]:
    """Return (width, height, x0, y0, x1, y1) in pixels for a binary P5 PGM."""
    data = path.read_bytes()
    fields: list[int] = []
    i = 2
    while len(fields) < 3:
        while i < len(data) and data[i : i + 1].isspace():
            i += 1
        if data[i : i + 1] == b"#":
            while data[i : i + 1] not in (b"\n", b""):
                i += 1
            continue
        j = i
        while j < len(data) and not data[j : j + 1].isspace():
            j += 1
        fields.append(int(data[i:j]))
        i = j
    i += 1
    width, height, _maxval = fields
    pixels = data[i : i + width * height]

    min_x, min_y, max_x, max_y = width, height, -1, -1
    for y in range(height):
        row = pixels[y * width : (y + 1) * width]
        if min(row) >= INK_THRESHOLD:
            continue
        if y < min_y:
            min_y = y
        max_y = y
        for x, value in enumerate(row):
            if value < INK_THRESHOLD:
                if x < min_x:
                    min_x = x
                if x > max_x:
                    max_x = x
    if max_x < 0:
        raise SystemExit(f"no ink found in {path}")
    return width, height, min_x, min_y, max_x, max_y


def crop_box(name: str, tmp: Path, svg_w: float, svg_h: float) -> tuple[float, ...]:
    """Ink bounding box, in the SVG's own point space."""
    render = tmp / name
    subprocess.run(
        ["pdftoppm", "-gray", "-r", str(DPI), "-singlefile", str(SRC / f"{name}.pdf"), str(render)],
        check=True,
    )
    px_w, px_h, x0, y0, x1, y1 = pgm_ink_bbox(render.with_suffix(".pgm"))
    # The raster page is a rounded pixel grid, so rescale onto the SVG's exact
    # point dimensions or the crop lands slightly off.
    sx, sy = svg_w / px_w, svg_h / px_h
    return x0 * sx, y0 * sy, (x1 + 1 - x0) * sx, (y1 + 1 - y0) * sy


def normalise(name: str, tmp: Path) -> str:
    raw = (tmp / f"{name}.raw.svg").read_text()

    header = re.search(r'<svg[^>]*viewBox="0 0 ([\d.]+) ([\d.]+)"', raw)
    if not header:
        raise SystemExit(f"unexpected svg header in {name}")
    x, y, w, h = crop_box(name, tmp, float(header.group(1)), float(header.group(2)))

    body = raw[raw.index(">", raw.index("<svg")) + 1 :]
    body = body[: body.rindex("</svg>")]

    body = re.sub(r'id="glyph-', f'id="{name}-glyph-', body)
    body = re.sub(r'href="#glyph-', f'href="#{name}-glyph-', body)

    used = set(re.findall(rf'href="#({name}-glyph-[\w-]+)"', body))
    body = re.sub(
        rf'<g id="({name}-glyph-[\w-]+)">.*?</g>',
        lambda m: m.group(0) if m.group(1) in used else "",
        body,
        flags=re.DOTALL,
    )
    body = re.sub(r"<defs>\s*(<g>\s*)*\s*(</g>\s*)*\s*</defs>", "", body)

    # The artwork is a single ink colour throughout, so a blanket swap is safe.
    body = re.sub(r'fill="rgb\([^)]*\)"', 'fill="currentColor"', body)
    body = re.sub(r'\s*fill-opacity="1"', "", body)
    body = re.sub(r"\n{2,}", "\n", body).strip()

    return (
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n'
        f'     viewBox="{x:.2f} {y:.2f} {w:.2f} {h:.2f}" fill="currentColor">\n'
        f"{body}\n</svg>\n"
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as raw_dir:
        tmp = Path(raw_dir)
        for name in NAMES:
            subprocess.run(
                ["pdftocairo", "-svg", str(SRC / f"{name}.pdf"), str(tmp / f"{name}.raw.svg")],
                check=True,
            )
            svg = normalise(name, tmp)
            (OUT / f"{name}.svg").write_text(svg)
            print(f"{name:20} {len(svg):>6} bytes  {svg.splitlines()[1].strip()}")


if __name__ == "__main__":
    main()
