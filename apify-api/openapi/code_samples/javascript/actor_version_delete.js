import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .delete();
