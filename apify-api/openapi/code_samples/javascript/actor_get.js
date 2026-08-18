import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const actor = await apifyClient
    .actor('<ACTOR ID>')
    .get();

console.log(actor);
