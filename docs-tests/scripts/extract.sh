#!/usr/bin/env bash
# Extract testable Console-UI assertions from ONE docs page using `claude -p`,
# and write the result to assertions/<slug>.json — a committed, reviewed
# baseline the runner later evaluates against staging.
#
# Usage: bash scripts/extract.sh <repo-relative-doc-path>
#   e.g. bash scripts/extract.sh sources/platform/console/settings.md
#
# To (re)extract every page in pages.json, use scripts/extract-all.sh.

set -euo pipefail

cd "$(dirname "$0")/.."            # docs-tests/
DOCS_TESTS_DIR="$(pwd)"
REPO_ROOT="$(cd .. && pwd)"        # apify-docs repo root

DOC_PATH="${1:?Usage: extract.sh <repo-relative-doc-path>}"
ABS_DOC="$REPO_ROOT/$DOC_PATH"
SYSTEM_PROMPT_FILE="prompts/extract-system.md"

if [[ ! -f "$ABS_DOC" ]]; then
  echo "Doc not found: $DOC_PATH (looked in $ABS_DOC)" >&2
  exit 1
fi

# Slug for the stored file: strip the sources/platform/ prefix and .md suffix,
# turn path separators into dashes. e.g. console/settings.md -> console-settings
SLUG=$(printf '%s' "$DOC_PATH" | sed -e 's#^sources/platform/##' -e 's#\.md$##' -e 's#[/ ]#-#g')
OUTPUT_FILE="assertions/$SLUG.json"
mkdir -p assertions

# Pass the doc inline as the user prompt so source_line numbers refer to the
# real source file's own line numbering. We run claude from /tmp to avoid
# CLAUDE.md/AGENTS.md auto-discovery picking up repo or personal context, and
# disable slash commands so user skills can't inject into the extraction.
USER_PROMPT=$(cat <<EOF
Extract testable Console-UI assertions from the following Markdown documentation
file. The source file path is "$DOC_PATH". Line numbers in your output refer
to lines in this content (1-indexed).

--- BEGIN DOCUMENT ---
$(cat "$ABS_DOC")
--- END DOCUMENT ---
EOF
)

RAW_OUTPUT=$(cd /tmp && claude -p \
  --disable-slash-commands \
  --system-prompt "$(cat "$DOCS_TESTS_DIR/$SYSTEM_PROMPT_FILE")" \
  --output-format json \
  --model sonnet \
  "$USER_PROMPT" | jq -r '.result')

# Slice out the JSON between <output> sentinels; discard any stray prose.
echo "$RAW_OUTPUT" \
  | awk '/<output>/{flag=1;next} /<\/output>/{flag=0} flag' \
  > "$OUTPUT_FILE"

if [[ ! -s "$OUTPUT_FILE" ]]; then
  echo "Extraction produced no JSON for $DOC_PATH. Raw model output was:" >&2
  echo "$RAW_OUTPUT" >&2
  rm -f "$OUTPUT_FILE"
  exit 1
fi

if ! jq empty "$OUTPUT_FILE" 2>/dev/null; then
  echo "Extraction produced non-JSON output for $DOC_PATH. Contents:" >&2
  cat "$OUTPUT_FILE" >&2
  exit 1
fi

COUNT=$(jq '.assertions | length' "$OUTPUT_FILE")
echo "Wrote $OUTPUT_FILE ($COUNT assertions)"
