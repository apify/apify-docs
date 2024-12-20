import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const webhook = await apifyClient
    .webhook('<WEBHOOK ID>')
    .get();

console.log(webhook);
