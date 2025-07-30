/* eslint-disable global-require */

let absoluteUrl = 'https://docs.apify.com';

if (process.env.LOCALHOST) {
    absoluteUrl = 'http://localhost:3000';
} else if (process.env.DEV) {
    absoluteUrl = 'http://docs.apify.loc';
} else if (process.env.APIFY_DOCS_ABSOLUTE_URL) {
    absoluteUrl = process.env.APIFY_DOCS_ABSOLUTE_URL;
}

const noIndex = ['true', '1'].includes(process.env.NO_INDEX ?? '');

const themeConfig = {
    docs: {
        versionPersistence: 'localStorage',
        sidebar: {
            hideable: true,
        },
    },
    navbar: {
        title: 'Apify Docs',
        logo: {
            src: 'img/apify_sdk.svg',
            srcDark: 'img/apify_sdk_white.svg',
            href: absoluteUrl,
            target: '_self',
        },
        items: [
            {
                label: 'Academy',
                href: `${absoluteUrl}/academy`,
                activeBasePath: 'academy',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Platform',
                href: `${absoluteUrl}/platform`,
                className: 'navbar__active',
                activeBasePath: 'platform',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'API',
                type: 'dropdown',
                to: `${absoluteUrl}/api`,
                target: '_self',
                rel: 'dofollow',
                activeBasePath: 'api',
                position: 'left',
                items: [
                    {
                        label: 'Reference',
                        href: `${absoluteUrl}/api/v2`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for JavaScript',
                        href: `${absoluteUrl}/api/client/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Python',
                        href: `${absoluteUrl}/api/client/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                label: 'SDK',
                type: 'dropdown',
                to: `${absoluteUrl}/sdk`,
                activeBasePath: 'sdk',
                position: 'left',
                target: '_self',
                rel: 'dofollow',
                items: [
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        html: 'SDK for Python',
                        href: `${absoluteUrl}/sdk/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                label: 'CLI',
                href: `${absoluteUrl}/cli/`, // we need a trailing slash here, we'd get redirected there anyway
                position: 'left',
                activeBasePath: 'cli',
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Open source',
                type: 'dropdown',
                to: `${absoluteUrl}/open-source`,
                activeBasePath: 'open-source',
                target: '_self',
                position: 'left',
                className: 'navbar__item',
                items: [
                    {
                        label: 'Crawlee',
                        href: 'https://crawlee.dev',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Got Scraping',
                        href: 'https://github.com/apify/got-scraping',
                    },
                    {
                        label: 'Fingerprint Suite',
                        href: 'https://github.com/apify/fingerprint-suite',
                    },
                    {
                        label: 'Apify on GitHub',
                        href: 'https://github.com/apify',
                    },
                    {
                        label: 'Actor Whitepaper',
                        href: 'https://whitepaper.actor',
                    },
                ],
            },
            {
                href: 'https://discord.com/invite/jyEM2PRvMU',
                label: 'Discord',
                title: 'Chat on Discord',
                position: 'right',
                className: 'icon',
            },
        ],
    },
    colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
    },
    prism: {
        defaultLanguage: 'typescript',
        theme: require('./theme/CodeThemes/light').lightTheme,
        darkTheme: require('./theme/CodeThemes/dark').darkTheme,
        additionalLanguages: ['docker', 'log', 'php', 'json5', 'bash'],
    },
    // this needs to be absolute link otherwise it gets resolved wrongly in project docs
    image: 'https://apify.com/og-image/docs-article',
    footer: {
        links: [
            {
                title: 'Learn',
                items: [
                    {
                        label: 'Academy',
                        href: `${absoluteUrl}/academy`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Platform',
                        href: `${absoluteUrl}/platform`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'API',
                items: [
                    {
                        label: 'Reference',
                        href: `${absoluteUrl}/api/v2`,
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for JavaScript',
                        href: `${absoluteUrl}/api/client/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Client for Python',
                        href: `${absoluteUrl}/api/client/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'SDK',
                items: [
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'SDK for Python',
                        href: `${absoluteUrl}/sdk/python/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'Other',
                items: [
                    {
                        label: 'CLI',
                        href: `${absoluteUrl}/cli/`, // we need a trailing slash here, we'd get redirected there anyway
                        position: 'left',
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        label: 'Open source',
                        href: `${absoluteUrl}/open-source`,
                        position: 'left',
                        target: '_self',
                        rel: 'dofollow',
                    },
                ],
            },
            {
                title: 'More',
                items: [
                    {
                        label: 'Crawlee',
                        to: 'https://crawlee.dev',
                        rel: 'dofollow',
                    },
                    {
                        label: 'GitHub',
                        href: 'https://github.com/apify',
                    },
                    {
                        href: 'https://discord.com/invite/jyEM2PRvMU',
                        label: 'Discord',
                    },
                    {
                        label: 'Trust Center',
                        href: 'https://trust.apify.com',
                    },
                ],
            },
        ],
        logo: {
            src: 'img/apify_logo.svg',
            href: '/',
            width: '60px',
            height: '60px',
        },
    },
    algolia: {
        appId: 'N8EOCSBQGH',
        apiKey: 'e97714a64e2b4b8b8fe0b01cd8592870', // search only (public) API key
        indexName: 'apify_sdk_v2',
        placeholder: 'Search documentation',
        algoliaOptions: {
            facetFilters: ['version:VERSION'],
        },
        translations: {
            button: {
                buttonText: 'Search documentation…',
            },
        },
    },
    hubspot: {
        accountId: '19497222',
        async: true,
        defer: true,
    },
};

const plugins = [
    [
        'docusaurus-gtm-plugin',
        {
            id: 'GTM-MNGXGGB',
        },
    ],
    '@stackql/docusaurus-plugin-hubspot',
    async function runnableCodeBlock() {
        return {
            name: 'runnable-code-block',
            configureWebpack() {
                return {
                    resolveLoader: {
                        alias: {
                            'roa-loader': require.resolve(
                                `${__dirname}/roa-loader/`,
                            ),
                        },
                    },
                };
            },
        };
    },
];

const scripts = [
    {
        src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
        'data-website-id': 'a9937f98-9c9d-44d9-a433-fec4cb1c114d',
        'data-project-name': 'Apify',
        'data-modal-title': 'Apify AI Assistant',
        'data-project-color': '#666666',
        'data-button-hide': 'true',
        'data-search-mode-enabled': 'true',
        'data-project-logo': 'https://apify.com/img/apify-logo/logomark-32x32.svg',
        'data-modal-example-questions': 'How to run an Actor?,Create a version of an Actor?',
        'data-modal-override-open-id': 'ask-ai-input',
        'data-modal-override-open-class': 'search-input',
        'data-font-size-xs': '1.2rem',
        'data-font-size-sm': '1.4rem',
        'data-font-size-md': '1.6rem',
        'data-font-size-lg': '1.8rem',
        'data-font-size-xl': '2.0rem',
        async: true,
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/@inkeep/cxkit-js@0.5/dist/embed.js',
        type: 'module',
        async: true,
    },
];

const customFields = {
    inkeepApiKey: process.env.LOCALHOST || process.env.DEV
        ? 'bbbb9f1001a9b66f282431a80bb743a24e2bdefb85d4f1e4' // development, works with localhost
        : '8af30e40009f26622237f75aab8256064c26a3063717c48a', // production, only works on apify.com (any subdomain)
};

module.exports = {
    themeConfig,
    plugins,
    absoluteUrl,
    noIndex,
    scripts,
    customFields,
};
