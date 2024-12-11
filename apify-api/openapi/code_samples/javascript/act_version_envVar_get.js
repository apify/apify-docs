import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const envVar = await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .envVar('MY_ENV_VAR')
    .get();

console.log(envVar);
