import fs from 'node:fs/promises';
import path from 'node:path';

const ROUTES = [
    'https://docs.apify.com/api/client/js',
    'https://docs.apify.com/api/client/python',
    'https://docs.apify.com/sdk/js',
    'https://docs.apify.com/sdk/python',
    'https://docs.apify.com/cli',
];

const FILES = ['llms.txt', 'llms-full.txt'];
const BUILD_DIR = path.resolve('build');

async function fetchFile(route, file) {
    const url = `${route}/${file}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
        return await res.text();
    } catch (err) {
        console.error(`Error fetching ${url}:`, err.message);
        return '';
    }
}

async function joinFiles() {
    await fs.mkdir(BUILD_DIR, { recursive: true });
    for (const file of FILES) {
        const contents = await Promise.all(
            ROUTES.map((route) => fetchFile(route, file)),
        );
        const joined = contents.filter(Boolean).join('\n\n');
        await fs.writeFile(path.join(BUILD_DIR, file), joined, 'utf8');
        console.log(`Wrote ${file} to build/`);
    }
}

joinFiles().catch((err) => {
    console.error('Failed to join LLMs files:', err);
    process.exit(1);
});
