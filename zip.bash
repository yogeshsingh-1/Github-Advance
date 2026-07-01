#!/bin/bash

# Folder ka path
FOLDER="$1"

# Zip file ka naam
ZIP_FILE="$2.zip"

# Folder ko zip karo
zip -r "$ZIP_FILE" "$FOLDER"

echo "Zip file created successfully!"