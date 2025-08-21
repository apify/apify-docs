import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.resolve(__dirname, '../build');

/**
 * String-based cleanup function for removing LLM button text from markdown content.
 */
function removeLlmButtonsFromString(markdownContent) {
    if (!markdownContent) return markdownContent;
    
    let cleaned = markdownContent;
    
    // Remove LLM button text patterns
    cleaned = cleaned.replace(/View as MarkdownCopy for LLM/g, '');
    cleaned = cleaned.replace(/View as Markdown/g, '');
    cleaned = cleaned.replace(/Copy for LLM/g, '');
    
    // Remove lines that only contain LLM button text
    cleaned = cleaned.replace(/^[^\n]*View as Markdown[^\n]*$/gm, '');
    cleaned = cleaned.replace(/^[^\n]*Copy for LLM[^\n]*$/gm, '');
    
    // Clean up excessive whitespace and empty lines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // Replace 3+ newlines with 2
    cleaned = cleaned.replace(/^\s+$/gm, ''); // Remove lines that are only whitespace
    cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n'); // Clean up multiple empty lines
    
    return cleaned.trim();
}

/**
 * Recursively find and process all .md files in the build directory.
 */
async function processMarkdownFiles(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
                // Recursively process subdirectories
                await processMarkdownFiles(fullPath);
            } else if (entry.name.endsWith('.md')) {
                // Process markdown files
                console.log(`Processing: ${fullPath}`);
                
                try {
                    const content = await fs.readFile(fullPath, 'utf8');
                    const cleanedContent = removeLlmButtonsFromString(content);
                    
                    if (content !== cleanedContent) {
                        await fs.writeFile(fullPath, cleanedContent, 'utf8');
                        console.log(`  ✓ Cleaned: ${fullPath}`);
                    }
                } catch (error) {
                    console.error(`  ✗ Error processing ${fullPath}:`, error.message);
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error.message);
    }
}

/**
 * Main function to clean up markdown files.
 */
async function cleanupMarkdownFiles() {
    console.log('Starting markdown cleanup...');
    
    if (!await fs.stat(BUILD_DIR).catch(() => false)) {
        console.error(`Build directory not found: ${BUILD_DIR}`);
        process.exit(1);
    }
    
    await processMarkdownFiles(BUILD_DIR);
    console.log('Markdown cleanup completed!');
}

// Run the cleanup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    cleanupMarkdownFiles().catch(console.error);
}

export { cleanupMarkdownFiles, removeLlmButtonsFromString };
