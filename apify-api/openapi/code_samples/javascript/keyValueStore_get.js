import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const store = await apifyClient
    .keyValueStore('<STORE ID>')
    .get();

console.log(store);
