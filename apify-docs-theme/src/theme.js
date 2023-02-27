const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { updateChangelog } = require('./markdown');

function findPathInParent(endPath) {
    let parentPath = __dirname;
    while (parentPath !== path.join(parentPath, '..')) {
        const filePath = path.join(parentPath, endPath);
        if (fs.existsSync(filePath)) return filePath;
        parentPath = path.join(parentPath, '..');
    }
    const filePath = path.join(parentPath, endPath);
    if (fs.existsSync(filePath)) return filePath;

    return false;
}

function findPathInParentOrThrow(endPath) {
    const filePath = findPathInParent(endPath);
    if (!filePath) throw new Error(`Could not find ${endPath} in any parent directory`);
    return filePath;
}

async function copyChangelogFromReleases(paths, repo) {
    const response = await axios.get(`https://api.github.com/repos/${repo}/releases`);
    const releases = response.data;

    let markdown = '';
    if (!Array.isArray(releases) || releases.length === 0) return;

    releases.forEach((release) => {
        markdown += release.tag_name
            ? `## [${release.name}](https://github.com/${repo}/releases/tag/${release.tag_name})\n`
            : `## ${release.name}\n`;
        markdown += `${release.body.replaceAll(/(^#|\n#)/g, '###')}\n`;
    });

    paths.forEach((p) => {
        fs.writeFileSync(`${p}/changelog.md`, updateChangelog(markdown));
    });
}

function copyChangelogFromRoot(paths) {
    const changelogPath = findPathInParentOrThrow('CHANGELOG.md');

    for (const docsPath of paths) {
        if (fs.existsSync(path.join(docsPath, 'changelog.md')) && fs.statSync(
            path.join(docsPath, 'changelog.md')).mtime >= fs.statSync(changelogPath).mtime) continue;
        const changelog = fs.readFileSync(changelogPath, 'utf-8');
        fs.writeFileSync(`${docsPath}/changelog.md`, updateChangelog(changelog));
    }
}

function theme(
    context,
    options,
) {
    return {
        name: '@apify/docs-theme',
        getPathsToWatch() {
            return ['./pages'];
        },
        getThemePath() {
            return '../src/theme';
        },
        getTypeScriptThemePath() {
            return '../src/theme';
        },
        async loadContent() {
            try {
                const versioned = findPathInParent('website/versioned_docs');
                const pathsToCopyChangelog = [
                    findPathInParentOrThrow('docs'),
                    ...(versioned
                        ? fs.readdirSync(versioned).map((version) => path.join(versioned, version))
                        : []
                    ),
                ];

                for (const p of pathsToCopyChangelog) {
                    // the changelog page has to exist for the sidebar to work - async loadContent() is (apparently) not awaited for by sidebar
                    if (fs.existsSync(path.join(p, 'changelog.md'))) continue;
                    fs.writeFileSync(`${p}/changelog.md`, `---
title: Changelog
sidebar_label: Changelog
---
It seems that the changelog is not available.
This either means that your Docusaurus setup is misconfigured, or that your GitHub repository contains no releases yet.
`);
                }

                if (options.changelogFromRoot) {
                    copyChangelogFromRoot(pathsToCopyChangelog);
                } else {
                    await copyChangelogFromReleases(pathsToCopyChangelog, `${context.siteConfig.organizationName}/${context.siteConfig.projectName}`);
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(`Changelog page could not be initialized: ${e.message}`);
            }
        },
        async contentLoaded({ actions }) {
            const { setGlobalData } = actions;
            setGlobalData({
                options,
            });
        },
        getClientModules() {
            return [
                require.resolve('./theme/custom.css'),
            ];
        },
        configureWebpack() {
            return {
                module: {
                    rules: [
                        {
                            test: /(@apify\/|apify-)docs-theme\/src\/(theme|pages)\/.*?\.jsx?$/,
                            use: {
                                loader: 'babel-loader',
                            },
                        },
                    ],
                },
            };
        },
    };
}

module.exports = {
    theme,
};
