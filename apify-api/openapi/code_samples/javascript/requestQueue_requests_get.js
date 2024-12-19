import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .requestQueue('<QUEUE ID>')
    .listRequests();

console.log(items);
