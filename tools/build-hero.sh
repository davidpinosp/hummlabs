#!/bin/bash
# Rebuilds the hero videos and their frame indexes from the two Runway clips.
#
#   tools/build-hero.sh <drawing-clip.mp4> <lift-off-clip.mp4>
#
# The hero is drawing-clip frames 52-120 followed by the whole lift-off clip
# (310 frames at 24 fps). Both videos use a keyframe every 12 frames and no
# B-frames, so each 12-frame group decodes on its own, front to back, which
# is what the page's frame decoder (js/main.js) relies on. The phone video is
# the right-hand 1440x1080 of the frame, scaled to 1080x810.
set -euo pipefail
cd "$(dirname "$0")/.."

drawing="$1"
liftoff="$2"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

ffmpeg -v error -y -i "$drawing" -i "$liftoff" -filter_complex \
  "[0:v]trim=start_frame=52,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[v]" \
  -map "[v]" -c:v ffv1 -an "$work/master.mkv"

encode() {
  ffmpeg -v error -y -i "$work/master.mkv" -vf "$1" -c:v libx264 -preset veryslow -crf "$2" \
    -g 12 -keyint_min 12 -sc_threshold 0 -bf 0 -x264-params open-gop=0 -profile:v high -level:v 4.1 \
    -pix_fmt yuv420p -movflags +faststart -an "$3"
}

encode null 25 media/hero/hero-desktop.mp4
encode "crop=1440:1080:480:0,scale=1080:810:flags=lanczos" 26 media/hero/hero-mobile.mp4

python3 tools/hero-index.py media/hero/hero-desktop.mp4 > media/hero/hero-desktop.json
python3 tools/hero-index.py media/hero/hero-mobile.mp4 > media/hero/hero-mobile.json
