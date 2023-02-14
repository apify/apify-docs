// We will run on a real website to see the code in action
export const BASE_URL = `https://ac.cnstrc.com/browse/group_id/all?c=ciojs-client-2.29.12&key=key_XT7bjdbvjgECO5d8&i=68df40a5-a147-4a20-86a5-e6565066b9d3&s=14&page=1&num_results_per_page=24&_dt=${Date.now()}`;

export const LABELS = {
    SEARCH: 'SEARCH',
    PAGINATION: 'PAGINATION',
}

export const OVERRIDE_RANK = {
    // We want to skip the shipping price facet because it is not evenly distributed
    shipping_price: 0.9,
}

export const MIN_RANGE_FILTER_MIN = 0;
// This will depend on the targt site
export const MAX_RANGE_FILTER_MAX = 1_000_000_000;
