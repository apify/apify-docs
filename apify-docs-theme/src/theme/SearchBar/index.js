// eslint-disable-next-line simple-import-sort/imports
import BrowserOnly from '@docusaurus/BrowserOnly';
import RouterLink from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useCallback } from 'react';

import { ApifySearch } from '@apify/docs-search-modal';

// needs to be imported as the last thing, so that it can override the default styles
// TODO: update simple-import-sort to allow importing css as last.
import './styles.css';

/**
 * Tests whether the given href is pointing to the current docusaurus instance (so we can use the router link).
 */
function matchesCurrentInstance(href, baseUrl) {
    if (baseUrl === '/') {
        return href.startsWith('/academy') || href.startsWith('/platform');
    }

    return href.startsWith(baseUrl);
}

export function Link(props) {
    props = { ...props };

    if (props.href.startsWith('https://docs.apify.com')) {
        props.href = props.href.substring('https://docs.apify.com'.length);
    }

    const { siteConfig } = useDocusaurusContext();

    if (matchesCurrentInstance(props.href, siteConfig.baseUrl)) {
        return <RouterLink {...props}>
            {props.children}
        </RouterLink>;
    }

    return <a {...props}>{props.children}</a>;
}

export default function SearchBar({ onClick }) {
    const { siteConfig } = useDocusaurusContext();
    const location = useLocation();
    const history = useHistory();

    const navigate = useCallback((href) => {
        const shortHref = href.substring('https://docs.apify.com'.length);

        if (matchesCurrentInstance(shortHref, siteConfig.baseUrl)) {
            return history.push(shortHref);
        }
        return window.location.assign(href);
    }, [history, siteConfig.baseUrl]);

    const getVersion = useCallback(() => {
        const match = location.pathname.match(/\/(\d+\.\d+|next)/);

        return match ? match[1] : 'latest';
    }, [location]);

    return (
        <BrowserOnly>
            {() => (
                <div onClick={onClick}>
                    <ApifySearch
                        algoliaAppId={siteConfig.themeConfig.algolia.appId}
                        algoliaIndexName='test_test_apify_sdk'
                        algoliaKey={siteConfig.themeConfig.algolia.apiKey}
                        filters={`version:${getVersion()}`}
                        navigate={navigate}
                    />
                </div>
            )}
        </BrowserOnly>
    );
}
