"""Trace raster logo/icon art (PNG/JPG) into SVG.

Use this only when no vector source exists. If you have a PDF/AI/EPS, use
extract_icons.py / extract_logos.py instead — those recover the real paths,
whereas tracing approximates them and always loses a little edge crispness.

Suitable for: flat logos, icons, wordmarks, line art.
Not suitable for: photographs. Tracing a photo yields tens of thousands of
paths, a file far larger than the original, and a worse-looking result. Ship
photos as WebP/AVIF.

Usage:
    python -m venv .venv
    .venv/Scripts/python -m pip install vtracer
    .venv/Scripts/python tools/brand/trace_raster.py in.png out.svg [--flat]

--flat suits hard-edged artwork (wordmarks, single-colour marks); the default
preserves more tonal steps, which suits shaded illustration.
"""

import argparse
import pathlib
import sys

import vtracer

# Hard-edged art: fewer colour layers, aggressive speckle removal, polygon
# fitting. Shaded art: more layers and spline fitting to keep soft transitions.
PRESETS = {
    "flat": dict(color_precision=4, filter_speckle=8, layer_difference=32, mode="polygon"),
    "shaded": dict(color_precision=6, filter_speckle=4, layer_difference=16, mode="spline"),
}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("source")
    ap.add_argument("dest")
    ap.add_argument("--flat", action="store_true", help="hard-edged artwork preset")
    args = ap.parse_args()

    src, dst = pathlib.Path(args.source), pathlib.Path(args.dest)
    if not src.exists():
        sys.exit(f"no such file: {src}")
    dst.parent.mkdir(parents=True, exist_ok=True)

    preset = PRESETS["flat" if args.flat else "shaded"]
    vtracer.convert_image_to_svg_py(
        str(src), str(dst), colormode="color", hierarchical="stacked", **preset
    )

    before, after = src.stat().st_size, dst.stat().st_size
    print(f"{src.name} {before:,} B -> {dst.name} {after:,} B ({after / before:.0%})")
    if after > before:
        print("  warning: SVG is larger than the source — likely too detailed to trace.")
    print("  Always eyeball the result before shipping; tracing softens corners.")


if __name__ == "__main__":
    main()
