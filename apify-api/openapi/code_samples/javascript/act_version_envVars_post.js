import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
// Replace apify/my-sample-actor with your Actor's ID or technical name
const envVar = await apifyClient.actor('apify/my-sample-actor')
    .version('0.1')
    .envVars()
    .create({
        name: 'MY_ENV_VAR',
        value: '12345',
        isSecret: true,
    });

console.log(envVar);
