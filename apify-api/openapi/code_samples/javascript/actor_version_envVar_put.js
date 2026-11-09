import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const updatedEnvVar = await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .envVar('MY_ENV_VAR')
    .update({
        name: 'MY_ENV_VAR',
        value: 'my-new-value',
    });

console.log(updatedEnvVar);
