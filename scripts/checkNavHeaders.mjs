// Verify the per-page `.md` navigation header (#2596 / issue #2557).
//
// `scripts/addNavHeaders.mjs` runs in `postbuild` and prepends a Vercel-style
// YAML frontmatter block to every per-page `.md` file docs.apify.com serves, so
// an AI agent reading a single page can follow parents / children / previous /
// next links without first fetching `llms.txt`. This script checks that the
// served pages actually carry that header and that it never leaked into
// `llms-full.txt`.
//
// The per-page checks run against a live server over HTTP (in CI: Nginx on
// :8080), so they test the real served bytes. The llms-full.txt leak guard
// instead reads the build artifact off disk - see readLlmsFull() for why.
//
// Usage:
//   node scripts/checkNavHeaders.mjs [baseUrl]
//   baseUrl defaults to $NAV_HEADERS_BASE_URL or http://localhost:8080

import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// Resolved relative to this script, so the disk read works regardless of cwd.
const LLMS_FULL_FILE = fileURLToPath(new URL('../build/llms-full.txt', import.meta.url));

const BASE = (process.argv[2] || process.env.NAV_HEADERS_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
const SITE_URL = 'https://docs.apify.com';

// The synthetic root breadcrumb that addNavHeaders.mjs puts at the top of every
// page's `parents:` list. It is generated nowhere else, which makes it both the
// most stable positive marker and a reliable negative marker for the
// llms-full.txt leak check below.
const ROOT_PARENT = `[Apify documentation](${SITE_URL}/llms.txt)`;

// A nav value is always a markdown link to a docs URL, e.g. [Label](https://...).
// The label part allows escaped sequences (`\\`, `\[`, `\]`) because the producer's
// escapeLinkLabel can emit them, so a literal `]` in a label won't end the match early.
const MD_LINK = /^\[(?:\\.|[^\]\\])+\]\(https:\/\/docs\.apify\.com\/\S+\)$/;

// Curated, structurally stable pages chosen to cover every frontmatter-key
// combination the feature can emit. `keys` lists the CONDITIONAL keys that must
// be present on that page (title / url / parents are required on every page and
// checked unconditionally). children = category pages; previous / next = pages
// with a sidebar neighbour on that side. Picked so the set as a whole exercises
// children, previous and next, while each page only asserts what its position in
// the tree guarantees (so reordering siblings can't make it flaky).
const PAGES = [
    // Section landings: only the universal keys, sometimes a `next`.
    { path: '/platform.md', keys: ['next'] },
    { path: '/academy.md', keys: [] },
    { path: '/api.md', keys: [] },
    { path: '/legal.md', keys: ['next'] },
    // Category pages: have a `children` list plus neighbours.
    { path: '/platform/actors.md', keys: ['children', 'previous', 'next'] },
    { path: '/platform/actors/running.md', keys: ['children', 'previous', 'next'] },
    { path: '/platform/storage.md', keys: ['children', 'previous', 'next'] },
    { path: '/platform/integrations.md', keys: ['children', 'previous', 'next'] },
    { path: '/api/v2.md', keys: ['children', 'next'] },
    // Leaf pages: no children, but sit between two neighbours.
    { path: '/platform/storage/dataset.md', keys: ['previous', 'next'] },
    { path: '/platform/proxy/datacenter-proxy.md', keys: ['previous', 'next'] },
    { path: '/api/v2/dataset-get.md', keys: ['previous', 'next'] },
    { path: '/academy/tutorials.md', keys: ['next'] },
    { path: '/legal/general-terms-and-conditions.md', keys: ['previous', 'next'] },
];

const failures = [];
const fail = (page, msg) => failures.push(`${page} → ${msg}`);

// Fetch with curl rather than Node's global fetch (undici). undici throws
// "terminated" reading the ~42MB llms-full.txt through the CI Nginx proxy, while
// curl - which every other assertion in this CI job already uses - streams it
// reliably. Flags: -f makes an HTTP >=400 a non-zero exit; -sS stays quiet but
// still reports real errors; --retry covers genuinely transient blips.
async function fetchText(url) {
    try {
        const { stdout } = await execFileAsync(
            'curl',
            ['-fsS', '--retry', '2', '--retry-delay', '1', '-H', 'Accept: text/markdown', url],
            // llms-full.txt is ~42MB; the default 1MB maxBuffer would truncate it.
            { maxBuffer: 256 * 1024 * 1024 },
        );
        return stdout;
    } catch (err) {
        throw new Error((err.stderr || err.message || '').toString().trim() || `curl failed for ${url}`);
    }
}

