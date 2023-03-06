/* eslint-disable global-require */
const absoluteUrl = process.env.LOCAL ? 'http://docs.apify.loc' : 'https://docs.apify.com';

const themeConfig = ({
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
                activeBasePath: 'api',
                position: 'left',
                items: [
                    {
                        label: 'Reference',
                        href: `${absoluteUrl}/api/v2/`,
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
                activeBasePath: 'sdk',
                position: 'left',
                items: [
                    {
                        label: 'SDK for JavaScript',
                        href: `${absoluteUrl}/sdk/js/`, // we need a trailing slash here, we'd get redirected there anyway
                        target: '_self',
                        rel: 'dofollow',
                    },
                    {
                        html: 'SDK for Python <span class="beta-chip">beta</span>',
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
                target: '_self',
                rel: 'dofollow',
            },
            {
                label: 'Open source',
                type: 'dropdown',
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
                ],
            },
            {
                href: 'https://github.com/apify',
                label: 'GitHub',
                title: 'Apify on GitHub',
                position: 'right',
                className: 'icon',
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
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
        additionalLanguages: ['docker', 'log'],
    },
    image: 'img/docs-og.png',
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
                        href: `${absoluteUrl}/api/v2/`,
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
                        label: 'SDK for Python (beta)',
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
        apiKey: 'b43e67a96ed18c7f63f5fd965906a96d', // search only (public) API key
        indexName: 'apify_sdk',
        contextualSearch: false,
        algoliaOptions: {
            facetFilters: ['version:VERSION'],
        },
    },
});

module.exports = {
    themeConfig,
    absoluteUrl,
};
