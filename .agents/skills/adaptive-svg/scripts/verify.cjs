// Checks that an adaptive SVG renders exactly like its light and dark sources.
// Usage: node verify.cjs LIGHT.svg DARK.svg ADAPTIVE.svg OUT_DIR
//
// Renders each SVG through <img>, the way the docs site embeds it, and compares
// the screenshots byte for byte. Screenshots stay in OUT_DIR for inspection.
const { launch } = require('./browser.cjs');
const { mkdirSync, writeFileSync, readFileSync } = require('node:fs');
const { join, resolve } = require('node:path');
const { pathToFileURL } = require('node:url');

const CASES = [
    // [name, svg key, OS color scheme, page color-scheme CSS]
    ['light', 'light', 'light', 'normal'],
    ['dark', 'dark', 'dark', 'normal'],
    ['adaptive-os-light', 'adaptive', 'light', 'normal'],
    ['adaptive-os-dark', 'adaptive', 'dark', 'normal'],
    // Docusaurus sets color-scheme on <html> from its theme toggle, whatever the OS says
    ['adaptive-site-light', 'adaptive', 'dark', 'light'],
    ['adaptive-site-dark', 'adaptive', 'light', 'dark'],
];
const EXPECTED = [
    ['light', 'adaptive-os-light'],
    ['dark', 'adaptive-os-dark'],
    ['light', 'adaptive-site-light'],
    ['dark', 'adaptive-site-dark'],
];

async function main() {
    if (process.argv.length !== 6) {
        console.error('Usage: node verify.cjs LIGHT.svg DARK.svg ADAPTIVE.svg OUT_DIR');
        process.exit(2);
    }
    const [light, dark, adaptive, outDir] = process.argv.slice(2).map((p) => resolve(p));
    const svgs = { light, dark, adaptive };
    mkdirSync(outDir, { recursive: true });

    const browser = await launch();
    const shots = {};
    for (const [name, key, scheme, pageScheme] of CASES) {
        const page = await browser.newPage({ deviceScaleFactor: 2, colorScheme: scheme });
        // Load the page from disk, an about:blank page can't load file:// images
        const html = join(outDir, `${name}.html`);
        writeFileSync(html, `<html style="color-scheme: ${pageScheme}"><body style="margin:0">`
            + `<img id="i" src="${pathToFileURL(svgs[key])}"></body></html>`);
        await page.goto(pathToFileURL(html).href);
        await page.waitForFunction(() => document.getElementById('i').complete);
        if (await page.$eval('#i', (img) => img.naturalWidth) === 0) {
            throw new Error(`${svgs[key]} failed to load`);
        }
        const png = join(outDir, `${name}.png`);
        await page.locator('#i').screenshot({ path: png });
        shots[name] = readFileSync(png);
        await page.close();
    }
    await browser.close();

    let failed = false;
    if (shots.light.equals(shots.dark)) {
        console.log('FAIL light and dark sources render the same, the check proves nothing');
        failed = true;
    }
    for (const [reference, candidate] of EXPECTED) {
        const ok = shots[reference].equals(shots[candidate]);
        console.log(`${ok ? 'ok  ' : 'FAIL'} ${candidate} matches ${reference}`);
        failed ||= !ok;
    }
    if (failed) {
        console.log(`Screenshots are in ${outDir}, diff with: magick compare -metric AE A.png B.png diff.png`);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
