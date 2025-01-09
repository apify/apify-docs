import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const queue = await apifyClient
    .requestQueues()
    .getOrCreate('<QUEUE NAME>');

console.log(queue);
