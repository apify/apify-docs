function updateChangelog(changelog) {
    changelog = addHeader(changelog);
    changelog = pushHeadings(changelog);
    changelog = linkUsers(changelog);
    changelog = linkPRs(changelog);
    return changelog;
}

function addHeader(changelog, header = 'Changelog') {
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

function linkUsers(changelog) {
    return changelog.replaceAll(/ @([a-zA-Z0-9-]+)/g, ' [@$1](https://github.com/$1)');
}

function linkPRs(changelog) {
    return changelog.replaceAll(/(((https?:\/\/)?(www.)?)?github.com\/[^\s]*?\/pull\/([0-9]+))/g, '[#$5]($1)');
}

module.exports = {
    updateChangelog,
};
