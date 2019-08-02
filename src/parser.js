const util = require('util');
const fs = require('fs');
const path = require('path');
const metadataParser = require('markdown-yaml-metadata-parser');
const _ = require('underscore');
const crypto = require('crypto');

const { PAGE_EXT, ALLOWED_METADATA_KEYS, DOCS_PATH } = require('./consts');

const readdirPromised = util.promisify(fs.readdir);
const lstatPromised = util.promisify(fs.lstat);
const readFilePromised = util.promisify(fs.readFile);

const readAndParsePage = async (pagePath) => {
    const rawPage = (await readFilePromised(pagePath)).toString();
    const { content, metadata } = metadataParser(rawPage);

    // Check that there are no invalid keys.
    const invalidKeys = _.without(Object.keys(metadata), ...ALLOWED_METADATA_KEYS);
    if (invalidKeys.length) throw new Error(`Invalid metadata keys found: ${invalidKeys.join(', ')}, allowed keys: ${ALLOWED_METADATA_KEYS.join(', ')}`); // eslint-disable-line
    if (!metadata.title) throw new Error(`Value metadata.title is missing in ${pagePath}`);
    if (!metadata.path) throw new Error(`Value metadata.path is missing in ${pagePath}`);

    return Object.assign({
        content,
        contentHash: crypto.createHash('sha256').update(content).digest('base64'),
        menuTitle: metadata.title,
    }, metadata);
};

const identifyFilesAndDirectories = async (currentPath, items) => {
    const filePaths = [];
    const dirPaths = [];

    const promises = items.map(async (item) => {
        const itemPath = currentPath ? path.join(currentPath, item) : item;
        const itemFullPath = path.join(DOCS_PATH, itemPath);
        const stat = await lstatPromised(itemFullPath);

        stat.isDirectory()
            ? dirPaths.push(itemPath)
            : filePaths.push(itemPath);
    });
    await Promise.all(promises)

    return { filePaths, dirPaths };
};

const traverseAllFiles = async (currentPath = null) => {
    const currentFullPath = currentPath ? path.join(DOCS_PATH, currentPath) : DOCS_PATH;
    const directoryContent = await readdirPromised(currentFullPath);
    const pages = {};
    const assets = {};

    const { filePaths, dirPaths } = await identifyFilesAndDirectories(currentPath, directoryContent);

    const filePromises = filePaths.map(async (filePath) => {
        const isPage = filePath.split('.').pop() === PAGE_EXT;
        if (isPage) {
            pages[filePath] = await readAndParsePage(path.join(DOCS_PATH, filePath));
        } else {
            assets[filePath] = filePath;
        }
    });

    const dirPromises = dirPaths.map(async (dirPath) => {
        const { pages: itemPages, assets: itemAssets } = await traverseAllFiles(dirPath);
        Object.assign(pages, itemPages);
        Object.assign(assets, itemAssets);
    });

    await Promise.all(filePromises.concat(dirPromises));

    return { pages, assets };
};

const replacePaths = (index) => {
    Object.keys(index.pages).forEach((pagePath) => {
        const pageDef = index.pages[pagePath];

        const linkMatches = pageDef.content.match(/\{\{@link\s[^}]+\}\}/g);
        if (linkMatches) {
            linkMatches.forEach((linkMatch) => {
                const linkedPage = linkMatch.substr(8, linkMatch.length - 10);
                const linkedPageDef = index.pages[linkedPage];
                if (!linkedPageDef) throw new Error(`Page ${pagePath} contains invalid link ${linkMatch}!`);
                pageDef.content = pageDef.content.replace(linkMatch, `/${linkedPageDef.path}`);
            });
        }

        const assetMatches = pageDef.content.match(/\{\{@asset\s[^}]+\}\}/g);
        if (assetMatches) {
            assetMatches.forEach((assetMatch) => {
                const linkedAsset = assetMatch.substr(9, assetMatch.length - 11);
                if (!index.assets[linkedAsset]) throw new Error(`Page ${pagePath} contains invalid asset ${assetMatch}!`);
                pageDef.content = pageDef.content.replace(assetMatch, `/${linkedAsset}`);
            });
        }

    });
};

module.exports = {
    traverseAllFiles,
    replacePaths,
};
