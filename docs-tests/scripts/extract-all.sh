#!/usr/bin/env bash
# (Re)extract assertions for every page listed in pages.json. Each page's
# assertions land in assertions/<slug>.json — review the diff, commit the set.
#
# Usage: bash scripts/extract-all.sh

set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f pages.json ]]; then
  echo "pages.json not found." >&2
  exit 1
fi

mapfile -t PAGES < <(jq -r '.pages[]' pages.json)

echo "Extracting ${#PAGES[@]} page(s) from pages.json..."
for page in "${PAGES[@]}"; do
  [[ -z "$page" ]] && continue
  echo ""
  echo "→ $page"
  bash scripts/extract.sh "$page"
done

echo ""
echo "Done. Stored assertion sets:"
ls -1 assertions/*.json 2>/dev/null || echo "  (none)"
jq -s '[.[].assertions | length] | add // 0 | "Total: \(.) assertions across \(input | length) page(s)"' assertions/*.json 2>/dev/null || true
