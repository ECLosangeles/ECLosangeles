# Brand asset extraction

One-off scripts that pulled the ECLA logo lockups and icon set out of the PDF
brand toolkit as real vector SVGs. The output is committed under
`apps/web/public/brand/`, so you only need these again if the guidelines are
reissued.

## Inputs

- `Ecla Brand Guidelines.pdf` — icon set (pages 30–31), logo variants (6–11)
- `ECLA LOGO.pdf` — the bilingual lockup, as standalone vector art

Both paths are hardcoded at the top of each script; edit them to match where
the PDFs live on your machine.

## Running

```sh
python -m venv .venv
.venv/Scripts/python -m pip install pymupdf
.venv/Scripts/python tools/brand/extract_icons.py
.venv/Scripts/python tools/brand/extract_logos.py
```

## Tracing raster art

`trace_raster.py` handles the case where no vector source exists — a logo you
only have as a PNG. It approximates the paths rather than recovering them, so
reach for it only after ruling out a vector original. Flat logos and icons come
out close; photographs must not be traced.

```sh
.venv/Scripts/python -m pip install vtracer
.venv/Scripts/python tools/brand/trace_raster.py in.png out.svg --flat
```

## Notes

Clipping a PDF page with a cropbox hides the out-of-view geometry but still
ships it — that produced 400KB icons. Both scripts instead read the vector
drawings directly, keep only the paths inside the target region, and re-emit a
minimal SVG. `extract_icons.py:path_d` is the part worth understanding: PDF
drawing items in a single path share endpoints, so a moveto is only emitted on
a genuine discontinuity. Emitting one per item shatters each filled shape into
disconnected strokes, which renders as a ghost outline.

`icons.json` records each icon's meaning and the background tile colour from
the guidelines; the SVGs themselves are transparent so they composite anywhere.
