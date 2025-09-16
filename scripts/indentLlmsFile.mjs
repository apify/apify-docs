import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');
const LLMS_FILE = path.join(BUILD_DIR, 'llms.txt');

const INDENT_LEVEL = 2;

const MAIN_SECTIONS = ['/api.md', '/api/v2.md'];

const BASE_URL = process.env.APIFY_DOCS_ABSOLUTE_URL || 'https://docs.apify.com';

/**
 * Extracts the path from a URL, removing the base URL and query parameters
 */
function extractPathFromUrl(url) {
    const urlObj = new URL(url);
    return urlObj.pathname;
}

/**
 * Calculates the hierarchical depth of a URL path.
 * This counts directory levels, not including the filename.
 */
function getUrlHierarchyDepth(url) {
    const urlPath = extractPathFromUrl(url);
    const segments = urlPath.split('/').filter((segment) => segment && segment !== '');

    // Remove the .md file extension to count only directory levels
    const nonFileSegments = segments.filter((segment) => !segment.endsWith('.md'));

    return nonFileSegments.length;
}

/**
 * Determines if a URL is a main section page (level 0)
 */
function isMainSectionPage(url) {
    const urlPath = extractPathFromUrl(url);
    const segments = urlPath.split('/').filter((segment) => segment && segment !== '');

    // Main pages are those with only one segment (the .md file)
    // or specific known main pages
    if (segments.length === 1) {
        return true;
    }

    // Special cases for main API pages
    if (MAIN_SECTIONS.includes(urlPath)) {
        return true;
    }

    return false;
}

/**
 * Determines the indentation level for a documentation link based on its URL hierarchy.
 */
function getLinkIndentation(url) {
    // Main section pages get no indentation
    if (isMainSectionPage(url)) {
        return 0;
    }

    // Calculate hierarchy depth
    const depth = getUrlHierarchyDepth(url);

    // The first level after main sections gets 1 level of indentation
    // Each subsequent level gets another level of indentation
    return Math.min(depth * INDENT_LEVEL, INDENT_LEVEL * 4); // Cap at 4 levels
}

/**
 * Determines the indentation level for a line based on its content type and URL.
 */
function getIndentationLevel(line, lineIndex, allLines) {
    // Handle markdown headers
    if (line.startsWith('# ')) {
        return 0; // Main title - no indent
    }

    if (line.startsWith('## ')) {
        return 0; // Section title - no indent
    }

    if (line.startsWith('### ')) {
        return INDENT_LEVEL; // Subsection title - 1 level indent
    }

    if (line.startsWith('#### ')) {
        return INDENT_LEVEL * 2; // Sub-subsection title - 2 level indent
    }

    // Handle markdown links with URLs
    if (line.startsWith('- [') && line.includes(`](${BASE_URL}/`)) {
        const urlMatch = line.match(new RegExp(`\\]\\((${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/[^)]+)\\)`));
        if (!urlMatch) {
            return INDENT_LEVEL; // Fallback if URL parsing fails
        }
        return getLinkIndentation(urlMatch[1]);
    }

    // For other content, use the same indentation as the previous line
    if (lineIndex > 0) {
        const prevLine = allLines[lineIndex - 1];
        const prevIndentMatch = prevLine.match(/^(\s*)/);
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
