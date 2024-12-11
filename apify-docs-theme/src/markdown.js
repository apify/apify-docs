const { remark } = require('remark');

function updateChangelog(changelog) {
    const tree = remark.parse(changelog);

    bumpHeadingsLevels(tree);
    linkifyUserTags(tree);
    prettifyPRLinks(tree);

    changelog = remark.stringify(tree);
    changelog = addFrontmatter(changelog);
    changelog = escapeMDXCharacters(changelog);
    return changelog;
}

function bumpHeadingsLevels(tree) {
    tree.children?.forEach((child) => {
        if (child.type === 'heading') {
            child.depth += 1;
        }

        bumpHeadingsLevels(child);
    });
}

function linkifyUserTags(tree) {
    for (let i = 0; i < tree.children?.length; i++) {
        const child = tree.children[i];
        if (child.type === 'text') {
            const userTagRegex = /@([a-zA-Z0-9-]+)(\s|$)/g;
            const match = userTagRegex.exec(child.value);

            if (match) {
                const [_, username, ending] = match;
                const before = child.value.slice(0, match.index);
                const after = child.value.slice(userTagRegex.lastIndex);

                const link = {
                    type: 'link',
                    url: `https://github.com/${username}`,
                    children: [{ type: 'text', value: `@${username}` }],
                };
                child.value = before;

                tree.children.splice(i + 1, 0, link);

                if (after) {
                    tree.children.splice(i + 2, 0, { type: 'text', value: `${ending}${after}` });
                }

                i += 2;
            }
        }

        linkifyUserTags(child);
    }
}

// If there is a PR URL (https://github.com/**/**/pull/number) in the text body, split the body, and replace the URL with a link to the PR (the text should be the PR number).
function prettifyPRLinks(tree) {
    for (let i = 0; i < tree.children?.length; i++) {
        const child = tree.children[i];
        if (child.type === 'text') {
            const prLinkRegex = /https:\/\/github.com\/.*\/pull\/(\d+)/g;
            const match = prLinkRegex.exec(child.value);

            if (match) {
                const [_, prNumber] = match;
                const before = child.value.slice(0, match.index);
                const after = child.value.slice(prLinkRegex.lastIndex);

                const link = {
                    type: 'link',
                    url: match[0],
                    children: [{ type: 'text', value: `#${prNumber}` }],
                };
                child.value = before;

                tree.children.splice(i + 1, 0, link);

                if (after) {
                    tree.children.splice(i + 2, 0, { type: 'text', value: after });
                }

                i += 2;
            }
        }

        prettifyPRLinks(child);
    }
}

function addFrontmatter(changelog, header = 'Changelog') {
    return `---
title: ${header}
sidebar_label: ${header}
toc_max_heading_level: 3
---
${changelog}`;
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
