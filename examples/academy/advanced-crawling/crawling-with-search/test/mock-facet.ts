import { readFileSync } from 'fs';

import type { MultichoiceFacet, Facet } from '../src/facets.js';


const json = JSON.parse(
   readFileSync('./test/real-response.json').toString()
);

const createMock = (loopCounts: number[]) => {
    const mockFacet: MultichoiceFacet = {
        name: 'dummy',
        display_name: 'Dummy',
        type: 'multiple',
        options: [],
    };

    for (let i = 0; i < loopCounts.length; i++) {
        mockFacet.options.push({
            value: `option${i}`,
            display_name: `Option ${i}`,
            count: loopCounts[i],
        });
        
    }

    return mockFacet;
};

/*
for (let i = 0; i < 5; i++) {
    mockFacet.options.push({ count: 1000, display_name: '2', value: `${i}` });
}
*/

export const getMockFacets = () => {
    return json.response.facets;
}

