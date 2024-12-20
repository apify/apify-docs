import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
await apifyClient
    .requestQueue('<QUEUE ID>')
    .deleteRequestLock('<REQUEST ID>');
