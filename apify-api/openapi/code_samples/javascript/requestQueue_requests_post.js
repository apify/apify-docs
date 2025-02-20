import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .addRequest({
        uniqueKey: 'http://example.com',
        url: 'http://example.com',
        method: 'GET',
    });

console.log(result);
