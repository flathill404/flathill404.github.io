#!/bin/bash
for file in *.png; do
  cwebp "$file" -resize 1024 1024 -q 80 -o "${file%.png}.webp"
done