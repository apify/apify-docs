import fs from 'node:fs/promises';
import path from 'node:path';

import { createMatcher } from '@docusaurus/utils';

const BUILD_DIR = path.resolve('build');
const CURATED_FILE = path.resolve('scripts/llms-external-curated.txt');

// Patterns of routes that should be excluded from the llms.txt index but
// must keep their .md counterparts available at /<route>.md so that
// `https://docs.apify.com/<route>.md` continues to return 200.
//
// Do NOT add these to the plugin's `excludeRoutes` in docusaurus.config.js -
// that would also drop the generated .md file from the build output.
const LLMS_INDEX_EXCLUDE_PATTERNS = [
    // API: drop deprecated act-* endpoints
    '/api/v2/act-*',
    // API: drop individual CRUD endpoint pages (keep Introduction pages)
    '/api/v2/actor-build-abort-post',
    '/api/v2/actor-build-delete',
    '/api/v2/actor-build-get',
    '/api/v2/actor-build-log-get',
    '/api/v2/actor-build-openapi-json-get',
    '/api/v2/actor-builds-get',
    '/api/v2/actor-run-*',
    '/api/v2/actor-runs-get',
    '/api/v2/actor-task-*',
    '/api/v2/actor-tasks-get',
    '/api/v2/actor-tasks-post',
    '/api/v2/acts-get',
    '/api/v2/acts-post',
    '/api/v2/dataset-*',
    '/api/v2/datasets-*',
    '/api/v2/key-value-store-*',
    '/api/v2/key-value-stores-*',
    '/api/v2/log-get',
    '/api/v2/post-*',
    '/api/v2/request-queue-*',
    '/api/v2/request-queues-*',
    '/api/v2/schedule-*',
    '/api/v2/schedules-get',
    '/api/v2/schedules-post',
    '/api/v2/store-get',
    '/api/v2/tools-*',
    '/api/v2/user-get',
    '/api/v2/users-me-*',
    '/api/v2/webhook-*',
    '/api/v2/webhooks-get',
    '/api/v2/webhooks-post',
    // Academy: drop legacy JS course
    '/academy/scraping-basics-javascript/legacy',
    '/academy/scraping-basics-javascript/legacy/**',
    // Academy: drop individual Node.js tutorials (keep index)
    '/academy/node-js/*',
    // Academy: drop individual Python tutorials (keep index)
    '/academy/python/*',
    // Academy: drop exercise solutions
    '/academy/expert-scraping-with-apify/solutions',
    '/academy/expert-scraping-with-apify/solutions/**',
    // Academy: drop legacy scraper tutorials (keep index)
    '/academy/apify-scrapers/*',
    // Academy: drop marketing playbook deep pages
    '/academy/actor-marketing-playbook/**',
    // Academy: misc
    '/academy/tutorials',
    '/academy/php/**',
    // Legal: drop outdated docs
    '/legal/old/**',
    '/legal/fair-share-program-terms-and-conditions',
    '/legal/challenge-terms-and-conditions',
    '/legal/candidate-referral-program-terms',
    // Misc singleton pages
    '/open-source',
    '/sdk',
];

// Aligned with scripts/indentLlmsFile.mjs so preview/PR builds (which set
// APIFY_DOCS_ABSOLUTE_URL) get the same treatment as production.
const SITE_URL = process.env.APIFY_DOCS_ABSOLUTE_URL || 'https://docs.apify.com';

const isExcludedRoute = createMatcher(LLMS_INDEX_EXCLUDE_PATTERNS);

