const path = require('node:path');

module.exports = function (context) {
    const { segmentWriteKey } = context.siteConfig.customFields;

    return {
        name: 'docusaurus-plugin-segment',

        getClientModules() {
            return [
                path.resolve(__dirname, './analytics'),
                path.resolve(__dirname, './segment'),
                path.resolve(__dirname, './linkTracking'),
            ];
        },

        injectHtmlTags() {
            if (process.env.NODE_ENV !== 'production') {
                return {};
            }

            if (!segmentWriteKey) {
                console.warn('Set the SEGMENT_TOKEN env variable to enable Segment');
                return {};
            }

            return {
                headTags: [
                    {
                        tagName: 'script',
                        attributes: {
                            src: 'https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js',
                            type: 'text/javascript',
                            charset: 'UTF-8',
                            'data-domain-script': '7a8d334b-f744-4c02-9931-92861196dd3c',
                        },
                    },
                    {
                        tagName: 'script',
                        attributes: {
                            type: 'text/javascript',
                        },
                        innerHTML: 'function OptanonWrapper() {}',
                    },
                ],
            };
        },
    };
};
