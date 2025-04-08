import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .batchDeleteRequests([
        { uniqueKey: 'http://example.com' },
        { uniqueKey: 'http://example.com/2' },
    ]);

console.log(result);
