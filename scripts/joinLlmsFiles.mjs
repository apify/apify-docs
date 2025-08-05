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

async function joinFiles() {
    await fs.mkdir(BUILD_DIR, { recursive: true });
    for (const [llmsFile, files] of Object.entries(FILES_ROUTES)) {
        const contents = await Promise.all(
            files.map((route) => fetchFile(route)),
        );
        const joined = contents.filter(Boolean).join('\n\n');
        await fs.appendFile(path.join(BUILD_DIR, llmsFile), joined, 'utf8');
        console.log(`Wrote ${llmsFile} to build/`);
    }
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

Object.keys(FILES_ROUTES).forEach((llmsFile) => sanitizeFile(path.join(BUILD_DIR, llmsFile)));
