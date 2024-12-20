import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const head = await apifyClient
    .requestQueue('<QUEUE ID>')
    .listHead();

console.log(head);
