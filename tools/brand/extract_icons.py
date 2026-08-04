"""Extract the ECLA icon set from the brand guidelines PDF as vector SVGs.

Pages 30 and 31 lay the icons out on a fixed 4x2 grid of ~161pt tiles. Clipping
the page with a cropbox keeps every path on the page (just hidden), producing
400KB files, so instead we read the vector drawings directly, keep only those
inside a tile, and re-emit them as a minimal standalone SVG.

The coloured background square of each tile is dropped so the icon composites
onto any surface; the colour is recorded in icons.json for callers that want to
reproduce the brand-accurate tile.
"""

import json
import pathlib

import fitz

PDF = r"C:/Users/jz/Downloads/Ecla Brand Guidelines.pdf"
OUT = pathlib.Path("apps/web/public/brand/icons")

COLS = (43, 235, 427, 619)
ROWS = (101, 315)
TILE = 161

NAMES = {
    29: [
        "traditional-house", "masengo", "lion", "hand",
        "adey-flower", "mesob", "eyes", "jebena",
    ],
    30: [
        "injera", "textile-pattern", "bird", "sini-mugs",
        "amharic", "shield", "street-sight", "ornament",
    ],
}

# Meanings printed beside each icon in the guidelines (pages 30-31).
MEANINGS = {
    "traditional-house": "Home, Diaspora",
    "masengo": "Tradition, Music, Culture",
    "lion": "Strength, Heritage",
    "hand": "Youth, Good Energy",
    "adey-flower": "New Beginning, New Year, Pride",
    "mesob": "Tradition, Sharing, Community",
    "eyes": "Spirituality, Art and Culture",
    "jebena": "Hospitality, Unity, Tradition",
    "injera": "Family, Community, Sharing",
    "textile-pattern": "Art, Heritage",
    "bird": "Diaspora, Hope, Future",
    "sini-mugs": "Unity, Tradition, Female",
    "amharic": "Language, Heritage, Community",
    "shield": "Strength, Resilience, Protection",
    "street-sight": "Diaspora, Community",
    "ornament": "Art, Culture",
}


def hexof(c):
    return None if c is None else "#%02x%02x%02x" % tuple(round(v * 255) for v in c)


def path_d(items, origin, close):
    """Convert PyMuPDF drawing items into SVG path data, translated to tile space.

    Consecutive line/curve items form one continuous subpath and share their
    endpoints, so a moveto is only emitted when the next item does not start
    where the previous one ended. Emitting `M` per item would shatter each
    filled shape into disconnected segments.
    """
    ox, oy = origin
    d = []
    cur = None  # current point, in page coordinates

    def fmt(p):
        return f"{p.x - ox:.2f} {p.y - oy:.2f}"

    def near(a, b):
        return a is not None and abs(a.x - b.x) < 1e-6 and abs(a.y - b.y) < 1e-6

    for it in items:
        kind = it[0]
        if kind == "l":
            a, b = it[1], it[2]
            if not near(cur, a):
                d.append(f"M{fmt(a)}")
            d.append(f"L{fmt(b)}")
            cur = b
        elif kind == "c":
            a, b, c, e = it[1], it[2], it[3], it[4]
            if not near(cur, a):
                d.append(f"M{fmt(a)}")
            d.append(f"C{fmt(b)} {fmt(c)} {fmt(e)}")
            cur = e
        elif kind == "re":
            r = it[1]
            d.append(
                f"M{r.x0 - ox:.2f} {r.y0 - oy:.2f}h{r.width:.2f}"
                f"v{r.height:.2f}h{-r.width:.2f}Z"
            )
            cur = None
        elif kind == "qu":
            q = it[1]
            d.append("M" + "L".join(fmt(p) for p in (q.ul, q.ur, q.lr, q.ll)) + "Z")
            cur = None

    if close and d and not d[-1].endswith("Z"):
        d.append("Z")
    return "".join(d)


def build_icon(page, rect):
    """Return (svg_text, tile_colour) for one icon tile."""
    parts, tile_colour = [], None
    for dr in page.get_drawings():
        r = dr["rect"]
        if not (r.x0 >= rect.x0 - 1 and r.y0 >= rect.y0 - 1
                and r.x1 <= rect.x1 + 1 and r.y1 <= rect.y1 + 1):
            continue
        # The full-bleed square behind the icon is the tile background.
        if r.width > TILE * 0.9 and r.height > TILE * 0.9:
            tile_colour = hexof(dr.get("fill"))
            continue
        d = path_d(dr["items"], (rect.x0, rect.y0), dr.get("closePath"))
        if not d:
            continue
        fill = hexof(dr.get("fill"))
        stroke = hexof(dr.get("color"))
        attrs = [f'd="{d}"', f'fill="{fill}"' if fill else 'fill="none"']
        if stroke:
            attrs.append(f'stroke="{stroke}"')
            attrs.append(f'stroke-width="{dr.get("width") or 1:.2f}"')
            attrs.append('stroke-linecap="round"')
            attrs.append('stroke-linejoin="round"')
        if dr.get("even_odd"):
            attrs.append('fill-rule="evenodd"')
        parts.append("  <path " + " ".join(attrs) + "/>")

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TILE} {TILE}" '
        f'width="{TILE}" height="{TILE}" role="img">\n'
        + "\n".join(parts)
        + "\n</svg>\n"
    )
    return svg, tile_colour


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF)
    manifest, total = [], 0

    for pno, names in NAMES.items():
        page = doc[pno]
        rects = [
            fitz.Rect(col, row, col + TILE, row + TILE)
            for row in ROWS
            for col in COLS
        ]
        for name, rect in zip(names, rects):
            svg, colour = build_icon(page, rect)
            (OUT / f"{name}.svg").write_text(svg, encoding="utf-8")
            total += len(svg)
            manifest.append(
                {"name": name, "file": f"{name}.svg",
                 "tileColor": colour, "meaning": MEANINGS[name]}
            )
            print(f"{name:<20} {len(svg):>7,} bytes  tile {colour}")

    (OUT / "icons.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"\n{len(manifest)} icons, {total:,} bytes total -> {OUT}")


if __name__ == "__main__":
    main()
