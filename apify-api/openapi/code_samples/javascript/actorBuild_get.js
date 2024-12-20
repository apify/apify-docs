import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const build = await apifyClient
    .build('<BUILD ID>')
    .get();

console.log(build);
