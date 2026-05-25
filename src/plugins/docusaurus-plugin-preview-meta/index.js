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
    const relative = path.relative(outDir, file).replace(/\\/g, '/');
    // Docusaurus serves 404.html at the literal /404.html path; preserve it for parity with production.
    if (relative === '404.html') return `${CANONICAL_ORIGIN}/404.html`;
    const urlPath = relative.replace(/\/?index\.html$/, '').replace(/\.html$/, '');
    return urlPath ? `${CANONICAL_ORIGIN}/${urlPath}` : CANONICAL_ORIGIN;
}

// SWC's HTML minifier strips quotes from attributes and omits </head>, so the regex must be
// quote-optional and the fallback must target <body instead of </head>.
const CANONICAL_TAG_REGEX = /<link\b[^>]*?\brel=["']?canonical["']?[^>]*>/i;

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
                    } else if (content.includes('<body')) {
                        next = content.replace('<body', `${canonicalTag}<body`);
                    } else {
                        return;
                    }

                    if (next !== content) await fs.writeFile(file, next);
                }),
            );
        },
    };
};
