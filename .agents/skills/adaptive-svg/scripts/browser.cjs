// Launches Chromium for the verification scripts. Uses, in order:
// $CHROME_PATH, the newest Chromium downloaded by Playwright, installed Google Chrome.
const { chromium } = require('playwright-core');
const { existsSync, readdirSync } = require('node:fs');
const { join } = require('node:path');
const os = require('node:os');

const CACHES = [
    join(os.homedir(), 'Library/Caches/ms-playwright'),
    join(os.homedir(), '.cache/ms-playwright'),
];
const EXECUTABLES = [
    'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    'chrome-linux64/chrome',
    'chrome-linux/chrome',
];

function findPlaywrightChromium() {
    for (const cache of CACHES.filter(existsSync)) {
        const revisions = readdirSync(cache)
            .filter((d) => /^chromium-\d+$/.test(d))
            .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
        for (const revision of revisions) {
            const found = EXECUTABLES.map((e) => join(cache, revision, e)).find(existsSync);
            if (found) return found;
        }
    }
    return undefined;
}

async function launch() {
    const executablePath = process.env.CHROME_PATH || findPlaywrightChromium();
    return executablePath ? chromium.launch({ executablePath }) : chromium.launch({ channel: 'chrome' });
}

module.exports = { launch };
