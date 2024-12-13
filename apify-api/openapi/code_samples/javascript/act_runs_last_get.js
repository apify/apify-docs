import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const lastRun = await apifyClient
    .actor('<ACTOR ID>')
    .lastRun();

console.log(lastRun);
