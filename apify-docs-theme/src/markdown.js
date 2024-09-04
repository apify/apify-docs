function updateChangelog(changelog) {
    changelog = addFrontmatter(changelog);
    changelog = pushHeadings(changelog);
    changelog = fixUserLinks(changelog);
    changelog = fixPRLinks(changelog);
    changelog = escapeMDXCharacters(changelog);
    return changelog;
}

function addFrontmatter(changelog, header = 'Changelog') {
    return `---
title: ${header}
sidebar_label: ${header}
toc_max_heading_level: 2
---
${changelog}`;
}

function pushHeadings(changelog) {
    return changelog.replaceAll(/\n#[^#]/g, '\n## ');
}

function fixUserLinks(changelog) {
    return changelog.replaceAll(/by @([a-zA-Z0-9-]+)/g, 'by [@$1](https://github.com/$1)');
}

function fixPRLinks(changelog) {
    return changelog.replaceAll(/(((https?:\/\/)?(www.)?)?github.com\/[^\s]*?\/pull\/([0-9]+))/g, '[#$5]($1)');
}

function escapeMDXCharacters(changelog) {
    return changelog.replaceAll(/<|>/g, (match) => {
        return match === '<' ? '&lt;' : '&gt;';
    }).replaceAll(/\{|\}/g, (match) => {
        return match === '{' ? '&#123;' : '&#125;';
    });
}

module.exports = {
    updateChangelog,
};
