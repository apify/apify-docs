'use strict';

const { visit, SKIP } = require('unist-util-visit');

/**
 * Removes elements marked with `data-llms-exclude` before HTML→markdown conversion.
 *
 * Use the attribute on interactive UI that renders inside page content, such as the
 * "Copy prompt" button of PromptBlock. Without it, button labels end up as stray text
 * in the generated `.md` pages and `llms-full.txt`.
 */
function rehypeRemoveLlmExcluded() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (!parent || index === undefined) return undefined;
            if (node.properties?.dataLlmsExclude === undefined) return undefined;

            parent.children.splice(index, 1);
            return [SKIP, index];
        });
    };
}

module.exports = { rehypeRemoveLlmExcluded };