// Experimental API clients whose docs live only on GitHub (no docs site yet).
// Their README + docs/*.md files are fetched into llms-full.txt the same way
// as the Actor whitepaper below; the matching llms.txt index sections are
// hand-maintained in scripts/llms-external-curated.txt. Values are the
// per-resource pages each repo has under docs/ (README.md and docs/README.md
// are always included).
const EXPERIMENTAL_CLIENT_DOCS = {
    'apify-client-rust': ['actors', 'builds', 'runs', 'storages', 'tasks', 'schedules', 'webhooks', 'misc'],
    'apify-client-go': ['actors', 'builds', 'runs', 'storages', 'tasks', 'schedules', 'webhooks', 'misc'],
    'apify-client-php': ['actors', 'builds', 'runs', 'storages', 'tasks', 'schedules', 'webhooks', 'misc', 'examples', 'models', 'options'],
    'apify-client-java': ['actors', 'builds', 'runs', 'storages', 'tasks', 'schedules', 'webhooks', 'misc', 'examples'],
    'apify-client-dotnet': ['actors', 'builds', 'runs', 'storages', 'tasks', 'schedules', 'webhooks', 'misc', 'examples', 'models'],
};

const EXPERIMENTAL_CLIENT_FETCH_URLS = Object.entries(EXPERIMENTAL_CLIENT_DOCS).flatMap(([repo, pages]) =>
    ['README.md', 'docs/README.md', ...pages.map((page) => `docs/${page}.md`)].map(
        (file) => `https://raw.githubusercontent.com/apify/${repo}/refs/heads/master/${file}`,
    ),
);

const EXTERNAL_FETCH_URLS = [
    'https://docs.apify.com/api/client/js/llms-full.txt',
    'https://docs.apify.com/api/client/python/llms-full.txt',
    'https://docs.apify.com/sdk/js/llms-full.txt',
    'https://docs.apify.com/sdk/python/llms-full.txt',
    'https://docs.apify.com/cli/llms-full.txt',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/README.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/ACTOR_FILE.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/DATASET_SCHEMA.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/IDEAS.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/INPUT_SCHEMA.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/KEY_VALUE_STORE_SCHEMA.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/OUTPUT_SCHEMA.md',
    'https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/pages/REQUEST_QUEUE_SCHEMA.md',
    ...EXPERIMENTAL_CLIENT_FETCH_URLS,
];

async function fetchFile(route) {
    try {
        const res = await fetch(route);
        if (!res.ok) throw new Error(`Failed to fetch ${route}: ${res.status}`);
        return await res.text();
    } catch (err) {
        console.error(`Error fetching ${route}:`, err.message);
        return '';
    }
}

// Desired section order for llms.txt — sections not listed here appear at the end in original order
const SECTION_ORDER = [
    'Platform documentation',
    'Apify API',
    'Apify API client for JavaScript',
    'Apify API client for Python',
    'Experimental API clients',
    'Apify SDK for JavaScript',
    'Apify SDK for Python',
    'Apify CLI',
    'Apify Academy',
    'Legal documents',
];

/**
 * Remove llms.txt list entries (`- [Title](url): description` lines) whose
 * URL matches any of LLMS_INDEX_EXCLUDE_PATTERNS. Section headings (`## ...`)
 * left without any entries afterwards are dropped as well. The plugin still
 * emits the .md counterparts for every page, so this only trims the index.
 */
function filterLlmsIndex(content) {
    const linkLine = /^\s*-\s+\[[^\]]+\]\((https?:\/\/[^)]+)\)/;
    let droppedEntries = 0;

    const filteredLines = content.split('\n').filter((line) => {
        const match = line.match(linkLine);
        if (!match) return true;

        // Only filter our own docs URLs; leave external links alone.
        if (!match[1].startsWith(SITE_URL)) return true;

        let urlPath;
        try {
            urlPath = new URL(match[1]).pathname.replace(/\.md$/, '');
        } catch {
            console.warn(`filterLlmsIndex: could not parse URL ${match[1]}, keeping line`);
            return true;
        }

        if (isExcludedRoute(urlPath)) {
            droppedEntries++;
            return false;
        }
        return true;
    });

    // Drop now-empty `## Section` headings (and the blank line that precedes them).
    const result = [];
    let droppedSections = 0;
    for (let i = 0; i < filteredLines.length; i++) {
        const line = filteredLines[i];
        if (line.startsWith('## ')) {
            let hasEntries = false;
            for (let j = i + 1; j < filteredLines.length; j++) {
                const next = filteredLines[j];
                if (next.startsWith('## ')) break;
                if (linkLine.test(next)) {
                    hasEntries = true;
                    break;
                }
            }
            if (!hasEntries) {
                while (result.length && result.at(-1).trim() === '') result.pop();
                droppedSections++;
                continue;
            }
        }
        result.push(line);
    }

    console.log(`Filtered llms.txt index: removed ${droppedEntries} entries, ${droppedSections} empty sections`);
    return result.join('\n');
}

