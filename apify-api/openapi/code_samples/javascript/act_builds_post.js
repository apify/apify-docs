import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const build = await apifyClient
    .actor('<ACTOR ID>')
    .build('0.0');

console.log(build);
