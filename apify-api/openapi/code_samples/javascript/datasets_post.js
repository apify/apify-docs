import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const dataset = await apifyClient
    .datasets()
    .getOrCreate('<DATASET NAME>');

console.log(dataset);