/**
 * Reorder ## sections in llms.txt according to SECTION_ORDER.
 * Keeps the header (everything before the first ## section) in place.
 */
function reorderSections(content) {
    const sectionRegex = /^## .+$/gm;
    const firstMatch = sectionRegex.exec(content);
    if (!firstMatch) return content;

    const header = content.slice(0, firstMatch.index);
    const body = content.slice(firstMatch.index);

    // Split into sections by ## headings
    const sections = [];
    const parts = body.split(/^(?=## )/gm);
    for (const part of parts) {
        const nameMatch = part.match(/^## (.+)$/m);
        sections.push({ name: nameMatch ? nameMatch[1].trim() : '', content: part });
    }

    sections.sort((a, b) => {
        const indexA = SECTION_ORDER.indexOf(a.name);
        const indexB = SECTION_ORDER.indexOf(b.name);
        // Sections not in the list keep their relative order at the end
        const orderA = indexA === -1 ? SECTION_ORDER.length + sections.indexOf(a) : indexA;
        const orderB = indexB === -1 ? SECTION_ORDER.length + sections.indexOf(b) : indexB;
        return orderA - orderB;
    });

    return header + sections.map((s) => s.content.replace(/\n*$/, '\n')).join('\n');
}

async function joinFiles() {
    await fs.mkdir(BUILD_DIR, { recursive: true });
    const llmsPath = path.join(BUILD_DIR, 'llms.txt');

    // llms.txt: filter out routes we don't want indexed (their .md files are
    // still served), append curated static content, then reorder all sections
    const generated = await fs.readFile(llmsPath, 'utf8');
    await fs.writeFile(llmsPath, filterLlmsIndex(generated), 'utf8');

    const curatedContent = await fs.readFile(CURATED_FILE, 'utf8');
    await fs.appendFile(llmsPath, curatedContent, 'utf8');

    const combined = await fs.readFile(llmsPath, 'utf8');
    await fs.writeFile(llmsPath, reorderSections(combined), 'utf8');
    console.log('Wrote and reordered build/llms.txt');

    // llms-full.txt: fetch and append full content from external repos (unchanged behavior)
    const contents = await Promise.all(EXTERNAL_FETCH_URLS.map((route) => fetchFile(route)));
    const joined = contents.filter(Boolean).join('\n\n');
    await fs.appendFile(path.join(BUILD_DIR, 'llms-full.txt'), joined, 'utf8');
    console.log('Wrote llms-full.txt to build/');
}

async function sanitizeFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    // Remove HTML tags. Tags must open and close on the same line - a lone `<`
    // in code (e.g. `count < 10` in a Java sample) must not swallow everything
    // up to a `>` many lines (or files) later.
    const sanitizedContent = content.replace(/<[^>\n]*>/g, '');
    await fs.writeFile(filePath, sanitizedContent, 'utf8');
    console.log(`Sanitized ${filePath}`);
}

try {
    await joinFiles();
} catch (err) {
    console.error('Failed to join LLMs files:', err);
    process.exit(1);
}

for (const llmsFile of ['llms.txt', 'llms-full.txt']) {
    try {
        await sanitizeFile(path.join(BUILD_DIR, llmsFile));
    } catch (err) {
        console.error(`Failed to sanitize ${llmsFile}:`, err);
        process.exit(1);
    }
}
