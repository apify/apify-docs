const X_LEGACY_DOC_URLS_PROPERTY = 'x-legacy-doc-urls';

/**
 * The decorator prepends HTML anchors to the description of each operation with HTML fragments leading to related
 * legacy documentation pages. This achieves link backward compatibility.
 *
 * For example, if the old URL is https://docs.apify.com/api/v2#/reference/logs/log/get-log, then we prepend:
 *   <span id="/reference/logs/log/get-log"></span>
 *
 * The legacy URLs are stored on a custom property `x-legacy-doc-urls` in the node object (typically an operation
 * or tag). Multiple URLs per node are supported (we might point multiple URLs to the same tag or operation).
 */
function prependLegacyUrlAnchor(target) {
    if (X_LEGACY_DOC_URLS_PROPERTY in target) {
        const debugId = target.operationId || target.name || target.summary;

        if (!Array.isArray(target[X_LEGACY_DOC_URLS_PROPERTY])) {
            console.warn(`Invalid legacy doc URL on ${debugId}. Expected non-empty array`);
            return;
        }

        const anchors = target[X_LEGACY_DOC_URLS_PROPERTY]
            .map((url) => {
                const [, fragment] = url.split('#');

                if (!fragment) {
                    console.warn(`Invalid legacy doc URL on ${debugId}, the URL fragment part (#) is missing: ${url}`);
                }

                return fragment;
            })
            .filter((fragment) => fragment)
            .map((fragment) => `<span id="${fragment}"></span>`)
            .join('');

        target.description = `${anchors}${target.description || ''}`;
    }
}

module.exports = () => ({
    // Redocly is using a visitor pattern. What the following code does is that whenever the traverser leaves a node of
    // type Tag or Operation, it executes prependLegacyUrlAnchor on it.
    Tag: {
        leave: prependLegacyUrlAnchor,
    },
    Operation: {
        leave: prependLegacyUrlAnchor,
    },
});
