import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const buildLog = await apifyClient
    .build('<BUILD ID>')
    .log()
    .get();

console.log(buildLog);
