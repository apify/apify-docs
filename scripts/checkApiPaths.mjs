// Fail when a documented `/v2/...` API path is absent from the OpenAPI contract (issue #2804).
//
// The `/v2/acts/...` prefix still responds - apify-core registers it as an alias to the same
// controllers - but it is not in the published contract at api.apify.com/v2/openapi.json, which
// only defines `/v2/actors` and `/v2/actor-runs`. An agent that generates a client from the spec
// therefore gets a different contract than an agent that copies a route out of our docs. This
// script closes that gap by making the docs prove every route they teach exists in the spec.
//
// Reads the bundled spec off disk rather than fetching it, so the check runs against the spec in
// the same commit as the docs. In CI the `validate` job already has the bundle as an artifact.
//
// Usage:
//   pnpm openapi:build:json && pnpm test:api-paths
//   node scripts/checkApiPaths.mjs [specPath]

import { glob, readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SPEC = process.argv[2] ? resolve(process.argv[2]) : resolve(ROOT, 'static/api/openapi.json');

// `sources/api/` is gitignored output generated from the spec itself, so it can only ever agree
// with the spec - and it legitimately carries the documented `/v2/acts/` compatibility notice.
const SOURCES = 'sources/**/*.{md,mdx}';
const SKIP_DIR = 'sources/api/';

// Only `api.apify.com` serves our v2 API. Other hosts have their own unrelated `/v2/` namespaces
// (registry.hub.docker.com/v2/repositories/... is a real, valid link in the tree).
const API_HOST = 'api.apify.com';

// Trailing hostname in the text before `/v2/`, e.g. `https://api.apify.com`. A bare `/v2/...` with
// no host is still checked - the most agent-visible legacy route this issue was filed over lived
// in a bare code span in the agent-onboarding quick-reference table, so a host-anchored match
// would have passed while missing the one occurrence that mattered most.
const TRAILING_HOST = /([A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,})$/;

// Where a path reference ends. Markdown and code fences wrap them in all of these.
const PATH_CHARS = /[A-Za-z0-9{}$@%!*+,:;.=_~/-]/;

const spec = JSON.parse(await readFile(SPEC, 'utf8'));
const specPaths = Object.keys(spec.paths ?? {});
if (specPaths.length === 0) throw new Error(`No paths found in ${SPEC} - is the bundle built?`);

// Existing-in-the-spec is necessary but not sufficient. `/v2/actors/{actorId}/runs/{runId}` is in
// the contract yet carries `deprecated: true` - "endpoints related to run of the Actor were moved
// under new namespace actor-runs" - so a docs page can teach a contract-valid route that we've
// already superseded. Treat that as drift too, otherwise the check blesses the deprecated form.
const deprecatedPaths = new Set(
    specPaths.filter((p) => Object.values(spec.paths[p]).some((op) => op?.deprecated === true)),
);

// A doc path matches a spec path when they have the same number of segments and every spec segment
// is either a `{template}` (any concrete value the docs put there - `apify~web-scraper`,
// `ACTOR_ID`, a real id) or literally equal.
const specSegments = specPaths.map((p) => ({ path: p, segs: p.split('/') }));

// All spec paths a doc path could be. Templates make this genuinely ambiguous: a docs page writing
// `/v2/actors/X/runs/last` matches both `/v2/actors/{actorId}/runs/last` and the deprecated
// `/v2/actors/{actorId}/runs/{runId}`, so callers must not assume a single match.
function matchSpecPaths(docPath) {
    const docSegs = docPath.split('/');
    return specSegments
        .filter(
            ({ segs }) =>
                segs.length === docSegs.length && segs.every((seg, i) => seg.startsWith('{') || seg === docSegs[i]),
        )
        .map(({ path }) => path);
}

// Template interpolation leaves fragments a static check can't resolve: `${storeId}`,
// f-string `{os.environ[...]}`, or a literal ellipsis standing in for the rest of a route.
// These aren't drift, so skip them rather than reporting them.
function isUnresolvable(docPath) {
    if (docPath.includes('$') || docPath.includes('...')) return true;
    return docPath.split('/').some((seg) => {
        const open = (seg.match(/{/g) ?? []).length;
        const close = (seg.match(/}/g) ?? []).length;
        return open !== close;
    });
}

// Returns the `/v2/...` path at `index`, or null when the reference should not be checked.
function extractRef(line, index) {
    const before = line.slice(0, index);

    // A relative or absolute link into our own API reference pages - `/api/v2/actor-get` is a
    // Docusaurus slug, not an API route. This is the largest false-positive class by far.
    if (before.endsWith('/api')) return null;

    const host = before.match(TRAILING_HOST)?.[1];
    if (host && host !== API_HOST) return null;

    let end = index + '/v2/'.length;
    while (end < line.length && PATH_CHARS.test(line[end])) end += 1;

    // Trailing punctuation belongs to the prose, not the path.
    const path = line.slice(index, end).replace(/[.,:;/-]+$/, '');
    if (path === '/v2') return null;

    return path;
}

const missing = [];
const deprecated = [];
let checked = 0;
let skipped = 0;

for await (const entry of glob(SOURCES, { cwd: ROOT })) {
    const file = entry.split('\\').join('/');
    if (file.startsWith(SKIP_DIR)) continue;

    const lines = (await readFile(resolve(ROOT, entry), 'utf8')).split('\n');

    lines.forEach((line, i) => {
        for (let at = line.indexOf('/v2/'); at !== -1; at = line.indexOf('/v2/', at + 1)) {
            const path = extractRef(line, at);
            if (!path) continue;
            if (isUnresolvable(path)) {
                skipped += 1;
                continue;
            }
            checked += 1;

            const matches = matchSpecPaths(path);
            if (matches.length === 0) {
                missing.push(`${file}:${i + 1}  ${path}`);
                continue;
            }

            // Only drift when every candidate is deprecated - if any current path also matches,
            // the docs are on a supported route.
            if (matches.every((m) => deprecatedPaths.has(m))) {
                deprecated.push(`${file}:${i + 1}  ${path}  (matches deprecated ${matches.join(', ')})`);
            }
        }
    });
}

// The counts are load-bearing output, not decoration: a regex regression that stops matching would
// otherwise show up as a silent pass. If `checked` drops toward zero, the extractor is broken.
console.log(
    `Checked ${checked} API path reference(s) in sources/**/*.{md,mdx} against ${specPaths.length}` +
        ` paths in ${relative(ROOT, SPEC)}` +
        `\n(${skipped} skipped as template interpolation)\n`,
);

if (missing.length > 0) {
    console.error(`❌ ${missing.length} documented API path(s) are absent from the OpenAPI contract:\n`);
    for (const f of missing) console.error(`   ${f}`);
    console.error(
        '\nUse the canonical route from the spec. The `/v2/acts/...` prefix is a deprecated alias' +
            '\nthat still responds but is not part of the published contract - see issue #2804.',
    );
}

if (deprecated.length > 0) {
    console.error(`\n❌ ${deprecated.length} documented API path(s) are deprecated in the OpenAPI contract:\n`);
    for (const f of deprecated) console.error(`   ${f}`);
    console.error(
        "\nThese exist but are superseded. Read the operation's description in the spec for the" +
            '\nreplacement - Actor-scoped run and build routes moved to `/v2/actor-runs` and' +
            '\n`/v2/actor-builds`.',
    );
}

if (missing.length > 0 || deprecated.length > 0) process.exit(1);

console.log('✅ Every documented API path exists in the OpenAPI contract and none are deprecated');
