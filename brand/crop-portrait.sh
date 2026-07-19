#!/bin/sh
# Optional 4:5 alternative crop of the practitioner portrait, kept for
# comparison. The site currently uses the ORIGINAL uncropped photo at its own
# aspect ratio (src/assets/practitioners/mintae-kim.jpg).
magick brand/mintae-kim-source.jpg \
  -crop 544x680+258+330 +repage -quality 88 \
  src/assets/practitioners/mintae-kim-4x5-crop.jpg
