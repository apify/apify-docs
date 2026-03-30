#!/bin/bash
# Validates front matter description is 140-160 characters.
# Usage: check-frontmatter.sh <file-path>

set -euo pipefail

if [ $# -ne 1 ]; then
    echo "Usage: $0 <file-path>"
    exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
    echo "FAIL: File not found: $FILE"
    exit 1
fi

# Extract description from YAML front matter
DESCRIPTION=$(awk '/^---$/{if(++c==2)exit}c==1&&/^description:/{sub(/^description:\s*/, ""); gsub(/^["'\''"]|["'\''"]$/, ""); print}' "$FILE")

if [ -z "$DESCRIPTION" ]; then
    echo "FAIL: No description found in front matter"
    exit 1
fi

LENGTH=${#DESCRIPTION}

if [ "$LENGTH" -ge 140 ] && [ "$LENGTH" -le 160 ]; then
    echo "PASS: Description is $LENGTH characters (140-160 range)"
    exit 0
else
    echo "FAIL: Description is $LENGTH characters (expected 140-160)"
    echo "  Description: $DESCRIPTION"
    exit 1
fi
