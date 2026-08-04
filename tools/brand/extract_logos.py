"""Extract ECLA logo lockups as vector SVGs.

The bilingual lockup comes from the dedicated `ECLA LOGO.pdf`. The remaining
variants are lifted from the guidelines pages, taking the positive (dark-on-
wheat) treatment from the top half of each spread and excluding the full-bleed
background panels.
"""

import pathlib

import fitz

from extract_icons import hexof, path_d

GUIDE = r"C:/Users/jz/Downloads/Ecla Brand Guidelines.pdf"
LOGO = r"C:/Users/jz/Downloads/ECLA LOGO.pdf"
OUT = pathlib.Path("apps/web/public/brand/logo")

# (output name, source, page index, y-range to keep)
JOBS = [
    ("logo-bilingual", LOGO, 0, None),
    ("logo-wordmark", GUIDE, 5, (0, 300)),
    ("logo-full", GUIDE, 7, (0, 300)),
    ("logo-english", GUIDE, 8, (0, 300)),
]


def is_backdrop(rect, page):
    """Full-bleed colour panels and page furniture, not logo artwork."""
    return rect.width > page.rect.width * 0.4 and rect.height > page.rect.height * 0.25


def extract(src, pno, yrange):
    doc = fitz.open(src)
    page = doc[pno]
    keep = []
    for dr in page.get_drawings():
        r = dr["rect"]
        if src is GUIDE:
            # Right-hand artwork panel only — body copy sits left of ~230pt.
            # 380 was too aggressive and clipped the leading glyph of a lockup.
            if r.x0 < 260:
                continue
            # Drop the Amharic strapline printed in every page's top corner.
            if r.y0 < 60:
                continue
        if is_backdrop(r, page):
            continue
        if yrange and not (yrange[0] <= r.y0 <= yrange[1]):
            continue
        if r.width < 0.5 and r.height < 0.5:
            continue
        keep.append(dr)

    if not keep:
        return None, None

    box = keep[0]["rect"]
    for dr in keep:
        box = box | dr["rect"]

    parts = []
    for dr in keep:
        d = path_d(dr["items"], (box.x0, box.y0), dr.get("closePath"))
        if not d:
            continue
        fill = hexof(dr.get("fill"))
        stroke = hexof(dr.get("color"))
        attrs = [f'd="{d}"', f'fill="{fill}"' if fill else 'fill="none"']
        if stroke:
            attrs.append(f'stroke="{stroke}"')
            attrs.append(f'stroke-width="{dr.get("width") or 1:.2f}"')
        if dr.get("even_odd"):
            attrs.append('fill-rule="evenodd"')
        parts.append("  <path " + " ".join(attrs) + "/>")

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {box.width:.2f} {box.height:.2f}" role="img">\n'
        + "\n".join(parts)
        + "\n</svg>\n"
    )
    doc.close()
    return svg, box


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, src, pno, yrange in JOBS:
        svg, box = extract(src, pno, yrange)
        if not svg:
            print(f"{name:<16} NOTHING FOUND")
            continue
        (OUT / f"{name}.svg").write_text(svg, encoding="utf-8")
        print(f"{name:<16} {len(svg):>7,} bytes  {box.width:.0f}x{box.height:.0f}")


if __name__ == "__main__":
    main()
