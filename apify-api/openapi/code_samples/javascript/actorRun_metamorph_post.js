import { ApifyClient } from 'apify-client';

const apifyClient = new ApifyClient({ token: 'my-token' });
const metamorphedRun = await apifyClient.run('my-run-ID')
    .metamorph('target-actor-ID');

console.log(metamorphedRun);
