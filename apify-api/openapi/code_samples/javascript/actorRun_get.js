import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const run = await apifyClient
    .run('<RUN ID>')
    .get();

console.log(run);
