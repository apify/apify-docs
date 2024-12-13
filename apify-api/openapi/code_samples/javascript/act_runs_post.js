import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const run = await apifyClient
    .actor('<ACTOR ID>')
    .start({ 'foo': 'bar' });

console.log(run);
