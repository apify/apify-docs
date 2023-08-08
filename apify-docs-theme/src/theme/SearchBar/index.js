import React from 'react';

import { ApifySearch } from '@apify/docs-search-modal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function SearchBar() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <div style={{ width: '15rem' }}>
            <ApifySearch
                algoliaAppId={siteConfig.themeConfig.algolia.appId}
                algoliaIndexName='test_test_apify_sdk'
                algoliaKey={siteConfig.themeConfig.algolia.apiKey}
            />
        </div>
    );
}
