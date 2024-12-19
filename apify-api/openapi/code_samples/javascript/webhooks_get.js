import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .webhooks()
    .list();

console.log(items);
