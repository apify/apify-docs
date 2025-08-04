import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');

const FILES_ROUTES = {
    'llms.txt': [
        'https://docs.apify.com/api/client/js/llms.txt',
        'https://docs.apify.com/api/client/python/llms.txt',
        'https://docs.apify.com/sdk/js/llms.txt',
        'https://docs.apify.com/sdk/python/llms.txt',
        'https://docs.apify.com/cli/llms.txt',
    ],
    'llms-full.txt': [
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
    ],
};

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
    for (const [llmsFile, files] of Object.entries(FILES_ROUTES)) {
        const contents = await Promise.all(
            files.map((route) => fetchFile(route, llmsFile)),
        );
        const joined = contents.filter(Boolean).join('\n\n');
        await fs.appendFile(path.join(BUILD_DIR, llmsFile), joined, 'utf8');
        console.log(`Wrote ${llmsFile} to build/`);
    }
}

joinFiles().catch((err) => {
    console.error('Failed to join LLMs files:', err);
    process.exit(1);
});
