const _ = require('underscore');
const path = require('path');
const log = require('apify-shared/log');
const { ensureDir } = require('fs-extra');
const { writeFile, copyAssetFile } = require('./tools');
const { BUILD_DIR_PATH } = require('./consts');
const { traverseAllFiles, replacePaths } = require('./parser');

log.logJson = false;

const main = async () => {
    await ensureDir(BUILD_DIR_PATH);
    await ensureDir(path.join(BUILD_DIR_PATH, 'pages'));
    await ensureDir(path.join(BUILD_DIR_PATH, 'assets'));
    const index = await traverseAllFiles();
    replacePaths(index);

    const promises = Object.keys(index.pages).map(async (filePath) => {
        const { content } = index.pages[filePath];
        await writeFile(path.join(BUILD_DIR_PATH, 'pages', filePath), content);
    });
    const promises2 = Object
        .keys(index.assets)
        .map(copyAssetFile);
    await Promise.all(promises.concat(promises2));

    // Remove page content from index.
    index.pages = _.mapObject(index.pages, page => _.omit(page, 'content'));
    await writeFile(path.join(BUILD_DIR_PATH, 'index.json'), JSON.stringify(index, null, 2));
};

main()
    .then(() => console.log('Done.'))
    .catch((err) => {
        log.exception(err, 'Build process failed.');
        // NOTE: Needs to exit with non-zero exit code otherwise, Github pipeline finishes successfully.
        process.exit(1);
    });
