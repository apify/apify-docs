import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
await apifyClient
    .keyValueStore('<STORE ID>')
    .delete();
