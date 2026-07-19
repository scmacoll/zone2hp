#!/bin/sh
# Re-encode the client's hero master for the web.
#
# The master is HEVC/H.265, which Firefox cannot decode at all and Chrome only
# decodes with OS support, and it carries an audio track on an element that
# plays muted. This keeps the FULL 30 second duration and only changes the
# container, codec and audio.
#
#   23 MB HEVC + audio  ->  ~2.7 MB H.264 + ~2.6 MB WebM, both silent.

ffmpeg -y -i src/asset/zone2hp-video-loop-final.mp4 \
  -an -vf "scale=1280:-2" -c:v libx264 -profile:v high -crf 30 -preset slow \
  -pix_fmt yuv420p -movflags +faststart src/asset/hero-loop.mp4

ffmpeg -y -i src/asset/zone2hp-video-loop-final.mp4 \
  -an -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 \
  -deadline good -cpu-used 4 src/asset/hero-loop.webm

# Poster, shown on the element before playback and under reduced motion.
ffmpeg -y -ss 4 -i src/asset/zone2hp-video-loop-final.mp4 -frames:v 1 \
  -vf "scale=1280:-2" -q:v 4 src/asset/hero-poster.jpg
