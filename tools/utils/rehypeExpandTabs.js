'use strict';

const { visit, SKIP } = require('unist-util-visit');
const { selectAll } = require('hast-util-select');
const { toString } = require('hast-util-to-string');

function isTabsContainer(node) {
    return (
        node.tagName === 'div' &&
        Array.isArray(node.properties?.className) &&
        node.properties.className.includes('tabs-container')
    );
}

function buildReplacement(tabsContainer) {
    const labels = selectAll('ul[role="tablist"] li[role="tab"]', tabsContainer).map((li) =>
        toString(li).trim(),
    );
    const panels = selectAll('div[role="tabpanel"]', tabsContainer);

    const result = [];
    for (let i = 0; i < panels.length; i++) {
        const panel = panels[i];
        if (panel.properties) delete panel.properties.hidden;

        if (labels[i]) {
            result.push({
                type: 'element',
                tagName: 'p',
                properties: {},
                children: [
                    {
                        type: 'element',
                        tagName: 'strong',
                        properties: {},
                        children: [{ type: 'text', value: labels[i] }],
                    },
                ],
            });
        }

        result.push(...(panel.children ?? []));
    }
    return result;
}

/**
 * Expands Docusaurus <Tabs> into sequential labeled sections before HTML→markdown conversion.
 *
 * Without this, the pipeline drops hidden tab panels and loses label-to-content
 * associations, making multi-language examples unreadable for LLMs.
 */
function rehypeExpandTabs() {
    return (tree) => {
        const replacements = [];

        visit(tree, 'element', (node, index, parent) => {
            if (!isTabsContainer(node)) return;
            const nodes = buildReplacement(node);
            if (nodes.length === 0) return;
            replacements.push({ parent, index, nodes });
            return SKIP;
        });

        // Reverse to preserve indices when splicing
        for (const { parent, index, nodes } of replacements.reverse()) {
            parent.children.splice(index, 1, ...nodes);
        }
    };
}

module.exports = { rehypeExpandTabs };
