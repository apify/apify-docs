import type { Filter } from "./facets";

export class UrlParser extends URL {
    getFilters(): Filter[] {
        const filters = [];
        for (const [key, value] of this.searchParams) {
            const match = key.match(/filters\[(.+)\]$/);
            if (match) {
                const name = match[1];
                const rangeMatch = value.match(/(\d+)-(\d+)/);
                if (rangeMatch) {
                    filters.push({
                        name,
                        min: Number(rangeMatch[1]),
                        max: Number(rangeMatch[2]),
                    });
                } else {
                    filters.push({
                        name,
                        value,
                    });
                }
            }
        }
        return filters;
    }

    setFilter(filter: Filter) {
        if ('min' in filter) {
            this.searchParams.set(`filters[${filter.name}]`, `${filter.min}-${filter.max}`);
        } else {
            this.searchParams.set(`filters[${filter.name}]`, filter.value);
        }
    }

    setFilters(filters: Filter[]) {
        for (const filter of filters) {
            this.setFilter(filter);
        }
    }
}