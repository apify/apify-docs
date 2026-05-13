'use strict';

const { visit } = require('unist-util-visit');

/**
 * Copies the `language-*` class from Prism's `<pre>` to its child `<code>` element.
 *
 * Docusaurus renders code blocks with the language class on `<pre class="prism-code
 * language-javascript">` but `hast-util-to-mdast` only checks `<code>` for the class,
 * so without this all code blocks lose their language tag in generated markdown.
 */
function rehypeFixCodeLanguage() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.tagName !== 'pre') return;

            const preClasses = node.properties?.className ?? [];
            const langClass = preClasses.find(
                (c) => typeof c === 'string' && c.startsWith('language-'),
            );
            if (!langClass) return;

            const code = (node.children ?? []).find(
                (c) => c.type === 'element' && c.tagName === 'code',
            );
            if (!code) return;

            if (!code.properties) code.properties = {};
            const codeClasses = code.properties.className ?? [];
            if (!codeClasses.some((c) => typeof c === 'string' && c.startsWith('language-'))) {
                code.properties.className = [langClass, ...codeClasses];
            }
        });
    };
}

module.exports = { rehypeFixCodeLanguage };
