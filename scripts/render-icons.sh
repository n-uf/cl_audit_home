#!/bin/bash
# Renders the profile icons in public/img/acc with cl_audit's own painter, for every style, every icon
# colour that changes the picture, and the five preview-lane steps. Run it again after the app changes:
#
#   scripts/render-icons.sh [PATH/TO/UsageDock]
#
# The app binary defaults to ../cl_audit/build/UsageDock (build it with `./build.sh --no-install` in the
# app repo; that only builds into ./build). macOS only: it uses sips and the app. pngquant (brew install
# pngquant) turns each PNG into a 64-colour one, about a third of the size; without it the pictures are
# plain and the folder is about three times bigger.
#
# What it writes
#   public/img/acc/ID-STYLE[-COLOUR].png            128 px, shown at up to 56 px (2x)
#   public/img/acc/lane-ID-STYLE[-COLOUR]-N.png     80 px, the Settings preview at 40 px (2x), N = 0..4
#   public/img/acc/lane-ID-STYLE[-COLOUR]-x.png     80 px, the same Dock icon while not running (no numbers)
#   src/data/icon-manifest.json                     which styles the colour changes (read by prefs.ts)
#
# "-COLOUR" is only there for styles whose picture depends on the colour (found by rendering each style in
# two colours and comparing, so it follows the app): the other styles have one picture for every colour.
# Colours are the app's TileColor names. "graphite" and "usage" draw the same picture, except for a style
# whose tile follows the 5-hour level (Big number): that one gets its own "usage" picture, per step.
# The frame and the Claude open dot are not drawn here; the site draws them in CSS.
set -euo pipefail

# One picture: render at 256 px (the app's size), scale to PX, slim down.
if [ "${1:-}" = "--one" ]; then
  # --one FILE PX STYLE LABEL FIVE WEEK COLOUR
  _f="$2"; _px="$3"; _tmp="$(mktemp -d)"
  "$APP" --render-preview "$_tmp/a.png" "$4" "$5" "$6" "$7" "$8"
  sips -z "$_px" "$_px" "$_tmp/a.png" --out "$_tmp/b.png" >/dev/null
  if [ "$HAVE_PQ" = 1 ]; then pngquant --force --nofs --strip 64 --output "$_f" "$_tmp/b.png"; else cp "$_tmp/b.png" "$_f"; fi
  rm -rf "$_tmp"; exit 0
fi

here="$(cd "$(dirname "$0")/.." && pwd)"
app="${1:-$here/../cl_audit/build/UsageDock}"
out="$here/public/img/acc"
manifest="$here/src/data/icon-manifest.json"
[ -x "$app" ] || { echo "no app binary at $app (run ./build.sh --no-install in the cl_audit repo)" >&2; exit 1; }
command -v sips >/dev/null || { echo "sips not found (this script is for macOS)" >&2; exit 1; }
have_pq=0; command -v pngquant >/dev/null && have_pq=1
[ "$have_pq" = 1 ] || echo "pngquant not found: the pictures will be about 3x bigger" >&2

# The demo profiles (src/data/demo.ts): id, icon label, 5-hour %, week %, the profile's own colour.
profiles="home:HOME:34:12:orange work:WORK:78:61:teal side:SIDE:12:40:purple"
# The preview lane (5-hour %:week %), from plenty left to the limit. "-" (no number) draws the icon as it
# looks while its app isn't running.
lane="5:12 30:45 58:62 84:78 97:94"
styles="bars rings number twinRings segmented pace statusTile gauge worst statusBar thinBars batteries gaugeBar"
accents="orange yellow lime teal cyan blue indigo purple fuchsia pink"

# Which styles does the colour change? Which also change for "usage" (rather than graphite)?
probe="$(mktemp -d)"
tint_styles=""; usage_styles=""
for s in $styles; do
  for c in orange blue graphite usage; do "$app" --render-preview "$probe/$s-$c.png" "$s" TEST 34 12 "$c"; done
  cmp -s "$probe/$s-orange.png" "$probe/$s-blue.png" || tint_styles="$tint_styles $s"
  cmp -s "$probe/$s-graphite.png" "$probe/$s-usage.png" || usage_styles="$usage_styles $s"
done
rm -rf "$probe"
tint_styles="${tint_styles# }"; usage_styles="${usage_styles# }"
echo "colour changes the picture: $tint_styles"
echo "\"usage\" has its own picture: $usage_styles"

# The job list: FILE PX STYLE LABEL FIVE WEEK COLOUR
jobs="$(mktemp)"
mkdir -p "$out"
rm -f "$out"/*.png
for p in $profiles; do
  IFS=: read -r id label five week own <<<"$p"
  for s in $styles; do
    colours=""
    case " $tint_styles " in
      *" $s "*)
        colours="$accents graphite"
        case " $usage_styles " in *" $s "*) colours="$colours usage";; esac;;
    esac
    if [ -z "$colours" ]; then   # one picture for every colour (drawn in the profile's own colour)
      echo "$out/$id-$s.png 128 $s $label $five $week $own" >> "$jobs"
      n=0; for st in $lane; do echo "$out/lane-$id-$s-$n.png 80 $s $label ${st%%:*} ${st##*:} $own" >> "$jobs"; n=$((n+1)); done
      echo "$out/lane-$id-$s-x.png 80 $s $label - - $own" >> "$jobs"
    else
      for c in $colours; do
        echo "$out/$id-$s-$c.png 128 $s $label $five $week $c" >> "$jobs"
        n=0; for st in $lane; do echo "$out/lane-$id-$s-$c-$n.png 80 $s $label ${st%%:*} ${st##*:} $c" >> "$jobs"; n=$((n+1)); done
        echo "$out/lane-$id-$s-$c-x.png 80 $s $label - - $c" >> "$jobs"
      done
    fi
  done
done
echo "rendering $(wc -l < "$jobs" | tr -d ' ') pictures…"
export APP="$app" HAVE_PQ="$have_pq"
xargs -P 6 -L 1 bash "$0" --one < "$jobs"
rm -f "$jobs"

# The manifest the site reads
js() { printf '['; local first=1; for x in $1; do [ $first = 1 ] || printf ', '; printf '"%s"' "$x"; first=0; done; printf ']'; }
printf '{\n  "tintStyles": %s,\n  "usageStyles": %s\n}\n' "$(js "$tint_styles")" "$(js "$usage_styles")" > "$manifest"
echo "wrote $(ls "$out" | wc -l | tr -d ' ') pictures, $(du -sh "$out" | cut -f1) in $out"
