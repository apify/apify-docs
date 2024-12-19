import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const request = await apifyClient
    .requestQueue('<QUEUE ID>')
    .getRequest('<REQUEST ID>');

console.log(request);
