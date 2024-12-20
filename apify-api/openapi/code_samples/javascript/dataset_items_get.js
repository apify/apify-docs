import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .dataset('<DATASET ID>')
    .listItems();

console.log(items);
