import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const abortedRun = await apifyClient
    .run('<RUN ID>')
    .abort();

console.log(abortedRun);
