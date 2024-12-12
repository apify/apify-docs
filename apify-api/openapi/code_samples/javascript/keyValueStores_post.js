import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const store = await apifyClient
    .keyValueStores()
    .getOrCreate('<STORE NAME>');

console.log(store);
