const X_PY_DOC_URLS_PROPERTY = 'x-py-doc-url';
const X_JS_DOC_URLS_PROPERTY = 'x-js-doc-url';

/**
 * This decorator adds links to the Apify API Client libraries Python and JS references.
 *
 * The Apify API OpenAPI specification has been enriched with Apify specific vendor extensions
 * on `operation` and `tag` level to link the Apify Client functionality e.g. for `actorBuild_get`:
 * ```
 * x-js-parent: BuildClient
 * x-js-name: get
 * x-js-doc-url: https://docs.apify.com/api/client/js/reference/class/BuildClient#get
 * x-py-parent: BuildClientAsync
 * x-py-name: get
 * x-py-doc-url: https://docs.apify.com/api/client/python/reference/class/BuildClientAsync#get
 * ```
 *
 * The prepended HTML example:
 * ```
 * <span style="float: right;">
 *   <a href="https://docs.apify.com/api/client/python/reference/class/BuildClientAsync#abort" target="_blank" rel="noopener noreferrer">
 *     Python doc
 *   </a>
 *   &nbsp;|&nbsp;
 *   <a href="https://docs.apify.com/api/client/js/reference/class/BuildClient#abort" target="_blank" rel="noopener noreferrer">
 *     JS doc
 *   </a>
 * </span>
 *
 * TODO: The HTML/CSS above will be subject of further design development, placeholder for now.
 * ```
 */
function ClientReferencesLinksDecorator(target) {
    const pyLink = target[X_PY_DOC_URLS_PROPERTY];
    const jsLink = target[X_JS_DOC_URLS_PROPERTY];

    const jsImgUrl = 'https://raw.githubusercontent.com/apify/openapi/b1206ac2adf8f39b05e5a09bf32c2802af58d851/assets/javascript.svg';
    const pyImgUrl = 'https://raw.githubusercontent.com/apify/openapi/b1206ac2adf8f39b05e5a09bf32c2802af58d851/assets/python.svg';

    const jsAlt = 'Apify API JavaScript Client Reference';
    const pyAlt = 'Apify API Python Client Reference';

    // Purposely using `span` element here instead of `div`
    // Due to how redoc works, when `div` used, the markdown rendering in of `description` ceased to work.
    let prepend = `<span class="openapi-clients-box">`;

    if (pyLink || jsLink) {
        prepend += `<span class="openapi-clients-box-heading">Clients</span>`;
    }

    if (pyLink) {
        prepend += `<a href="${pyLink}" target="_blank"><img src="${pyImgUrl}" class="openapi-clients-box-icon" alt="${pyAlt}"/></a>`;
    }

    if (jsLink) {
        prepend += `<a href="${jsLink}" target="_blank"><img src="${jsImgUrl}" class="openapi-clients-box-icon" alt="${jsAlt}" /></a>`;
    }

    prepend += `</span>`;

    target.description = `${prepend}${target.description || ''}`;
}

module.exports = () => ({
    // Redocly is using a visitor pattern. What the following code does is that whenever the traverser leaves a node of
    // type Tag or Operation, it executes prependLegacyUrlAnchor on it.
    Tag: {
        leave: ClientReferencesLinksDecorator,
    },
    Operation: {
        leave: ClientReferencesLinksDecorator,
    },
});
