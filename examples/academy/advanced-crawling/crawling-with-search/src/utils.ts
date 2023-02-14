import type { Filter } from './facets.js';

export const filtersToLogPrefix = (filters: Filter[]): string => {
    return filters.map((filter) => {
        if ('min' in filter) {
            return `[${filter.name}=${filter.min}-${filter.max}]`;
        }
        return `[${filter.name}=${filter.value}]`;
    }).join('');
};

// Re-configure this function as you need
// Apify proxy is good for testing if you have access to it
export const getProxyUrl = () => {
    const username = 'groups-RESIDENTIAL';
    const password = process.env.APIFY_PROXY_PASSWORD;
    return `http://${username}:${password}@proxy.apify.com:8000`;
}