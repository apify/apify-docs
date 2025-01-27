import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const queue = await apifyClient
    .requestQueue('<QUEUE ID>')
    .get();

console.log(queue);
