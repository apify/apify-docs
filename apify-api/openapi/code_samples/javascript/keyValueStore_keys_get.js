import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .keyValueStore('<STORE ID>')
    .listKeys();

console.log(items);
