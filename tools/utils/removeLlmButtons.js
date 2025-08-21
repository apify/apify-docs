const { visit } = require('unist-util-visit');

/**
 * Remark plugin to remove LLM button text and related elements from markdown content.
 * This is used by the @signalwire/docusaurus-plugin-llms-txt plugin to clean up
 * the generated markdown files.
 */
function removeLlmButtons() {
    return (tree) => {
        // Remove text nodes that contain LLM button text
        visit(tree, 'text', (node, index, parent) => {
            if (node.value && (
                node.value.includes('View as Markdown') ||
                node.value.includes('Copy for LLM') ||
                node.value.includes('View as MarkdownCopy for LLM')
            )) {
                // Remove the text node
                parent.children.splice(index, 1);
                return index; // Adjust index after removal
            }
        });
    };
}

module.exports = {
    removeLlmButtons,
};
