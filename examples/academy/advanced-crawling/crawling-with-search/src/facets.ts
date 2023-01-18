import { MIN_RANGE_FILTER_MIN, MAX_RANGE_FILTER_MAX } from './consts.js';

// E.g. filters[lowest_price_cents]=0-10000000
type RangeFilter = {
    name: string,
    min: number;
    max: number;
}

// E.g. filters[web_groups]=apparel
type MultiChoiceFilter = {
    name: string;
    value: string;
}

export type Filter = RangeFilter | MultiChoiceFilter;

interface FacetOption {
    count: number,
    display_name: string,
    value: string
}

export interface MultichoiceFacet {
    name: string,
    display_name: string,
    type: 'multiple',
    options: FacetOption[],
}

interface RangeFacet {
    name: string,
    display_name: string,
    type: 'range',
    min?: number,
    max?: number,
}

export type Facet = MultichoiceFacet | RangeFacet;

interface FilterCache {
    [name: string]: {
        [value: string]: number;
    }
}

// Facets that have no or only one option are useless
const isUsableFacet = (facet: Facet) => {
    if (facet.type === 'range') {
        return true;
    }
    return facet.options.length > 1;
}

const facetDifferenceFromComplete = (facet: Facet, total: number): number => {
    if (facet.type === 'range') {
        return 0;
    }
    const sumOfOptions = facet.options.reduce((sum, option) => sum + option.count, 0);
    console.log(`Facet ${facet.name} has ${sumOfOptions} options out of ${total}, difference is ${total - sumOfOptions}`);
    return total - sumOfOptions;
};

// Returns number between 0 and 1. Lower is better 
export const facetDistributionRank = (facet: Facet): number => {
    // We will give range facets a middle value. They are good but not necessarily the most efficient.
    if (facet.type === 'range') {
        return 2;
    }
    
    const { options } = facet;
    const sumOfCounts = options.reduce((sum, option) => sum + option.count, 0);
    // Mean average count for single option
    const average = sumOfCounts / options.length;
    const highest = options.reduce((highest, option) => Math.max(highest, option.count), 0);
    const sumOfDifferencesHighest = options.reduce((sum, option) => sum + highest / option.count, 0);
    const sumOfDifferencesAverage = options.reduce((sum, option) => sum + Math.abs(option.count - average), 0);
    const highestAndAverageCompromise = (sumOfDifferencesHighest + sumOfDifferencesAverage) / 2;
    // We divide it the differences by total so the result is not skewed by the total number of options
    // and lands between 0 and 1
    const rank = (highestAndAverageCompromise / sumOfCounts) / 2;
    console.log(`Sum of counts: ${sumOfCounts},sumOfDifferencesHighest: ${sumOfDifferencesHighest}, sumOfDifferencesAverage: ${sumOfDifferencesAverage}, highestAndAverageCompromise ${highestAndAverageCompromise}`);
    return rank;
};

// We assume no open-ended ranges but can easily be extended
export const splitRangeFilter = (rangeFilter: RangeFilter): [RangeFilter, RangeFilter] => {
    const { name, min, max } = rangeFilter;

    const middle = min + Math.floor((max - min) / 2);

    const filterMin = {
        name,
        min,
        max: Math.max(middle, min),
    };
    const filterMax = {
        name,
        min: Math.min(middle + 1, max),
        max,
    };
    return [filterMin, filterMax];
};

interface PickBestFilterInput {
    currentFilters: Filter[],
    facets: Facet[],
    filterCache: FilterCache,
    total: number,
    overrideRank?: Record<string, number>
}

// We return also some metadata so we can react to not complete facets
// It is up to the caller to decide what to do with it
interface PickBestFiltersResult {
    filters: Filter[],
    rank?: number,
    differenceFromComplete?: number,
}

export const pickBestFilters = ({
    facets,
    total,
    currentFilters,
    filterCache,
    overrideRank,
}: PickBestFilterInput): PickBestFiltersResult=> {
    // First we check if we have an active range filter, if yes we continue splitting it
    const activeRangeFilters = currentFilters.filter((filter): filter is RangeFilter => {
        return 'min' in filter && filter.min !== filter.max;
    });

    if (activeRangeFilters.length > 0) {
        return {
            filters: splitRangeFilter(activeRangeFilters[0]),
        };
    }

    const validFacets = facets.filter(isUsableFacet);

    if (validFacets.length === 0) {
        return {
            filters: [],
        };
    }

    // If we don't have active range filter, we will find the best facet
    const facetsWithRanks = validFacets.map((facet) => ({
        facet,
        rank: overrideRank?.[facet.name] ?? facetDistributionRank(facet),
        differenceFromComplete: facetDifferenceFromComplete(facet, total),
    }));
        
    // We always prioritize complete facets
    facetsWithRanks.sort((a, b) => {
        if (a.differenceFromComplete !== b.differenceFromComplete) {
            return a.differenceFromComplete - b.differenceFromComplete;
        }
        return a.rank - b.rank;
    });

    const bestFacet = facetsWithRanks[0];
    if (bestFacet.facet.type === 'range') {
        return {
            filters: [{
                name: bestFacet.facet.name,
                min: bestFacet.facet.min ?? MIN_RANGE_FILTER_MIN,
                max: bestFacet.facet.max ?? MAX_RANGE_FILTER_MAX,
            }],
            rank: bestFacet.rank,
            differenceFromComplete: bestFacet.differenceFromComplete,
        };
    } else {
        return {
            filters: bestFacet.facet.options.map((option) => ({
                name: bestFacet.facet.name,
                value: option.value,
            })),
            rank: bestFacet.rank,
            differenceFromComplete: bestFacet.differenceFromComplete,
        };
    }
}