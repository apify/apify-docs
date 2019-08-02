const path = require('path');
const util = require('util');
const fs = require('fs');
const { ensureDir } = require('fs-extra');

const { BUILD_DIR_PATH, DOCS_PATH } = require('./consts');

const existsPromised = util.promisify(fs.exists);
const mkdirPromised = util.promisify(fs.mkdir);
const writeFilePromised = util.promisify(fs.writeFile);
const copyFilePromised = util.promisify(fs.copyFile);

exports.writeFile = async (filePath, content) => {
    const dirPath = filePath
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
    await ensureDir(dirPath);
    await writeFilePromised(filePath, content.trimLeft());
};

exports.copyAssetFile = async (assetPath) => {
    const src = path.join(DOCS_PATH, assetPath);
    const dest = path.join(BUILD_DIR_PATH, 'assets', assetPath);
    const dirPath = dest
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
    await ensureDir(dirPath);
    await copyFilePromised(src, dest);
};
