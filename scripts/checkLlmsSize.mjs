import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = path.resolve('build');
const WARN_LIMIT = 90_000;
const ERROR_LIMIT = 100_000;

async function checkFile(filePath) {
    try {
        await fs.access(filePath);
    } catch {
        console.error(`ERROR: ${filePath} does not exist`);
        process.exitCode = 1;
        return null;
    }
    // Use string .length for character count (not byte count)
    const content = await fs.readFile(filePath, 'utf8');
    return content.length;
}

const llmsPath = path.join(BUILD_DIR, 'llms.txt');
const llmsFullPath = path.join(BUILD_DIR, 'llms-full.txt');

const [llmsChars, llmsFullChars] = await Promise.all([checkFile(llmsPath), checkFile(llmsFullPath)]);

if (llmsChars === null || llmsFullChars === null) {
    process.exit(1);
}

console.log(`llms.txt:      ${llmsChars.toLocaleString()} characters`);
console.log(`llms-full.txt: ${llmsFullChars.toLocaleString()} characters`);

if (llmsChars > ERROR_LIMIT) {
    console.error(`\nERROR: llms.txt exceeds ${ERROR_LIMIT.toLocaleString()} character limit`);
    process.exitCode = 1;
} else if (llmsChars > WARN_LIMIT) {
    console.warn(`\nWARNING: llms.txt exceeds ${WARN_LIMIT.toLocaleString()} characters — consider reducing`);
} else {
    console.log(`\nOK (under ${WARN_LIMIT.toLocaleString()} character target)`);
}
