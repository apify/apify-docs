import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const { items } = await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .envVars()
    .list();

console.log(items);
