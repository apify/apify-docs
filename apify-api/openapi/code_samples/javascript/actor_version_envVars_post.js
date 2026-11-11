import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({
    token: '<TOKEN>',
});
const envVar = await apifyClient
    .actor('<ACTOR ID>')
    .version('0.1')
    .envVars()
    .create({
        name: 'MY_ENV_VAR',
        value: 'my-new-value',
        isSecret: true,
    });

console.log(envVar);
