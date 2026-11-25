#!/usr/bin/env node
// Static checks on the committed assertion baseline (assertions/*.json).
// Reads files only: no browser, no network, no credentials, no dependencies.
//
// Two kinds of finding:
//
// - Invalid: an assertion breaks the format rules below. Always fails the run.
//   The baseline is input to a browser job that runs outside this repository,
//   so the rules are strict: a `target`/`at` that is not a plain Console path
//   could send that browser somewhere else.
// - Stale: an assertion's `source_file` / `source_quote` no longer resolves,
//   so the doc was moved or reworded. Reported as a warning. Fails the run only
//   with `--strict`.
//
// Usage: node scripts/check-baseline.mjs [--strict]

/* eslint-disable no-console -- a CLI: its output is the result */

import { appendFileSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS_TESTS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = resolve(DOCS_TESTS_DIR, '..');
// Overridable so the tests can point the check at fixture files.
const ASSERTIONS_DIR = process.env.DOCS_TESTS_ASSERTIONS_DIR ?? join(DOCS_TESTS_DIR, 'assertions');

const KINDS = ['route', 'element_button', 'element_tab', 'element_text'];
const SET_KEYS = ['source_file', 'assertions'];
const ASSERTION_KEYS = ['id', 'kind', 'target', 'at', 'page_context', 'source_quote', 'source_line', 'needs_auth'];
const REQUIRED_ASSERTION_KEYS = ASSERTION_KEYS.filter((key) => key !== 'at');

const MAX_ASSERTIONS_PER_FILE = 200;
const MAX_LABEL_LENGTH = 120;
const MAX_PATH_LENGTH = 200;
const MAX_TEXT_LENGTH = 1000;

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SOURCE_FILE_PATTERN = /^sources\/[A-Za-z0-9/_.-]+\.mdx?$/;
// One leading slash, then URL path characters only. No scheme, host, backslash or whitespace.
const CONSOLE_PATH_PATTERN = /^\/(?!\/)[A-Za-z0-9/_\-.?=&%#]*$/;
// Any origin works here: the check is that the path cannot change it.
const PLACEHOLDER_ORIGIN = 'https://console.invalid';

const strict = process.argv.includes('--strict');
const invalid = [];
const stale = [];

const isString = (value) => typeof value === 'string' && value.length > 0;

// Collapse whitespace so a quote still matches after the doc reflowed lines.
const normalize = (text) => text.replace(/\s+/g, ' ').trim();

function isConsolePath(value) {
    if (!isString(value) || value.length > MAX_PATH_LENGTH || !CONSOLE_PATH_PATTERN.test(value)) return false;
    if (value.split(/[?#]/)[0].split('/').includes('..')) return false;
    try {
        return new URL(value, PLACEHOLDER_ORIGIN).origin === PLACEHOLDER_ORIGIN;
    } catch {
        return false;
    }
}

function validateAssertion(assertion, where, seenIds) {
    const problems = [];
    if (assertion === null || typeof assertion !== 'object' || Array.isArray(assertion)) {
        return ['is not an object'];
    }

    for (const key of Object.keys(assertion)) {
        if (!ASSERTION_KEYS.includes(key)) problems.push(`has an unknown field "${key}"`);
    }
    for (const key of REQUIRED_ASSERTION_KEYS) {
        if (!(key in assertion)) problems.push(`is missing "${key}"`);
    }

    const { id, kind, target, at, page_context: pageContext, source_quote: quote, source_line: line } = assertion;

    if ('id' in assertion) {
        if (!isString(id) || !ID_PATTERN.test(id) || id.length > MAX_LABEL_LENGTH) {
            problems.push('"id" must be kebab-case (lowercase letters, digits and dashes)');
        } else if (seenIds.has(id)) {
            problems.push(`"id" duplicates another assertion in ${where}`);
        } else {
            seenIds.add(id);
        }
    }
    if ('kind' in assertion && !KINDS.includes(kind)) {
        problems.push(`"kind" must be one of: ${KINDS.join(', ')}`);
    }
    if ('target' in assertion) {
        if (kind === 'route') {
            if (!isConsolePath(target)) {
                problems.push('"target" of a route must be a plain Console path such as "/settings/security"');
            }
        } else if (!isString(target) || target.length > MAX_LABEL_LENGTH || target !== target.trim()) {
            problems.push(`"target" must be a visible label of 1-${MAX_LABEL_LENGTH} characters`);
        }
    }
    if ('at' in assertion) {
        if (kind === 'route') problems.push('"at" is not allowed on a route; put the path in "target"');
        else if (!isConsolePath(at)) problems.push('"at" must be a plain Console path such as "/billing"');
    }
    if ('page_context' in assertion && (!isString(pageContext) || pageContext.length > MAX_TEXT_LENGTH)) {
        problems.push(`"page_context" must be text of 1-${MAX_TEXT_LENGTH} characters`);
    }
    if ('source_quote' in assertion && (!isString(quote) || quote.length > MAX_TEXT_LENGTH)) {
        problems.push(`"source_quote" must be text of 1-${MAX_TEXT_LENGTH} characters`);
    }
    if ('source_line' in assertion && (!Number.isInteger(line) || line < 1)) {
        problems.push('"source_line" must be a positive whole number');
    }
    if ('needs_auth' in assertion && typeof assertion.needs_auth !== 'boolean') {
        problems.push('"needs_auth" must be true or false');
    }
    return problems;
}

function checkFile(fileName) {
    const where = `docs-tests/assertions/${fileName}`;
    let set;
    try {
        set = JSON.parse(readFileSync(join(ASSERTIONS_DIR, fileName), 'utf8'));
    } catch (error) {
        invalid.push({ where, message: `is not valid JSON: ${error.message}` });
        return 0;
    }

    if (set === null || typeof set !== 'object' || Array.isArray(set)) {
        invalid.push({ where, message: 'must be a JSON object with "source_file" and "assertions"' });
        return 0;
    }
    for (const key of Object.keys(set)) {
        if (!SET_KEYS.includes(key)) invalid.push({ where, message: `has an unknown top-level field "${key}"` });
    }

    const sourceFile = set.source_file;
    const hasValidSourceFile =
        isString(sourceFile) && SOURCE_FILE_PATTERN.test(sourceFile) && !sourceFile.split('/').includes('..');
    if (!hasValidSourceFile) {
        invalid.push({ where, message: '"source_file" must be a Markdown path under sources/, without ".."' });
    }

    if (!Array.isArray(set.assertions)) {
        invalid.push({ where, message: '"assertions" must be a list' });
        return 0;
    }
    if (set.assertions.length > MAX_ASSERTIONS_PER_FILE) {
        invalid.push({ where, message: `has more than ${MAX_ASSERTIONS_PER_FILE} assertions` });
        return 0;
    }

    const docPath = hasValidSourceFile ? join(REPO_ROOT, sourceFile) : undefined;
    const docExists = docPath !== undefined && existsSync(docPath);
    const docText = docExists ? readFileSync(docPath, 'utf8') : '';
    const docLineCount = docText.split('\n').length;
    const normalizedDoc = normalize(docText);

    if (hasValidSourceFile && !docExists) {
        stale.push({
            where,
            message: `"${sourceFile}" does not exist. The doc was moved or deleted: update pages.json and re-extract.`,
        });
    }

    const seenIds = new Set();
    set.assertions.forEach((assertion, index) => {
        const label = isString(assertion?.id) ? assertion.id : `#${index + 1}`;
        const problems = validateAssertion(assertion, where, seenIds);
        for (const problem of problems) invalid.push({ where, message: `assertion ${label} ${problem}` });
        if (problems.length > 0 || !docExists) return;

        const { source_line: line, source_quote: quote } = assertion;
        if (!normalizedDoc.includes(normalize(quote))) {
            stale.push({
                where: sourceFile,
                line: Math.min(line, docLineCount),
                message: `assertion ${label} (${where}): its quote is no longer in the doc. Re-extract or update the assertion. Quote: "${quote}"`,
            });
        } else if (line > docLineCount) {
            stale.push({
                where: sourceFile,
                line: docLineCount,
                message: `assertion ${label} (${where}): source_line ${line} is past the end of the doc (${docLineCount} lines).`,
            });
        }
    });
    return set.assertions.length;
}

// GitHub Actions reads `::error` / `::warning` lines as annotations; locally they are plain output.
function annotate(level, { where, line, message }) {
    const escaped = message.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
    const location = line ? `file=${where},line=${line}` : `file=${where}`;
    console.log(`::${level} ${location}::${escaped}`);
}

function writeSummary(total) {
    const summaryPath = process.env.GITHUB_STEP_SUMMARY;
    if (!summaryPath) return;

    const cell = (text) => text.replace(/\|/g, '\\|').replace(/\s+/g, ' ');
    const lines = ['## Docs UI assertion baseline', ''];
    lines.push(`Checked ${total} assertion(s): ${invalid.length} invalid, ${stale.length} stale.`, '');
    for (const [title, findings] of [
        ['Invalid (blocks the merge)', invalid],
        [strict ? 'Stale' : 'Stale (advisory)', stale],
    ]) {
        if (findings.length === 0) continue;
        lines.push(`### ${title}`, '', '| Location | Finding |', '| --- | --- |');
        for (const { where, line, message } of findings) {
            lines.push(`| \`${where}${line ? `:${line}` : ''}\` | ${cell(message)} |`);
        }
        lines.push('');
    }
    appendFileSync(summaryPath, `${lines.join('\n')}\n`);
}

const files = existsSync(ASSERTIONS_DIR)
    ? readdirSync(ASSERTIONS_DIR)
          .filter((name) => name.endsWith('.json'))
          .sort()
    : [];

let total = 0;
for (const fileName of files) total += checkFile(fileName);

for (const finding of invalid) annotate('error', finding);
for (const finding of stale) annotate(strict ? 'error' : 'warning', finding);
writeSummary(total);

console.log(
    `\nChecked ${total} assertion(s) in ${files.length} file(s): ${invalid.length} invalid, ${stale.length} stale.`,
);

process.exit(invalid.length > 0 || (strict && stale.length > 0) ? 1 : 0);
