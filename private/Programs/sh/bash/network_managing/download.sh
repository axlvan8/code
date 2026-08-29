#!/bin/bash

# Define the file URL and the target local path
URL=$1
SAVE_PATH=$2

echo "Initiating download..."

# 1. Try downloading with curl
if command -v curl &> /dev/null; then
    curl -L -f -o "$SAVE_PATH" "$URL"
    
# 2. Try downloading with wget if curl isn't present
elif command -v wget &> /dev/null; then
    wget -O "$SAVE_PATH" "$URL"
    
# 3. Fallback error if neither tool is installed
else
    echo "Error: Neither curl nor wget is installed on this system." >&2
    exit 1
fi

# Verify the download succeeded
if [ $? -eq 0 ]; then
    echo "Success: File downloaded to $SAVE_PATH"
    python3 openFILE $SAVE_PATH
else
    echo "Error: The download failed." >&2
    exit 1
fi
