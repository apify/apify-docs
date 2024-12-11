import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const run = await apifyClient
    .actor('<ACTOR ID>')
    .start({ /** <ACTOR INPUT> */ });

console.log(run);
