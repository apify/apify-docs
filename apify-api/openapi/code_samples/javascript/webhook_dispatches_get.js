import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .webhook('<WEBHOOK ID>')
    .dispatches()
    .list();

console.log(items);
