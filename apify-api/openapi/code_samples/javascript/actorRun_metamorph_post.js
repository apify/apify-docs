import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const metamorphedRun = await apifyClient
    .run('<RUN ID>')
    .metamorph('<ACTOR ID>');

console.log(metamorphedRun);
