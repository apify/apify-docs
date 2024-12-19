import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .builds()
    .list();

console.log(items);
