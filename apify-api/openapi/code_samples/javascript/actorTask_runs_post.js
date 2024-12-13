import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const run = await apifyClient
    .task('<TASK ID>')
    .start();

console.log(run);
