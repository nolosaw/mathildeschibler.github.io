#!/bin/bash

# Dossier à traiter : passe-le en argument, sinon dossier courant
SOURCE_DIR="${1:-.}"
QUALITY=82

echo "Conversion des images dans : $SOURCE_DIR"
echo "Largeur cible : 1920px | Qualité : $QUALITY"
echo ""

count=0

for img in "$SOURCE_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG}; do
  [ -e "$img" ] || continue

  filename=$(basename "$img")
  name_no_ext="${filename%.*}"
  output="$SOURCE_DIR/${name_no_ext}.webp"

  cwebp -q "$QUALITY" -resize 1920 0 -m 6 "$img" -o "$output"

  echo "✓ $filename → ${name_no_ext}.webp"
  count=$((count + 1))
done

echo ""
echo "Terminé : $count image(s) converties."