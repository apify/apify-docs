import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');
const CURATED_FILE = path.resolve('scripts/llms-external-curated.txt');

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
    'Apify SDK for JavaScript',
    'Apify SDK for Python',
    'Apify CLI',
    'Apify academy',
    'Legal documents',
];

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

    // llms.txt: append curated static content, then reorder all sections
    const curatedContent = await fs.readFile(CURATED_FILE, 'utf8');
    await fs.appendFile(llmsPath, curatedContent, 'utf8');

    const combined = await fs.readFile(llmsPath, 'utf8');
    await fs.writeFile(llmsPath, reorderSections(combined), 'utf8');
    console.log('Wrote and reordered build/llms.txt');

    // llms-full.txt: fetch and append full content from external repos (unchanged behavior)
    const contents = await Promise.all(
        EXTERNAL_FETCH_URLS.map((route) => fetchFile(route)),
    );
    const joined = contents.filter(Boolean).join('\n\n');
    await fs.appendFile(path.join(BUILD_DIR, 'llms-full.txt'), joined, 'utf8');
    console.log('Wrote llms-full.txt to build/');
}

async function sanitizeFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const sanitizedContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    await fs.writeFile(filePath, sanitizedContent, 'utf8');
    console.log(`Sanitized ${filePath}`);
}

joinFiles().catch((err) => {
    console.error('Failed to join LLMs files:', err);
    process.exit(1);
});

for (const llmsFile of ['llms.txt', 'llms-full.txt']) {
    sanitizeFile(path.join(BUILD_DIR, llmsFile));
}
