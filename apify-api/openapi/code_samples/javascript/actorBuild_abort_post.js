import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const abortedBuild = await apifyClient
    .build('<BUILD ID>')
    .abort();

console.log(abortedBuild);
