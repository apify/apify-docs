import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .updateRequest({
        id: '<REQUEST ID>',
        uniqueKey: 'http://example.com',
        url: 'http://example.com',
    });

console.log(result);
