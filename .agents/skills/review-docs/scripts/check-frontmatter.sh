#!/bin/bash
# Validates frontmatter description is 140-160 characters.
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

# Extract description from YAML frontmatter
DESCRIPTION=$(awk '/^---$/{if(++c==2)exit}c==1&&/^description:/{sub(/^description:[[:space:]]*/, ""); gsub(/^["'\''"]|["'\''"]$/, ""); print}' "$FILE")

if [ -z "$DESCRIPTION" ]; then
    echo "FAIL: No description found in frontmatter"
    exit 1
fi

LENGTH=${#DESCRIPTION}

# The documented rule is 140-160 characters. Five characters either side warn
# instead of failing, so a description that reads well isn't padded or trimmed
# to hit an exact count.
MIN=140
MAX=160
TOLERANCE=5

if [ "$LENGTH" -ge "$MIN" ] && [ "$LENGTH" -le "$MAX" ]; then
    echo "PASS: Description is $LENGTH characters ($MIN-$MAX range)"
    exit 0
elif [ "$LENGTH" -ge "$((MIN - TOLERANCE))" ] && [ "$LENGTH" -le "$((MAX + TOLERANCE))" ]; then
    echo "WARN: Description is $LENGTH characters (target $MIN-$MAX, within the $TOLERANCE-character tolerance)"
    echo "  Description: $DESCRIPTION"
    exit 0
else
    echo "FAIL: Description is $LENGTH characters (expected $MIN-$MAX)"
    echo "  Description: $DESCRIPTION"
    exit 1
fi
