const { opendirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

function collectSlugs(pathname) {
    const dir = opendirSync(pathname);
    const res = [];

    let direntry;

    // eslint-disable-next-line no-cond-assign
    while ((direntry = dir.readSync()) !== null) {
        if (direntry.isFile() && direntry.name.endsWith('.md')) {
            const mdContent = readFileSync(join(pathname, direntry.name), { encoding: 'utf-8' });

            const slugMatch = mdContent.match(/^slug: (.*)$/m);
            if (slugMatch) {
                res.push(slugMatch[1]);
            }
        }

        if (direntry.isDirectory()) {
            const dirPath = join(pathname, direntry.name);
            const dirRes = collectSlugs(dirPath);
            res.push(...dirRes);
        }
    }

    dir.closeSync();

    return res;
}

module.exports = {
    collectSlugs,
};
