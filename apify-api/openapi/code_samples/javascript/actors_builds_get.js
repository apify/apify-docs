import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .actor('<ACTOR ID>')
    .builds()
    .list();

console.log(items);
