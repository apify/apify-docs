import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const version = await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .get();

console.log(version);