// Read llms-full.txt for the leak guard. This is deliberately NOT an HTTP fetch:
// the file is ~42MB and the CI server truncates the response mid-body (undici
// reports "terminated", curl reports "transfer closed with N bytes remaining"),
// so no client can read it reliably over the wire. The leak guard is anyway a
// build-artifact invariant - the nav header must never be concatenated into
// llms-full.txt (issue #2557), which is about what addNavHeaders.mjs leaves in
// build/, not how it's served - so read the file straight off disk. Fall back to
// HTTP only when there is no local build (e.g. checking a remote deployment).
async function readLlmsFull() {
    try {
        return { source: LLMS_FULL_FILE, text: await readFile(LLMS_FULL_FILE, 'utf8') };
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        const url = `${BASE}/llms-full.txt`;
        return { source: url, text: await fetchText(url) };
    }
}

// Returns the frontmatter lines (between the opening and closing `---`), or null
// if the body does not start with a frontmatter block.
function parseFrontmatter(body) {
    const lines = body.split('\n');
    if (lines[0] !== '---') return null;
    const close = lines.indexOf('---', 1);
    if (close === -1) return null;
    return lines.slice(1, close);
}

// A scalar key like `title: ...` or `next: [Label](url)`.
function getScalar(front, key) {
    const line = front.find((l) => l.startsWith(`${key}: `));
    return line ? line.slice(key.length + 2) : null;
}

// A block key like `parents:` / `children:` followed by `  - <item>` lines.
function getList(front, key) {
    const idx = front.indexOf(`${key}:`);
    if (idx === -1) return null;
    const items = [];
    for (let i = idx + 1; i < front.length && front[i].startsWith('  - '); i++) {
        items.push(front[i].slice(4));
    }
    return items;
}

function checkPage(path, body, expectedKeys) {
    const front = parseFrontmatter(body);
    if (!front) {
        fail(path, 'no frontmatter nav header at top of file');
        return;
    }

    // Required on every page: title, url (exactly the page's own URL), parents.
    const title = getScalar(front, 'title');
    if (!title) fail(path, 'missing or empty `title`');

    const expectedUrl = `${SITE_URL}${path}`;
    const url = getScalar(front, 'url');
    if (url !== expectedUrl) fail(path, `\`url\` is "${url}", expected "${expectedUrl}"`);

    const parents = getList(front, 'parents');
    if (!parents || parents.length === 0) {
        fail(path, 'missing `parents`');
    } else {
        if (parents[0] !== ROOT_PARENT) fail(path, `first parent is "${parents[0]}", expected the root breadcrumb`);
        for (const p of parents) if (!MD_LINK.test(p)) fail(path, `parent is not a markdown link: "${p}"`);
    }

    // Conditional keys this page is expected to carry.
    for (const key of expectedKeys) {
        if (key === 'children') {
            const children = getList(front, 'children');
            if (!children || children.length === 0) {
                fail(path, 'expected a non-empty `children` list');
            } else {
                for (const c of children) if (!MD_LINK.test(c)) fail(path, `child is not a markdown link: "${c}"`);
            }
        } else {
            const value = getScalar(front, key);
            if (value === null) fail(path, `expected \`${key}\``);
            else if (!MD_LINK.test(value)) fail(path, `\`${key}\` is not a markdown link: "${value}"`);
        }
    }
}

console.log(`Checking ${PAGES.length} per-page nav headers against ${BASE} ...\n`);

for (const { path, keys } of PAGES) {
    try {
        const body = await fetchText(`${BASE}${path}`);
        const before = failures.length;
        checkPage(path, body, keys);
        console.log(
            `${failures.length === before ? '✅' : '❌'} ${path}  [${['title', 'url', 'parents', ...keys].join(', ')}]`,
        );
    } catch (err) {
        fail(path, err.message);
        console.log(`❌ ${path}  (fetch failed)`);
    }
}

// Regression guard for #2557: the header must NOT leak into llms-full.txt. That
// holds only because addNavHeaders runs after the llms-txt plugin writes
// llms-full.txt; reordering the postbuild scripts would silently break it. The
// synthetic root breadcrumb appears only in the header, so its presence here
// means a leak.
try {
    const { source, text } = await readLlmsFull();
    if (text.includes(ROOT_PARENT)) {
        fail('llms-full.txt', `nav header leaked into ${source} (found the root breadcrumb)`);
        console.log('❌ llms-full.txt  (nav header leaked in)');
    } else {
        console.log(`✅ llms-full.txt  (no nav header leaked in; read ${source})`);
    }
} catch (err) {
    fail('llms-full.txt', err.message);
    console.log('❌ llms-full.txt  (read failed)');
}

if (failures.length > 0) {
    console.error(`\n❌ ${failures.length} nav-header check(s) failed:`);
    for (const f of failures) console.error(`   - ${f}`);
    process.exit(1);
}

console.log(`\n✅ All nav-header checks passed (${PAGES.length} pages + llms-full.txt).`);
