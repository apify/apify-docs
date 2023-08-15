import React, { useCallback } from 'react';

import { ApifySearch } from '@apify/docs-search-modal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

export default function SearchBar() {
    const { siteConfig } = useDocusaurusContext();
    const location = useLocation();

    const getVersion = useCallback(() => {
        const match = location.pathname.match(/\/(\d+\.\d+|next)/);

        return match ? match[1] : 'latest';
    }, [location]);

    return (
        <ApifySearch
            algoliaAppId={siteConfig.themeConfig.algolia.appId}
            algoliaIndexName='test_test_apify_sdk'
            algoliaKey={siteConfig.themeConfig.algolia.apiKey}
            filters={`version:${getVersion()}`}
        />
    );
}
