const fs = require('node:fs/promises');
const path = require('node:path');

const CANONICAL_ORIGIN = 'https://docs.apify.com';

function isPreviewBuild() {
    const url = process.env.APIFY_DOCS_ABSOLUTE_URL;
    if (!url) return false;
    try {
        const { hostname } = new URL(url);
        return hostname.includes('pr-') || hostname.includes('preview');
    } catch {
        return false;
    }
}

async function walkHtmlFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const results = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) return walkHtmlFiles(fullPath);
            if (entry.isFile() && entry.name.endsWith('.html')) return [fullPath];
            return [];
        }),
    );
    return results.flat();
}

function canonicalUrlForFile(outDir, file) {
    const urlPath = path
        .relative(outDir, file)
        .replace(/\\/g, '/')
        .replace(/\/?index\.html$/, '')
        .replace(/\.html$/, '');
    return urlPath ? `${CANONICAL_ORIGIN}/${urlPath}` : CANONICAL_ORIGIN;
}

const CANONICAL_TAG_REGEX = /<link[^>]+rel=["']canonical["'][^>]*\/?>/i;

module.exports = function previewMetaPlugin() {
    return {
        name: 'docusaurus-plugin-preview-meta',
        async postBuild({ outDir }) {
            if (!isPreviewBuild()) return;

            await fs.writeFile(path.join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

            const htmlFiles = await walkHtmlFiles(outDir);
            await Promise.all(
                htmlFiles.map(async (file) => {
                    const content = await fs.readFile(file, 'utf8');
                    const canonicalUrl = canonicalUrlForFile(outDir, file);
                    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}"/>`;

                    let next;
                    if (CANONICAL_TAG_REGEX.test(content)) {
                        next = content.replace(CANONICAL_TAG_REGEX, canonicalTag);
                    } else if (content.includes('</head>')) {
                        next = content.replace('</head>', `${canonicalTag}</head>`);
                    } else {
                        return;
                    }

                    if (next !== content) await fs.writeFile(file, next);
                }),
            );
        },
    };
};
