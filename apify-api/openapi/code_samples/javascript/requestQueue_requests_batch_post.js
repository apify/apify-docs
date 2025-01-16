import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .batchAddRequests([
        {
            uniqueKey: 'http://example.com',
            url: 'http://example.com',
            method: 'GET',
        },
        {
            uniqueKey: 'http://example.com/2',
            url: 'http://example.com/2',
            method: 'GET',
        },
    ]);

console.log(result);
