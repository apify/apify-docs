import { createCheerioRouter } from 'crawlee';
import type { CheerioCrawler, RequestOptions } from 'crawlee';

import { UrlParser } from './url-parser.js';
import { filtersToLogPrefix } from './utils.js';
import { LABELS, OVERRIDE_RANK } from './consts.js';
import { pickBestFilters } from './facets.js';
import type { Facet, FilterState } from './facets.js';

export const router = createCheerioRouter();

interface Response {
    facets: Facet[],
    results: any[],
    sort_options: any[],
    total_num_results: number,
}

const enqueuePagination = async (request: RequestOptions, crawler: CheerioCrawler) => {
    await crawler.addRequests([{
        url: request.url,
        // We need to update the uniqueKey because we are enqueueing the same URL as we have
        uniqueKey: `${request.url}-${LABELS.PAGINATION}`,
        label: LABELS.PAGINATION,
    }]);
}

// In real-world project, you would want to add extra error handling
router.addHandler(LABELS.SEARCH, async ({ log, request, json, crawler }) => {
    const { isFirstPage } = request.userData as { isFirstPage: boolean };

    // We always parse the current URL to get the current filters
    const parsedUrl = new UrlParser(request.url);
    const currentFilters = parsedUrl.getFilters();

    // We collect all important information from the response
    const total: number = json.response.result_sources.token_match.count;
    const { facets, results, sort_options, total_num_results } = json.response as Response;

    // We construct a log prefix that will connect all log messages for this request
    const logPrefix = `${filtersToLogPrefix(currentFilters)}: total: ${total}, max per search: ${total_num_results}, facets: ${facets.length}`;
    
    // total_num_results is the maximum number of results per single search, that is our pagination limit
    // Most websites will not share this number so you might need to find it manually
    if (total <= total_num_results) {
        // We don't need to refine the search any further and can start paginating
        // It would be more efficient to parse the first page of products right here and enqueue 2nd page
        log.info(`${logPrefix} No more refinements needed, enqueuing pagination - ${request.url}`);
        await enqueuePagination(request, crawler);
        return;
    }

    const state = await crawler.useState<FilterState>({});

    if (isFirstPage) {
        state.fullTotal = total;
    }

    if (!state.filterCache) {
        state.filterCache = {};
    }

    state.filterCache

    const { filters, rank, differenceFromComplete } = pickBestFilters({
        facets,
        total,
        currentFilters,
        filterCache: state.filterCache, 
        overrideRank: OVERRIDE_RANK
    });
    if (differenceFromComplete !== 0) {
        // At this point, we know we cannot we sure we are able to scrape all products
        // because the best filter we could find is not complete
        // We could also decide to stop the crawling here (or stop on bad ranking)
        log.warning(`${logPrefix} Best filter is not complete, rank: ${rank}, enqueuing pagination`);
    }

    if (filters.length === 0) {
        log.warning(`${logPrefix} No more usable filters, enqueuing pagination`);
        await enqueuePagination(request, crawler);
        return;
    }

    log.info(`${logPrefix} Enqueuing new filter ${filters[0].name} with ${filters.length} requests with rank: ${rank}`);

    const requestsToEnqueue = filters.map((filter) => {
        console.log('filters');
        console.dir(filter);
        const newParsedUrl = new UrlParser(request.url);
        newParsedUrl.setFilter(filter);
        return {
            url: newParsedUrl.toString(),
            label: LABELS.SEARCH,
            userData: { referrerUrl: request.url, referrerTotal: total },
        } as RequestOptions;
    });

    await crawler.addRequests(requestsToEnqueue, { forefront: true });
});

router.addHandler(LABELS.PAGINATION, async ({ crawler, json }) => {
    // Here you can parse the data and store them or enqueue the details
    // For sake of this tutorial, we will store the unique URLs so we can test how many we scraped
    const slugsObj = await crawler.useState<Record<string, boolean>>({});
    json.response.results.forEach((result: any) => {
        const slug = `${result.data.product_type}/${result.data.slug}`;
        slugsObj[slug] = true;
    });
});
