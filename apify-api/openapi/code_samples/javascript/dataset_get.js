import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const dataset = await apifyClient
    .dataset('<DATASET ID>')
    .get();

console.log(dataset);
