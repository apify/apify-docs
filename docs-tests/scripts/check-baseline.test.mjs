// Tests for check-baseline.mjs. Run with `node --test scripts/` from docs-tests/.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'check-baseline.mjs');
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

// A real doc and a line from it, so the valid fixture resolves without depending on its wording.
const SOURCE_FILE = 'sources/platform/account/console.md';
const SOURCE_QUOTE = readFileSync(join(REPO_ROOT, SOURCE_FILE), 'utf8')
    .split('\n')
    .find((line) => line.trim().length > 20);

const validAssertion = (overrides = {}) => ({
    id: 'example-label',
    kind: 'element_text',
    target: 'Example',
    at: '/settings',
    page_context: 'Settings page',
    source_quote: SOURCE_QUOTE,
    source_line: 1,
    needs_auth: true,
    ...overrides,
});

function runCheck(set, args = []) {
    const dir = mkdtempSync(join(tmpdir(), 'docs-tests-'));
    try {
        writeFileSync(join(dir, 'fixture.json'), typeof set === 'string' ? set : JSON.stringify(set));
        const result = spawnSync(process.execPath, [SCRIPT, ...args], {
            env: { ...process.env, DOCS_TESTS_ASSERTIONS_DIR: dir, GITHUB_STEP_SUMMARY: '' },
            encoding: 'utf8',
        });
        return { status: result.status, output: result.stdout + result.stderr };
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
}

const withAssertion = (overrides) => ({ source_file: SOURCE_FILE, assertions: [validAssertion(overrides)] });

test('the committed baseline has no invalid assertions', () => {
    const result = spawnSync(process.execPath, [SCRIPT], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stdout);
});

test('a valid assertion passes', () => {
    const { status, output } = runCheck(withAssertion());
    assert.equal(status, 0, output);
    assert.match(output, /0 invalid, 0 stale/);
});

test('paths that could leave Console are rejected', async (t) => {
    const badPaths = [
        'https://evil.example/x',
        '//evil.example/x',
        '/\\evil.example',
        'javascript:alert(1)',
        'settings',
        ' /settings',
        '/settings/../../x',
        '/a b',
        '',
    ];
    for (const path of badPaths) {
        await t.test(`at: ${JSON.stringify(path)}`, () => {
            const { status, output } = runCheck(withAssertion({ at: path }));
            assert.equal(status, 1, output);
            assert.match(output, /"at" must be a plain Console path/);
        });
        await t.test(`route target: ${JSON.stringify(path)}`, () => {
            const route = validAssertion({ kind: 'route', target: path });
            delete route.at;
            const { status, output } = runCheck({ source_file: SOURCE_FILE, assertions: [route] });
            assert.equal(status, 1, output);
        });
    }
});

test('Console paths with a query or hash are accepted', () => {
    for (const path of ['/billing#/limits', '/settings/integrations', '/store?category=AI']) {
        const { status, output } = runCheck(withAssertion({ at: path }));
        assert.equal(status, 0, `${path}: ${output}`);
    }
});

test('format problems are rejected', async (t) => {
    const cases = {
        'unknown kind': withAssertion({ kind: 'element_link' }),
        'unknown field': withAssertion({ script: 'x' }),
        'missing field': { source_file: SOURCE_FILE, assertions: [{ id: 'a', kind: 'route', target: '/x' }] },
        'overlong label': withAssertion({ target: 'x'.repeat(121) }),
        'id not kebab-case': withAssertion({ id: 'Not Kebab' }),
        'duplicate id': { source_file: SOURCE_FILE, assertions: [validAssertion(), validAssertion()] },
        'source_file outside sources/': { source_file: '../secrets.md', assertions: [] },
        'source_file with ..': { source_file: 'sources/../package.md', assertions: [] },
        'unknown top-level field': { source_file: SOURCE_FILE, assertions: [], extra: true },
        'not JSON': '{ not json',
    };
    for (const [name, set] of Object.entries(cases)) {
        await t.test(name, () => {
            const { status, output } = runCheck(set);
            assert.equal(status, 1, output);
        });
    }
});

test('a stale quote warns, and fails only with --strict', () => {
    const set = withAssertion({ source_quote: 'This sentence is not in the doc at all.' });

    const advisory = runCheck(set);
    assert.equal(advisory.status, 0, advisory.output);
    assert.match(advisory.output, /::warning .*quote is no longer in the doc/);

    const strict = runCheck(set, ['--strict']);
    assert.equal(strict.status, 1, strict.output);
});

test('a missing doc is reported as stale', () => {
    const { status, output } = runCheck({ source_file: 'sources/platform/does-not-exist.md', assertions: [] });
    assert.equal(status, 0, output);
    assert.match(output, /does not exist/);
});
