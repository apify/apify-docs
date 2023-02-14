import { facetDistributionRank, pickBestFilters } from '../src/facets.js';
import { getMockFacets } from './mock-facet.js';
import type { Filter } from '../src/facets.js';

// Rules of ranking:
// 1. Higher values are generally better, lot of 1s are bad
// 2. Values close to average are better
// 3. Values close to highest are better

/*
for (const facet of getMockFacets()) {
    console.log(facet.name, facetDistributionRank(facet));
}
*/

let totalFilters: Filter[] = [];
for (;;) {
    const { filters, rank, differenceFromComplete } = pickBestFilters({
        facets: getMockFacets(),
        currentFilters: totalFilters,
        filterCache: {},
        total: 275655,
    });
    if (filters.length === 0) {
        break;
    }
    console.log(` Enqueuing new filter ${filters[0].name} with ${filters.length} requests with rank: ${rank}, difference: ${differenceFromComplete}`);
    filters.push(...filters);
}