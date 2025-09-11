import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');
const LLMS_FILE = path.join(BUILD_DIR, 'llms.txt');

const INDENT_LEVEL = 2;

// Paths that should be indented at the first level
const INDENTED_PATHS = ['/api/v2/', '/academy/', '/platform/', '/legal/'];

// Main API pages that should have no indentation
const MAIN_API_PAGES = ['/api.md', '/api/v2.md'];

/**
 * Calculates the depth of a URL by counting non-file path segments.
 */
function getUrlDepth(url) {
    const baseUrl = url.replace('https://docs.apify.com', '');
    const urlSegments = baseUrl.split('/').filter((segment) => segment && segment !== '');
    const nonFileSegments = urlSegments.filter((segment) => !segment.endsWith('.md'));
    return nonFileSegments.length;
}

/**
 * Determines the indentation level for a documentation link based on its URL.
 */
function getLinkIndentation(url) {
    if (MAIN_API_PAGES.some((page) => url.includes(page))) {
        return 0;
    }

    if (INDENTED_PATHS.some((item) => url.includes(item))) {
        return INDENT_LEVEL;
    }

    // Default based on URL depth
    const depth = getUrlDepth(url);
    return Math.min(depth * INDENT_LEVEL, INDENT_LEVEL * 3);
}

/**
 * Determines the indentation level for a line based on its content type.
 */
function getIndentationLevel(line, lineIndex, allLines) {
    if (line.startsWith('# ') || line.startsWith('## ')) {
        return 0; // Main title or section title - no indent
    }

    if (line.startsWith('### ')) {
        return INDENT_LEVEL; // Subsection title - 1 level indent
    }

    if (line.startsWith('#### ')) {
        return INDENT_LEVEL * 2; // Sub-subsection title - 2 level indent
    }

    if (line.startsWith('- [') && line.includes('](https://docs.apify.com/')) {
        const urlMatch = line.match(/\]\((https:\/\/docs\.apify\.com\/[^)]+)\)/);
        if (!urlMatch) {
            return INDENT_LEVEL; // Fallback if URL parsing fails
        }
        return getLinkIndentation(urlMatch[1]);
    }

    if (lineIndex > 0) {
        // Other content - use same indent as previous line
        const prevIndentMatch = allLines[lineIndex - 1].match(/^(\s*)/);
        return prevIndentMatch ? prevIndentMatch[1].length : INDENT_LEVEL;
    }

    return INDENT_LEVEL;
}

/**
 * Applies hierarchical indentation to content based on URL structure and content type.
 */
function indentContent(content) {
    const lines = content.split('\n');
    const indentedLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Skip empty lines
        if (!trimmedLine) {
            indentedLines.push('');
            continue;
        }

        const indent = getIndentationLevel(trimmedLine, i, lines);
        const indentStr = ' '.repeat(indent);
        indentedLines.push(indentStr + trimmedLine);
    }

    return indentedLines.join('\n');
}

/**
 * Main function to indent the LLMs file.
 * Reads the file, applies indentation, and writes it back.
 */
async function indentLlmsFile() {
    try {
        await fs.access(LLMS_FILE);
        const content = await fs.readFile(LLMS_FILE, 'utf8');
        const indentedContent = indentContent(content);
        await fs.writeFile(LLMS_FILE, indentedContent, 'utf8');
        console.log('Successfully indented llms.txt file');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('llms.txt file not found, skipping indentation');
        } else {
            console.error('Error indenting llms.txt file:', error);
            process.exit(1);
        }
    }
}

indentLlmsFile().catch((err) => {
    console.error('Failed to indent LLMs files:', err);
    process.exit(1);
});
