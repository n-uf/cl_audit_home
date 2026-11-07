#!/usr/bin/env python3
"""Renders the site's browser and search icons from the cl_audit app's own icon (needs Pillow).

  python3 scripts/render-favicons.py [--app /path/to/UsageDock]

The app draws its icon in code (UsageDock --render-app-icon, the default Front panel icon); build it with
`./build.sh --no-install` first. One 1024 px render, only ever scaled down:
  public/favicon.ico           16, 32 and 48 px: the tab icon and the /favicon.ico fallback
  public/favicon.png           96 px  } search results: Google wants a square whose side is a multiple of 48
  public/icon-192.png          192 px }
  public/apple-touch-icon.png  180 px: the home-screen icon on iPhone and iPad
The favicons are cropped to the mark (the render's 32 px margin off), so the small sizes stay as big as they can.
The touch icon keeps the margin, as the app's iconset does."""
import argparse, os, subprocess, tempfile
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("--app", default="/opt/projects/n-uf/cl_audit/build/UsageDock")
args = ap.parse_args()
PUBLIC = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public"))

with tempfile.TemporaryDirectory() as tmp:
    path = os.path.join(tmp, "icon.png")
    subprocess.run([args.app, "--render-app-icon", path, "panel", "1024"], check=True)
    full = Image.open(path).convert("RGBA")
    full.load()
assert full.size == (1024, 1024), full.size
box = full.getbbox()          # the mark itself, where the alpha isn't 0
side = max(box[2] - box[0], box[3] - box[1])
cx, cy = (box[0] + box[2]) // 2, (box[1] + box[3]) // 2
mark = full.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2))

def shrink(im, px):
    assert px <= im.width, f"{px} px would upscale a {im.width} px source"
    return im.resize((px, px), Image.LANCZOS)

def save(im, name, **kw):
    out = os.path.join(PUBLIC, name)
    im.save(out, optimize=True, **kw)
    print("wrote", os.path.relpath(out), im.size[0] if name.endswith(".png") else "16/32/48", "px")

ico = [shrink(mark, px) for px in (16, 32, 48)]
save(ico[-1], "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:-1])
save(shrink(mark, 96), "favicon.png")
save(shrink(mark, 192), "icon-192.png")
save(shrink(full, 180), "apple-touch-icon.png")
