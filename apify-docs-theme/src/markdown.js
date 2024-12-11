const { remark } = require('remark');

/**
 * Updates the markdown content for better UX and compatibility with Docusaurus v3.
 * @param {string} changelog The markdown content.
 * @returns {string} The updated markdown content.
 */
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

/**
 * Bumps the headings levels in the markdown content. This function increases the depth
 * of all headings in the content by 1. This is useful when the content is included in
 * another markdown file with a higher-level heading.
 * @param {*} tree Remark AST tree.
 * @returns {void} Nothing. This function modifies the tree in place.
 */
function bumpHeadingsLevels(tree) {
    tree.children?.forEach((child) => {
        if (child.type === 'heading') {
            child.depth += 1;
        }

        bumpHeadingsLevels(child);
    });
}

/**
 * Links user tags in the markdown content. This function replaces the user tags
 * (e.g. `@username`) with a link to the user's GitHub profile (just like GitHub's UI).
 * @param {*} tree Remark AST tree.
 * @returns {void} Nothing. This function modifies the tree in place.
 */
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

/**
 * Prettifies PR links in the markdown content. Just like GitHub's UI, this function
 * replaces the full PR URL with a link represented by the PR number (prefixed by a hashtag).
 * @param {*} tree Remark AST tree.
 * @returns {void} Nothing. This function modifies the tree in place.
 */
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

/**
 * Adds frontmatter to the markdown content.
 * @param {string} changelog The markdown content.
 * @param {string} title The frontmatter title.
 * @returns {string} The markdown content with frontmatter.
 */
function addFrontmatter(changelog, title = 'Changelog') {
    return `---
title: ${title}
sidebar_label: ${title}
toc_max_heading_level: 3
---
${changelog}`;
}

/**
 * Escapes the MDX-related characters in the markdown content.
 * This is required by Docusaurus v3 and its dependencies (see the v3 [migration guide](https://docusaurus.io/docs/migration/v3#common-mdx-problems)).
 * @param {string} changelog The markdown content.
 * @returns {string} The markdown content with escaped MDX characters.
 */
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
