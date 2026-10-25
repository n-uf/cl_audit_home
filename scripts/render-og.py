#!/usr/bin/env python3
"""Renders public/og.png (1200x630): Inter on the dark Dock scene, no browser needed.

  python3 scripts/render-og.py --font /path/to/Inter-variable.woff2|ttf   (needs Pillow and numpy)

The font is NOT in the repo. Use Inter's variable font from Google Fonts (family Inter, axes opsz + wght;
https://fonts.google.com/specimen/Inter) or the rsms/inter GitHub release; the picture uses the weight axis
at optical size 14, as a plain "Inter" web font does. The four icons are the site's own pictures
(the first is the cl_audit app's own icon, rendered with UsageDock --render-app-icon; build the app with
`./build.sh --no-install` first).
Edit HEAD1/HEAD2/SUB below to change the wording."""
import argparse, os, subprocess, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HEAD1, HEAD2 = "Every Claude profile,", "side by side on your Mac."
SUB = "Usage limits in the Dock · cl-audit.n-uf.com"

ap = argparse.ArgumentParser()
ap.add_argument("--font", required=True)
ap.add_argument("--app", default="/opt/projects/n-uf/cl_audit/build/UsageDock")
ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..", "public", "og.png"))
args = ap.parse_args()
IMG = os.path.join(os.path.dirname(__file__), "..", "public", "img")
W, H = 1200, 630

def font(size, wght):
    f = ImageFont.truetype(args.font, size, layout_engine=ImageFont.Layout.RAQM)
    f.set_variation_by_axes([14, wght])
    return f

def text(d, s, f, cx, baseline, col, tracking):
    total = f.getlength(s) + tracking * (len(s) - 1)
    x0 = cx - total / 2
    for i, ch in enumerate(s):
        d.text((x0 + f.getlength(s[: i + 1]) - f.getlength(ch) + tracking * i, baseline), ch, font=f, fill=col, anchor="ls")

def scene(icons):
    yy, xx = np.mgrid[0:H, 0:W].astype(float) + 0.5
    a = np.clip(1 - np.sqrt(((xx - 600) / 340) ** 2 + ((yy - 468) / 360) ** 2), 0, 1) * 0.22   # the warm glow
    im = np.array([29, 29, 31], float)[None, None] * (1 - a[..., None]) + np.array([217, 119, 87], float)[None, None] * a[..., None]
    S = 4
    def rounded(x0, y0, x1, y1, r):
        y, x = np.mgrid[0 : H * S, 0 : W * S].astype(float)
        x, y = (x + 0.5) / S, (y + 0.5) / S
        cx, cy = np.clip(x, x0 + r, x1 - r), np.clip(y, y0 + r, y1 - r)
        m = ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) & (x >= x0) & (x <= x1) & (y >= y0) & (y <= y1)
        return m.reshape(H, S, W, S).mean(axis=(1, 3))
    outer, inner = rounded(308, 390, 892, 538, 32), rounded(309, 391, 891, 537, 31)
    white = np.array([255, 255, 255], float)[None, None]
    im = im * (1 - 0.09 * outer[..., None]) + white * 0.09 * outer[..., None]      # the Dock's glass
    ring = (outer - inner)[..., None]
    im = im * (1 - 0.14 * ring) + white * 0.14 * ring                              # its 1 px edge
    im[410:518, 458] = im[410:518, 458] * 0.75 + 255 * 0.25                        # the divider
    out = Image.fromarray(np.clip(im + 0.5, 0, 255).astype("uint8")).convert("RGBA")
    for path, x in icons:
        out.alpha_composite(Image.open(path).convert("RGBA").resize((114, 114), Image.LANCZOS), (x, 407))
    return out

with tempfile.TemporaryDirectory() as tmp:
    usage = os.path.join(tmp, "usage.png")
    subprocess.run([args.app, "--render-app-icon", usage, "panel", "456"], check=True)   # the default app icon (Front panel)
    im = scene([(usage, 327), (f"{IMG}/dock-home.png", 483), (f"{IMG}/dock-work.png", 621), (f"{IMG}/dock-side.png", 759)])
d = ImageDraw.Draw(im)
text(d, "cl_audit", font(28, 700), 600, 117, (158, 158, 158), 0.28)
text(d, HEAD1, font(58, 700), 600, 194, (255, 255, 255), -1.74)
text(d, HEAD2, font(58, 700), 600, 268, (255, 255, 255), -1.74)
text(d, SUB, font(20, 500), 600, 591, (140, 140, 140), -0.42)
im.convert("RGB").save(args.out, optimize=True)
print("wrote", os.path.normpath(args.out))
