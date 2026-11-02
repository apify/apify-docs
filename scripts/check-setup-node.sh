#!/usr/bin/env bash
# Fails if any actions/setup-node step doesn't read the version from .nvmrc
# and resolve the latest patch release (check-latest: true).
set -euo pipefail

awk '
    function check() {
        if (in_step && !(has_file && has_latest)) {
            printf "%s:%d: setup-node step needs node-version-file: .nvmrc and check-latest: true\n", step_file, step_line
            failed = 1
        }
        in_step = 0
    }
    FNR == 1 { check() }
    {
        match($0, /^ */)
        indent = RLENGTH
    }
    in_step && /[^ ]/ && (indent < step_indent || (indent == step_indent && $0 ~ /^ *-/)) { check() }
    /uses: actions\/setup-node@/ {
        in_step = 1; has_file = 0; has_latest = 0
        step_file = FILENAME; step_line = FNR
        # Indent of the step: the "-" on this line, or on the line above if "name:" comes first
        step_indent = ($0 ~ /^ *- /) ? indent : prev_indent
    }
    in_step && /node-version-file: *["\047]?\.nvmrc["\047]? *$/ { has_file = 1 }
    in_step && /check-latest: *true *$/ { has_latest = 1 }
    /^ *- / { prev_indent = indent }
    END { check(); exit failed }
' .github/workflows/*.yml .github/workflows/*.yaml
