const path = require('path');
const util = require('util');
const fs = require('fs');

const { readdir, stat } = fs.promises;
const { ensureDir } = require('fs-extra');

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

exports.copyAssetFile = async (assetPath, sourceDirPath, buildDirPath) => {
    const src = path.join(sourceDirPath, assetPath);
    const dest = path.join(buildDirPath, 'assets', assetPath);
    const dirPath = dest
        .split(path.sep)
        .slice(0, -1)
        .join(path.sep);
    await ensureDir(dirPath);
    await copyFilePromised(src, dest);
};

exports.getDirectoriesInPath = async (dirPath) => {
    const files = await readdir(dirPath);
    const dirs = [];

    for (const file of files) {
        const isDirectory = await (await stat(`${path.join(path.resolve(path.dirname('')), dirPath)}/${file}`)).isDirectory();

        isDirectory && dirs.push(`${dirPath}/${file}`);
    }

    return dirs;
};
