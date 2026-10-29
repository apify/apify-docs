// Finds platform docs pages whose content hasn't been edited in STALE_AFTER_MONTHS
// and prints a Markdown report.
//
// The script ignores commits that:
// - change more than BULK_FILE_LIMIT .md/.mdx files at once
// - are listed in IGNORE_FILE
// - only change a page's frontmatter, or move a page without changing it
//
// If none of a page's commits count, its newest commit is used instead.
//
// Pages with a `last_review: YYYY-MM-DD` frontmatter field with a date on or
// after the cutoff are skipped.
//
// Requires the full git history (fetch-depth: 0 in GitHub Actions).

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const DOCS_DIR = 'sources/platform';
const STALE_AFTER_MONTHS = 6;
const BULK_FILE_LIMIT = 10;
const IGNORE_FILE = '.staleness-check-ignore';
const REPO_URL = 'https://github.com/apify/apify-docs';

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---(\r?\n|$)/;
const LAST_REVIEW = /^last_review:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?\s*$/m;

const isDocFile = (file) => /\.mdx?$/.test(file);

// 'pipe' keeps git's error messages out of the log. Thrown errors still include them.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe', maxBuffer: 16 * 1024 * 1024 });

function readIgnoredRevs() {
    return fs
        .readFileSync(IGNORE_FILE, 'utf8')
        .split('\n')
        .map((line) => line.replace(/#.*/, '').trim())
        .filter(Boolean);
}

function findBulkCommits() {
    const bulk = new Set();
    // git prints each commit as "\0<sha>", followed by the files it changed, one per line
    for (const entry of git('log', '--format=%x00%H', '--name-only').split('\0').slice(1)) {
        const [sha, ...files] = entry.split('\n').filter(Boolean);
        if (files.filter(isDocFile).length > BULK_FILE_LIMIT) bulk.add(sha);
    }
    return bulk;
}

function pageBodyAt(sha, path) {
    try {
        return git('show', `${sha}:${path}`).replace(FRONTMATTER, '');
    } catch (error) {
        // The page was moved away in this commit and later recreated at the same path
        if (error.stderr?.includes('does not exist in')) return null;
        throw error;
    }
}

// A missing or malformed date returns undefined, so the page is checked as usual
function lastReview(file) {
    const frontmatter = fs.readFileSync(file, 'utf8').match(FRONTMATTER)?.[0] ?? '';
    return frontmatter.match(LAST_REVIEW)?.[1];
}

function lastContentEdit(file) {
    // git prints each commit as "\0<sha> <date>", followed by the page's path in that commit.
    // The path differs from `file` if the page was renamed later. Any other git error stops the script.
    const commits = git('log', '--follow', '--format=%x00%H %cs', '--name-only', '--', file)
        .split('\0')
        .slice(1)
        .map((entry) => {
            const [header, path] = entry.split('\n').filter(Boolean);
            const [sha, date] = header.split(' ');
            return { sha, date, path };
        });
    // A commit edits content if the page body differs from the page's previous commit
    const editsContent = ({ sha, path }, i) => {
        const previous = commits[i + 1];
        if (!previous) return true;
        const body = pageBodyAt(sha, path);
        return body === null || body !== pageBodyAt(previous.sha, previous.path);
    };
    return commits.find((commit, i) => !isSkipped(commit.sha) && editsContent(commit, i)) ?? commits[0];
}

const ignoredRevs = readIgnoredRevs();
const bulkCommits = findBulkCommits();
const isSkipped = (sha) => bulkCommits.has(sha) || ignoredRevs.some((rev) => sha.startsWith(rev));

const cutoff = new Date();
cutoff.setMonth(cutoff.getMonth() - STALE_AFTER_MONTHS);
const cutoffDate = cutoff.toISOString().slice(0, 10);

const stalePages = git('ls-files', DOCS_DIR)
    .trim()
    .split('\n')
    .filter(isDocFile)
    .filter((file) => !(lastReview(file) >= cutoffDate))
    .map((file) => ({ file, ...lastContentEdit(file) }))
    .filter(({ date }) => date < cutoffDate)
    .sort((a, b) => a.date.localeCompare(b.date));

const bySection = new Map();
for (const page of stalePages) {
    const section = page.file.split('/')[2];
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section).push(page);
}

const lines = [
    `${stalePages.length} pages in \`${DOCS_DIR}\` haven't been edited since ${cutoffDate}.`,
    '',
    `Frontmatter-only changes, and commits that change more than ${BULK_FILE_LIMIT} \`.md\`/\`.mdx\` files or are listed in \`${IGNORE_FILE}\`, don't count as edits.`,
    '',
    `If a page is still correct, add \`last_review: YYYY-MM-DD\` to its frontmatter. The check will skip it for ${STALE_AFTER_MONTHS} months from the review date.`,
];
for (const section of [...bySection.keys()].sort()) {
    const pages = bySection.get(section);
    lines.push('', `## ${section} (${pages.length})`, '');
    for (const { file, sha, date } of pages) {
        lines.push(
            `- [${file.slice(DOCS_DIR.length + 1)}](${REPO_URL}/blob/master/${file}) - [last edited ${date}](${REPO_URL}/commit/${sha})`,
        );
    }
}

console.log(lines.join('\n'));
