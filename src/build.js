const fs = require('fs');

const { readdir } = fs.promises;
const _ = require('underscore');
const path = require('path');
const log = require('@apify/log').default;
const { ensureDir } = require('fs-extra');
const { writeFile, copyAssetFile } = require('./tools');
const { CONTENT_DIR_NAME } = require('./consts');
const { traverseAllFiles, replacePaths } = require('./parser');

log.logJson = false;

const build = async (sourceDir) => {
    const { dirName, buildDirPath, dirPath } = sourceDir;

    // Make sure the build folders are ready
    await ensureDir(buildDirPath);
    await ensureDir(path.join(buildDirPath, 'pages'));
    await ensureDir(path.join(buildDirPath, 'assets'));

    // Create the index
    const index = await traverseAllFiles(dirPath, dirName);
    replacePaths(index);

    const promises = Object.keys(index.pages).map(async (filePath) => {
        const { content } = index.pages[filePath];
        await writeFile(path.join(buildDirPath, 'pages', filePath), content);
    });

    const promises2 = Object.keys(index.assets).map((assetPath) => copyAssetFile(assetPath, dirPath, buildDirPath));

    await Promise.all(promises.concat(promises2));

    // Remove page content from index.
    index.pages = _.mapObject(index.pages, (page) => _.omit(page, 'content'));
    await writeFile(path.join(buildDirPath, `index.json`), JSON.stringify(index, null, 2));
};

/**
 * Finds all the source directories in the /content dir and runs the build() for each
 */
const main = async () => {
    // Find the content directories
    const dirNames = await readdir(CONTENT_DIR_NAME);
    const sourceDirs = [];
    // Iterate the content directories and create an object that contains the dir name, its path, and the build destination
    dirNames.map((dirName) => {
        sourceDirs.push({
            dirName,
            dirPath: path.join(__dirname, '..', `content/${dirName}`),
            buildDirPath: path.join(__dirname, '..', `build/${dirName}`),
        });
    });

    // Build each content dir
    sourceDirs.map(async (sourceDir) => {
        await build(sourceDir);
    });
};

main()
    .then(() => console.log('\n\nDone.\n\n'))
    .catch((err) => {
        log.exception(err, 'Build process failed.');
        // NOTE: Needs to exit with non-zero exit code otherwise, Github pipeline finishes successfully.
        process.exit(1);
    });
