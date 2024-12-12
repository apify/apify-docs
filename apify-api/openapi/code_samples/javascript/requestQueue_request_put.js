import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const result = await apifyClient
    .requestQueue('<QUEUE ID>')
    .updateRequest({
        id: '<REQUEST ID>',
        url: 'http://example.com',
    });

console.log(result);
