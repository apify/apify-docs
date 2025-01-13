import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .task('<TASK ID>')
    .webhooks()
    .list();

console.log(items);
