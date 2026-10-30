// Checks that adaptive SVGs on a live page follow the Docusaurus theme toggle.
// Usage: node site-check.cjs URL OUT_DIR [IMAGE_SRC_SUBSTRING]
//
// Example: node site-check.cjs https://docs.apify.com/academy /tmp/site /img/academy/
//
// For every matching <img>, it takes screenshots in all four combinations of
// site theme and OS color scheme. Each image must ignore the OS setting and
// must look different in the light and dark site themes.
const { chromium } = require('playwright');
const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

async function main() {
    if (process.argv.length < 4) {
        console.error('Usage: node site-check.cjs URL OUT_DIR [IMAGE_SRC_SUBSTRING]');
        process.exit(2);
    }
    const [url, outDir, srcFilter = '.svg'] = process.argv.slice(2);
    mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch();
    const shots = {}; // image name -> combination -> PNG buffer
    for (const site of ['light', 'dark']) {
        for (const os of ['light', 'dark']) {
            const page = await browser.newPage({ colorScheme: os, viewport: { width: 1400, height: 1000 } });
            // Docusaurus keeps the toggle state in localStorage under "theme"
            await page.addInitScript((theme) => localStorage.setItem('theme', theme), site);
            await page.goto(url, { waitUntil: 'networkidle' });
            const dataTheme = await page.$eval('html', (el) => el.dataset.theme);
            if (dataTheme !== site) throw new Error(`Expected data-theme=${site}, got ${dataTheme}`);

            const imgs = page.locator(`img[src*="${srcFilter}"]`);
            for (let i = 0; i < await imgs.count(); i++) {
                const img = imgs.nth(i);
                const name = (await img.getAttribute('src')).split('/').pop().replace(/\.svg$/, '');
                await img.scrollIntoViewIfNeeded();
                const png = await img.screenshot();
                writeFileSync(join(outDir, `${name}--site-${site}--os-${os}.png`), png);
                (shots[name] ??= {})[`${site}/${os}`] = png;
            }
            await page.close();
        }
    }
    await browser.close();

    const names = Object.keys(shots);
    if (names.length === 0) {
        console.log(`FAIL no <img> with "${srcFilter}" in its src on ${url}`);
        process.exit(1);
    }
    let failed = false;
    for (const name of names) {
        const s = shots[name];
        const problems = [];
        if (!s['light/light'].equals(s['light/dark'])) problems.push('light site theme changes with the OS');
        if (!s['dark/light'].equals(s['dark/dark'])) problems.push('dark site theme changes with the OS');
        if (s['light/light'].equals(s['dark/dark'])) problems.push('looks the same in both themes');
        console.log(`${problems.length ? 'FAIL' : 'ok  '} ${name}${problems.length ? `: ${problems.join(', ')}` : ''}`);
        failed ||= problems.length > 0;
    }
    if (failed) {
        console.log(`Screenshots are in ${outDir}`);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
